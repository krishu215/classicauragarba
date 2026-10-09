import { i as __toESM } from "../_runtime.mjs";
import { a as PHONE_DISPLAY, b as waLink, d as dressesIn, n as DRESSES, o as PHONE_TEL, t as COLLECTIONS } from "./mail.server-BoiOOyIE.mjs";
import { S as require_jsx_runtime, Y as require_react, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as ArrowRight } from "../_libs/lucide-react.mjs";
import { c as FAQS } from "./router-BqrM1Trj.mjs";
import { n as Shell, r as imgSize } from "./shell-CisVLkri.mjs";
import { t as DressCard } from "./dress-card-Ca4uWnLZ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-C4hg9OCp.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var INFO = [
	{
		to: "/how-it-works",
		title: "How a rental works",
		line: "Choose, try at home, then check out in three steps."
	},
	{
		to: "/size-guide",
		title: "Size guide",
		line: "XS to XXL with bust and waist in inches."
	},
	{
		to: "/shipping",
		title: "Shipping and pickup",
		line: "Free inside Indore, pincodes starting 452."
	},
	{
		to: "/exchange",
		title: "Exchange",
		line: "Swap a size or a dress before your Garba."
	},
	{
		to: "/terms",
		title: "Rental terms",
		line: "Dates, cancellations and care, in plain language."
	}
];
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "relative flex min-h-svh items-end overflow-hidden bg-night text-ivory md:items-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/hero.jpg",
					...imgSize("/hero.jpg"),
					alt: "Model twirling in a handcrafted black and crimson garba lehenga",
					className: "absolute inset-0 size-full object-cover object-[72%_center] md:object-[70%_center]",
					fetchPriority: "high"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute inset-0 bg-linear-to-t from-night/95 via-night/35 to-night/40 md:bg-linear-to-r md:from-night/60 md:via-night/25 md:to-transparent",
					"aria-hidden": "true"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative mx-auto w-full max-w-[1500px] px-5 pt-32 pb-14 md:translate-y-[6vh] md:px-[6vw] md:pt-28 md:pb-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-light tracking-[0.4em] md:text-lg",
							children: "CLASSIC AURA"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							className: "mt-4 font-display text-[clamp(2.9rem,11vw,3.8rem)] leading-[1.1] font-normal text-ivory md:text-[clamp(3.2rem,5.3vw,5.25rem)]",
							children: [
								"The Art of",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								"Garba Dressing"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-5 max-w-[26rem] text-base font-light md:mt-6 md:max-w-md md:text-xl md:leading-relaxed",
							children: "Handcrafted silhouettes. Rich traditional details. Made for nights that deserve to be remembered."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 flex flex-wrap gap-3 md:mt-10",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/shop",
								className: "btn btn-ghost min-h-12 gap-4 px-6 text-[0.8rem] tracking-[0.12em] text-ivory hover:border-ivory hover:bg-ivory hover:text-night md:text-sm",
								children: ["Explore the collection", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
									className: "size-5",
									strokeWidth: 1.5,
									"aria-hidden": "true"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/trial",
								className: "btn min-h-12 px-4 text-[0.8rem] tracking-[0.12em] text-ivory underline underline-offset-4 md:text-sm",
								children: "Free home trial"
							})]
						})
					]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-y hair",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto grid max-w-6xl gap-6 px-5 py-8 sm:grid-cols-2 lg:grid-cols-4",
				children: [
					["Handcrafted", "Mirror work, stitched — not glued"],
					["Free in Indore", "Delivery and pickup, no extra fee"],
					["Home trial", "Up to 3 outfits, no obligation"],
					["Navratri 2026", "Book 8–22 October"]
				].map(([title, line]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-mist",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block font-display text-2xl text-cream",
						children: title
					}), line]
				}, title))
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-6xl px-5 py-16",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-8 flex flex-wrap items-end justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-4xl text-cream md:text-5xl",
					children: "Collections"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-mist",
					children: "Three ways to dress for the nine nights."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/collections",
					className: "btn btn-ghost",
					children: "View all"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-6 md:grid-cols-3",
				children: COLLECTIONS.map((collection) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/shop",
					search: { c: collection.id },
					className: "group block",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "portrait overflow-hidden",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: collection.image,
								...imgSize(collection.image),
								loading: "lazy",
								decoding: "async",
								alt: collection.alt,
								className: "h-full w-full object-cover transition duration-300 group-hover:scale-105"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-3 font-display text-3xl text-cream",
							children: collection.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-mist",
							children: [
								dressesIn(collection.id).length,
								" designs · ",
								collection.line
							]
						})
					]
				}, collection.id))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			id: "new-arrivals",
			className: "mx-auto max-w-6xl scroll-mt-24 px-5 pb-16",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-8 flex flex-wrap items-end justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-4xl text-cream md:text-5xl",
					children: "New arrivals"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 max-w-xl text-mist",
					children: "This season’s chaniya cholis, cut for movement and made to twirl."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/shop",
					className: "btn btn-ghost",
					children: "Shop all"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-4",
				children: DRESSES.map((dress) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DressCard, {
					dress,
					tone: "dark"
				}, dress.slug))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-6xl px-5 py-16",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-4xl text-cream md:text-5xl",
					children: "Before you book"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 max-w-xl text-mist",
					children: "Fit, delivery and exchange, in plain words."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
					children: INFO.map(({ to, title, line }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to,
						className: "block border border-line bg-paper p-5 transition hover:border-gold",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-2xl text-cream",
							children: title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-mist",
							children: line
						})]
					}, to))
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto grid max-w-6xl items-center gap-10 px-5 py-8 md:grid-cols-2 md:py-16",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: "/dresses/teal-patch.jpg",
				...imgSize("/dresses/teal-patch.jpg"),
				loading: "lazy",
				decoding: "async",
				alt: "Teal patchwork lehenga beside a carved wooden door",
				className: "portrait w-full"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-4xl text-cream md:text-5xl",
					children: "Made for the circle, built to last the night"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-mist",
					children: "Every Classic Aura lehenga starts with a wide, light flare that moves with each step of the dance. Mirror work is stitched on, not glued, and the blouse can be altered to you."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-4 space-y-2 text-mist",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Lightweight panels, comfortable through hours of dancing" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Free delivery and pickup inside Indore" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Try up to three outfits at home before you commit" })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/about",
					className: "btn btn-ghost mt-8",
					children: "Our story"
				})
			] })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-3xl px-5 py-16",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-4xl text-cream md:text-5xl",
					children: "Questions, answered"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8 border-t border-line",
					children: FAQS.slice(0, 4).map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
						className: "group border-b border-line",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("summary", {
							className: "flex cursor-pointer items-center justify-between gap-4 py-5 font-display text-2xl",
							children: [item.q, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-gold transition group-open:rotate-45",
								"aria-hidden": "true",
								children: "+"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "max-w-2xl pb-5 text-mist",
							children: item.a
						})]
					}, item.q))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/faq",
					className: "btn btn-ghost mt-8",
					children: "All questions"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-y hair",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-3xl px-5 py-16 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-4xl text-cream md:text-5xl",
						children: "Talk to Classic Aura"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-mist",
						children: "One number for dates, sizes and delivery. We confirm on WhatsApp."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 font-display text-4xl text-cream md:text-5xl",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: `tel:${PHONE_TEL}`,
							children: PHONE_DISPLAY
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 flex flex-wrap justify-center gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								className: "btn btn-solid",
								href: waLink("Hi Classic Aura, I want to rent a Garba dress."),
								children: "WhatsApp"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								className: "btn btn-line",
								href: `tel:${PHONE_TEL}`,
								children: "Call"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/contact",
								className: "btn btn-ghost",
								children: "Contact page"
							})
						]
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Newsletter, {})
	] }) });
}
function Newsletter() {
	const [done, setDone] = (0, import_react.useState)(false);
	const [email, setEmail] = (0, import_react.useState)("");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-xl px-5 py-16 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-4xl text-cream",
				children: "Get first look at every new drop"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-mist",
				children: "Join the list for early access to new colours and Navratri dates."
			}),
			done ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-6 text-cream",
				role: "status",
				children: "WhatsApp should have opened with your request. Send the message and we will add you to the list."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "mt-6 flex flex-col gap-3 sm:flex-row",
				onSubmit: (event) => {
					event.preventDefault();
					window.open(waLink(`Hi Classic Aura, please add ${email.trim()} to your new-drop list.`), "_blank", "noopener");
					setDone(true);
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "sr-only",
						htmlFor: "list-email",
						children: "Email address"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						id: "list-email",
						required: true,
						type: "email",
						placeholder: "Your email address",
						value: email,
						onChange: (event) => setEmail(event.target.value),
						className: "field bg-transparent text-cream placeholder:text-mist"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "btn btn-solid",
						type: "submit",
						children: "Subscribe"
					})
				]
			})
		]
	}) });
}
//#endregion
export { Home as component };
