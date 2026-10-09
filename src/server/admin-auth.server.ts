import { env } from "./env.server";
import { ADMIN_COOKIES, resolveUser } from "./session.server";

export function isAllowedAdmin(email: string | null | undefined) {
  if (!email) return false;
  const allowed = env("ADMIN_EMAILS")
    .split(",")
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);
  return allowed.includes(email.toLowerCase());
}

/** Email of the signed-in admin, or null. Uses a Supabase session in httpOnly cookies, renewed automatically. */
export async function currentAdmin(): Promise<string | null> {
  const user = await resolveUser(ADMIN_COOKIES);
  if (!user?.email) return null;
  return isAllowedAdmin(user.email) ? user.email : null;
}

export async function requireAdmin(): Promise<string> {
  const email = await currentAdmin();
  if (!email) throw new Error("Please sign in again.");
  return email;
}
