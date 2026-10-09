import { S as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as Shell, t as PageIntro } from "./shell-CisVLkri.mjs";
import { t as Prose } from "./prose-CI_UvwSp.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/exchange-U5lNGysF.js
var import_jsx_runtime = require_jsx_runtime();
function ExchangePage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-3xl px-5 py-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageIntro, {
				kicker: "If the fit is wrong",
				title: "Exchange",
				lede: "A rental is not a sale, so “exchange” means a different size or a different dress before your Garba — not a 7-day return after the night."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "list-disc space-y-3 pl-5 text-mute",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
						"The sure path is the ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/trial",
							className: "underline",
							children: "free home trial"
						}),
						": three outfits, you keep one."
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "If a confirmed outfit is the wrong size and we still have a day before delivery, we swap it for the same dress in another size when that size is free." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Swapping to a different design is a new booking. Your original date is released if the new one is paid." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "After the event, we collect the outfit. We do not exchange a worn set for a fresh one." })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Prose, {
				title: "How to avoid needing an exchange",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
					"Most size problems can be settled before you pay. Check your bust and waist against the ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/size-guide",
						className: "text-gold underline",
						children: "size guide"
					}),
					", add your measurements to the checkout notes, or book the free home trial and try up to three outfits in your own room. Alteration of the blouse is possible when your Garba date is not the very next morning."
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Prose, {
				title: "If you need to swap",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Message us on WhatsApp with your request number and the size or design you would like instead. If the outfit has not left us yet, we swap it for the same dress in another size when that size is free for your date. If the outfit is already with you, tell us the same day so we can check what is still possible before your Garba." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Moving to a different design counts as a new booking, so it follows the usual steps: we confirm the date and release your original date once the new one is confirmed." })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Prose, {
				title: "What an exchange does not cover",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
					"A rental is for the nights you chose. Once the event is over we collect the outfit, and we do not exchange a worn set for a fresh one. Damage beyond ordinary wear is handled under the ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/terms",
						className: "text-gold underline",
						children: "rental terms"
					}),
					", and we always tell you the amount before billing it."
				] })
			})
		]
	}) });
}
//#endregion
export { ExchangePage as component };
