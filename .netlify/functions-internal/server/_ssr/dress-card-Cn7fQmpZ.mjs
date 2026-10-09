import { m as inr } from "./mail.server-BoiOOyIE.mjs";
import { S as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as imgSize } from "./shell-dQL2qB9H.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dress-card-Cn7fQmpZ.js
var import_jsx_runtime = require_jsx_runtime();
function DressCard({ dress, tone = "light" }) {
	const dark = tone === "dark";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("article", {
		className: "flex flex-col",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/dress/$slug",
			params: { slug: dress.slug },
			className: "group block",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "portrait relative overflow-hidden bg-sand",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: dress.image,
						...imgSize(dress.image),
						loading: "lazy",
						decoding: "async",
						alt: dress.alt,
						className: "h-full w-full object-cover transition duration-300 group-hover:scale-105"
					}), dress.badge ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "absolute top-3 left-3 px-2 py-1 text-xs tracking-label uppercase bg-ink text-cream",
						children: dress.badge
					}) : null]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mt-3 font-display text-2xl leading-tight text-cream",
					children: dress.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-sm " + (dark ? "text-mist" : "text-mute"),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("s", {
							className: "opacity-70",
							children: inr(dress.was)
						}),
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: dark ? "text-cream" : "text-gold",
							children: [inr(dress.price), " / day"]
						})
					]
				})
			]
		})
	});
}
//#endregion
export { DressCard as t };
