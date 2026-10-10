import { DRESSES, type Dress } from "@/lib/dresses";
import { FAQS } from "@/lib/faq";
import { EMAIL, INSTAGRAM, PHONE_TEL } from "@/lib/site";

// The live address of the site. If you add your own domain later, set VITE_SITE_URL in Vercel (or change this line) and redeploy.
export const SITE_URL = (((import.meta as unknown as { env?: Record<string, string | undefined> }).env?.VITE_SITE_URL) ?? "https://classicauragarba.vercel.app").replace(/\/+$/, "");
export const SITE_NAME = "Classic Aura";
const BUSINESS_ID = `${SITE_URL}/#business`;
const WEBSITE_ID = `${SITE_URL}/#website`;

export function absolute(path: string) {
  return path.startsWith("http") ? path : `${SITE_URL}${path}`;
}

type SeoInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  noindex?: boolean;
  jsonLd?: object[];
};

/** Head tags for one page: title, unique description, canonical URL, social tags and JSON-LD. */
export function seo({ title, description, path, image, noindex = false, jsonLd = [] }: SeoInput) {
  const url = absolute(path);
  const picture = absolute(image ?? "/og.jpg");
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: noindex ? "noindex, follow" : "index, follow, max-image-preview:large" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: SITE_NAME },
      { property: "og:locale", content: "en_IN" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
      { property: "og:image", content: picture },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: picture },
    ],
    links: [{ rel: "canonical", href: url }],
    scripts: jsonLd.map((data) => ({
      type: "application/ld+json",
      children: JSON.stringify(data).replace(/</g, "\\u003c"),
    })),
  };
}

export function graph(...nodes: object[]) {
  return { "@context": "https://schema.org", "@graph": nodes };
}

export function businessNode() {
  const prices = DRESSES.map((dress) => dress.price);
  return {
    "@type": "ClothingStore",
    "@id": BUSINESS_ID,
    name: SITE_NAME,
    url: `${SITE_URL}/`,
    image: absolute("/og.jpg"),
    logo: absolute("/og.jpg"),
    description:
      "Garba chaniya choli and lehenga rental in Indore with free home trial, free delivery and pickup, and WhatsApp booking.",
    telephone: PHONE_TEL,
    email: EMAIL,
    priceRange: `₹${Math.min(...prices)}–₹${Math.max(...prices)} per day`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Indore",
      addressRegion: "Madhya Pradesh",
      addressCountry: "IN",
    },
    areaServed: { "@type": "City", name: "Indore" },
    sameAs: [`https://instagram.com/${INSTAGRAM.replace("@", "")}`],
  };
}

export function websiteNode() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: `${SITE_URL}/`,
    name: SITE_NAME,
    inLanguage: "en-IN",
    publisher: { "@id": BUSINESS_ID },
  };
}

export function breadcrumbNode(items: [name: string, path: string][]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [["Home", "/"] as [string, string], ...items].map(([name, path], index) => ({
      "@type": "ListItem",
      position: index + 1,
      name,
      item: absolute(path),
    })),
  };
}

export function pageNode(type: string, name: string, description: string, path: string) {
  return {
    "@type": type,
    "@id": `${absolute(path)}#webpage`,
    url: absolute(path),
    name,
    description,
    inLanguage: "en-IN",
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": BUSINESS_ID },
  };
}

export function itemListNode(dresses: Dress[]) {
  return {
    "@type": "ItemList",
    itemListElement: dresses.map((dress, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: absolute(`/dress/${dress.slug}`),
      name: dress.name,
    })),
  };
}

export function faqNode() {
  return {
    "@type": "FAQPage",
    mainEntity: FAQS.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

export function howToNode(name: string, steps: { title: string; line: string }[]) {
  return {
    "@type": "HowTo",
    name,
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.title,
      text: step.line,
    })),
  };
}

export function productNode(dress: Dress) {
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
    brand: { "@type": "Brand", name: SITE_NAME },
    offers: {
      "@type": "Offer",
      url,
      priceCurrency: "INR",
      price: String(dress.price),
      priceValidUntil: "2027-12-31",
      availability: "https://schema.org/InStock",
      seller: { "@id": BUSINESS_ID },
    },
  };
}

/** Product page title kept inside 50-60 characters. */
export function dressTitle(dress: Dress) {
  const options = [
    `${dress.name} on Rent in Indore | Classic Aura`,
    `${dress.name} on Rent | Classic Aura Indore`,
    `Rent ${dress.name} in Indore | Classic Aura`,
    `${dress.name} | Rent in Indore, Classic Aura`,
    `${dress.name} on Rent | Classic Aura`,
  ];
  return options.find((text) => text.length >= 50 && text.length <= 60) ?? options[options.length - 1];
}

/** Product page description kept inside 120-160 characters. */
export function dressDescription(dress: Dress) {
  const parts = [
    `Rent the ${dress.name} in Indore for ₹${dress.price} a day.`,
    `${dress.colors}.`,
    "Free home delivery, free home trial and WhatsApp booking for Navratri 2026.",
  ];
  let text = parts.join(" ");
  if (text.length > 160) text = [parts[0], parts[2]].join(" ");
  return text;
}
