import { a as PHONE_DISPLAY, o as PHONE_TEL } from "./mail.server-BoiOOyIE.mjs";
import { S as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as FAQS } from "./router-C6QhpDrb.mjs";
import { n as Shell, t as PageIntro } from "./shell-dQL2qB9H.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/faq-RJqW3tfc.js
var import_jsx_runtime = require_jsx_runtime();
function FaqPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-3xl px-5 py-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageIntro, {
				kicker: "Help",
				title: "Questions, answered",
				lede: "Rentals, trials, dates, damage and delivery — the things people actually ask before Navratri."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "border-t border-line",
				children: FAQS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
					className: "group border-b border-line",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("summary", {
						className: "flex cursor-pointer items-center justify-between gap-4 py-5 font-display text-2xl md:text-3xl",
						children: [item.q, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-gold transition group-open:rotate-45",
							"aria-hidden": "true",
							children: "+"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "max-w-2xl pb-5 text-mute",
						children: item.a
					})]
				}, item.q))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-10 text-mute",
				children: [
					"Still stuck? Call ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						className: "text-gold underline",
						href: `tel:${PHONE_TEL}`,
						children: PHONE_DISPLAY
					}),
					" or read the",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/terms",
						className: "underline",
						children: "rental terms"
					}),
					"."
				]
			})
		]
	}) });
}
//#endregion
export { FaqPage as component };
