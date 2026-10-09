import { _ as lte, f as and, g as lt, h as inArray, p as eq, v as or, y as sql } from "../_libs/drizzle-orm+postgres.mjs";
import { f as optionalEnv, o as database, p as siteUrl, s as emailOutbox } from "./booking-repository.server-DMeZHa6D.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/mail.server-BoiOOyIE.js
var COLLECTIONS = [
	{
		id: "peacock",
		name: "Peacock Border",
		line: "Wide hems of peacocks, florals and stitched mirror tiles.",
		image: "/dresses/peacock-purple.jpg",
		alt: "Purple chaniya choli with a wide peacock and mirror border"
	},
	{
		id: "mirror",
		name: "Mirror Work",
		line: "Panelled flares set with squares of mirror, made to spin.",
		image: "/dresses/ivory-panel.jpg",
		alt: "Black and ivory chaniya choli with a multicolour mirror hem"
	},
	{
		id: "festive",
		name: "Festive Lehengas",
		line: "Butis, stripes and patchwork hems for the nine nights.",
		image: "/dresses/magenta-buti.jpg",
		alt: "Magenta buti lehenga worn on a Garba ground"
	}
];
var DRESSES = [
	{
		slug: "royal-peacock",
		name: "Royal Peacock Mirror Chaniya Choli",
		collection: "peacock",
		price: 699,
		was: 899,
		image: "/dresses/peacock-purple.jpg",
		alt: "Woman in a deep purple chaniya choli with peacock mirror border and a gold dupatta",
		badge: "New",
		colors: "Purple, gold, multicolour",
		work: "Peacock and floral mirror border, gota, mustard tassels",
		occasion: "Navratri Garba and Dandiya nights",
		story: "A deep violet flare that opens wide with every step, finished in a procession of peacocks.",
		details: "The chaniya is a solid violet ground with a broad hem of peacocks, marigolds and mirror tiles, edged in a ruffled border. The square-neck blouse repeats the yoke, and the dupatta carries the same border with mustard tassels."
	},
	{
		slug: "ivory-panel",
		name: "Ivory Panel Mirror Chaniya Choli",
		collection: "mirror",
		price: 599,
		was: 799,
		image: "/dresses/ivory-panel.jpg",
		alt: "Woman in a black blouse and ivory chaniya with multicolour mirror panels at a night Garba",
		badge: "Bestseller",
		colors: "Black, ivory, multicolour",
		work: "Mirror-square panels, gota edging, white dupatta",
		occasion: "Navratri Garba and Dandiya nights",
		story: "Black on the bodice, ivory on the flare — the hem does the talking once the music starts.",
		details: "A black choli with a gold mirror yoke sits above an ivory chaniya banded in multicolour mirror squares. The white dupatta is bordered to match and finished with soft tassels. Light enough for a full night of rounds."
	},
	{
		slug: "maroon-peacock",
		name: "Maroon Peacock Border Chaniya Choli",
		collection: "peacock",
		price: 699,
		was: 899,
		image: "/dresses/peacock-maroon.jpg",
		alt: "Woman in a maroon chaniya choli with a peacock and floral mirror border",
		badge: "New",
		colors: "Maroon, gold, multicolour",
		work: "Peacock mirror border and mustard tassels",
		occasion: "Navratri Garba and Dandiya nights",
		story: "The same peacock hem as the violet sister, cut in a deeper festive maroon.",
		details: "Maroon chaniya and choli, with a wide embroidered border of peacocks, flowers and mirrors. The dupatta repeats the border and ends in mustard tassels. Blouse is a square neck with elbow sleeves."
	},
	{
		slug: "sunflower-panel",
		name: "Sunflower Panel Mirror Chaniya Choli",
		collection: "mirror",
		price: 649,
		was: 849,
		image: "/dresses/sunflower-panel.jpg",
		alt: "Woman in a green blouse and yellow chaniya with mirror-square panels",
		badge: "Bestseller",
		colors: "Green, yellow, multicolour",
		work: "Mirror-square hem panels and a yellow dupatta",
		occasion: "Navratri Garba and Dandiya nights",
		story: "Forest green above, sunflower yellow below — built for the circle.",
		details: "The choli is deep green with a fully worked mirror yoke. The chaniya opens from green into a yellow flare, banded with multicolour mirror squares and a clean yellow fall. Dupatta is yellow with a matching border."
	},
	{
		slug: "noir-arch",
		name: "Noir Arch Hem Lehenga",
		collection: "festive",
		price: 799,
		was: 999,
		image: "/dresses/noir-arch.jpg",
		alt: "Woman in a black lehenga with gold stripes and red arched embroidery at the hem",
		badge: "Limited",
		colors: "Black, red, gold",
		work: "Gold stripe panels and arched zari hems",
		occasion: "Navratri Garba, sangeet and festive evenings",
		story: "Black silk-look panels, gold lines, and a hem of red arches — quieter from far, loud up close.",
		details: "A black lehenga striped in fine gold, with scalloped red-and-gold embroidered arches at the hem and a ruffled edge. The choli and dupatta are densely worked in the same red ground. One piece in this colourway for Navratri."
	},
	{
		slug: "midnight-peacock",
		name: "Midnight Peacock Border Chaniya Choli",
		collection: "peacock",
		price: 699,
		was: 899,
		image: "/dresses/peacock-black.jpg",
		alt: "Woman in a black chaniya choli with a colourful peacock mirror border",
		colors: "Black, gold, multicolour",
		work: "Peacock mirror border on a black ground",
		occasion: "Navratri Garba and Dandiya nights",
		story: "Every colour of the border reads brighter because the ground is black.",
		details: "Black chaniya and choli with the full peacock, floral and mirror hem used across the peacock set. Dupatta is black with the same border and mustard tassels. A sharp night look that still flashes under Garba lights."
	},
	{
		slug: "panchrangi-stripe",
		name: "Panchrangi Stripe Lehenga",
		collection: "festive",
		price: 599,
		was: 799,
		image: "/dresses/navratri-stripe.jpg",
		alt: "Woman in a multicolour striped lehenga with a navy and black blouse",
		badge: "Offer",
		colors: "Navy, white, green, purple, gold, black",
		work: "Colour-blocked stripes with silver gota lines",
		occasion: "Navratri Garba and Dandiya nights",
		story: "White, green, purple, gold and navy — the nine nights, in one skirt.",
		details: "A navy-and-black blouse with striped cuffs, and a lehenga built from broad panels of white, green, purple, gold, navy and black, each edged with fine silver lines. The dupatta picks up the same colours. Easy movement, no heavy embroidery."
	},
	{
		slug: "magenta-buti",
		name: "Magenta Buti Lehenga",
		collection: "festive",
		price: 549,
		was: 749,
		image: "/dresses/magenta-buti.jpg",
		alt: "Woman spinning in a magenta lehenga with white butis on a rangoli",
		badge: "Bestseller",
		colors: "Magenta, white",
		work: "Scattered white butis and tassel dupatta",
		occasion: "Navratri Garba and Dandiya nights",
		story: "The one you can actually dance in for three hours — light, full, and readable from across the ground.",
		details: "A magenta chaniya covered in small white butis, a matching short-sleeve choli, and an ivory dupatta scattered with the same motif and finished with white tassels. The flare is the point: it holds a circle when you turn."
	},
	{
		slug: "ivory-violet",
		name: "Ivory & Violet Mirror Lehenga",
		collection: "mirror",
		price: 649,
		was: 849,
		image: "/dresses/ivory-violet.jpg",
		alt: "Woman dancing in an ivory lehenga with a violet mirror-work border",
		badge: "New",
		colors: "Ivory, violet, multicolour",
		work: "Mirror-square border and pom-pom tassels",
		occasion: "Navratri Garba and Dandiya nights",
		story: "Ivory through the spin, violet at the hem, mirrors catching the string lights.",
		details: "A full ivory lehenga with a deep violet yoke and a wide mirror-square border. The choli is violet with a worked panel, and the drape carries multicolour pom-pom tassels. Photographed the way it is meant to be worn — mid-turn."
	},
	{
		slug: "teal-patch",
		name: "Teal Patchwork Hem Lehenga",
		collection: "festive",
		price: 799,
		was: 1099,
		image: "/dresses/teal-patch.jpg",
		alt: "Woman in a teal lehenga with gold stripes and a scalloped patchwork hem",
		badge: "Limited",
		colors: "Teal, gold, multicolour",
		work: "Gold stripe panels and brocade patchwork arches",
		occasion: "Navratri Garba, sangeet and festive evenings",
		story: "Teal and gold from a distance. Up close, the hem is a row of brocade arches.",
		details: "A teal lehenga with fine gold vertical stripes and a scalloped hem of mixed brocade — florals, geometrics and gold. The choli is fully embroidered, with a deep teal waistband. Heavier than the cotton flares; best if you want richness over maximum spin."
	}
];
function dressBySlug(slug) {
	return DRESSES.find((dress) => dress.slug === slug);
}
function dressesIn(id) {
	return DRESSES.filter((dress) => dress.collection === id);
}
function relatedDresses(slug) {
	const current = dressBySlug(slug);
	if (!current) return DRESSES.slice(0, 3);
	const same = DRESSES.filter((dress) => dress.collection === current.collection && dress.slug !== slug);
	const rest = DRESSES.filter((dress) => dress.collection !== current.collection && dress.slug !== slug);
	return [...same, ...rest].slice(0, 3);
}
var PHONE_DISPLAY = "+91 74770 87755";
var PHONE_TEL = "+917477087755";
var EMAIL = "hello@classicaura.in";
var INSTAGRAM = "@classicaura";
function waLink(text) {
	const base = "https://wa.me/917477087755";
	if (!text) return base;
	return `${base}?text=${encodeURIComponent(text)}`;
}
var WEEKDAYS = [
	"SUN",
	"MON",
	"TUE",
	"WED",
	"THU",
	"FRI",
	"SAT"
];
function buildSeason() {
	const days = [];
	for (let day = 8; day <= 22; day++) {
		const date = new Date(Date.UTC(2026, 9, day));
		days.push({
			iso: `2026-10-${String(day).padStart(2, "0")}`,
			wd: WEEKDAYS[date.getUTCDay()],
			day: String(day),
			mon: "OCT"
		});
	}
	return days;
}
var SEASON = buildSeason();
function todayIso() {
	return new Intl.DateTimeFormat("en-CA", {
		timeZone: "Asia/Kolkata",
		year: "numeric",
		month: "2-digit",
		day: "2-digit"
	}).format(/* @__PURE__ */ new Date());
}
function dayStatus(slug, iso, today = todayIso()) {
	if (iso < today) return "closed";
	if (iso < "2026-10-08" || iso > "2026-10-22") return "closed";
	let hash = 0;
	const key = `${slug}:${iso}`;
	for (let i = 0; i < key.length; i++) hash = hash * 33 + key.charCodeAt(i) >>> 0;
	const bucket = hash % 11;
	if (bucket <= 1) return "rented";
	if (bucket === 2) return "last";
	return "available";
}
function firstOpenDate(slug, today = todayIso()) {
	return SEASON.find((day) => {
		const status = dayStatus(slug, day.iso, today);
		return status === "available" || status === "last";
	})?.iso ?? null;
}
function inr(amount) {
	return `₹${amount.toLocaleString("en-IN")}`;
}
function quote(pricePerDay, days) {
	const off = days === 1 ? 0 : days === 2 ? .1 : .2;
	return {
		fee: Math.round(pricePerDay * days * (1 - off)),
		off,
		days,
		perDay: pricePerDay
	};
}
function formatLong(iso) {
	const [year, month, day] = iso.split("-").map(Number);
	const date = new Date(Date.UTC(year, month - 1, day));
	return new Intl.DateTimeFormat("en-IN", {
		timeZone: "UTC",
		weekday: "short",
		day: "numeric",
		month: "short",
		year: "numeric"
	}).format(date);
}
var escapeHtml = (value) => String(value ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
function emailButton(label, path) {
	return `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:28px 0"><tr><td bgcolor="#b08958" style="border-radius:3px"><a href="${escapeHtml(siteUrl() + path)}" style="display:inline-block;padding:14px 24px;color:#1b110a;font-family:Georgia,serif;font-size:16px;text-decoration:none;font-weight:bold">${escapeHtml(label)}</a></td></tr></table>`;
}
function emailLayout(preview, content) {
	return `<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="dark light"><title>Classic Aura</title></head><body style="margin:0;padding:0;background:#1b110a;color:#f6f0e6"><div style="display:none;max-height:0;overflow:hidden;opacity:0">${escapeHtml(preview)}</div><table role="presentation" width="100%" cellpadding="0" cellspacing="0" bgcolor="#1b110a"><tr><td align="center" style="padding:32px 16px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;border:1px solid #4a3727"><tr><td align="center" style="padding:32px 24px;border-bottom:1px solid #4a3727"><p style="margin:0 0 12px;color:#b08958;font-size:24px">&#10045;</p><a href="${escapeHtml(siteUrl())}" style="font-family:'Cormorant Garamond',Georgia,serif;font-size:30px;letter-spacing:2px;color:#f6f0e6;text-decoration:none">CLASSIC AURA</a><p style="margin:10px 0 0;font-family:Jost,'Trebuchet MS',sans-serif;font-size:10px;letter-spacing:4px;color:#b08958">— GARBA DRESSES —</p></td></tr><tr><td bgcolor="#241710" style="padding:32px 24px;font-family:Jost,'Trebuchet MS',sans-serif;font-size:15px;line-height:1.7;color:#f6f0e6">${content}</td></tr><tr><td style="padding:24px;text-align:center;font-family:Jost,'Trebuchet MS',sans-serif;color:#cdb99d;font-size:12px;line-height:1.8">Garba dresses on rent · Indore<br>Free delivery &amp; pickup across Indore<br><a href="${escapeHtml(siteUrl())}/contact" style="color:#b08958">Contact Classic Aura</a></td></tr></table></td></tr></table></body></html>`;
}
function itemsHtml(booking) {
	return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0">${(booking.booking_items ?? []).map((item) => {
		const name = dressBySlug(item.dress_slug)?.name ?? item.dress_slug;
		const detail = booking.kind === "trial" ? "Free home trial" : `${item.rental_date ? formatLong(item.rental_date) : ""} · ${item.days} day${item.days === 1 ? "" : "s"} · ${inr(item.fee)}`;
		return `<tr><td style="padding:14px 0;border-bottom:1px solid #4a3727"><strong style="color:#f6f0e6">${escapeHtml(name)}</strong><br><span style="color:#cdb99d;font-size:13px">${escapeHtml(detail)}</span></td></tr>`;
	}).join("")}</table>`;
}
function bookingMessages(booking, event) {
	const trial = booking.kind === "trial";
	const paid = Boolean(booking.razorpay_payment_id);
	const title = event === "delivered" ? "Your order is delivered" : event === "confirmed" ? "Your order is confirmed" : trial ? "Your home trial request is received" : "Your order request is received";
	const description = event === "delivered" ? "Your outfits have been delivered. Enjoy your Garba celebrations! Our team is here if you need help with your outfit or pickup." : event === "confirmed" ? booking.delivery_slot ? `Delivery time: ${escapeHtml(booking.delivery_slot)}` : "Our team will message you on WhatsApp with your delivery time." : "Our team is checking your request and will confirm it shortly. This email is not an order confirmation.";
	const html = emailLayout(`${title} · ${booking.ref}`, `
    <p style="margin:0 0 12px;font-size:11px;letter-spacing:3px;color:#b08958">${event === "delivered" ? "DELIVERY UPDATE" : "YOUR CLASSIC AURA ORDER"}</p>
    <h1 style="margin:0 0 20px;font-family:'Cormorant Garamond',Georgia,serif;font-size:32px;font-weight:400;line-height:1.2;color:#f6f0e6">${title}</h1>
    <p>Hi ${escapeHtml(booking.name)},</p><p>${description}</p>
    <p style="padding:14px 16px;border:1px solid #4a3727;color:#cdb99d">Order reference <strong style="color:#b08958">${escapeHtml(booking.ref)}</strong>${trial ? "<br>Free home trial" : ""}</p>
    ${itemsHtml(booking)}
    ${trial ? "" : `<p><strong>${paid ? "Paid online" : "Cash on delivery"}: ${escapeHtml(inr(booking.total))}</strong></p>`}
    <p style="color:#cdb99d">Delivery address<br><span style="color:#f6f0e6">${escapeHtml(booking.address)}, ${escapeHtml(booking.area)}, ${escapeHtml(booking.city)} ${escapeHtml(booking.pincode)}</span></p>
    ${emailButton("View your orders", "/login")}
    <p style="font-size:13px;color:#cdb99d">Sign in with the email address used for this order.</p>`);
	const messages = [{
		key: `booking:${booking.id}:customer:${event}`,
		message: {
			to: booking.email,
			subject: `${title} · ${booking.ref} · Classic Aura`,
			html,
			replyTo: optionalEnv("ADMIN_NOTIFY_EMAIL")
		}
	}];
	const owner = optionalEnv("ADMIN_NOTIFY_EMAIL");
	if (owner && event !== "delivered") {
		const ownerTitle = event === "confirmed" ? "Confirmed order" : "New order request";
		messages.push({
			key: `booking:${booking.id}:owner:${event}`,
			message: {
				to: owner,
				subject: `${ownerTitle} ${booking.ref} · Classic Aura`,
				replyTo: booking.email,
				html: emailLayout(`${ownerTitle} ${booking.ref}`, `<h1 style="font-family:Georgia,serif;font-weight:400">${ownerTitle} ${escapeHtml(booking.ref)}</h1><p>${escapeHtml(booking.name)} · ${escapeHtml(booking.mobile)} · ${escapeHtml(booking.email)}</p><p>${escapeHtml(booking.address)}, ${escapeHtml(booking.area)}, ${escapeHtml(booking.city)} ${escapeHtml(booking.pincode)}</p>${booking.preferred_time ? `<p>Preferred time: ${escapeHtml(booking.preferred_time)}</p>` : ""}${booking.notes ? `<p>Notes: ${escapeHtml(booking.notes)}</p>` : ""}${itemsHtml(booking)}<p>${trial ? "Free home trial" : `${paid ? "Paid" : "Cash on delivery"}: ${escapeHtml(inr(booking.total))}`}</p>${emailButton("Open dashboard", "/admin")}`)
			}
		});
	}
	return messages;
}
async function queueMessages(store, messages) {
	if (messages.length) await store.insert(emailOutbox).values(messages).onConflictDoNothing();
	return messages.map((message) => message.key);
}
async function deliverEmails(keys) {
	const store = database();
	const now = /* @__PURE__ */ new Date();
	await store.update(emailOutbox).set({
		status: "failed",
		lease_until: null,
		last_error: "Email delivery retry limit reached"
	}).where(and(eq(emailOutbox.status, "sending"), lte(emailOutbox.lease_until, now), eq(emailOutbox.attempts, 10)));
	const due = and(keys ? inArray(emailOutbox.key, keys) : void 0, lt(emailOutbox.attempts, 10), lte(emailOutbox.next_attempt_at, now), or(eq(emailOutbox.status, "pending"), and(eq(emailOutbox.status, "sending"), lte(emailOutbox.lease_until, now))));
	const apiKey = optionalEnv("RESEND_API_KEY");
	const from = optionalEnv("MAIL_FROM");
	if (!apiKey || !from) {
		await store.update(emailOutbox).set({
			last_error: "Email provider is not configured",
			next_attempt_at: new Date(Date.now() + 3e5)
		}).where(due);
		return;
	}
	const candidates = await store.select({ key: emailOutbox.key }).from(emailOutbox).where(due).limit(20);
	await Promise.all(candidates.map(async (candidate) => {
		const [claimed] = await store.update(emailOutbox).set({
			status: "sending",
			lease_until: new Date(Date.now() + 12e4),
			attempts: sql`${emailOutbox.attempts} + 1`
		}).where(and(due, eq(emailOutbox.key, candidate.key))).returning();
		if (!claimed) return;
		let failure = "Email delivery could not be completed";
		try {
			const response = await fetch("https://api.resend.com/emails", {
				method: "POST",
				signal: AbortSignal.timeout(15e3),
				headers: {
					Authorization: `Bearer ${apiKey}`,
					"Content-Type": "application/json",
					"Idempotency-Key": claimed.key
				},
				body: JSON.stringify({
					from,
					to: claimed.message.to,
					subject: claimed.message.subject,
					html: claimed.message.html,
					reply_to: claimed.message.replyTo
				})
			});
			if (response.ok) {
				await store.update(emailOutbox).set({
					status: "sent",
					sent_at: /* @__PURE__ */ new Date(),
					lease_until: null,
					last_error: null
				}).where(eq(emailOutbox.key, claimed.key));
				return;
			}
			failure = `Email provider returned HTTP ${response.status}`;
		} catch {
			failure = "Email provider connection failed";
		}
		await store.update(emailOutbox).set({
			status: claimed.attempts >= 10 ? "failed" : "pending",
			lease_until: null,
			last_error: failure,
			next_attempt_at: new Date(Date.now() + Math.min(18e5, 6e4 * 2 ** claimed.attempts))
		}).where(eq(emailOutbox.key, claimed.key));
	}));
}
async function tryDeliverEmails(keys) {
	try {
		await deliverEmails(keys);
	} catch {
		console.error("[mail] Queued emails await delivery retry.");
	}
}
//#endregion
export { relatedDresses as _, PHONE_DISPLAY as a, waLink as b, bookingMessages as c, dressesIn as d, firstOpenDate as f, quote as g, queueMessages as h, INSTAGRAM as i, dayStatus as l, inr as m, DRESSES as n, PHONE_TEL as o, formatLong as p, EMAIL as r, SEASON as s, COLLECTIONS as t, dressBySlug as u, todayIso as v, tryDeliverEmails as y };
