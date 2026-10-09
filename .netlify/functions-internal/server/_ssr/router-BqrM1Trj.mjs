import { i as __toESM } from "../_runtime.mjs";
import { t as __exportAll } from "./booking-repository.server-DMeZHa6D.mjs";
import { i as INSTAGRAM, n as DRESSES, o as PHONE_TEL, r as EMAIL, u as dressBySlug } from "./mail.server-BoiOOyIE.mjs";
import { c as markPaid, d as verifyWebhook, n as REF_PATTERN, s as markExpired, u as verifyReturn } from "./booking-service.server-IuXe47pv.mjs";
import { S as require_jsx_runtime, Y as require_react, _ as lazyRouteComponent, d as Scripts, f as HeadContent, g as Outlet, h as createRouter, v as createFileRoute, y as createRootRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as TriangleAlert } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/faq-DlVKoRtn.js
var FAQS = [
	{
		q: "How does a Classic Aura rental work?",
		a: "Pick a chaniya choli, choose 1, 2 or 3 days, and reserve a Garba date between 8 and 22 October 2026. We confirm the slot on WhatsApp, then deliver the outfit to your Indore address and pick it up after your dates. You pay cash on delivery. The set includes the chaniya, choli and dupatta."
	},
	{
		q: "What are the Navratri 2026 dates you are booking?",
		a: "Bookings are open for Thursday 8 October through Thursday 22 October 2026. Some dates show “Last one” — that piece has a single outfit left. Dates marked rented are already taken for that dress. If your date is full, message us and we will suggest a sister colour."
	},
	{
		q: "What does the price include?",
		a: "The daily rate covers the full set, a steam press before it leaves us, and free home delivery plus pickup inside Indore. Two days are 10% off the daily rate, three days are 20% off. There is no separate delivery fee."
	},
	{
		q: "Do you deliver outside Indore?",
		a: "Not this season. We deliver and pick up only across Indore, pincodes starting 452. If you are just outside the city, call +91 74770 87755 and we will say honestly whether the pin is possible."
	},
	{
		q: "How does the free home trial work?",
		a: "Choose up to 3 outfits, share a time and your address, and we bring them to your door in Indore. There is no payment and no obligation. You keep what you love and we take the rest back. Trial and delivery are both free."
	},
	{
		q: "Can I rent more than one outfit?",
		a: "Yes. Add each look from its own page and they all sit together at checkout, each with its own rental length and Garba date. Use the home trial if you want to decide in person first."
	},
	{
		q: "What sizes do you have?",
		a: "Most cholis run from XS to XXL, and we alter the blouse to your measurements when you book early enough. Chaniya waists are adjustable. The size guide lists bust, waist and an approximate length. If you are between sizes, the home trial is the sure way."
	},
	{
		q: "How do I pay?",
		a: "You pay in cash when we deliver the outfit. There is no online payment and no deposit. This website records your booking request and we confirm it with you on WhatsApp."
	},
	{
		q: "Is there a security deposit?",
		a: "No deposit is taken online. The rental fee is the amount due. If something comes back torn, burnt or permanently stained beyond normal Garba wear, we tell you the repair cost on WhatsApp before billing it. Ordinary creasing is on us."
	},
	{
		q: "What if I need to cancel or move the date?",
		a: "Move the date for free if the new night is still open and you tell us at least 48 hours before delivery. Inside 48 hours, we can move you only if another booking can take the original night. Cancellations inside 48 hours are not refunded once the outfit has been held off the calendar."
	},
	{
		q: "What if the outfit does not fit?",
		a: "Book a free home trial before you pay, or tell us your measurements on the size guide when you reserve. If a stitched blouse is the issue and we still have time before your Garba, we alter it. Same-day surprises are harder — trial first if you can."
	},
	{
		q: "Do you have men’s kediyu or kurta sets?",
		a: "This Navratri the rail is women’s chaniya cholis and lehengas only. If you need a men’s look for the same night, WhatsApp +91 74770 87755 and we will say what we can arrange — we will not pretend it is on the site if it is not."
	},
	{
		q: "How early should I book?",
		a: "Popular colours, especially the peacock borders and the magenta buti, go to “last one” first. If your Garba is a weekend, reserve this week. A trial can be the same day or the day before, subject to the van route."
	},
	{
		q: "How do I reach you?",
		a: "Call or WhatsApp +91 74770 87755. That is the only number. Email hello@classicaura.in works for booking notes, but WhatsApp is how we confirm delivery time."
	}
];
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/seo-wwQKve9b.js
/** One unique title (50-60 characters) and meta description (120-160 characters) per page. */
var PAGES = {
	home: {
		title: "Garba Dress on Rent in Indore | Classic Aura Navratri 2026",
		description: "Rent handcrafted Garba chaniya choli and lehenga in Indore for Navratri 2026. Free home trial, free delivery and pickup, WhatsApp booking from ₹549 a day."
	},
	shop: {
		title: "Chaniya Choli on Rent in Indore: New Arrivals | Classic Aura",
		description: "Browse new Garba chaniya cholis and lehengas for rent in Indore, from ₹549 to ₹799 a day. Pick your Garba date between 8 and 22 October 2026."
	},
	collections: {
		title: "Garba Dress Collections in Indore | Classic Aura Rentals",
		description: "Explore three Garba collections to rent in Indore: Peacock Border, Mirror Work and Festive Lehengas. Stitched mirror work, free delivery and home trial."
	},
	howItWorks: {
		title: "How to Rent a Garba Dress in Indore | Classic Aura Guide",
		description: "See how renting a Garba dress in Indore works: choose an outfit and date, try it free at home, then confirm on WhatsApp. Delivery and pickup included."
	},
	faq: {
		title: "Garba Dress Rental FAQs for Indore | Classic Aura Answers",
		description: "Answers on renting a Garba dress in Indore: pricing, dates, sizes, payment, deposit, cancellations and delivery. Call or WhatsApp +91 74770 87755."
	},
	about: {
		title: "About Classic Aura | Garba Dress Rental Store in Indore",
		description: "Classic Aura rents handcrafted Garba chaniya cholis in Indore with stitched mirror work, steam-pressed sets, a free home trial and free delivery and pickup."
	},
	contact: {
		title: "Contact Classic Aura | Call or WhatsApp Garba Rentals Indore",
		description: "Call or WhatsApp Classic Aura on +91 74770 87755 to rent a Garba dress in Indore. Ask about dates, sizes, home trial and delivery for Navratri 2026."
	},
	sizeGuide: {
		title: "Chaniya Choli Size Guide XS to XXL | Classic Aura Indore",
		description: "Chaniya choli size guide from XS to XXL with bust and waist in inches, plus how to measure at home. Unsure? Book a free Garba dress trial in Indore."
	},
	shipping: {
		title: "Free Garba Dress Delivery, Pickup in Indore | Classic Aura",
		description: "Free home delivery and pickup for Garba dress rentals across Indore, pincodes starting 452. Learn about delivery windows, pickup timing and home trials."
	},
	exchange: {
		title: "Garba Dress Exchange and Size Swap Policy | Classic Aura",
		description: "How size swaps and dress exchanges work for Classic Aura Garba rentals in Indore. Try a free home trial first and swap before your Garba night."
	},
	terms: {
		title: "Garba Dress Rental Terms and Conditions | Classic Aura",
		description: "Read the Classic Aura Garba dress rental terms for Indore: booking, rental period, date changes, cancellations, damage charges and free home trials."
	},
	privacy: {
		title: "Privacy Policy: How Classic Aura Uses Your Details",
		description: "How Classic Aura uses the name, mobile, email and address you share for Garba dress rentals and home trials in Indore, and what stays on your own device."
	},
	trial: {
		title: "Free Home Trial: 3 Garba Outfits in Indore | Classic Aura",
		description: "Try up to 3 Garba outfits at home in Indore with our free trial. Choose your looks, pick a time and rent only what you love. Free delivery, no obligation."
	},
	checkout: {
		title: "Secure Checkout for Your Garba Dress Rental | Classic Aura",
		description: "Review your Garba dress rental, add your Indore delivery details and send the booking request on WhatsApp. Nothing is charged on this page by Classic Aura."
	},
	confirmed: {
		title: "Send Your Garba Dress Booking on WhatsApp | Classic Aura",
		description: "Your Classic Aura Garba dress request is in. We confirm availability on WhatsApp and you pay cash on delivery. Nothing is charged online."
	},
	notFound: {
		title: "Page Not Found | Classic Aura Garba Dress Rental Indore",
		description: "This page is not on the rail. Browse Classic Aura's Garba chaniya choli and lehenga rentals in Indore for Navratri 2026, with free delivery and home trial."
	}
};
var SITE_URL = "https://classicauragarba.netlify.app";
var SITE_NAME = "Classic Aura";
var BUSINESS_ID = `${SITE_URL}/#business`;
var WEBSITE_ID = `${SITE_URL}/#website`;
function absolute(path) {
	return path.startsWith("http") ? path : `${SITE_URL}${path}`;
}
/** Head tags for one page: title, unique description, canonical URL, social tags and JSON-LD. */
function seo({ title, description, path, image, noindex = false, jsonLd = [] }) {
	const url = absolute(path);
	const picture = absolute(image ?? "/og.jpg");
	return {
		meta: [
			{ title },
			{
				name: "description",
				content: description
			},
			{
				name: "robots",
				content: noindex ? "noindex, follow" : "index, follow, max-image-preview:large"
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				property: "og:site_name",
				content: SITE_NAME
			},
			{
				property: "og:locale",
				content: "en_IN"
			},
			{
				property: "og:title",
				content: title
			},
			{
				property: "og:description",
				content: description
			},
			{
				property: "og:url",
				content: url
			},
			{
				property: "og:image",
				content: picture
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				name: "twitter:title",
				content: title
			},
			{
				name: "twitter:description",
				content: description
			},
			{
				name: "twitter:image",
				content: picture
			}
		],
		links: [{
			rel: "canonical",
			href: url
		}],
		scripts: jsonLd.map((data) => ({
			type: "application/ld+json",
			children: JSON.stringify(data).replace(/</g, "\\u003c")
		}))
	};
}
function graph(...nodes) {
	return {
		"@context": "https://schema.org",
		"@graph": nodes
	};
}
var prices = DRESSES.map((dress) => dress.price);
function businessNode() {
	return {
		"@type": "ClothingStore",
		"@id": BUSINESS_ID,
		name: SITE_NAME,
		url: `${SITE_URL}/`,
		image: absolute("/og.jpg"),
		logo: absolute("/og.jpg"),
		description: "Garba chaniya choli and lehenga rental in Indore with free home trial, free delivery and pickup, and WhatsApp booking.",
		telephone: PHONE_TEL,
		email: EMAIL,
		priceRange: `₹${Math.min(...prices)}–₹${Math.max(...prices)} per day`,
		address: {
			"@type": "PostalAddress",
			addressLocality: "Indore",
			addressRegion: "Madhya Pradesh",
			addressCountry: "IN"
		},
		areaServed: {
			"@type": "City",
			name: "Indore"
		},
		sameAs: [`https://instagram.com/${INSTAGRAM.replace("@", "")}`]
	};
}
function websiteNode() {
	return {
		"@type": "WebSite",
		"@id": WEBSITE_ID,
		url: `${SITE_URL}/`,
		name: SITE_NAME,
		inLanguage: "en-IN",
		publisher: { "@id": BUSINESS_ID }
	};
}
function breadcrumbNode(items) {
	return {
		"@type": "BreadcrumbList",
		itemListElement: [["Home", "/"], ...items].map(([name, path], index) => ({
			"@type": "ListItem",
			position: index + 1,
			name,
			item: absolute(path)
		}))
	};
}
function pageNode(type, name, description, path) {
	return {
		"@type": type,
		"@id": `${absolute(path)}#webpage`,
		url: absolute(path),
		name,
		description,
		inLanguage: "en-IN",
		isPartOf: { "@id": WEBSITE_ID },
		about: { "@id": BUSINESS_ID }
	};
}
function itemListNode(dresses) {
	return {
		"@type": "ItemList",
		itemListElement: dresses.map((dress, index) => ({
			"@type": "ListItem",
			position: index + 1,
			url: absolute(`/dress/${dress.slug}`),
			name: dress.name
		}))
	};
}
function faqNode() {
	return {
		"@type": "FAQPage",
		mainEntity: FAQS.map((item) => ({
			"@type": "Question",
			name: item.q,
			acceptedAnswer: {
				"@type": "Answer",
				text: item.a
			}
		}))
	};
}
function howToNode(name, steps) {
	return {
		"@type": "HowTo",
		name,
		step: steps.map((step, index) => ({
			"@type": "HowToStep",
			position: index + 1,
			name: step.title,
			text: step.line
		}))
	};
}
function productNode(dress) {
	const url = absolute(`/dress/${dress.slug}`);
	return {
		"@type": "Product",
		"@id": `${url}#product`,
		name: dress.name,
		description: dress.details,
		image: [absolute(dress.image)],
		sku: dress.slug,
		category: "Garba chaniya choli rental",
		color: dress.colors,
		brand: {
			"@type": "Brand",
			name: SITE_NAME
		},
		offers: {
			"@type": "Offer",
			url,
			priceCurrency: "INR",
			price: String(dress.price),
			priceValidUntil: "2026-10-22",
			availability: "https://schema.org/InStock",
			seller: { "@id": BUSINESS_ID }
		}
	};
}
/** Product page title kept inside 50-60 characters. */
function dressTitle(dress) {
	const options = [
		`${dress.name} on Rent in Indore | Classic Aura`,
		`${dress.name} on Rent | Classic Aura Indore`,
		`Rent ${dress.name} in Indore | Classic Aura`,
		`${dress.name} | Rent in Indore, Classic Aura`,
		`${dress.name} on Rent | Classic Aura`
	];
	return options.find((text) => text.length >= 50 && text.length <= 60) ?? options[options.length - 1];
}
/** Product page description kept inside 120-160 characters. */
function dressDescription(dress) {
	const parts = [
		`Rent the ${dress.name} in Indore for ₹${dress.price} a day.`,
		`${dress.colors}.`,
		"Free home delivery, free home trial and WhatsApp booking for Navratri 2026."
	];
	let text = parts.join(" ");
	if (text.length > 160) text = [parts[0], parts[2]].join(" ");
	return text;
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/router-BqrM1Trj.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 bg-ink px-6 text-center text-cream",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-gold",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 1.5
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-4xl",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-mute",
				children: "Please reload the page, or go back to the home page."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "btn btn-line",
					onClick: () => window.location.reload(),
					children: "Reload"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					className: "btn btn-solid",
					href: "/",
					children: "Home"
				})]
			})
		]
	});
}
var styles_default = "/assets/styles-CQNSe8IJ.css";
var THEME_KEY = "classic-aura-theme";
var EVENT = "classic-aura-theme-change";
var QUERY = "(prefers-color-scheme: light)";
function readMode() {
	try {
		const saved = localStorage.getItem(THEME_KEY);
		return saved === "light" || saved === "dark" ? saved : "system";
	} catch {
		return "system";
	}
}
function resolve(mode) {
	if (mode !== "system") return mode;
	return window.matchMedia(QUERY).matches ? "light" : "dark";
}
function applyTheme(mode) {
	const theme = resolve(mode);
	const root = document.documentElement;
	root.dataset.theme = theme;
	root.dataset.themeMode = mode;
	document.querySelector("meta[name=\"theme-color\"]")?.setAttribute("content", theme === "light" ? "#f6f0e6" : "#1b110a");
}
function setMode(mode) {
	try {
		if (mode === "system") localStorage.removeItem(THEME_KEY);
		else localStorage.setItem(THEME_KEY, mode);
	} catch {}
	applyTheme(mode);
	window.dispatchEvent(new Event(EVENT));
}
/** Current mode (Auto / Light / Dark). Auto follows the phone or computer setting live. */
function useThemeMode() {
	const [mode, setModeState] = (0, import_react.useState)("system");
	(0, import_react.useEffect)(() => {
		const sync = () => setModeState(readMode());
		sync();
		const media = window.matchMedia(QUERY);
		const onSystemChange = () => {
			if (readMode() === "system") applyTheme("system");
		};
		window.addEventListener(EVENT, sync);
		media.addEventListener("change", onSystemChange);
		return () => {
			window.removeEventListener(EVENT, sync);
			media.removeEventListener("change", onSystemChange);
		};
	}, []);
	return mode;
}
/** Re-applies the saved theme once the page is interactive, so a reload can never fall back to dark. */
function ThemeSync() {
	(0, import_react.useEffect)(() => {
		applyTheme(readMode());
		const callback = new URLSearchParams(window.location.hash.replace(/^#/, ""));
		if (window.location.pathname !== "/login" && [
			"confirmation_token",
			"recovery_token",
			"invite_token",
			"email_change_token",
			"access_token"
		].some((key) => callback.has(key))) window.location.replace(`/login${window.location.hash}`);
	}, []);
	return null;
}
var Route$21 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1, viewport-fit=cover"
			},
			{
				name: "theme-color",
				content: "#1b110a"
			}
		],
		scripts: [{ children: "try{var s=localStorage.getItem(\"classic-aura-theme\");var m=s===\"light\"||s===\"dark\"?s:\"system\";var t=m===\"system\"?(matchMedia(\"(prefers-color-scheme: light)\").matches?\"light\":\"dark\"):m;var d=document.documentElement;d.dataset.theme=t;d.dataset.themeMode=m;var c=document.querySelector(\"meta[name=theme-color]\");if(c)c.setAttribute(\"content\",t===\"light\"?\"#f6f0e6\":\"#1b110a\")}catch(e){}" }],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500;1,600&family=Jost:wght@300;400;500&display=swap"
			},
			{
				rel: "stylesheet",
				href: styles_default
			}
		]
	}),
	component: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en-IN",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeSync, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
		] })]
	})
});
var $$splitComponentImporter$18 = () => import("./routes-C4hg9OCp.mjs");
var Route$20 = createFileRoute("/")({
	head: () => seo({
		...PAGES.home,
		path: "/",
		jsonLd: [graph(businessNode(), websiteNode(), pageNode("WebPage", PAGES.home.title, PAGES.home.description, "/"))]
	}),
	component: lazyRouteComponent($$splitComponentImporter$18, "component")
});
var $$splitComponentImporter$17 = () => import("../_-CmdUAnqI.mjs");
var Route$19 = createFileRoute("/$")({
	head: () => seo({
		...PAGES.notFound,
		path: "/",
		noindex: true
	}),
	component: lazyRouteComponent($$splitComponentImporter$17, "component")
});
var $$splitComponentImporter$16 = () => import("./about-CwZPL0UQ.mjs");
var Route$18 = createFileRoute("/about")({
	head: () => seo({
		...PAGES.about,
		path: "/about",
		jsonLd: [graph(breadcrumbNode([["About", "/about"]]), pageNode("AboutPage", PAGES.about.title, PAGES.about.description, "/about"))]
	}),
	component: lazyRouteComponent($$splitComponentImporter$16, "component")
});
var $$splitComponentImporter$15 = () => import("./admin-BQ3ljot8.mjs");
var Route$17 = createFileRoute("/admin")({
	head: () => seo({
		title: "Admin | Classic Aura",
		description: "Private dashboard for Classic Aura.",
		path: "/admin",
		noindex: true
	}),
	component: lazyRouteComponent($$splitComponentImporter$15, "component")
});
var $$splitComponentImporter$14 = () => import("./checkout-GNO1CfCD.mjs");
var Route$16 = createFileRoute("/checkout")({
	head: () => seo({
		...PAGES.checkout,
		path: "/checkout",
		noindex: true
	}),
	component: lazyRouteComponent($$splitComponentImporter$14, "component")
});
var $$splitComponentImporter$13 = () => import("./collections-DIJPDFjz.mjs");
var Route$15 = createFileRoute("/collections")({
	head: () => seo({
		...PAGES.collections,
		path: "/collections",
		jsonLd: [graph(breadcrumbNode([["Collections", "/collections"]]), pageNode("CollectionPage", PAGES.collections.title, PAGES.collections.description, "/collections"), itemListNode(DRESSES))]
	}),
	component: lazyRouteComponent($$splitComponentImporter$13, "component")
});
var $$splitComponentImporter$12 = () => import("./confirmed-0BfXkv3x.mjs");
var Route$14 = createFileRoute("/confirmed")({
	validateSearch: (search) => ({ ref: typeof search.ref === "string" ? search.ref : void 0 }),
	head: () => seo({
		...PAGES.confirmed,
		path: "/confirmed",
		noindex: true
	}),
	component: lazyRouteComponent($$splitComponentImporter$12, "component")
});
var $$splitComponentImporter$11 = () => import("./contact-DK7hwJ6i.mjs");
var Route$13 = createFileRoute("/contact")({
	head: () => seo({
		...PAGES.contact,
		path: "/contact",
		jsonLd: [graph(breadcrumbNode([["Contact", "/contact"]]), pageNode("ContactPage", PAGES.contact.title, PAGES.contact.description, "/contact"), businessNode())]
	}),
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var $$splitComponentImporter$10 = () => import("./exchange-U5lNGysF.mjs");
var Route$12 = createFileRoute("/exchange")({
	head: () => seo({
		...PAGES.exchange,
		path: "/exchange",
		jsonLd: [graph(breadcrumbNode([["Exchange", "/exchange"]]), pageNode("WebPage", PAGES.exchange.title, PAGES.exchange.description, "/exchange"))]
	}),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("./faq-BczDI_nj.mjs");
var Route$11 = createFileRoute("/faq")({
	head: () => seo({
		...PAGES.faq,
		path: "/faq",
		jsonLd: [graph(breadcrumbNode([["FAQ", "/faq"]]), pageNode("FAQPage", PAGES.faq.title, PAGES.faq.description, "/faq"), faqNode())]
	}),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var STEPS = [
	{
		title: "Choose your outfit",
		line: "Pick a chaniya choli, 1 to 3 days and a Garba date between 8 and 22 October.",
		points: [
			"The set includes the chaniya, choli and dupatta.",
			"Two days are 10% off the daily rate, three days are 20% off.",
			"Dates marked rented are taken for that dress; “Last one” means a single outfit is left."
		],
		to: "/shop",
		cta: "Browse new arrivals"
	},
	{
		title: "Try at home first",
		line: "Choose up to 3 outfits and we bring them to your door. Free, no obligation.",
		points: [
			"Share a time and your Indore address.",
			"Keep what you love, we take the rest back.",
			"Trial and delivery are both free."
		],
		to: "/trial",
		cta: "Book a home trial"
	},
	{
		title: "Check out",
		line: "Place the booking request and we confirm on WhatsApp. You pay cash on delivery.",
		points: [
			"Add more than one outfit; each keeps its own length and Garba date.",
			"We deliver inside Indore and pick the outfit up the morning after your last day.",
			"Nothing is charged until we confirm availability."
		],
		to: "/checkout",
		cta: "Go to checkout"
	}
];
var $$splitComponentImporter$8 = () => import("./how-it-works-DW6w3_66.mjs");
var Route$10 = createFileRoute("/how-it-works")({
	head: () => seo({
		...PAGES.howItWorks,
		path: "/how-it-works",
		jsonLd: [graph(breadcrumbNode([["How it works", "/how-it-works"]]), pageNode("WebPage", PAGES.howItWorks.title, PAGES.howItWorks.description, "/how-it-works"), howToNode("How to rent a Garba dress in Indore", STEPS))]
	}),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./login-DaisRh5X.mjs");
var Route$9 = createFileRoute("/login")({
	head: () => seo({
		title: "Login | Classic Aura",
		description: "Sign in with your email and password to see your Classic Aura orders, status and delivery time.",
		path: "/login",
		noindex: true
	}),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./privacy-Ym8oTqok.mjs");
var Route$8 = createFileRoute("/privacy")({
	head: () => seo({
		...PAGES.privacy,
		path: "/privacy",
		jsonLd: [graph(breadcrumbNode([["Privacy", "/privacy"]]), pageNode("WebPage", PAGES.privacy.title, PAGES.privacy.description, "/privacy"))]
	}),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./shipping-BaWtRz4M.mjs");
var Route$7 = createFileRoute("/shipping")({
	head: () => seo({
		...PAGES.shipping,
		path: "/shipping",
		jsonLd: [graph(breadcrumbNode([["Shipping", "/shipping"]]), pageNode("WebPage", PAGES.shipping.title, PAGES.shipping.description, "/shipping"))]
	}),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./shop-Dhhq74n_.mjs");
var Route$6 = createFileRoute("/shop")({
	validateSearch: (search) => {
		const c = search.c;
		return {
			c: c === "peacock" || c === "mirror" || c === "festive" ? c : void 0,
			q: typeof search.q === "string" ? search.q : void 0
		};
	},
	head: () => seo({
		...PAGES.shop,
		path: "/shop",
		jsonLd: [graph(breadcrumbNode([["New arrivals", "/shop"]]), pageNode("CollectionPage", PAGES.shop.title, PAGES.shop.description, "/shop"), itemListNode(DRESSES))]
	}),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./size-guide-CyciQVnQ.mjs");
var Route$5 = createFileRoute("/size-guide")({
	head: () => seo({
		...PAGES.sizeGuide,
		path: "/size-guide",
		jsonLd: [graph(breadcrumbNode([["Size guide", "/size-guide"]]), pageNode("WebPage", PAGES.sizeGuide.title, PAGES.sizeGuide.description, "/size-guide"))]
	}),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./terms-BKF6W9mX.mjs");
var Route$4 = createFileRoute("/terms")({
	head: () => seo({
		...PAGES.terms,
		path: "/terms",
		jsonLd: [graph(breadcrumbNode([["Rental terms", "/terms"]]), pageNode("WebPage", PAGES.terms.title, PAGES.terms.description, "/terms"))]
	}),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./trial-DBB4TxWh.mjs");
var Route$3 = createFileRoute("/trial")({
	head: () => seo({
		...PAGES.trial,
		path: "/trial",
		jsonLd: [graph(breadcrumbNode([["Free home trial", "/trial"]]), pageNode("WebPage", PAGES.trial.title, PAGES.trial.description, "/trial"))]
	}),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
/** Razorpay sends the customer back here after paying. We verify the signature, record the payment, then show the confirmation page. */
var Route$2 = createFileRoute("/api/razorpay-return")({ server: { handlers: { GET: async ({ request }) => {
	const params = new URL(request.url).searchParams;
	const reference = params.get("razorpay_payment_link_reference_id") ?? "";
	const target = REF_PATTERN.test(reference) ? `/confirmed?ref=${reference}` : "/confirmed";
	try {
		const status = params.get("razorpay_payment_link_status") ?? "";
		const linkId = params.get("razorpay_payment_link_id") ?? "";
		const paymentId = params.get("razorpay_payment_id") ?? "";
		const signature = params.get("razorpay_signature") ?? "";
		if (status === "paid" && REF_PATTERN.test(reference) && verifyReturn({
			linkId,
			reference,
			status,
			paymentId,
			signature
		})) await markPaid({
			ref: reference,
			linkId,
			paymentId
		});
	} catch (error) {
		console.error("[return]", error);
	}
	return new Response(null, {
		status: 302,
		headers: { Location: target }
	});
} } } });
var Route$1 = createFileRoute("/api/razorpay-webhook")({ server: { handlers: { POST: async ({ request }) => {
	const raw = await request.text();
	if (!verifyWebhook(raw, request.headers.get("x-razorpay-signature"))) return new Response("invalid signature", { status: 400 });
	try {
		const body = JSON.parse(raw);
		const link = body.payload?.payment_link?.entity;
		if (body.event === "payment_link.paid" && link?.id && link.reference_id) await markPaid({
			ref: link.reference_id,
			linkId: link.id,
			paymentId: body.payload?.payment?.entity?.id ?? "",
			amountPaise: link.amount_paid
		});
		else if (body.event === "payment_link.expired" && link?.reference_id) await markExpired(link.reference_id);
		return new Response("ok");
	} catch (error) {
		console.error("[webhook]", error);
		return new Response("error", { status: 500 });
	}
} } } });
var $$splitComponentImporter = () => import("./dress._slug-BfKPTKAa.mjs");
var Route = createFileRoute("/dress/$slug")({
	head: ({ params }) => {
		const dress = dressBySlug(params.slug);
		if (!dress) return seo({
			...PAGES.notFound,
			path: `/dress/${params.slug}`,
			noindex: true
		});
		const title = dressTitle(dress);
		const description = dressDescription(dress);
		const path = `/dress/${dress.slug}`;
		return seo({
			title,
			description,
			path,
			image: dress.image,
			jsonLd: [graph(breadcrumbNode([["New arrivals", "/shop"], [dress.name, path]]), pageNode("ItemPage", title, description, path), productNode(dress))]
		});
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var rootRouteChildren = {
	IndexRoute: Route$20.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$21
	}),
	SplatRoute: Route$19.update({
		id: "/$",
		path: "/$",
		getParentRoute: () => Route$21
	}),
	AboutRoute: Route$18.update({
		id: "/about",
		path: "/about",
		getParentRoute: () => Route$21
	}),
	AdminRoute: Route$17.update({
		id: "/admin",
		path: "/admin",
		getParentRoute: () => Route$21
	}),
	CheckoutRoute: Route$16.update({
		id: "/checkout",
		path: "/checkout",
		getParentRoute: () => Route$21
	}),
	CollectionsRoute: Route$15.update({
		id: "/collections",
		path: "/collections",
		getParentRoute: () => Route$21
	}),
	ConfirmedRoute: Route$14.update({
		id: "/confirmed",
		path: "/confirmed",
		getParentRoute: () => Route$21
	}),
	ContactRoute: Route$13.update({
		id: "/contact",
		path: "/contact",
		getParentRoute: () => Route$21
	}),
	ExchangeRoute: Route$12.update({
		id: "/exchange",
		path: "/exchange",
		getParentRoute: () => Route$21
	}),
	FaqRoute: Route$11.update({
		id: "/faq",
		path: "/faq",
		getParentRoute: () => Route$21
	}),
	HowItWorksRoute: Route$10.update({
		id: "/how-it-works",
		path: "/how-it-works",
		getParentRoute: () => Route$21
	}),
	LoginRoute: Route$9.update({
		id: "/login",
		path: "/login",
		getParentRoute: () => Route$21
	}),
	PrivacyRoute: Route$8.update({
		id: "/privacy",
		path: "/privacy",
		getParentRoute: () => Route$21
	}),
	ShippingRoute: Route$7.update({
		id: "/shipping",
		path: "/shipping",
		getParentRoute: () => Route$21
	}),
	ShopRoute: Route$6.update({
		id: "/shop",
		path: "/shop",
		getParentRoute: () => Route$21
	}),
	SizeGuideRoute: Route$5.update({
		id: "/size-guide",
		path: "/size-guide",
		getParentRoute: () => Route$21
	}),
	TermsRoute: Route$4.update({
		id: "/terms",
		path: "/terms",
		getParentRoute: () => Route$21
	}),
	TrialRoute: Route$3.update({
		id: "/trial",
		path: "/trial",
		getParentRoute: () => Route$21
	}),
	ApiRazorpayReturnRoute: Route$2.update({
		id: "/api/razorpay-return",
		path: "/api/razorpay-return",
		getParentRoute: () => Route$21
	}),
	ApiRazorpayWebhookRoute: Route$1.update({
		id: "/api/razorpay-webhook",
		path: "/api/razorpay-webhook",
		getParentRoute: () => Route$21
	}),
	DressSlugRoute: Route.update({
		id: "/dress/$slug",
		path: "/dress/$slug",
		getParentRoute: () => Route$21
	})
};
var routeTree = Route$21._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { Route$14 as a, FAQS as c, STEPS as i, Route as n, setMode as o, Route$6 as r, useThemeMode as s, router_exports as t };
