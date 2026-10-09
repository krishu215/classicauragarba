import { Link } from "@tanstack/react-router";
import { useCallback, useEffect, useState, type FormEvent } from "react";
import { OrderCard, type Order } from "@/components/orders-page";
import { Shell } from "@/components/shell";
import { PHONE_DISPLAY, PHONE_TEL, waLink } from "@/lib/site";
import {
  customerForgot,
  customerResend,
  customerSignIn,
  customerSignOut,
  customerSignUp,
  customerUpdatePassword,
  handleAuthCallback,
  hydrateCustomerSession,
} from "@/lib/customer-auth";
import { customerMe, customerOrders } from "@/server/customer";

type Mode = "signin" | "signup" | "forgot" | "reset";
type Me = { email: string; name: string };

const TITLE: Record<Mode, string> = {
  signin: "Sign in",
  signup: "Create your account",
  forgot: "Reset your password",
  reset: "Choose a new password",
};

export function AccountPage() {
  const [me, setMe] = useState<Me | null | undefined>(undefined);
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [mode, setMode] = useState<Mode>("signin");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [resetToken, setResetToken] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [needsVerify, setNeedsVerify] = useState(false);

  useEffect(() => {
    async function initialize() {
      const hash = new URLSearchParams(window.location.hash.replace(/^#/, ""));
      try {
        if (hash.get("access_token") && hash.get("type") === "recovery") {
          setResetToken(hash.get("access_token") ?? "");
          setMode("reset");
          setMe(null);
          return;
        }
        const callback = await handleAuthCallback();
        if (callback?.type === "recovery") {
          setMode("reset");
          setMe(null);
          return;
        }
        if (callback?.type === "confirmation") {
          await customerSignOut();
          setNotice("Your email is verified. You can now sign in.");
        } else if (hash.get("type") === "signup" || hash.get("type") === "email") {
          setNotice("Your email is verified. Please sign in.");
        } else if (hash.get("error_code") || hash.get("error")) {
          setError("That link is invalid or expired. Enter your email and password to resend verification, or request a new password reset.");
        }
        await hydrateCustomerSession();
        setMe(await customerMe());
      } catch {
        setMe(null);
        if (window.location.hash) {
          setNeedsVerify(true);
          setError("That link could not be verified. It may be invalid or expired. Resend verification or request a new password reset.");
        } else {
          setError("We could not check your account right now. Please try signing in again.");
        }
      } finally {
        if (window.location.hash) history.replaceState(null, "", window.location.pathname + window.location.search);
      }
    }
    void initialize();
  }, []);

  const loadOrders = useCallback(async () => {
    try {
      setOrders(await customerOrders());
    } catch {
      setMe(null);
    }
  }, []);

  useEffect(() => {
    if (!me) {
      setOrders(null);
      return;
    }
    void loadOrders();
    const timer = setInterval(() => void loadOrders(), 15000);
    return () => clearInterval(timer);
  }, [me, loadOrders]);

  function go(next: Mode) {
    setMode(next);
    setError("");
    setNotice("");
    setNeedsVerify(false);
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError("");
    setNotice("");
    try {
      if (mode === "signin") {
        setMe(await customerSignIn({ data: { email: form.email, password: form.password } }));
        setForm({ ...form, password: "" });
      } else if (mode === "signup") {
        await customerSignUp({ data: form });
        setMode("signin");
        setForm({ ...form, password: "" });
        setNeedsVerify(true);
        setNotice(`Check ${form.email.trim()} for your verification link. Click it before signing in. If you already have an account, sign in or reset your password.`);
      } else if (mode === "forgot") {
        await customerForgot({ data: { email: form.email } });
        setNotice("If that email has an account, a reset link is on its way. Check your inbox and spam folder.");
      } else {
        await customerUpdatePassword({ data: { accessToken: resetToken, password: form.password } });
        setResetToken("");
        setForm({ ...form, password: "" });
        setMode("signin");
        setNotice("Password updated. Please sign in with your new password.");
      }
    } catch (cause) {
      const message = cause instanceof Error ? cause.message : "Something went wrong. Please try again.";
      setError(message);
      if (/verify your email/i.test(message)) setNeedsVerify(true);
    } finally {
      setBusy(false);
    }
  }

  async function resend() {
    setBusy(true);
    setError("");
    setNotice("");
    try {
      await customerResend({ data: form });
      setForm({ ...form, password: "" });
      setNotice("Verification email sent again. Check your inbox and spam folder.");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not send verification. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  async function signOut() {
    await customerSignOut().catch(() => undefined);
    setMe(null);
    setOrders(null);
    setForm({ name: "", email: "", password: "" });
    go("signin");
  }

  if (me === undefined) {
    return (
      <Shell>
        <main className="mx-auto min-h-[50vh] max-w-xl px-5 py-16" aria-busy="true" />
      </Shell>
    );
  }

  if (me) {
    const first = me.name.split(" ")[0] || orders?.[0]?.firstName || me.email.split("@")[0];
    return (
      <Shell>
        <main className="mx-auto max-w-xl px-5 py-12">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="kicker">My orders</p>
              <h1 className="mt-2 font-display text-4xl text-cream sm:text-5xl">Hi {first}</h1>
              <p className="mt-1 text-sm text-mute">{me.email}</p>
            </div>
            <button className="btn btn-line min-h-9 px-3 py-1" onClick={() => void signOut()}>Logout</button>
          </div>

          {orders === null ? <p className="mt-8 text-mute">Loading your orders…</p> : null}
          {orders && orders.length === 0 ? (
            <div className="mt-8 border border-line bg-paper p-5">
              <p className="font-display text-2xl text-cream">No orders yet</p>
              <p className="mt-2 text-mute">Orders show up here when they are booked with {me.email}. Booked with another email? Create the account with that email.</p>
            </div>
          ) : null}
          {orders && orders.length > 0 ? (
            <>
              <p className="mt-1 text-sm text-mute">{orders.length} order{orders.length === 1 ? "" : "s"}, newest first. This page updates by itself.</p>
              <ul className="mt-8 grid gap-8">
                {orders.map((order) => (
                  <OrderCard key={order.ref} order={order} />
                ))}
              </ul>
            </>
          ) : null}

          <div className="mt-10 flex flex-wrap gap-3">
            <a className="btn btn-solid" href={waLink("Hi Classic Aura, I need help with my order.")}>WhatsApp us</a>
            <a className="btn btn-line" href={`tel:${PHONE_TEL}`}>Call {PHONE_DISPLAY}</a>
          </div>
          <Link to="/shop" className="mt-8 inline-block text-sm underline">Book another outfit</Link>
        </main>
      </Shell>
    );
  }

  return (
    <Shell>
      <main className="mx-auto max-w-md px-5 py-16">
        <p className="kicker">Customer account</p>
        <h1 className="mt-2 font-display text-4xl text-cream sm:text-5xl">{TITLE[mode]}</h1>
        {mode === "signin" || mode === "signup" ? (
          <div className="mt-6 grid grid-cols-2 gap-2">
            <button type="button" className={"btn min-h-10 " + (mode === "signin" ? "btn-solid" : "btn-line")} aria-pressed={mode === "signin"} onClick={() => go("signin")}>Sign in</button>
            <button type="button" className={"btn min-h-10 " + (mode === "signup" ? "btn-solid" : "btn-line")} aria-pressed={mode === "signup"} onClick={() => go("signup")}>Create account</button>
          </div>
        ) : null}
        {mode === "forgot" ? <p className="mt-3 text-mute">Enter your email and we will send you a link to choose a new password.</p> : null}
        {mode === "signup" ? <p className="mt-3 text-mute">We email you a link to verify your address. Login stays locked until you confirm it. Use the email you book with, and your orders will appear here.</p> : null}

        <form onSubmit={submit} className="mt-6 grid gap-5">
          {mode === "signup" ? (
            <div>
              <label className="label" htmlFor="ac-name">Your name</label>
              <input id="ac-name" className="field" autoComplete="name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
          ) : null}
          {mode !== "reset" ? (
            <div>
              <label className="label" htmlFor="ac-email">Email</label>
              <input id="ac-email" type="email" className="field" autoComplete="email" inputMode="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </div>
          ) : null}
          {mode !== "forgot" ? (
            <div>
              <label className="label" htmlFor="ac-pass">{mode === "reset" ? "New password" : "Password"}</label>
              <input
                id="ac-pass"
                type="password"
                className="field"
                autoComplete={mode === "signin" ? "current-password" : "new-password"}
                minLength={mode === "signin" ? undefined : 8}
                required
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
              {mode !== "signin" ? <p className="mt-1 text-xs text-mute">At least 8 characters.</p> : null}
            </div>
          ) : null}
          {notice ? <p className="text-ok" role="status">{notice}</p> : null}
          {error ? <p className="field-error" role="alert">{error}</p> : null}
          <button className="btn btn-solid" type="submit" disabled={busy}>
            {busy ? "Please wait…" : mode === "signin" ? "Sign in" : mode === "signup" ? "Create account" : mode === "forgot" ? "Send reset link" : "Save new password"}
          </button>
          {needsVerify && form.email ? (
            <button type="button" className="btn btn-line" onClick={() => void resend()} disabled={busy}>Resend verification email</button>
          ) : null}
        </form>

        <div className="mt-6 grid gap-2 text-sm text-mute">
          {mode === "signin" ? <button type="button" className="text-left text-gold underline" onClick={() => go("forgot")}>Forgot your password?</button> : null}
          {mode === "forgot" || mode === "reset" ? <button type="button" className="text-left text-gold underline" onClick={() => go("signin")}>Back to sign in</button> : null}
        </div>
      </main>
    </Shell>
  );
}
