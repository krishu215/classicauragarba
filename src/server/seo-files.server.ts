import { DRESSES } from "@/lib/dresses";
import { SITE_URL } from "@/lib/seo";
import { loadExtraDresses } from "./products.server";

/** Public pages that belong in the sitemap. Private pages (admin, login, checkout) are left out on purpose. */
export const PUBLIC_PAGES: { path: string; priority: string; title: string; line: string }[] = [
  { path: "/", priority: "1.0", title: "Home", line: "Garba chaniya choli and lehenga rental in Indore." },
  { path: "/shop", priority: "0.9", title: "Shop all outfits", line: "Every outfit with daily rent, colours and work." },
  { path: "/collections", priority: "0.8", title: "Collections", line: "Peacock Border, Mirror Work and Festive Lehengas." },
  { path: "/trial", priority: "0.8", title: "Free home trial", line: "Try up to three outfits at home before you book." },
  { path: "/how-it-works", priority: "0.7", title: "How it works", line: "From choosing an outfit to pickup after your Garba nights." },
  { path: "/faq", priority: "0.7", title: "FAQ", line: "Rental, delivery, payment and return questions answered." },
  { path: "/about", priority: "0.6", title: "About Classic Aura", line: "Who we are and how we rent outfits in Indore." },
  { path: "/contact", priority: "0.6", title: "Contact", line: "WhatsApp, phone and email." },
  { path: "/size-guide", priority: "0.5", title: "Size guide", line: "How to pick the right size." },
  { path: "/shipping", priority: "0.5", title: "Delivery and pickup", line: "Free delivery and pickup across Indore." },
  { path: "/exchange", priority: "0.5", title: "Exchange policy", line: "Change your outfit or date." },
  { path: "/terms", priority: "0.3", title: "Rental terms", line: "Terms of renting an outfit." },
  { path: "/privacy", priority: "0.3", title: "Privacy", line: "How we use your details." },
];

const text = (body: string, type: string) =>
  new Response(body, { headers: { "Content-Type": `${type}; charset=utf-8`, "Cache-Control": "public, max-age=0, s-maxage=3600" } });

const escapeXml = (value: string) => value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export async function sitemapResponse() {
  await loadExtraDresses();
  const urls = [
    ...PUBLIC_PAGES.map((page) => ({ loc: page.path === "/" ? `${SITE_URL}/` : `${SITE_URL}${page.path}`, priority: page.priority })),
    ...DRESSES.map((dress) => ({ loc: `${SITE_URL}/dress/${dress.slug}`, priority: "0.8" })),
  ];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map((url) => `  <url>\n    <loc>${escapeXml(url.loc)}</loc>\n    <priority>${url.priority}</priority>\n  </url>`)
    .join("\n")}\n</urlset>\n`;
  return text(xml, "application/xml");
}

export function robotsResponse() {
  return text(
    ["User-agent: *", "Allow: /", "Disallow: /admin", "Disallow: /login", "Disallow: /api/", "Disallow: /checkout", "Disallow: /confirmed", "", `Sitemap: ${SITE_URL}/sitemap.xml`, ""].join("\n"),
    "text/plain",
  );
}

/** llms.txt in the llmstxt.org format: title, short summary, then sections of links with a one-line note each. */
export async function llmsResponse() {
  await loadExtraDresses();
  const pages = PUBLIC_PAGES.map((page) => `- [${page.title}](${page.path === "/" ? `${SITE_URL}/` : `${SITE_URL}${page.path}`}): ${page.line}`);
  const outfits = DRESSES.map((dress) => `- [${dress.name}](${SITE_URL}/dress/${dress.slug}): Rent for \u20b9${dress.price} a day in Indore. ${dress.colors}.`);
  const body = [
    "# Classic Aura",
    "",
    "> Classic Aura rents Garba chaniya choli and lehengas by the day in Indore, Madhya Pradesh. Free home trial, free delivery and pickup across Indore, and cash on delivery.",
    "",
    "Outfits are rented, not sold. Bookings are confirmed on WhatsApp. Daily rent is shown on every outfit page.",
    "",
    "## Pages",
    "",
    ...pages,
    "",
    "## Outfits",
    "",
    ...outfits,
    "",
  ].join("\n");
  return text(body, "text/plain");
}
