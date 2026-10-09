import {
  getSettings,
  getUser,
  handleAuthCallback,
  login,
  logout,
  requestPasswordRecovery,
  signup,
  updateUser,
} from "@netlify/identity";
import {
  customerForgot as legacyForgot,
  customerSignIn as legacySignIn,
  customerSignOut as legacySignOut,
  customerUpdatePassword as legacyUpdatePassword,
} from "../server/customer";

const emailAddress = (email: string) => email.trim().toLowerCase();

async function requireEmailConfirmation() {
  const settings = await getSettings();
  if (settings.autoconfirm)
    throw new Error(
      "Account registration is temporarily unavailable. Email confirmation must be enabled by the team.",
    );
}

export async function customerSignUp({
  data,
}: {
  data: { name: string; email: string; password: string };
}) {
  const email = emailAddress(data.email);
  const name = data.name.trim().slice(0, 80);
  if (!name) throw new Error("Enter your name.");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email))
    throw new Error("Enter a valid email address.");
  if (data.password.length < 8)
    throw new Error("Password must be at least 8 characters.");
  await requireEmailConfirmation();
  try {
    const user = await signup(email, data.password, { full_name: name });
    if (user.confirmedAt) {
      await logout();
      throw new Error(
        "Please sign in to your existing account, or use Forgot your password.",
      );
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "";
    if (/already.*registered|already.*exists/i.test(message))
      throw new Error(
        "This email already has an account. Please sign in, or use Forgot your password.",
      );
    if (/rate|too many|frequency/i.test(message))
      throw new Error(
        "Too many attempts. Please wait a few minutes and try again.",
      );
    throw new Error(
      "We could not create the account or send verification. Please try again.",
    );
  }
}

export async function customerSignIn({
  data,
}: {
  data: { email: string; password: string };
}) {
  try {
    const user = await login(emailAddress(data.email), data.password);
    if (!user.confirmedAt || !user.email) {
      await logout();
      throw new Error(
        "Please verify your email first. Check your inbox and spam folder.",
      );
    }
    await legacySignOut().catch(() => undefined);
    return { email: user.email, name: user.name ?? "" };
  } catch (identityError) {
    try {
      return await legacySignIn({
        data: { email: emailAddress(data.email), password: data.password },
      });
    } catch (legacyError) {
      const message =
        identityError instanceof Error ? identityError.message : "";
      if (/not confirmed|verify your email|email.*confirm/i.test(message))
        throw new Error(
          "Please verify your email first. Check your inbox and spam folder.",
        );
      throw legacyError;
    }
  }
}

export async function customerSignOut() {
  await Promise.allSettled([logout(), legacySignOut()]);
}

export async function customerForgot({ data }: { data: { email: string } }) {
  const email = emailAddress(data.email);
  const results = await Promise.allSettled([
    requestPasswordRecovery(email),
    legacyForgot({ data: { email } }),
  ]);
  if (results.every((result) => result.status === "rejected"))
    throw new Error(
      "Password recovery is temporarily unavailable. Please try again.",
    );
}

export async function customerResend({
  data,
}: {
  data: { email: string; password: string; name: string };
}) {
  if (data.password.length < 8)
    throw new Error(
      "Enter your account password above, then resend the verification email.",
    );
  await requireEmailConfirmation();
  try {
    await signup(
      emailAddress(data.email),
      data.password,
      data.name ? { full_name: data.name.trim().slice(0, 80) } : undefined,
    );
  } catch {
    throw new Error(
      "Could not resend verification. Enter your account email and password, then try again.",
    );
  }
}

export async function customerUpdatePassword({
  data,
}: {
  data: { accessToken: string; password: string };
}) {
  if (data.password.length < 8)
    throw new Error("Password must be at least 8 characters.");
  if (data.accessToken) return legacyUpdatePassword({ data });
  await updateUser({ password: data.password });
  await customerSignOut();
}

export { handleAuthCallback };

export async function hydrateCustomerSession() {
  await getUser();
}
