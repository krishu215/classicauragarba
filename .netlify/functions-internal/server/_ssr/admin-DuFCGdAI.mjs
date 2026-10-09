import { p as eq } from "../_libs/drizzle-orm+postgres.mjs";
import { a as bookings, c as env, d as listBookings, i as bookingItems, n as authClient, r as bookingDatabase } from "./booking-repository.server-DMeZHa6D.mjs";
import { c as bookingMessages, h as queueMessages, y as tryDeliverEmails } from "./mail.server-BoiOOyIE.mjs";
import { t as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-A6pJPYTF.mjs";
import { a as writeSession, i as resolveUser, r as clearSession, t as ADMIN_COOKIES } from "./session.server-DBVo6uza.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-DuFCGdAI.js
function isAllowedAdmin(email) {
	if (!email) return false;
	return env("ADMIN_EMAILS").split(",").map((item) => item.trim().toLowerCase()).filter(Boolean).includes(email.toLowerCase());
}
/** Email of the signed-in admin, or null. Uses a Supabase session in httpOnly cookies, renewed automatically. */
async function currentAdmin() {
	const user = await resolveUser(ADMIN_COOKIES);
	if (!user?.email) return null;
	return isAllowedAdmin(user.email) ? user.email : null;
}
async function requireAdmin() {
	const email = await currentAdmin();
	if (!email) throw new Error("Please sign in again.");
	return email;
}
var STATUSES = [
	"pending_payment",
	"paid",
	"confirmed",
	"delivered",
	"returned",
	"cancelled",
	"requested",
	"expired"
];
var adminLogin_createServerFn_handler = createServerRpc({
	id: "7478bf5efada5f09452c45199927bd997521dc8054d8b022ec12f52be2346a8d",
	name: "adminLogin",
	filename: "src/server/admin.ts"
}, (opts) => adminLogin.__executeServer(opts));
var adminLogin = createServerFn({ method: "POST" }).inputValidator((data) => data).handler(adminLogin_createServerFn_handler, async ({ data }) => {
	const { data: result, error } = await authClient().auth.signInWithPassword({
		email: data.email.trim().toLowerCase(),
		password: data.password
	});
	if (error || !result.session || !isAllowedAdmin(result.user?.email)) throw new Error("Wrong email or password.");
	writeSession(ADMIN_COOKIES, result.session);
	return { email: result.user.email ?? "" };
});
var adminLogout_createServerFn_handler = createServerRpc({
	id: "e1372e09a8c138deb324b5a975d4017e6e81ee4bd59c61623449f241ea969bf9",
	name: "adminLogout",
	filename: "src/server/admin.ts"
}, (opts) => adminLogout.__executeServer(opts));
var adminLogout = createServerFn({ method: "POST" }).handler(adminLogout_createServerFn_handler, async () => {
	clearSession(ADMIN_COOKIES);
	return { ok: true };
});
var adminMe_createServerFn_handler = createServerRpc({
	id: "8986b1e1589dc815b2913fc178a9b037765e9a25133f2fbc08255232b3223074",
	name: "adminMe",
	filename: "src/server/admin.ts"
}, (opts) => adminMe.__executeServer(opts));
var adminMe = createServerFn({ method: "GET" }).handler(adminMe_createServerFn_handler, async () => {
	return { email: await currentAdmin() };
});
var adminListBookings_createServerFn_handler = createServerRpc({
	id: "fd5015fe93b1aa76f8e84aab4884c06d588281d3e10ac16faa7d470c4d52fba9",
	name: "adminListBookings",
	filename: "src/server/admin.ts"
}, (opts) => adminListBookings.__executeServer(opts));
var adminListBookings = createServerFn({ method: "GET" }).handler(adminListBookings_createServerFn_handler, async () => {
	await requireAdmin();
	return listBookings();
});
var adminUpdateBooking_createServerFn_handler = createServerRpc({
	id: "af20eeda90246a7178b20f828a35a38d41c95a009f980623bc1e5d7d3495d634",
	name: "adminUpdateBooking",
	filename: "src/server/admin.ts"
}, (opts) => adminUpdateBooking.__executeServer(opts));
var adminUpdateBooking = createServerFn({ method: "POST" }).inputValidator((data) => data).handler(adminUpdateBooking_createServerFn_handler, async ({ data }) => {
	await requireAdmin();
	const patch = {};
	if (data.status !== void 0) {
		if (!STATUSES.includes(data.status)) throw new Error("Invalid status.");
		patch.status = data.status;
	}
	if (data.adminNotes !== void 0) patch.admin_notes = data.adminNotes.slice(0, 2e3) || null;
	if (data.deliverySlot !== void 0) patch.delivery_slot = data.deliverySlot.trim().slice(0, 120) || null;
	const keys = await (await bookingDatabase()).transaction(async (transaction) => {
		const [before] = await transaction.select().from(bookings).where(eq(bookings.id, data.id)).for("update");
		if (!before) throw new Error("Order not found.");
		const [row] = await transaction.update(bookings).set({
			...patch,
			updated_at: (/* @__PURE__ */ new Date()).toISOString()
		}).where(eq(bookings.id, data.id)).returning();
		if ((row.status === "confirmed" || row.status === "delivered") && row.status !== before.status) {
			const items = await transaction.select().from(bookingItems).where(eq(bookingItems.booking_id, data.id));
			return queueMessages(transaction, bookingMessages({
				...row,
				booking_items: items
			}, row.status));
		}
		return [];
	});
	if (keys.length) await tryDeliverEmails(keys);
	return { ok: true };
});
//#endregion
export { adminListBookings_createServerFn_handler, adminLogin_createServerFn_handler, adminLogout_createServerFn_handler, adminMe_createServerFn_handler, adminUpdateBooking_createServerFn_handler };
