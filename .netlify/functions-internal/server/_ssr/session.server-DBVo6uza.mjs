import { n as authClient } from "./booking-repository.server-DMeZHa6D.mjs";
import { a as getCookie, i as deleteCookie$1, o as setCookie$1 } from "./ssr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/session.server-DBVo6uza.js
var CUSTOMER_COOKIES = {
	access: "ca_at",
	refresh: "ca_rt"
};
var ADMIN_COOKIES = {
	access: "ca_admin",
	refresh: "ca_admin_rt"
};
var base = {
	httpOnly: true,
	secure: true,
	sameSite: "lax",
	path: "/"
};
/** Store a Supabase session in httpOnly cookies, so page scripts can never read the tokens. */
function writeSession(names, session) {
	setCookie$1(names.access, session.access_token, {
		...base,
		maxAge: session.expires_in
	});
	setCookie$1(names.refresh, session.refresh_token, {
		...base,
		maxAge: 2592e3
	});
}
function clearSession(names) {
	deleteCookie$1(names.access, { path: "/" });
	deleteCookie$1(names.refresh, { path: "/" });
}
/** The signed-in Supabase user for these cookies. Renews an expired access token with the refresh token, so people stay signed in. */
async function resolveUser(names) {
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
//#endregion
export { writeSession as a, resolveUser as i, CUSTOMER_COOKIES as n, clearSession as r, ADMIN_COOKIES as t };
