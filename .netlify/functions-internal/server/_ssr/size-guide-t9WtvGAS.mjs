import { S as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as Shell, t as PageIntro } from "./shell-dQL2qB9H.mjs";
import { t as Prose } from "./prose-CI_UvwSp.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/size-guide-t9WtvGAS.js
var import_jsx_runtime = require_jsx_runtime();
var ROWS = [
	[
		"XS",
		"32",
		"32 in",
		"26 in"
	],
	[
		"S",
		"34",
		"34 in",
		"28 in"
	],
	[
		"M",
		"36",
		"36 in",
		"30 in"
	],
	[
		"L",
		"38",
		"38 in",
		"32 in"
	],
	[
		"XL",
		"40",
		"40 in",
		"34 in"
	],
	[
		"XXL",
		"42",
		"42 in",
		"36 in"
	]
];
function SizePage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-3xl px-5 py-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageIntro, {
				kicker: "Fit",
				title: "Size guide",
				lede: "Choli sizes are a starting point. Most waists on the chaniya draw in. If you are between two sizes, book the free home trial."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-x-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full border-collapse text-left text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-line text-xs tracking-label uppercase text-mute",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-3 font-medium",
								children: "Size"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-3 font-medium",
								children: "Bust label"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-3 font-medium",
								children: "Bust"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-3 font-medium",
								children: "Waist"
							})
						]
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: ROWS.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
						className: "border-b border-line",
						children: row.map((cell) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "py-3",
							children: cell
						}, cell))
					}, row[0])) })]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "mt-6 list-disc space-y-2 pl-5 text-mute",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Chaniya length on these sets is about 40–42 inches. Tell us if you need it shorter." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Blouse sleeves on the peacock sets are elbow length. The buti and stripe cholis are shorter." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Alteration is possible when the Garba date is not the next morning. Say so in the checkout notes." })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/trial",
				className: "btn btn-solid mt-8",
				children: "Book a fitting trial"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Prose, {
				title: "How to measure at home",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Use a soft tape and wear thin clothing. For the bust, measure around the fullest part of the chest with the tape level at the back. For the waist, measure around the narrowest part of your torso, usually just above the navel. For chaniya length, stand barefoot and measure from your waist to the floor." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Write the numbers in inches and compare them with the table above. The choli is the fitted piece, so choose its size by your bust. The chaniya waist draws in, so it is more forgiving." })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Prose, {
				title: "Between two sizes",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "If your numbers sit between two rows, the free home trial is the surest way to decide. We bring the outfit to your door in Indore, you try it with the dupatta and the right footwear, and we take back whatever you do not want. If you book with time to spare, the blouse can also be altered to you." })
			})
		]
	}) });
}
//#endregion
export { SizePage as component };
