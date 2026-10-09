import { S as require_jsx_runtime, b as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { n as Shell } from "./_ssr/shell-dQL2qB9H.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_-CnQwTT__.js
var import_jsx_runtime = require_jsx_runtime();
function MissingPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-xl px-5 py-20",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "kicker",
				children: "404"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-4xl text-cream sm:text-5xl",
				children: "This page is not on the rail"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-mute",
				children: "The dress or the note you wanted is not here. The collection is."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/shop",
				className: "btn btn-solid mt-6",
				children: "New arrivals"
			})
		]
	}) });
}
//#endregion
export { MissingPage as component };
