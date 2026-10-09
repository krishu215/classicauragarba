import { i as __toESM } from "../_runtime.mjs";
import { a as PHONE_DISPLAY, b as waLink, i as INSTAGRAM, n as DRESSES, o as PHONE_TEL, r as EMAIL } from "./mail.server-BoiOOyIE.mjs";
import { S as require_jsx_runtime, Y as require_react, b as Link, p as useRouterState } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Shirt, c as Moon, i as ShoppingBag, l as Monitor, o as Search, r as Sun, s as Phone, t as X, u as Menu } from "../_libs/lucide-react.mjs";
import { o as setMode, s as useThemeMode } from "./router-BqrM1Trj.mjs";
import { n as persist, r as create, t as createJSONStorage } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/shell-CisVLkri.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/** Natural pixel size of every bundled image, so each <img> can reserve its space before it loads. */
var SIZES = {
	"/hero.jpg": [1536, 1024],
	"/og.jpg": [1200, 630],
	"/dresses/ivory-panel.jpg": [843, 1264],
	"/dresses/ivory-violet.jpg": [896, 1195],
	"/dresses/magenta-buti.jpg": [896, 1195],
	"/dresses/navratri-stripe.jpg": [704, 1524],
	"/dresses/noir-arch.jpg": [1024, 1536],
	"/dresses/peacock-black.jpg": [1024, 1536],
	"/dresses/peacock-maroon.jpg": [843, 1264],
	"/dresses/peacock-purple.jpg": [843, 1264],
	"/dresses/sunflower-panel.jpg": [1024, 1536],
	"/dresses/teal-patch.jpg": [1024, 1536]
};
function imgSize(src) {
	const [width, height] = SIZES[src] ?? [900, 1200];
	return {
		width,
		height
	};
}
function Mark({ className = "size-8" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		className,
		viewBox: "0 0 32 32",
		"aria-hidden": "true",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "1.3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
					cx: "16",
					cy: "9",
					rx: "2.6",
					ry: "6"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
					cx: "16",
					cy: "9",
					rx: "2.6",
					ry: "6",
					transform: "rotate(90 16 16)"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
					cx: "16",
					cy: "9",
					rx: "2.6",
					ry: "6",
					transform: "rotate(45 16 16)"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
					cx: "16",
					cy: "9",
					rx: "2.6",
					ry: "6",
					transform: "rotate(-45 16 16)"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: "16",
			cy: "16",
			r: "2",
			fill: "currentColor"
		})]
	});
}
/** Stacked logo: ornament, CLASSIC AURA, — GARBA DRESSES —. */
function Logo({ size = "md" }) {
	const small = size === "sm";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/",
		className: "flex w-max flex-col items-center leading-none",
		"aria-label": "Classic Aura Garba Dresses",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, { className: small ? "size-5" : "size-7" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mt-1 font-display tracking-[0.03em] " + (small ? "text-[1.05rem] min-[380px]:text-[1.25rem] sm:text-[1.6rem]" : "text-[1.1rem] min-[380px]:text-[1.35rem] sm:text-[1.75rem] md:text-[2.4rem]"),
				children: "CLASSIC AURA"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "mt-1.5 flex w-full items-center gap-2 font-sans " + (small ? "text-[0.45rem] tracking-[0.2em] min-[380px]:text-[0.5rem] min-[380px]:tracking-[0.22em] sm:text-[0.55rem] sm:tracking-[0.26em]" : "text-[0.46rem] tracking-[0.2em] min-[380px]:text-[0.52rem] min-[380px]:tracking-[0.24em] sm:text-[0.6rem] sm:tracking-[0.28em] md:text-[0.78rem] md:tracking-[0.3em]"),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "h-px flex-1 bg-current opacity-80" }),
					"GARBA DRESSES",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "h-px flex-1 bg-current opacity-80" })
				]
			})
		]
	});
}
var memory = {
	getItem: () => null,
	setItem: () => void 0,
	removeItem: () => void 0
};
var useBooking = create()(persist((set, get) => ({
	rentals: [],
	trial: [],
	saved: null,
	confirmation: null,
	addRental: (rental) => {
		const current = get().rentals;
		if (current.some((item) => item.slug === rental.slug)) {
			set({ rentals: current.map((item) => item.slug === rental.slug ? rental : item) });
			return "updated";
		}
		set({ rentals: [...current, rental] });
		return "added";
	},
	updateRental: (slug, patch) => set({ rentals: get().rentals.map((item) => item.slug === slug ? {
		...item,
		...patch
	} : item) }),
	removeRental: (slug) => set({ rentals: get().rentals.filter((item) => item.slug !== slug) }),
	clearRentals: () => set({ rentals: [] }),
	clearTrial: () => set({ trial: [] }),
	toggleTrial: (slug) => {
		const trial = get().trial;
		if (trial.includes(slug)) {
			set({ trial: trial.filter((item) => item !== slug) });
			return "removed";
		}
		if (trial.length >= 3) return "full";
		set({ trial: [...trial, slug] });
		return "added";
	},
	setSaved: (saved) => set({ saved }),
	setConfirmation: (confirmation) => set({ confirmation })
}), {
	name: "classic-aura-booking",
	version: 2,
	storage: createJSONStorage(() => typeof window === "undefined" ? memory : localStorage),
	skipHydration: true,
	migrate: (persisted) => {
		const { slug, days, date, ...rest } = persisted ?? {};
		const rentals = slug && date ? [{
			slug,
			days: days ?? 1,
			date
		}] : [];
		return {
			...rest,
			rentals
		};
	}
}));
/** True once the saved booking has been read from this device, so pages can avoid flashing an empty state. */
function useBookingReady() {
	const [ready, setReady] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (useBooking.persist.hasHydrated()) setReady(true);
		return useBooking.persist.onFinishHydration(() => setReady(true));
	}, []);
	return ready;
}
var LINKS = [
	{
		to: "/",
		label: "Home"
	},
	{
		to: "/shop",
		label: "New arrivals"
	},
	{
		to: "/collections",
		label: "Collections"
	},
	{
		to: "/how-it-works",
		label: "How it works"
	},
	{
		to: "/faq",
		label: "FAQ"
	},
	{
		to: "/about",
		label: "About"
	},
	{
		to: "/login",
		label: "Login / My orders"
	}
];
var MORE_LINKS = [
	{
		to: "/trial",
		label: "Home trial"
	},
	{
		to: "/checkout",
		label: "Checkout"
	},
	{
		to: "/size-guide",
		label: "Size guide"
	},
	{
		to: "/shipping",
		label: "Shipping"
	},
	{
		to: "/exchange",
		label: "Exchange"
	},
	{
		to: "/contact",
		label: "Contact"
	}
];
var MODES = [
	{
		id: "system",
		label: "Auto"
	},
	{
		id: "light",
		label: "Light"
	},
	{
		id: "dark",
		label: "Dark"
	}
];
function ModeIcon({ mode }) {
	if (mode === "light") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, {
		className: "size-5",
		strokeWidth: 1.5
	});
	if (mode === "dark") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, {
		className: "size-5",
		strokeWidth: 1.5
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Monitor, {
		className: "size-5",
		strokeWidth: 1.5
	});
}
/** Header button: cycles Auto, Light, Dark. */
function ThemeToggle() {
	const mode = useThemeMode();
	const next = MODES[(MODES.findIndex((item) => item.id === mode) + 1) % MODES.length];
	const label = `Theme: ${MODES.find((item) => item.id === mode)?.label ?? "Auto"}. Switch to ${next.label}`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		className: "grid size-8 place-items-center min-[380px]:size-9 sm:size-11",
		"aria-label": label,
		title: label,
		onClick: () => setMode(next.id),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModeIcon, { mode })
	});
}
/** Menu control: pick Auto, Light or Dark directly. */
function ThemePicker() {
	const mode = useThemeMode();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-6 border-t border-line pt-6",
		role: "group",
		"aria-label": "Theme",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "label",
			children: "Theme"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-3 gap-2",
			children: MODES.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				"aria-pressed": mode === item.id,
				className: "btn min-h-11 gap-2 px-2 " + (mode === item.id ? "btn-solid" : "btn-line"),
				onClick: () => setMode(item.id),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModeIcon, { mode: item.id }), item.label]
			}, item.id))
		})]
	});
}
function Shell({ children }) {
	const pathname = useRouterState({ select: (state) => state.location.pathname });
	const home = pathname === "/";
	const trialCount = useBooking((state) => state.trial.length);
	const rentalCount = useBooking((state) => state.rentals.length);
	const [menu, setMenu] = (0, import_react.useState)(false);
	const [search, setSearch] = (0, import_react.useState)(false);
	const [scrolled, setScrolled] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const onScroll = () => setScrolled(window.scrollY > 40);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	(0, import_react.useEffect)(() => {
		useBooking.persist.rehydrate();
	}, []);
	(0, import_react.useEffect)(() => {
		setMenu(false);
		setSearch(false);
	}, [pathname]);
	(0, import_react.useEffect)(() => {
		if (!menu && !search) return;
		const onKey = (event) => {
			if (event.key === "Escape") {
				setMenu(false);
				setSearch(false);
			}
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [menu, search]);
	(0, import_react.useEffect)(() => {
		document.body.style.overflow = menu || search ? "hidden" : "";
		return () => {
			document.body.style.overflow = "";
		};
	}, [menu, search]);
	const overHero = home && !scrolled;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-screen flex-col overflow-x-clip bg-ink text-cream",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "#content",
				className: "sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-cream focus:px-3 focus:py-2 focus:text-ink",
				children: "Skip to content"
			}),
			home ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "bg-wine text-center text-sm text-ivory",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "px-4 py-2",
					children: [
						"Free home trial in Indore ·",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							className: "underline underline-offset-2",
							href: `tel:${PHONE_TEL}`,
							children: PHONE_DISPLAY
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "z-30 transition-colors duration-300 " + (home ? "fixed inset-x-0 top-0 " : "sticky top-0 ") + (overHero ? "bg-linear-to-b from-night/70 to-transparent text-ivory" : "border-b border-line bg-ink/95 text-cream backdrop-blur"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto grid max-w-[1500px] grid-cols-[minmax(0,1fr)_auto] items-center gap-2 px-4 sm:gap-4 sm:px-5 xl:grid-cols-[auto_1fr_auto] xl:px-[6vw] " + (home && !scrolled ? "py-4 xl:py-6" : "py-2 xl:py-3"),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, { size: overHero ? "md" : "sm" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
							className: "hidden items-center justify-center gap-7 text-[0.95rem] font-light xl:flex 2xl:gap-10",
							"aria-label": "Primary",
							children: LINKS.map((link) => {
								const on = link.hash ? false : link.to === "/" ? pathname === "/" : pathname.startsWith(link.to);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: link.to,
									hash: link.hash,
									className: "border-b py-1 " + (on ? "border-current" : "border-transparent hover:border-current"),
									"aria-current": on ? "page" : void 0,
									children: link.label
								}, link.label);
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-end",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "grid size-8 place-items-center min-[380px]:size-9 sm:size-11",
									"aria-label": "Search dresses",
									onClick: () => setSearch(true),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
										className: "size-5",
										strokeWidth: 1.5
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeToggle, {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/trial",
									className: "relative hidden size-11 place-items-center xl:grid",
									"aria-label": "Free home trial",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shirt, {
										className: "size-5",
										strokeWidth: 1.5
									}), trialCount > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "absolute top-1 right-1 grid size-4 place-items-center bg-wine text-xs text-ivory",
										children: trialCount
									}) : null]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/checkout",
									className: "relative grid size-8 place-items-center min-[380px]:size-9 sm:size-11",
									"aria-label": rentalCount > 0 ? `Checkout, ${rentalCount} outfit${rentalCount > 1 ? "s" : ""}` : "Checkout",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, {
										className: "size-5",
										strokeWidth: 1.5
									}), rentalCount > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "absolute top-1 right-1 grid size-4 place-items-center bg-wine text-xs text-ivory",
										children: rentalCount
									}) : trialCount > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "absolute top-1 right-1 grid size-4 place-items-center bg-wine text-xs text-ivory xl:hidden",
										children: trialCount
									}) : null]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "grid size-8 place-items-center min-[380px]:size-9 sm:size-11 xl:hidden",
									"aria-label": "Menu",
									onClick: () => setMenu(true),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, {
										className: "size-5",
										strokeWidth: 1.5
									})
								})
							]
						})
					]
				})
			}),
			menu ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MobileMenu, { onClose: () => setMenu(false) }) : null,
			search ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchPanel, { onClose: () => setSearch(false) }) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex-1",
				id: "content",
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhatsAppButton, {})
		]
	});
}
function WhatsAppButton() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
		href: waLink("Hi Classic Aura, I want to rent a Garba dress."),
		target: "_blank",
		rel: "noopener noreferrer",
		"aria-label": "Chat with Classic Aura on WhatsApp",
		title: "Chat on WhatsApp",
		className: "fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-20 grid size-14 place-items-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/30 transition hover:scale-105 hover:bg-[#1ebe5b] md:right-6 md:bottom-6 md:size-16",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
			viewBox: "0 0 24 24",
			className: "size-8 md:size-9",
			fill: "currentColor",
			"aria-hidden": "true",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" })
		})
	});
}
function MobileMenu({ onClose }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-40 flex flex-col overflow-y-auto bg-ink px-6 py-5 text-cream",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, { size: "sm" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "grid size-11 place-items-center",
					"aria-label": "Close menu",
					onClick: onClose,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "mt-8 flex flex-col gap-3",
				"aria-label": "Mobile",
				children: LINKS.map((link) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: link.to,
					hash: link.hash,
					className: "font-display text-4xl",
					onClick: onClose,
					children: link.label
				}, link.label))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "mt-8 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-line pt-6 text-base text-mist",
				"aria-label": "More",
				children: MORE_LINKS.map((link) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: link.to,
					onClick: onClose,
					children: link.label
				}, link.to))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemePicker, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
				className: "mt-auto flex items-center gap-3 py-6 text-lg",
				href: `tel:${PHONE_TEL}`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, {
					className: "size-5",
					strokeWidth: 1.5
				}), PHONE_DISPLAY]
			})
		]
	});
}
function SearchPanel({ onClose }) {
	const [query, setQuery] = (0, import_react.useState)("");
	const results = (0, import_react.useMemo)(() => {
		const needle = query.trim().toLowerCase();
		if (!needle) return DRESSES.slice(0, 5);
		return DRESSES.filter((dress) => `${dress.name} ${dress.colors} ${dress.work} ${dress.collection}`.toLowerCase().includes(needle));
	}, [query]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-40 bg-ink/70",
		onClick: onClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto mt-16 max-h-[calc(100svh-5rem)] w-[calc(100%-1.5rem)] max-w-xl overflow-auto border border-line bg-paper p-5 text-cream",
			onClick: (event) => event.stopPropagation(),
			role: "dialog",
			"aria-label": "Search dresses",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "label mb-0",
						htmlFor: "dress-search",
						children: "Search the rail"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "grid size-11 place-items-center",
						"aria-label": "Close search",
						onClick: onClose,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					id: "dress-search",
					autoFocus: true,
					className: "field mt-2",
					placeholder: "Peacock, magenta, mirror, teal…",
					value: query,
					onChange: (event) => setQuery(event.target.value)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-4 divide-y divide-line",
					children: [results.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "py-4 text-mute",
						children: "Nothing under that name. Try a colour."
					}) : null, results.map((dress) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/dress/$slug",
						params: { slug: dress.slug },
						className: "flex items-center gap-3 py-3",
						onClick: onClose,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: dress.image,
							...imgSize(dress.image),
							loading: "lazy",
							decoding: "async",
							alt: "",
							className: "size-16 object-cover"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block font-display text-2xl leading-none",
							children: dress.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm text-mute",
							children: dress.colors
						})] })]
					}) }, dress.slug))]
				})
			]
		})
	});
}
function Footer() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "bg-ink text-cream",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 max-w-xs text-sm text-mist",
					children: "Handcrafted Garba dresses, rented for the night and delivered across Indore."
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-sm tracking-label uppercase text-gold",
					children: "Shop"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-3 space-y-2 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/shop",
							children: "New arrivals"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/collections",
							children: "Collections"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/how-it-works",
							children: "How it works"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/trial",
							children: "Free home trial"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/checkout",
							children: "Checkout"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/login",
							children: "Login / My orders"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/about",
							children: "About"
						}) })
					]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-sm tracking-label uppercase text-gold",
					children: "Help"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-3 space-y-2 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/faq",
							children: "Questions, answered"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/contact",
							children: "Contact us"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/size-guide",
							children: "Size guide"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/shipping",
							children: "Shipping"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/exchange",
							children: "Exchange"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/terms",
							children: "Rental terms"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/privacy",
							children: "Privacy"
						}) })
					]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-sm tracking-label uppercase text-gold",
					children: "Contact"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-3 space-y-2 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: `tel:${PHONE_TEL}`,
							children: PHONE_DISPLAY
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: waLink(),
							children: "WhatsApp"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: `mailto:${EMAIL}`,
							children: EMAIL
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: `https://instagram.com/${INSTAGRAM.replace("@", "")}`,
							target: "_blank",
							rel: "noopener noreferrer",
							children: ["Instagram: ", INSTAGRAM]
						}) })
					]
				})] })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-6xl flex-wrap justify-between gap-2 border-t hair px-5 pt-4 pb-24 text-xs text-mist md:pb-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "© 2026 Classic Aura. All rights reserved." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Garba dresses · Indore" })]
		})]
	});
}
function PageIntro({ kicker, title, lede }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "mb-10 max-w-3xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "kicker",
				children: kicker
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-4xl text-cream sm:text-5xl md:text-6xl",
				children: title
			}),
			lede ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 max-w-2xl text-lg text-mute",
				children: lede
			}) : null
		]
	});
}
//#endregion
export { useBookingReady as a, useBooking as i, Shell as n, imgSize as r, PageIntro as t };
