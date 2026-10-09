import { n as DRESSES, t as COLLECTIONS } from "./mail.server-BoiOOyIE.mjs";
import { S as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as Route$6 } from "./router-C6QhpDrb.mjs";
import { n as Shell, t as PageIntro } from "./shell-dQL2qB9H.mjs";
import { t as Prose } from "./prose-CI_UvwSp.mjs";
import { t as DressCard } from "./dress-card-Cn7fQmpZ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/shop-DQVq2cCS.js
var import_jsx_runtime = require_jsx_runtime();
function ShopPage() {
	const { c, q } = Route$6.useSearch();
	const needle = (q ?? "").trim().toLowerCase();
	const list = DRESSES.filter((dress) => {
		if (c && dress.collection !== c) return false;
		if (!needle) return true;
		return `${dress.name} ${dress.colors} ${dress.work}`.toLowerCase().includes(needle);
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-6xl px-5 py-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageIntro, {
				kicker: "Women · Chaniya choli",
				title: "New arrivals",
				lede: "Rent for one night or three. Free delivery in Indore, and a free home trial if you want to decide in the room."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-8 flex flex-wrap gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterChip, {
					current: c,
					label: "All"
				}), COLLECTIONS.map((collection) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterChip, {
					current: c,
					id: collection.id,
					label: collection.name
				}, collection.id))]
			}),
			needle ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mb-6 text-sm text-mute",
				children: [
					"Showing matches for “",
					q,
					"”."
				]
			}) : null,
			list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-mute",
				children: [
					"Nothing in this edit. ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/shop",
						className: "underline",
						children: "Clear filters"
					}),
					" or",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/contact",
						className: "underline",
						children: "ask us"
					}),
					"."
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3",
				children: list.map((dress) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DressCard, { dress }, dress.slug))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Prose, {
				title: "Rent a chaniya choli in Indore for Navratri",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						"Every outfit in this edit is a full set of chaniya, choli and dupatta, rented by the day. Daily rates run from ₹",
						Math.min(...DRESSES.map((dress) => dress.price)),
						" to ₹",
						Math.max(...DRESSES.map((dress) => dress.price)),
						". A two-day booking takes 10% off the daily rate and three days take 20% off. Pick a Garba date between 8 and 22 October 2026 on the dress page and the summary shows your total before you send anything."
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						"Not sure which colour suits you? The peacock borders and the magenta buti are the pieces people ask for first, so they reach “last one” quickly on weekend nights. If you cannot decide, choose up to three looks for our ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/trial",
							className: "text-gold underline",
							children: "free home trial"
						}),
						" and we will bring them to your door in Indore. Try them on, keep what you love, and we take the rest back."
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						"Delivery and pickup are free inside Indore, pincodes beginning 452. We confirm every request on WhatsApp, you pay cash on delivery and we steam press the outfit before it leaves us. For fit questions, read the ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/size-guide",
							className: "text-gold underline",
							children: "size guide"
						}),
						" or message us your measurements."
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Sizes run from XS to XXL, and most cholis can be altered to your measurements when you book with time to spare. If a date shows “Rented”, that dress is already taken for the night, so try the same look on another date or pick a sister colour. Prices on every card are per day, with the full set included." })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Prose, {
				title: "Three collections, one rail",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-3",
					children: COLLECTIONS.map((collection) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/shop",
						search: { c: collection.id },
						className: "font-display text-2xl text-cream underline underline-offset-4",
						children: collection.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block",
						children: collection.line
					})] }, collection.id))
				})
			})
		]
	}) });
}
function FilterChip({ current, id, label }) {
	const on = current === id || !current && !id;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/shop",
		search: { c: id },
		className: "btn " + (on ? "btn-solid" : "btn-line"),
		"aria-current": on ? "page" : void 0,
		children: label
	});
}
//#endregion
export { ShopPage as component };
