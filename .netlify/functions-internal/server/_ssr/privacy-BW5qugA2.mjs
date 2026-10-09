import { a as PHONE_DISPLAY } from "./mail.server-BoiOOyIE.mjs";
import { S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as Shell, t as PageIntro } from "./shell-dQL2qB9H.mjs";
import { t as Prose } from "./prose-CI_UvwSp.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/privacy-BW5qugA2.js
var import_jsx_runtime = require_jsx_runtime();
function PrivacyPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-3xl px-5 py-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageIntro, {
				kicker: "Privacy",
				title: "What we do with your details",
				lede: "We use your name, mobile, email and address to deliver a rental or a home trial, and to confirm your booking. We do not sell the list."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4 text-mute",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "“Save my details” keeps them in this browser only, so the next checkout on this phone can refill. It is not an account, and clearing the browser removes it." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Rentals are paid in cash on delivery, so no card or UPI details are collected on this website." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						"To ask what we still have from a booking, WhatsApp ",
						PHONE_DISPLAY,
						" from the same mobile you used."
					] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Prose, {
				title: "What the forms ask for",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The checkout and home trial forms ask for your name, mobile number, an optional WhatsApp number, email, full address, area, pincode and city. You can also add a preferred delivery time and notes. We use these only to deliver, collect and confirm your booking." })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Prose, {
				title: "How your request reaches us",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "This website has no booking database. When you confirm, it prepares a message and you send it to us on WhatsApp. That message is the request we receive, so please check it before you send it. Nothing is charged on this site." })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Prose, {
				title: "What stays on your device",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Your selected outfits, the details you chose to save and your light or dark theme setting are kept in your own browser so the site can remember them next time. You can remove them at any time by clearing the site data in your browser settings." })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Prose, {
				title: "Fonts and third parties",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The page text is set in fonts loaded from Google Fonts, so your browser contacts Google to fetch them. We do not pass your details to anyone else for marketing." })
			})
		]
	}) });
}
//#endregion
export { PrivacyPage as component };
