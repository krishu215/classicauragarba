import { deleteCookie, getCookie, setCookie } from "@tanstack/react-start/server";
import type { Session } from "@supabase/supabase-js";
import { authClient } from "./db.server";

export type CookieNames = { access: string; refresh: string };
export const CUSTOMER_COOKIES: CookieNames = { access: "ca_at", refresh: "ca_rt" };
export const ADMIN_COOKIES: CookieNames = { access: "ca_admin", refresh: "ca_admin_rt" };

const base = { httpOnly: true, secure: true, sameSite: "lax" as const, path: "/" };

/** Store a Supabase session in httpOnly cookies, so page scripts can never read the tokens. */
export function writeSession(names: CookieNames, session: Pick<Session, "access_token" | "refresh_token" | "expires_in">) {
  setCookie(names.access, session.access_token, { ...base, maxAge: session.expires_in });
  setCookie(names.refresh, session.refresh_token, { ...base, maxAge: 60 * 60 * 24 * 30 });
}

export function clearSession(names: CookieNames) {
  deleteCookie(names.access, { path: "/" });
  deleteCookie(names.refresh, { path: "/" });
}

/** The signed-in Supabase user for these cookies. Renews an expired access token with the refresh token, so people stay signed in. */
export async function resolveUser(names: CookieNames) {
  const access = getCookie(names.access);
  if (access) {
    const { data, error } = await authClient().auth.getUser(access);
    if (!error && data.user) return data.user;
  }
  const refresh = getCookie(names.refresh);
  if (!refresh) return null;
  const { data, error } = await authClient().auth.refreshSession({ refresh_token: refresh });
  if (error || !data.session || !data.user) {
    clearSession(names);
    return null;
  }
  writeSession(names, data.session);
  return data.user;
}
