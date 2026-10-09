import { i as __toESM } from "../_runtime.mjs";
import { m as inr, n as DRESSES, u as dressBySlug } from "./mail.server-BoiOOyIE.mjs";
import { l as validateCustomer, o as emptyCustomer } from "./booking-service.server-IuXe47pv.mjs";
import { S as require_jsx_runtime, Y as require_react, b as Link, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as useBooking, n as Shell, r as imgSize, t as PageIntro } from "./shell-CisVLkri.mjs";
import { t as Prose } from "./prose-CI_UvwSp.mjs";
import { t as CustomerFields } from "./customer-form-5W5NAPL1.mjs";
import { r as submitTrial } from "./bookings-DEv0eNuZ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/trial-DBB4TxWh.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function TrialPage() {
	const navigate = useNavigate();
	const trial = useBooking((state) => state.trial);
	const toggleTrial = useBooking((state) => state.toggleTrial);
	const saved = useBooking((state) => state.saved);
	const [step, setStep] = (0, import_react.useState)(1);
	const [filter, setFilter] = (0, import_react.useState)("all");
	const [customer, setCustomer] = (0, import_react.useState)(emptyCustomer);
	const [errors, setErrors] = (0, import_react.useState)({});
	const [formError, setFormError] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const looks = [
		0,
		1,
		2
	].map((index) => dressBySlug(trial[index] ?? ""));
	function add(slug) {
		if (toggleTrial(slug) === "full") setFormError("You can take 3 outfits on a trial. Remove one to swap.");
		else setFormError("");
	}
	function toDetails() {
		if (trial.length === 0) {
			setFormError("Choose at least one outfit.");
			return;
		}
		setFormError("");
		setStep(2);
	}
	function toReview() {
		const next = validateCustomer(customer);
		setErrors(next);
		if (Object.keys(next).length) {
			setFormError("Please check the highlighted fields.");
			return;
		}
		setFormError("");
		setStep(3);
	}
	async function confirm() {
		if (busy) return;
		setBusy(true);
		setFormError("");
		try {
			const result = await submitTrial({ data: {
				customer,
				slugs: trial
			} });
			navigate({
				to: "/confirmed",
				search: { ref: result.ref }
			});
		} catch (cause) {
			setFormError(cause instanceof Error ? cause.message : "Could not send your request. Please try again.");
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-6xl px-5 py-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-mute",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "underline",
					children: "Home"
				}), " / Free home trial"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageIntro, {
				kicker: "Free home trial · Indore",
				title: "Try up to 3 outfits at home — free",
				lede: "Choose your favourite looks, pick a time, and our team brings them to your door. No payment, no obligation — rent only what you love."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mb-8 flex flex-wrap gap-2 text-sm",
				children: [
					"Delivery free",
					"Trial free",
					"Indore only"
				].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "border border-line bg-paper px-3 py-2",
					children: item
				}, item))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "mb-8 flex flex-wrap gap-2 text-xs tracking-label uppercase",
				children: [
					[1, "Choose outfits"],
					[2, "Your details"],
					[3, "Review"]
				].map(([number, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "border px-3 py-2 " + (step === number ? "border-wine bg-wine text-ivory" : "border-line text-mute"),
					children: [
						number,
						" ",
						label
					]
				}, label))
			}),
			step === 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-4 flex flex-wrap items-end justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-4xl text-cream",
						children: "Choose up to 3 outfits"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-mute",
						children: "You can select up to 3 outfits for your free home trial."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm",
						children: [trial.length, " / 3 selected"]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-3",
					children: looks.map((dress, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "border border-dashed border-line bg-paper px-4 py-5 text-center text-sm tracking-label uppercase text-mute",
						children: dress ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex flex-wrap items-center justify-between gap-3 normal-case tracking-normal",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex min-w-0 items-center gap-3 text-left text-cream",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: dress.image,
									...imgSize(dress.image),
									loading: "lazy",
									decoding: "async",
									alt: "",
									className: "size-14 object-cover"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "min-w-0",
									children: [
										"Look ",
										index + 1,
										" — ",
										dress.name,
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "block text-mute",
											children: [inr(dress.price), " / day if you keep it"]
										})
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "btn btn-line",
								onClick: () => add(dress.slug),
								children: "Remove"
							})]
						}) : `Look ${index + 1} — add from below`
					}, index))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 flex flex-wrap gap-2",
					children: [
						["all", "All"],
						["women", "Women"],
						["men", "Men"]
					].map(([id, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "btn " + (filter === id ? "btn-solid" : "btn-line"),
						onClick: () => setFilter(id),
						children: label
					}, id))
				}),
				filter === "men" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-8 max-w-xl text-mute",
					children: "Men’s kediyu and kurta sets are not on the rail this Navratri. WhatsApp +91 74770 87755 if you need one for the same night — we will tell you straight if we can arrange it."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8 grid grid-cols-2 gap-4 md:grid-cols-3",
					children: DRESSES.map((dress) => {
						const selected = trial.includes(dress.slug);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "flex flex-col",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/dress/$slug",
									params: { slug: dress.slug },
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: dress.image,
										...imgSize(dress.image),
										loading: "lazy",
										decoding: "async",
										alt: dress.alt,
										className: "portrait w-full"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "mt-3 font-display text-2xl leading-tight",
									children: dress.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-sm text-mute",
									children: [inr(dress.price), " / day"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "btn mt-3 " + (selected ? "btn-solid" : "btn-line"),
									onClick: () => add(dress.slug),
									children: selected ? "Selected" : "Add to trial"
								})
							]
						}, dress.slug);
					})
				}),
				formError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "field-error mt-4",
					children: formError
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "btn btn-solid mt-8",
					onClick: toDetails,
					children: "Continue"
				})
			] }) : null,
			step === 2 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "max-w-xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mb-2 font-display text-4xl",
						children: "Your details"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-6 text-mute",
						children: "Where should we bring the trial? Indore only."
					}),
					saved ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "btn btn-line mb-6",
						onClick: () => setCustomer(saved),
						children: "Use my saved details"
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CustomerFields, {
						value: customer,
						errors,
						onChange: setCustomer,
						idPrefix: "trial"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "label",
							htmlFor: "trial-time",
							children: ["Preferred time ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "normal-case tracking-normal",
								children: "(optional)"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							id: "trial-time",
							className: "field",
							placeholder: "Any time that suits the team",
							maxLength: 120,
							value: customer.time,
							onChange: (event) => setCustomer({
								...customer,
								time: event.target.value
							})
						})]
					}),
					formError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "field-error mt-4",
						children: formError
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 flex flex-wrap gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "btn btn-line",
							onClick: () => setStep(1),
							children: "Back"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "btn btn-solid",
							onClick: toReview,
							children: "Review trial"
						})]
					})
				]
			}) : null,
			step === 3 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "max-w-xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mb-4 font-display text-4xl",
						children: "Review"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "divide-y divide-line border-y border-line",
						children: trial.map((slug) => {
							const dress = dressBySlug(slug);
							if (!dress) return null;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-center gap-3 py-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: dress.image,
									...imgSize(dress.image),
									loading: "lazy",
									decoding: "async",
									alt: "",
									className: "size-16 object-cover"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block font-display text-2xl",
										children: dress.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm text-mute",
										children: "Trial · free"
									})]
								})]
							}, slug);
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-4 text-sm",
						children: [
							customer.name,
							" · ",
							customer.mobile,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							customer.address,
							", ",
							customer.area,
							", ",
							customer.city,
							" ",
							customer.pincode,
							customer.time ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								"Time: ",
								customer.time
							] }) : null
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-sm text-mute",
						children: "No payment now. If you keep an outfit, we book it from the dress page after the trial."
					}),
					formError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "field-error mt-3",
						children: formError
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 flex flex-wrap gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "btn btn-line",
							onClick: () => setStep(2),
							children: "Back"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "btn btn-solid",
							onClick: () => void confirm(),
							disabled: busy,
							children: busy ? "Sending…" : "Request my trial"
						})]
					})
				]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Prose, {
				title: "How the free home trial works",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Choose up to three outfits, share your Indore address and a time that suits you, and we bring the looks to your door. There is no payment and no obligation. Try each one with the dupatta, check the fit in the choli and the length of the chaniya, then keep what you love. We take the rest back with us." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The trial and the delivery are both free. It works best when you book a few days before your Garba, because that leaves time for a blouse alteration or a swap if the size is not quite right. Someone needs to be home during the agreed window." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						"If you decide to rent after the trial, book the outfit from its dress page. We confirm your date on WhatsApp, and you pay cash on delivery. See the ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/size-guide",
							className: "text-gold underline",
							children: "size guide"
						}),
						" or the ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/exchange",
							className: "text-gold underline",
							children: "exchange rules"
						}),
						" if you want to read more first."
					] })
				]
			})
		]
	}) });
}
//#endregion
export { TrialPage as component };
