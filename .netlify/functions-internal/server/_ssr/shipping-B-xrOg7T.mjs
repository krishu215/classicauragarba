import { a as PHONE_DISPLAY } from "./mail.server-BoiOOyIE.mjs";
import { S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as Shell, t as PageIntro } from "./shell-dQL2qB9H.mjs";
import { t as Prose } from "./prose-CI_UvwSp.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/shipping-B-xrOg7T.js
var import_jsx_runtime = require_jsx_runtime();
function ShippingPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-3xl px-5 py-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageIntro, {
				kicker: "Indore",
				title: "Shipping and pickup",
				lede: "Home delivery and pickup are free inside Indore. We do not ship the rest of India this season."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "list-disc space-y-3 pl-5 text-mute",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Pincodes we cover start with 452. Checkout will stop a pin that does not." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "We confirm a delivery window on WhatsApp after the booking request. Morning slots go first on Garba days." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Someone should be at the address to receive the outfit. Trials need you there to try them." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Pickup is the morning after your last rental day, from the same address, unless you tell us otherwise." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
						"Same-day delivery depends on the van. Call ",
						PHONE_DISPLAY,
						" before you assume it."
					] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Prose, {
				title: "On the day of delivery",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "After your booking request, we message a delivery window on WhatsApp. Morning slots go first on Garba days, so reserve early if your night is a weekend. Please have someone at the address to receive the set, and keep the phone you booked with close by so the van can call if the lane is hard to find." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Every outfit arrives steam pressed, with the chaniya, choli and dupatta together. If you have asked for a blouse alteration, we confirm the timing on WhatsApp before the date is fixed." })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Prose, {
				title: "Pickup after your Garba",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Pickup is the morning after your last rental day, from the same address, unless you tell us a different time. Please keep the three pieces together so the set comes back complete. If you need a different pickup window, message us before delivery and we will fit it to the van route where we can." })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Prose, {
				title: "Home trial deliveries",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The free home trial follows the same rules: Indore only, pincodes beginning 452, no delivery fee and no obligation to rent. Someone needs to be home during the agreed window so you can try the outfits. Keep what you love and we take the rest back with us." })
			})
		]
	}) });
}
//#endregion
export { ShippingPage as component };
