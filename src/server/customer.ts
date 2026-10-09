import { createServerFn } from "@tanstack/react-start";
import { deleteCookie, getCookie } from "@tanstack/react-start/server";
import { authClient, db } from "./db.server";
import { siteUrl } from "./env.server";
import { sendExistingAccountEmail, sendResetEmail, sendVerifyEmail } from "./mail.server";
import { ORDER_FIELDS, shapeOrder } from "./orders.server";
import { clearSession, CUSTOMER_COOKIES, RESET_COOKIE, resolveUser, writeSession } from "./session.server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const cleanEmail = (value: string) => value.trim().toLowerCase();

type LinkProps = { hashed_token?: string; verification_type?: string } | undefined;

/** Our own confirmation link, handled by /auth/confirm, so it never depends on Supabase redirect settings. */
function confirmLink(props: LinkProps) {
  if (!props?.hashed_token || !props.verification_type) return null;
  return `${siteUrl()}/auth/confirm?token_hash=${encodeURIComponent(props.hashed_token)}&type=${encodeURIComponent(props.verification_type)}`;
}

async function findUserByEmail(email: string) {
  for (let page = 1; page <= 10; page++) {
    const { data, error } = await db().auth.admin.listUsers({ page, perPage: 1000 });
    if (error) return null;
    const found = data.users.find((user) => user.email?.toLowerCase() === email);
    if (found) return found;
    if (data.users.length < 1000) return null;
  }
  return null;
}

function checkCredentials(email: string, password: string) {
  if (!EMAIL_RE.test(email)) throw new Error("Enter a valid email address.");
  if (password.length < 8) throw new Error("Password must be at least 8 characters.");
}

/** Create an account. We email our own branded verification link (via Resend); the account cannot sign in until it is clicked. */
export const customerSignUp = createServerFn({ method: "POST" })
  .inputValidator((data: { name: string; email: string; password: string }) => data)
  .handler(async ({ data }) => {
    const email = cleanEmail(data.email);
    const name = data.name.trim().slice(0, 80);
    if (!name) throw new Error("Enter your name.");
    checkCredentials(email, data.password);
    const { data: made, error } = await db().auth.admin.generateLink({
      type: "signup",
      email,
      password: data.password,
      options: { data: { name } },
    });
    if (error) {
      console.error("[signup]", error.code, error.message);
      if (error.code === "email_exists" || /already.*registered/i.test(error.message)) {
        // Same answer as a new signup, so nobody can probe which emails have accounts.
        await sendExistingAccountEmail(email).catch((cause) => console.error("[signup-mail]", cause));
        return { ok: true };
      }
      if (error.code === "weak_password") throw new Error("That password is too easy to guess. Try a longer one.");
      throw new Error("We could not create the account. Please try again.");
    }
    const link = confirmLink(made.properties);
    if (!link) throw new Error("We could not create the account. Please try again.");
    try {
      await sendVerifyEmail({ to: email, name, link });
    } catch (cause) {
      console.error("[signup-mail]", cause);
      throw new Error("Your account is created, but we could not send the verification email. Tap Resend verification email to try again.");
    }
    return { ok: true };
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
    writeSession(CUSTOMER_COOKIES, result.session);
    return { email: result.user.email ?? "", name: String(result.user.user_metadata?.name ?? "") };
  });

export const customerSignOut = createServerFn({ method: "POST" }).handler(async () => {
  clearSession(CUSTOMER_COOKIES);
  return { ok: true };
});

export const customerMe = createServerFn({ method: "GET" }).handler(async () => {
  const user = await resolveUser(CUSTOMER_COOKIES);
  if (!user?.email) return null;
  return { email: user.email, name: String(user.user_metadata?.name ?? "") };
});

/** Every order placed with the signed-in (and verified) email address, newest first. */
export const customerOrders = createServerFn({ method: "GET" }).handler(async () => {
  const user = await resolveUser(CUSTOMER_COOKIES);
  if (!user?.email) throw new Error("Please sign in again.");
  const { data, error } = await db()
    .from("bookings")
    .select(ORDER_FIELDS)
    .eq("email", user.email.toLowerCase())
    .order("created_at", { ascending: false })
    .limit(30);
  if (error) throw new Error("Could not load your orders.");
  return (data ?? []).map((row) => shapeOrder(row));
});

export const customerResend = createServerFn({ method: "POST" })
  .inputValidator((data: { email: string }) => data)
  .handler(async ({ data }) => {
    const email = cleanEmail(data.email);
    if (!EMAIL_RE.test(email)) return { ok: true };
    const user = await findUserByEmail(email);
    if (user && !user.email_confirmed_at) {
      const { data: made, error } = await db().auth.admin.generateLink({ type: "magiclink", email });
      const link = error ? null : confirmLink(made.properties);
      if (!link) {
        console.error("[resend]", error?.message);
        throw new Error("We could not send the email. Please try again in a minute.");
      }
      try {
        await sendVerifyEmail({ to: email, name: String(user.user_metadata?.name ?? ""), link });
      } catch (cause) {
        console.error("[resend-mail]", cause);
        throw new Error("We could not send the email. Please try again in a minute.");
      }
    }
    // Same answer for unknown or already verified emails.
    return { ok: true };
  });

export const customerForgot = createServerFn({ method: "POST" })
  .inputValidator((data: { email: string }) => data)
  .handler(async ({ data }) => {
    const email = cleanEmail(data.email);
    if (!EMAIL_RE.test(email)) return { ok: true };
    const { data: made, error } = await db().auth.admin.generateLink({ type: "recovery", email });
    const link = error ? null : confirmLink(made.properties);
    if (link) {
      await sendResetEmail({ to: email, name: String(made.user?.user_metadata?.name ?? ""), link }).catch((cause) =>
        console.error("[forgot-mail]", cause),
      );
    }
    return { ok: true };
  });

/** Set a new password. The one-time reset session lives in an httpOnly cookie set by /auth/confirm. */
export const customerUpdatePassword = createServerFn({ method: "POST" })
  .inputValidator((data: { password: string }) => data)
  .handler(async ({ data }) => {
    if (data.password.length < 8) throw new Error("Password must be at least 8 characters.");
    const token = getCookie(RESET_COOKIE);
    if (!token) throw new Error("This reset link has expired. Please ask for a new one.");
    const { data: found, error } = await authClient().auth.getUser(token);
    if (error || !found.user) throw new Error("This reset link has expired. Please ask for a new one.");
    const { error: updateError } = await db().auth.admin.updateUserById(found.user.id, { password: data.password });
    if (updateError) throw new Error("Could not update the password. Please try again.");
    deleteCookie(RESET_COOKIE, { path: "/" });
    return { ok: true };
  });
