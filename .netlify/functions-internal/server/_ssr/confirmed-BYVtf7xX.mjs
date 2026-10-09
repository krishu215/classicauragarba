import { i as __toESM } from "../_runtime.mjs";
import { a as PHONE_DISPLAY, b as waLink, m as inr, o as PHONE_TEL, p as formatLong, u as dressBySlug } from "./mail.server-BoiOOyIE.mjs";
import { S as require_jsx_runtime, Y as require_react, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Route$14 } from "./router-C6QhpDrb.mjs";
import { i as useBooking, n as Shell, r as imgSize } from "./shell-dQL2qB9H.mjs";
import { t as getBookingStatus } from "./bookings-DEv0eNuZ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/confirmed-BYVtf7xX.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ConfirmedPage() {
	const { ref } = Route$14.useSearch();
	const clearRentals = useBooking((state) => state.clearRentals);
	const clearTrial = useBooking((state) => state.clearTrial);
	const [booking, setBooking] = (0, import_react.useState)(void 0);
	(0, import_react.useEffect)(() => {
		if (!ref) {
			setBooking(null);
			return;
		}
		let stopped = false;
		let tries = 0;
		async function check() {
			if (stopped) return;
			try {
				const result = await getBookingStatus({ data: { ref: ref ?? "" } });
				if (stopped) return;
				setBooking(result);
				if (result?.status === "pending_payment" && tries++ < 60) setTimeout(check, 4e3);
				else if (result?.status === "requested" && tries++ < 60) setTimeout(check, 1e4);
			} catch {
				if (!stopped) setBooking(null);
			}
		}
		check();
		return () => {
			stopped = true;
		};
	}, [ref]);
	const status = booking?.status;
	const kind = booking?.kind;
	(0, import_react.useEffect)(() => {
		if (kind === "trial") clearTrial();
		if (kind === "rental" && status && status !== "pending_payment" && status !== "expired") clearRentals();
	}, [
		kind,
		status,
		clearRentals,
		clearTrial
	]);
	if (booking === void 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "mx-auto min-h-[50vh] max-w-xl px-5 py-16",
		"aria-busy": "true"
	}) });
	if (!booking) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-xl px-5 py-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-4xl text-cream sm:text-5xl",
				children: "We could not find that booking"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-mute",
				children: "If you just paid, give it a minute and check your email. Or WhatsApp us and we will look it up."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 flex flex-wrap gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/shop",
					className: "btn btn-solid",
					children: "See the dresses"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					className: "btn btn-line",
					href: waLink(ref ? `Hi Classic Aura, my booking reference is ${ref}.` : void 0),
					children: "WhatsApp us"
				})]
			})
		]
	}) });
	const isTrial = booking.kind === "trial";
	const waiting = booking.status === "pending_payment";
	const expired = booking.status === "expired";
	const cancelled = booking.status === "cancelled";
	const cash = !isTrial && booking.status === "requested";
	const returned = booking.status === "returned";
	const unpaidCash = !isTrial && !booking.online && [
		"requested",
		"confirmed",
		"delivered"
	].includes(booking.status);
	const confirmedNow = booking.status === "confirmed" || booking.status === "delivered";
	const slotLine = booking.deliverySlot ? `Delivery time: ${booking.deliverySlot}.` : "We will message you on WhatsApp with the delivery time.";
	const heading = isTrial ? confirmedNow ? "Your home trial is confirmed ✓" : "Your trial request is in" : confirmedNow ? "Booking confirmed ✓" : waiting ? "Waiting for your payment" : cash ? "Booking request received" : expired ? "Payment window closed" : cancelled ? "Booking cancelled" : returned ? "Rental complete" : "Payment received ✓";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-xl px-5 py-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "kicker",
				children: ["Reference ", booking.ref]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-4xl text-cream sm:text-5xl",
				children: heading
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-lg",
				children: confirmedNow ? `${booking.firstName}, your ${isTrial ? "home trial" : "booking"} is confirmed. ${slotLine}${isTrial || booking.online ? "" : " You pay in cash when the outfit is delivered."}` : isTrial ? `${booking.firstName}, we have your request. We will message you on WhatsApp to fix the delivery time. A copy is on its way to your email.` : cash ? `${booking.firstName}, your booking request is in. We will message you on WhatsApp to confirm your date and delivery time. You pay in cash when the outfit is delivered. A copy is on its way to your email.` : waiting ? `${booking.firstName}, we have not received the payment yet. If you have just paid, this page updates by itself within a minute.` : expired || cancelled ? `${booking.firstName}, this booking is not active. You can start again or WhatsApp us for help.` : returned ? `${booking.firstName}, your outfits are back with us. Thank you for renting with Classic Aura.` : `${booking.firstName}, payment received. A confirmation is on its way to your email, and we will message you on WhatsApp to fix the delivery time.`
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-6 divide-y divide-line border-y border-line",
				children: booking.items.map((item) => {
					const dress = dressBySlug(item.dress_slug);
					if (!dress) return null;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex gap-3 py-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: dress.image,
							...imgSize(dress.image),
							loading: "lazy",
							decoding: "async",
							alt: "",
							className: "size-20 object-cover"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block font-display text-2xl leading-tight",
								children: dress.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm text-mute",
								children: isTrial ? "Free home trial" : `${item.rental_date ? formatLong(item.rental_date) : ""} · ${item.days} day${item.days === 1 ? "" : "s"} · ${inr(item.fee)}`
							})]
						})]
					}, item.dress_slug);
				})
			}),
			!isTrial ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-4 font-display text-3xl text-cream",
				children: [
					unpaidCash ? "Cash on delivery" : waiting || expired || cancelled || returned && !booking.online ? "Total" : "Paid",
					" ",
					inr(booking.total)
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-mute",
				children: "Delivery of the trial is free. Rent only what you love."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 flex flex-wrap gap-3",
				children: [
					waiting && booking.payUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						className: "btn btn-solid",
						href: booking.payUrl,
						children: "Pay now"
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/login",
						className: "btn btn-solid",
						children: "Login to see my orders"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						className: "btn btn-line",
						href: waLink(`Hi Classic Aura, my booking reference is ${booking.ref}.`),
						children: "WhatsApp us"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						className: "btn btn-line",
						href: `tel:${PHONE_TEL}`,
						children: ["Call ", PHONE_DISPLAY]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/shop",
				className: "mt-8 inline-block text-sm underline",
				children: "Keep browsing"
			})
		]
	}) });
}
//#endregion
export { ConfirmedPage as component };
