import { i as __toESM } from "../_runtime.mjs";
import { b as waLink, g as quote, l as dayStatus, m as inr, p as formatLong, u as dressBySlug } from "./mail.server-BoiOOyIE.mjs";
import { l as validateCustomer, o as emptyCustomer } from "./booking-service.server-IuXe47pv.mjs";
import { S as require_jsx_runtime, Y as require_react, b as Link, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as useBookingReady, i as useBooking, n as Shell, r as imgSize } from "./shell-CisVLkri.mjs";
import { t as CustomerFields } from "./customer-form-5W5NAPL1.mjs";
import { n as submitRental } from "./bookings-DEv0eNuZ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/checkout-GNO1CfCD.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CheckoutPage() {
	const navigate = useNavigate();
	const ready = useBookingReady();
	const rentals = useBooking((state) => state.rentals);
	const updateRental = useBooking((state) => state.updateRental);
	const removeRental = useBooking((state) => state.removeRental);
	const saved = useBooking((state) => state.saved);
	const setSaved = useBooking((state) => state.setSaved);
	const lines = (0, import_react.useMemo)(() => rentals.flatMap((rental) => {
		const dress = dressBySlug(rental.slug);
		return dress ? [{
			...rental,
			dress,
			bill: quote(dress.price, rental.days)
		}] : [];
	}), [rentals]);
	const total = lines.reduce((sum, line) => sum + line.bill.fee, 0);
	const blocked = new Set(lines.filter((line) => ["closed", "rented"].includes(dayStatus(line.slug, line.date))).map((line) => line.slug));
	const [customer, setCustomer] = (0, import_react.useState)(emptyCustomer);
	const [errors, setErrors] = (0, import_react.useState)({});
	const [agreed, setAgreed] = (0, import_react.useState)(false);
	const [save, setSave] = (0, import_react.useState)(false);
	const [formError, setFormError] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	if (!ready) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "mx-auto min-h-[50vh] max-w-xl px-5 py-16",
		"aria-busy": "true"
	}) });
	if (lines.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-xl px-5 py-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "kicker",
				children: "Secure checkout"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-4xl text-cream sm:text-5xl",
				children: "Choose an outfit first"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-mute",
				children: "Add a dress and a Garba date to start your booking."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/shop",
				className: "btn btn-solid mt-6",
				children: "Browse dresses"
			})
		]
	}) });
	async function submit(event) {
		event.preventDefault();
		if (busy) return;
		const next = validateCustomer(customer);
		setErrors(next);
		if (Object.keys(next).length) {
			setFormError("Please check the highlighted fields.");
			return;
		}
		if (blocked.size > 0) {
			setFormError("Remove or re-date the outfits marked below. Their Garba date is no longer open.");
			return;
		}
		if (!agreed) {
			setFormError("Please agree to the rental terms.");
			return;
		}
		setBusy(true);
		setFormError("");
		try {
			const result = await submitRental({ data: {
				customer,
				lines: lines.map((line) => ({
					slug: line.slug,
					date: line.date,
					days: line.days
				}))
			} });
			if (save) setSaved(customer);
			if (result.payUrl) window.location.assign(result.payUrl);
			else navigate({
				to: "/confirmed",
				search: { ref: result.ref }
			});
		} catch (cause) {
			setFormError(cause instanceof Error ? cause.message : "Could not start payment. Please try again.");
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-6xl px-5 py-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-4xl text-cream sm:text-5xl",
				children: "Secure checkout"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-4 border border-line bg-paper px-4 py-3 text-sm",
				children: [
					"Rented with us before?",
					" ",
					saved ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "text-gold underline",
						onClick: () => setCustomer(saved),
						children: "Use your saved details"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						className: "text-gold underline",
						href: waLink(),
						children: "WhatsApp us with your mobile"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
				className: "mt-6 flex flex-wrap gap-4 text-xs tracking-label uppercase",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "text-ok",
						children: "Outfit & date"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "text-gold",
						children: "Delivery details"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "text-mute",
						children: "Cash on delivery"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				id: "checkout",
				onSubmit: submit,
				className: "mt-8 grid items-start gap-10 lg:grid-cols-3 [&>*]:min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "lg:col-span-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mb-5 font-display text-4xl",
							children: "Delivery details"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CustomerFields, {
							value: customer,
							errors,
							onChange: setCustomer,
							idPrefix: "co"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-10 mb-5 font-display text-4xl",
							children: "Delivery preferences"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "label",
								htmlFor: "co-time",
								children: ["Preferred delivery time ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "normal-case tracking-normal",
									children: "(optional)"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "co-time",
								className: "field",
								placeholder: "Any time that suits the team",
								maxLength: 120,
								value: customer.time,
								onChange: (event) => setCustomer({
									...customer,
									time: event.target.value
								})
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "label",
								htmlFor: "co-notes",
								children: ["Additional notes ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "normal-case tracking-normal",
									children: "(optional)"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								id: "co-notes",
								className: "field min-h-24",
								placeholder: "Gate code, landmark, fitting notes — anything that helps us",
								maxLength: 1e3,
								value: customer.notes,
								onChange: (event) => setCustomer({
									...customer,
									notes: event.target.value
								})
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-5 border border-dashed border-line bg-paper px-4 py-3 text-sm text-mute",
							children: "We deliver across Indore only. Home delivery and pickup are free. Our team confirms the delivery time with you on WhatsApp after you book."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "mt-5 flex items-start gap-3 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "checkbox",
								className: "mt-1 size-4",
								checked: save,
								onChange: (event) => setSave(event.target.checked)
							}), "Save my details on this device for next time (optional)"]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "border border-line bg-paper p-5 lg:sticky lg:top-28",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-3xl",
							children: "Your Garba rental"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-4 divide-y divide-line border-b border-line",
							children: lines.map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "py-4 first:pt-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex gap-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: line.dress.image,
											...imgSize(line.dress.image),
											loading: "lazy",
											decoding: "async",
											alt: "",
											className: "size-16 object-cover"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "min-w-0",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
													to: "/dress/$slug",
													params: { slug: line.slug },
													className: "font-display text-xl leading-tight",
													children: line.dress.name
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
													className: "text-sm text-mute",
													children: ["Garba date: ", formatLong(line.date)]
												}),
												blocked.has(line.slug) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "field-error mt-0",
													children: "This date is no longer open. Remove it and add the dress again with a new date."
												}) : null,
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
													className: "text-sm text-mute",
													children: [inr(line.dress.price), " / day"]
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "ml-auto text-sm",
											children: inr(line.bill.fee)
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-3 flex flex-wrap items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex gap-1",
										role: "group",
										"aria-label": `Rental length for ${line.dress.name}`,
										children: [
											1,
											2,
											3
										].map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											className: "btn min-h-9 px-3 py-1 " + (line.days === option ? "btn-solid" : "btn-line"),
											"aria-pressed": line.days === option,
											onClick: () => updateRental(line.slug, { days: option }),
											children: [
												option,
												" day",
												option > 1 ? "s" : ""
											]
										}, option))
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: "ml-auto text-sm text-mute underline",
										onClick: () => removeRental(line.slug),
										"aria-label": `Remove ${line.dress.name}`,
										children: "Remove"
									})]
								})]
							}, line.slug))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/shop",
							className: "mt-3 inline-block text-sm text-gold underline",
							children: "Add another outfit"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
							className: "mt-2 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
									k: `Outfits (${lines.length})`,
									v: inr(total)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
									k: "Delivery",
									v: "FREE"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-2 flex items-baseline justify-between border-t border-line pt-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "tracking-label uppercase",
										children: "Total to pay"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
										className: "font-display text-3xl text-cream",
										children: inr(total)
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 border border-line px-3 py-3 text-sm text-mute",
							children: "Pay in cash when we deliver your outfit. There is no online payment and no deposit. Tap the button below to place your booking and we confirm it on WhatsApp."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 border border-line px-3 py-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm",
									children: "Payment method"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 font-display text-2xl text-cream",
									children: "Cash on delivery"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-sm text-mute",
									children: [
										"Pay ",
										inr(total),
										" in cash to our delivery person."
									]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "mt-4 flex items-start gap-3 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "checkbox",
								className: "mt-1 size-4",
								checked: agreed,
								onChange: (event) => setAgreed(event.target.checked),
								required: true
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								"I agree to the ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/terms",
									className: "text-gold underline",
									children: "Rental Terms & Conditions"
								}),
								". ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "req",
									children: "*"
								})
							] })]
						}),
						formError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "field-error",
							children: formError
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "btn btn-solid mt-4 w-full",
							type: "submit",
							disabled: busy,
							children: busy ? "Placing your booking…" : "Confirm booking · cash on delivery"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-4 text-xs text-mute",
							children: [
								"Your details are used to fulfil this request and to reach you about delivery. See our",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/privacy",
									className: "underline",
									children: "privacy policy"
								}),
								"."
							]
						})
					]
				})]
			})
		]
	}) });
}
function Line({ k, v }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex justify-between gap-4 py-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "text-mute",
			children: k
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: v })]
	});
}
//#endregion
export { CheckoutPage as component };
