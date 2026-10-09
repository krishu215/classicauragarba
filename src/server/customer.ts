import { createServerFn } from "@tanstack/react-start";
import { getIdentityConfig } from "@netlify/identity";
import { getCookie } from "@tanstack/react-start/server";
import { authClient, legacyDb } from "./db.server";
import { isLegacyAccount, listBookings } from "./booking-repository.server";
import { siteUrl } from "./env.server";
import { shapeOrder } from "./orders.server";
import { clearSession, CUSTOMER_COOKIES, resolveUser, writeSession } from "./session.server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const cleanEmail = (value: string) => value.trim().toLowerCase();

async function verifiedCustomer() {
  const token = getCookie("nf_jwt");
  if (token) {
    const url = getIdentityConfig()?.url ?? `${siteUrl()}/.netlify/identity`;
    try {
      const response = await fetch(`${url}/user`, { headers: { Authorization: `Bearer ${token}` }, signal: AbortSignal.timeout(10_000) });
      if (response.ok) {
        const user = await response.json() as { id?: string; email?: string; confirmed_at?: string; user_metadata?: { full_name?: string; name?: string } };
        if (user.id && user.email && user.confirmed_at) return { email: user.email, name: user.user_metadata?.full_name ?? user.user_metadata?.name ?? "" };
      }
    } catch {
      throw new Error("Account verification is temporarily unavailable. Please try again.");
    }
  }
  const user = await resolveUser(CUSTOMER_COOKIES);
  if (!user?.email || !user.email_confirmed_at || !await isLegacyAccount(user.id)) return null;
  return { email: user.email, name: String(user.user_metadata?.name ?? "") };
}

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
    if (!await isLegacyAccount(result.user.id)) throw new Error("Please create your account on this website and verify your email.");
    writeSession(CUSTOMER_COOKIES, result.session);
    return { email: result.user.email ?? "", name: String(result.user.user_metadata?.name ?? "") };
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
      const { error } = await authClient().auth.resend({ type: "signup", email, options: { emailRedirectTo: `${siteUrl()}/login` } });
      if (error) console.error("[resend] Verification email could not be sent.");
    }
    return { ok: true };
  });

export const customerForgot = createServerFn({ method: "POST" })
  .inputValidator((data: { email: string }) => data)
  .handler(async ({ data }) => {
    const email = cleanEmail(data.email);
    if (EMAIL_RE.test(email)) {
      const { error } = await authClient().auth.resetPasswordForEmail(email, { redirectTo: `${siteUrl()}/login` });
      if (error) console.error("[forgot] Password recovery email could not be sent.");
    }
    return { ok: true };
  });

/** Set a new password using the one-time token from the reset email. */
export const customerUpdatePassword = createServerFn({ method: "POST" })
  .inputValidator((data: { accessToken: string; password: string }) => data)
  .handler(async ({ data }) => {
    if (data.password.length < 8) throw new Error("Password must be at least 8 characters.");
    const { data: found, error } = await authClient().auth.getUser(data.accessToken);
    if (error || !found.user) throw new Error("This reset link has expired. Please ask for a new one.");
    const { error: updateError } = await legacyDb().auth.admin.updateUserById(found.user.id, { password: data.password });
    if (updateError) throw new Error("Could not update the password. Please try again.");
    return { ok: true };
  });
