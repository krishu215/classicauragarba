import { a as PHONE_DISPLAY } from "./mail.server-BoiOOyIE.mjs";
import { S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as Shell, t as PageIntro } from "./shell-CisVLkri.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/terms-BKF6W9mX.js
var import_jsx_runtime = require_jsx_runtime();
var POINTS = [
	"A booking request on this site is not a charge. The outfit is yours once we confirm availability on WhatsApp, and you pay the rental fee in cash when it is delivered.",
	"Rental period is the number of days you chose, starting on your Garba date. Pickup is the morning after the last day unless we agree otherwise.",
	"Two-day rentals are 10% off the daily rate. Three-day rentals are 20% off. Delivery and pickup inside Indore are free.",
	"You may move the date at no charge until 48 hours before delivery, if the new date is open. Inside 48 hours, a move depends on another booking taking the original night.",
	"Cancellations inside 48 hours of delivery are not refunded once the piece has been held off the calendar.",
	"The set is chaniya, choli and dupatta. Jewellery shown in photographs is the model’s own unless we say a piece is included.",
	"Ordinary creasing from dancing is expected. Tears, burns, missing mirrors you pulled off, or stains we cannot lift are charged at repair cost, and we message you the amount before taking it.",
	"We deliver only in Indore, pincodes beginning 452. A wrong address that sends the van outside the city can be refused.",
	"Home trials are free, up to three outfits, with no obligation to rent. Please be home at the agreed window.",
	`Questions about these terms: ${PHONE_DISPLAY}.`
];
function TermsPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-3xl px-5 py-12",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageIntro, {
			kicker: "Legal",
			title: "Rental terms",
			lede: "Plain language for Navratri 2026. If a line here and a WhatsApp message disagree, ask us to confirm in writing."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
			className: "list-decimal space-y-4 pl-5 text-mute",
			children: POINTS.map((point) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: point }, point))
		})]
	}) });
}
//#endregion
export { TermsPage as component };
