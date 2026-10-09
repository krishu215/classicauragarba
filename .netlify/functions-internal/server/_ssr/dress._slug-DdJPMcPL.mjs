import { i as __toESM } from "../_runtime.mjs";
import { _ as relatedDresses, b as waLink, f as firstOpenDate, g as quote, l as dayStatus, m as inr, p as formatLong, s as SEASON, u as dressBySlug, v as todayIso } from "./mail.server-BoiOOyIE.mjs";
import { S as require_jsx_runtime, Y as require_react, b as Link, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as Route } from "./router-C6QhpDrb.mjs";
import { i as useBooking, n as Shell, r as imgSize } from "./shell-dQL2qB9H.mjs";
import { t as Prose } from "./prose-CI_UvwSp.mjs";
import { t as DressCard } from "./dress-card-Cn7fQmpZ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dress._slug-DdJPMcPL.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function DressPage() {
	const { slug } = Route.useParams();
	const dress = dressBySlug(slug);
	if (!dress) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-3xl px-5 py-20",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-4xl text-cream sm:text-5xl",
			children: "That dress is not on the rail"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/shop",
			className: "btn btn-solid mt-6",
			children: "Back to new arrivals"
		})]
	}) });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DressDetail, { slug: dress.slug }, dress.slug);
}
function DressDetail({ slug }) {
	const dress = dressBySlug(slug);
	const navigate = useNavigate();
	const today = todayIso();
	const trial = useBooking((state) => state.trial);
	const toggleTrial = useBooking((state) => state.toggleTrial);
	const rentals = useBooking((state) => state.rentals);
	const addRental = useBooking((state) => state.addRental);
	const open = (0, import_react.useMemo)(() => firstOpenDate(slug, today), [slug, today]);
	const [days, setDays] = (0, import_react.useState)(1);
	const [date, setDate] = (0, import_react.useState)(open);
	const [note, setNote] = (0, import_react.useState)("");
	const bill = quote(dress.price, days);
	const status = date ? dayStatus(slug, date, today) : null;
	const bookable = status === "available" || status === "last";
	const inTrial = trial.includes(slug);
	const related = relatedDresses(slug);
	const existing = rentals.find((item) => item.slug === slug);
	const inBooking = existing !== void 0;
	const [restored, setRestored] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (existing && !restored) {
			setDays(existing.days);
			setDate(existing.date);
			setRestored(true);
		}
	}, [existing, restored]);
	function addToBooking() {
		if (!date || !bookable) {
			setNote("Choose an open Garba date first.");
			return false;
		}
		addRental({
			slug,
			days,
			date
		});
		return true;
	}
	function rent() {
		if (addToBooking()) navigate({ to: "/checkout" });
	}
	function addAndBrowse() {
		if (!addToBooking()) return;
		const count = useBooking.getState().rentals.length;
		setNote(`${inBooking ? "Updated" : "Added"} in your booking. ${count} outfit${count > 1 ? "s" : ""} so far.`);
	}
	function onTrial() {
		const result = toggleTrial(slug);
		if (result === "full") setNote("Your trial already has 3 outfits. Remove one to add this.");
		else setNote(result === "added" ? "Added to your free home trial." : "Removed from your trial.");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-6xl px-5 py-8 md:py-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm break-words text-mute",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "underline",
						children: "Home"
					}),
					" / ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/shop",
						className: "underline",
						children: "Women"
					}),
					" / ",
					dress.name
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 grid items-start gap-8 lg:grid-cols-2 lg:gap-10 [&>*]:min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: dress.image,
					...imgSize(dress.image),
					fetchPriority: "high",
					alt: dress.alt,
					className: "portrait bg-sand lg:sticky lg:top-28"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "kicker",
							children: "Women · Chaniya choli"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-2 font-display text-4xl text-cream md:text-5xl",
							children: dress.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-4 text-lg",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("s", {
									className: "text-mute",
									children: inr(dress.was)
								}),
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-gold",
									children: [inr(dress.price), " / day"]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "mt-4 space-y-1 text-sm text-mute",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Free home delivery in Indore" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/trial",
								className: "underline",
								children: "Free home trial"
							}), " — up to 3 outfits"] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
							className: "mt-8",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
								className: "label",
								children: "Rental length"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-wrap gap-2",
								children: [
									1,
									2,
									3
								].map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									className: "btn " + (days === option ? "btn-solid" : "btn-line"),
									onClick: () => setDays(option),
									children: [
										option,
										" day",
										option > 1 ? "s" : "",
										option === 2 ? " · 10% off" : option === 3 ? " · 20% off" : ""
									]
								}, option))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
							className: "mt-8",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
									className: "label",
									children: "Choose your Garba date"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "date-row",
									children: SEASON.map((day) => {
										const state = dayStatus(slug, day.iso, today);
										const disabled = state === "rented" || state === "closed";
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											className: "date-chip " + (date === day.iso ? "on" : ""),
											disabled,
											"aria-pressed": date === day.iso,
											onClick: () => setDate(day.iso),
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: day.wd }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: day.day }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: day.mon }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: state === "last" ? "Last one" : state === "rented" ? "Rented" : state === "closed" ? "Closed" : "Open" })
											]
										}, day.iso);
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 text-sm text-mute",
									children: "Navratri 2026 bookings are open for 8–22 Oct. Reserve before your date fills."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-2 flex flex-wrap gap-3 text-xs tracking-label uppercase text-mute",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Open" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Rented" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Closed" })
									]
								})
							]
						}),
						date && status === "last" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-4 text-sm text-ok",
							children: [
								"Only 1 outfit available for ",
								formatLong(date),
								"."
							]
						}) : null,
						note ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm text-gold",
							role: "status",
							children: note
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
							className: "mt-6 divide-y divide-line border-y border-line text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
									label: `Rental fee (${days} day${days > 1 ? "s" : ""}${bill.off ? `, ${bill.off * 100}% off` : ""})`,
									value: inr(bill.fee)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
									label: "Home delivery",
									value: "FREE",
									ok: true
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
									label: "Payment method",
									value: "Cash on delivery"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
									label: "Total to pay",
									value: inr(bill.fee),
									strong: true
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "btn btn-solid mt-6 w-full",
							onClick: rent,
							disabled: !bookable,
							children: inBooking ? "Update and go to checkout" : "Rent now"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "btn btn-line mt-3 w-full",
							onClick: addAndBrowse,
							disabled: !bookable,
							children: inBooking ? "Update my booking" : "Add to booking and keep browsing"
						}),
						rentals.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-3 text-sm text-mute",
							children: [
								rentals.length,
								" outfit",
								rentals.length > 1 ? "s" : "",
								" in your booking.",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/checkout",
									className: "text-gold underline",
									children: "Go to checkout"
								})
							]
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "btn btn-line mt-3 w-full",
							onClick: onTrial,
							children: inTrial ? "In your trial" : "Get free home trial"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-4 text-sm text-mute",
							children: [
								"We confirm the date with you on WhatsApp before any payment.",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									className: "underline",
									href: waLink(`Hi Classic Aura, I have a fit question about ${dress.name}.`),
									children: "Ask about the fit"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "mt-10",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "label",
									children: "Details"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: dress.details }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 font-display text-2xl italic text-cream",
									children: dress.story
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
									className: "mt-4 grid grid-cols-[7rem_1fr] gap-y-2 text-sm",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
											className: "text-mute",
											children: "Colour"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: dress.colors }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
											className: "text-mute",
											children: "Work"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: dress.work }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
											className: "text-mute",
											children: "Occasion"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: dress.occasion })
									]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
							className: "mt-6 border-t border-line py-4",
							open: true,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("summary", {
								className: "flex cursor-pointer items-center justify-between font-display text-2xl",
								children: ["What’s included", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"aria-hidden": "true",
									children: "+"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
								className: "mt-3 list-disc space-y-1 pl-5 text-sm text-mute",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Chaniya, choli and dupatta" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Steam press before delivery" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Free delivery and pickup inside Indore" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Blouse alteration when you book with time to spare" })
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
							className: "border-t border-line py-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("summary", {
								className: "flex cursor-pointer items-center justify-between font-display text-2xl",
								children: ["Rental terms", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"aria-hidden": "true",
									children: "+"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-3 text-sm text-mute",
								children: [
									"Dates can move free of charge up to 48 hours before delivery if the new night is open. Damage beyond ordinary wear is billed at repair cost after we tell you. Full terms live on the",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/terms",
										className: "underline",
										children: "rental terms"
									}),
									" page."
								]
							})]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Prose, {
				title: `Renting the ${dress.name}`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						"The ",
						dress.name,
						" comes as a full set of chaniya, choli and dupatta in ",
						dress.colors.toLowerCase(),
						". The work is ",
						dress.work.toLowerCase(),
						", chosen for ",
						dress.occasion.toLowerCase(),
						". The daily rate is ₹",
						dress.price,
						", with 10% off for two days and 20% off for three."
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Pick a Garba date between 8 and 22 October 2026 above and the booking summary updates your total. We confirm the date on WhatsApp, steam press the outfit and deliver it free across Indore, pincodes beginning 452. You pay cash on delivery. Pickup is the morning after your last rental day." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						"Not sure about the size? Check the ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/size-guide",
							className: "text-gold underline",
							children: "size guide"
						}),
						", or add this look to a ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/trial",
							className: "text-gold underline",
							children: "free home trial"
						}),
						" with up to two others and try them in your own room before you commit."
					] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-16",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "kicker",
						children: "You may also love"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-2 font-display text-4xl text-cream",
						children: "More women’s looks"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6 grid grid-cols-2 gap-4 md:grid-cols-3",
						children: related.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DressCard, { dress: item }, item.slug))
					})
				]
			})
		]
	}) });
}
function Row({ label, value, ok, strong }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-baseline justify-between gap-4 py-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "text-mute",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
			className: (strong ? "font-display text-3xl text-cream " : "") + (ok ? "text-ok" : ""),
			children: value
		})]
	});
}
//#endregion
export { DressPage as component };
