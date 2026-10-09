import { d as listBookings } from "./booking-repository.server-DMeZHa6D.mjs";
import { a as createTrial, i as createRental, n as REF_PATTERN, r as UserError } from "./booking-service.server-IuXe47pv.mjs";
import { t as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-A6pJPYTF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/bookings-DjZI61JO.js
function friendly(error) {
	if (error instanceof UserError) throw error;
	console.error("[booking]", error);
	throw new Error("Something went wrong on our side. Please try again, or WhatsApp us.");
}
var submitRental_createServerFn_handler = createServerRpc({
	id: "1f46ca21f83cbc64112f5856bddf3c9d29d6b307752ce11997cfa669c648a9fe",
	name: "submitRental",
	filename: "src/server/bookings.ts"
}, (opts) => submitRental.__executeServer(opts));
var submitRental = createServerFn({ method: "POST" }).inputValidator((data) => data).handler(submitRental_createServerFn_handler, async ({ data }) => {
	try {
		return await createRental(data.customer, data.lines);
	} catch (error) {
		friendly(error);
	}
});
var submitTrial_createServerFn_handler = createServerRpc({
	id: "dcd4474a555b00fd25fd958b49ea60fc4d03079b499678feb92f8625f1bc23ce",
	name: "submitTrial",
	filename: "src/server/bookings.ts"
}, (opts) => submitTrial.__executeServer(opts));
var submitTrial = createServerFn({ method: "POST" }).inputValidator((data) => data).handler(submitTrial_createServerFn_handler, async ({ data }) => {
	try {
		return await createTrial(data.customer, data.slugs);
	} catch (error) {
		friendly(error);
	}
});
var getBookingStatus_createServerFn_handler = createServerRpc({
	id: "a0e24713ff7fbd8ca2656fe8a574edb21d9b0e865e438158c114b77a475feb08",
	name: "getBookingStatus",
	filename: "src/server/bookings.ts"
}, (opts) => getBookingStatus.__executeServer(opts));
var getBookingStatus = createServerFn({ method: "GET" }).inputValidator((data) => data).handler(getBookingStatus_createServerFn_handler, async ({ data }) => {
	if (!REF_PATTERN.test(data.ref)) return null;
	const [row] = await listBookings({
		ref: data.ref,
		limit: 1
	});
	if (!row) return null;
	return {
		ref: row.ref,
		kind: row.kind,
		status: row.status,
		total: row.total,
		firstName: row.name.split(" ")[0],
		payUrl: row.status === "pending_payment" ? row.razorpay_link_url : null,
		online: Boolean(row.razorpay_link_url),
		deliverySlot: row.delivery_slot ?? null,
		items: row.booking_items ?? []
	};
});
//#endregion
export { getBookingStatus_createServerFn_handler, submitRental_createServerFn_handler, submitTrial_createServerFn_handler };
