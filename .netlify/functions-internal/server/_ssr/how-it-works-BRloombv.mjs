import { S as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as STEPS } from "./router-C6QhpDrb.mjs";
import { n as Shell, t as PageIntro } from "./shell-dQL2qB9H.mjs";
import { t as Prose } from "./prose-CI_UvwSp.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/how-it-works-BRloombv.js
var import_jsx_runtime = require_jsx_runtime();
function HowItWorksPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-5xl px-5 py-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageIntro, {
				kicker: "Rent in three steps",
				title: "How a rental works",
				lede: "Choose, try if you like, then check out. We deliver and collect inside Indore."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "grid gap-6 md:grid-cols-3",
				children: STEPS.map((step, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex flex-col border border-line bg-paper p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs tracking-label text-gold uppercase",
							children: ["Step ", index + 1]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-2 font-display text-3xl text-cream",
							children: step.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-mist",
							children: step.line
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-4 list-disc space-y-2 pl-5 text-sm text-mute",
							children: step.points.map((point) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: point }, point))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: step.to,
							className: "btn btn-line mt-auto self-start",
							children: step.cta
						})
					]
				}, step.title))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-10 text-mute",
				children: [
					"More questions? Read the ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/faq",
						className: "text-gold underline",
						children: "questions and answers"
					}),
					",",
					" ",
					"the ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/size-guide",
						className: "underline",
						children: "size guide"
					}),
					" or the",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/terms",
						className: "underline",
						children: "rental terms"
					}),
					"."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Prose, {
				title: "Good to know before you book",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Reserve early if your Garba falls on a weekend. Popular colours reach “last one” first, and a date marked rented is already taken for that dress. If your date is full, message us and we will suggest a sister colour that is still free." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The rental fee is the amount due. There is no separate delivery charge inside Indore and no online deposit. You pay the rental fee in cash when we deliver the outfit, after we confirm availability on WhatsApp." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						"You can move your date at no charge until 48 hours before delivery if the new night is open. Damage beyond ordinary wear is billed at repair cost after we tell you the amount. The full wording is in the ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/terms",
							className: "text-gold underline",
							children: "rental terms"
						}),
						"."
					] })
				]
			})
		]
	}) });
}
//#endregion
export { HowItWorksPage as component };
