import { createServerFn } from "@tanstack/react-start";
import { authClient } from "./db.server";
import { listBookings } from "./booking-repository.server";
import { env, siteUrl } from "./env.server";
import { shapeOrder } from "./orders.server";
import { clearSession, CUSTOMER_COOKIES, resolveUser, writeSession } from "./session.server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const cleanEmail = (value: string) => value.trim().toLowerCase();
const redirectTo = () => `${siteUrl()}/login`;

/** The signed-in Supabase customer, only once their email is confirmed (so nobody can claim someone else's orders). */
async function verifiedCustomer() {
  const user = await resolveUser(CUSTOMER_COOKIES);
  if (!user?.email || !user.email_confirmed_at) return null;
  return { email: user.email, name: String(user.user_metadata?.name ?? "") };
}

export const customerSignUp = createServerFn({ method: "POST" })
  .inputValidator((data: { name: string; email: string; password: string }) => data)
  .handler(async ({ data }) => {
    const email = cleanEmail(data.email);
    const name = data.name.trim().slice(0, 80);
    if (!name) throw new Error("Enter your name.");
    if (!EMAIL_RE.test(email)) throw new Error("Enter a valid email address.");
    if (data.password.length < 8) throw new Error("Password must be at least 8 characters.");
    const { data: result, error } = await authClient().auth.signUp({
      email,
      password: data.password,
      options: { data: { name }, emailRedirectTo: redirectTo() },
    });
    if (error) {
      if (/already.*registered|already.*exists/i.test(error.message)) return { signedIn: null };
      if (error.status === 429 || /rate|too many/i.test(error.message)) {
        throw new Error("Too many attempts. Please wait a few minutes and try again.");
      }
      console.error("[signup]", error.message);
      throw new Error("We could not create the account. Please try again.");
    }
    // Email confirmation turned off in Supabase: the account is ready, so sign the customer straight in.
    if (result.session && result.user?.email_confirmed_at) {
      writeSession(CUSTOMER_COOKIES, result.session);
      return { signedIn: { email: result.user.email ?? email, name } };
    }
    return { signedIn: null };
  });

export const customerSignIn = createServerFn({ method: "POST" })
  .inputValidator((data: { email: string; password: string }) => data)
  .handler(async ({ data }) => {
    const { data: result, error } = await authClient().auth.signInWithPassword({
      email: cleanEmail(data.email),
      password: data.password,
    });
    if (error || !result.session || !result.user) {
      if (error?.code === "email_not_confirmed") {
        throw new Error("Please verify your email first. We sent you a link, so check your inbox and spam folder.");
      }
      throw new Error("Wrong email or password.");
    }
    if (!result.user.email_confirmed_at) throw new Error("Please verify your email first. Check your inbox and spam folder.");
    writeSession(CUSTOMER_COOKIES, result.session);
    return { email: result.user.email ?? "", name: String(result.user.user_metadata?.name ?? "") };
  });

/** Signs the customer in from the tokens in a Supabase email link (after they confirm their email). */
export const customerAcceptLink = createServerFn({ method: "POST" })
  .inputValidator((data: { accessToken: string; refreshToken: string }) => data)
  .handler(async ({ data }) => {
    const { data: found, error } = await authClient().auth.getUser(data.accessToken);
    if (error || !found.user?.email || !found.user.email_confirmed_at) return null;
    writeSession(CUSTOMER_COOKIES, { access_token: data.accessToken, refresh_token: data.refreshToken, expires_in: 3600 });
    return { email: found.user.email, name: String(found.user.user_metadata?.name ?? "") };
  });

export const customerSignOut = createServerFn({ method: "POST" }).handler(async () => {
  clearSession(CUSTOMER_COOKIES);
  return { ok: true };
});

export const customerMe = createServerFn({ method: "GET" }).handler(async () => {
  return verifiedCustomer();
});

/** Every order placed with the signed-in (and verified) email address, newest first. */
export const customerOrders = createServerFn({ method: "GET" }).handler(async () => {
  const user = await verifiedCustomer();
  if (!user?.email) throw new Error("Please sign in again.");
  const rows = await listBookings({ email: user.email, limit: 30 });
  return rows.map((row) => shapeOrder(row));
});

export const customerResend = createServerFn({ method: "POST" })
  .inputValidator((data: { email: string }) => data)
  .handler(async ({ data }) => {
    const email = cleanEmail(data.email);
    if (EMAIL_RE.test(email)) {
      const { error } = await authClient().auth.resend({ type: "signup", email, options: { emailRedirectTo: redirectTo() } });
      if (error?.status === 429) throw new Error("Please wait a minute before asking for another email.");
      if (error) console.error("[resend] Verification email could not be sent.");
    }
    return { ok: true };
  });

export const customerForgot = createServerFn({ method: "POST" })
  .inputValidator((data: { email: string }) => data)
  .handler(async ({ data }) => {
    const email = cleanEmail(data.email);
    if (EMAIL_RE.test(email)) {
      const { error } = await authClient().auth.resetPasswordForEmail(email, { redirectTo: redirectTo() });
      if (error?.status === 429) throw new Error("Please wait a minute before asking for another email.");
      if (error) console.error("[forgot] Password recovery email could not be sent.");
    }
    return { ok: true };
  });

/** Set a new password using the one-time token from the reset email. */
export const customerUpdatePassword = createServerFn({ method: "POST" })
  .inputValidator((data: { accessToken: string; password: string }) => data)
  .handler(async ({ data }) => {
    if (data.password.length < 8) throw new Error("Password must be at least 8 characters.");
    const response = await fetch(`${env("SUPABASE_URL")}/auth/v1/user`, {
      method: "PUT",
      headers: {
        apikey: env("SUPABASE_ANON_KEY"),
        Authorization: `Bearer ${data.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password: data.password }),
      signal: AbortSignal.timeout(10_000),
    });
    if (response.status === 401 || response.status === 403) throw new Error("This reset link has expired. Please ask for a new one.");
    if (!response.ok) throw new Error("Could not update the password. Please try again.");
    clearSession(CUSTOMER_COOKIES);
    return { ok: true };
  });
