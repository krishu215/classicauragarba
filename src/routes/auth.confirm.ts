import { createFileRoute } from "@tanstack/react-router";
import { authClient } from "@/server/db.server";
import { CUSTOMER_COOKIES, RESET_COOKIE } from "@/server/session.server";

const TYPES = ["signup", "magiclink", "recovery", "email"] as const;
type OtpType = (typeof TYPES)[number];

function cookie(name: string, value: string, maxAge: number) {
  return `${name}=${encodeURIComponent(value)}; Max-Age=${maxAge}; Path=/; HttpOnly; Secure; SameSite=Lax`;
}

/** Where the links in our verification and reset emails land. Checks the one-time token, then signs the customer in. */
export const Route = createFileRoute("/auth/confirm")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const params = new URL(request.url).searchParams;
        const tokenHash = params.get("token_hash") ?? "";
        const type = params.get("type") as OtpType | null;
        const headers = new Headers({ "Cache-Control": "no-store" });
        const go = (location: string) => {
          headers.set("Location", location);
          return new Response(null, { status: 302, headers });
        };
        if (!tokenHash || !type || !TYPES.includes(type)) return go("/login?link=expired");
        try {
          const { data, error } = await authClient().auth.verifyOtp({ type, token_hash: tokenHash });
          if (error || !data.session) return go("/login?link=expired");
          if (type === "recovery") {
            headers.append("Set-Cookie", cookie(RESET_COOKIE, data.session.access_token, 15 * 60));
            return go("/login?reset=1");
          }
          headers.append("Set-Cookie", cookie(CUSTOMER_COOKIES.access, data.session.access_token, data.session.expires_in));
          headers.append("Set-Cookie", cookie(CUSTOMER_COOKIES.refresh, data.session.refresh_token, 60 * 60 * 24 * 30));
          return go("/login?verified=1");
        } catch (cause) {
          console.error("[auth-confirm]", cause);
          return go("/login?link=expired");
        }
      },
    },
  },
});
