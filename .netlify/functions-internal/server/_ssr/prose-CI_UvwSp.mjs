import { S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/prose-CI_UvwSp.js
var import_jsx_runtime = require_jsx_runtime();
/** A titled block of explanatory copy used under the main content of a page. */
function Prose({ title, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mt-14 max-w-3xl space-y-4 text-mute",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-3xl text-cream md:text-4xl",
			children: title
		}), children]
	});
}
//#endregion
export { Prose as t };
