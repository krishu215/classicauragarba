import { a as PHONE_DISPLAY, b as waLink, i as INSTAGRAM, o as PHONE_TEL, r as EMAIL } from "./mail.server-BoiOOyIE.mjs";
import { S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as Shell, t as PageIntro } from "./shell-CisVLkri.mjs";
import { t as Prose } from "./prose-CI_UvwSp.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/contact-DK7hwJ6i.js
var import_jsx_runtime = require_jsx_runtime();
function ContactPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-3xl px-5 py-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageIntro, {
				kicker: "One number",
				title: "Talk to Classic Aura",
				lede: "Call or WhatsApp. We confirm delivery times on WhatsApp, not by email thread."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-4xl text-cream sm:text-5xl md:text-6xl",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: `tel:${PHONE_TEL}`,
					children: PHONE_DISPLAY
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 flex flex-wrap gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					className: "btn btn-solid",
					href: waLink("Hi Classic Aura, I want to rent a Garba dress."),
					children: "WhatsApp"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					className: "btn btn-line",
					href: `tel:${PHONE_TEL}`,
					children: "Call"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "mt-10 grid gap-4 text-sm sm:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "label",
						children: "Email"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						className: "underline",
						href: `mailto:${EMAIL}`,
						children: EMAIL
					}) })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "label",
						children: "Instagram"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: INSTAGRAM })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "label",
						children: "Delivery"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: "Indore only, pincodes 452xxx" })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "label",
						children: "Season"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: "8–22 October 2026" })] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Prose, {
				title: "What to send us on WhatsApp",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The quickest way to a confirmed booking is one message with everything in it: the dress name, your Garba date, one, two or three days, your size or measurements, and your Indore address with pincode. We check the calendar and confirm the date. You pay cash on delivery." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "You can also ask us about alterations, whether a colour is still free on a weekend night, or how the free home trial works. We reply on the same number whether you call or message." })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Prose, {
				title: "Navratri 2026 bookings",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "We are booking Garba dates from 8 to 22 October 2026. Popular colours, especially the peacock borders and the magenta buti, fill up first on weekend nights, so message early if your date is fixed. Rentals run for one, two or three days, and longer rentals take 10% or 20% off the daily rate." })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Prose, {
				title: "Where we deliver",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "We deliver and collect across Indore, pincodes beginning 452, with no delivery fee. If you are just outside the city, call and we will tell you honestly whether the address is possible this season." })
			})
		]
	}) });
}
//#endregion
export { ContactPage as component };
