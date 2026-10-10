export type CollectionId = "peacock" | "mirror" | "festive";

export type Dress = {
  slug: string;
  name: string;
  collection: CollectionId;
  price: number;
  was: number;
  image: string;
  alt: string;
  badge?: string;
  colors: string;
  work: string;
  occasion: string;
  story: string;
  details: string;
};

export const COLLECTIONS: {
  id: CollectionId;
  name: string;
  line: string;
  image: string;
  alt: string;
}[] = [
  {
    id: "peacock",
    name: "Peacock Border",
    line: "Wide hems of peacocks, florals and stitched mirror tiles.",
    image: "/dresses/peacock-purple.jpg",
    alt: "Purple chaniya choli with a wide peacock and mirror border",
  },
  {
    id: "mirror",
    name: "Mirror Work",
    line: "Panelled flares set with squares of mirror, made to spin.",
    image: "/dresses/ivory-panel.jpg",
    alt: "Black and ivory chaniya choli with a multicolour mirror hem",
  },
  {
    id: "festive",
    name: "Festive Lehengas",
    line: "Butis, stripes and patchwork hems for the nine nights.",
    image: "/dresses/magenta-buti.jpg",
    alt: "Magenta buti lehenga worn on a Garba ground",
  },
];

export const DRESSES: Dress[] = [
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
    details:
      "The chaniya is a solid violet ground with a broad hem of peacocks, marigolds and mirror tiles, edged in a ruffled border. The square-neck blouse repeats the yoke, and the dupatta carries the same border with mustard tassels.",
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
    details:
      "A black choli with a gold mirror yoke sits above an ivory chaniya banded in multicolour mirror squares. The white dupatta is bordered to match and finished with soft tassels. Light enough for a full night of rounds.",
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
    details:
      "Maroon chaniya and choli, with a wide embroidered border of peacocks, flowers and mirrors. The dupatta repeats the border and ends in mustard tassels. Blouse is a square neck with elbow sleeves.",
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
    details:
      "The choli is deep green with a fully worked mirror yoke. The chaniya opens from green into a yellow flare, banded with multicolour mirror squares and a clean yellow fall. Dupatta is yellow with a matching border.",
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
    details:
      "A black lehenga striped in fine gold, with scalloped red-and-gold embroidered arches at the hem and a ruffled edge. The choli and dupatta are densely worked in the same red ground. One piece in this colourway for Navratri.",
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
    details:
      "Black chaniya and choli with the full peacock, floral and mirror hem used across the peacock set. Dupatta is black with the same border and mustard tassels. A sharp night look that still flashes under Garba lights.",
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
    details:
      "A navy-and-black blouse with striped cuffs, and a lehenga built from broad panels of white, green, purple, gold, navy and black, each edged with fine silver lines. The dupatta picks up the same colours. Easy movement, no heavy embroidery.",
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
    details:
      "A magenta chaniya covered in small white butis, a matching short-sleeve choli, and an ivory dupatta scattered with the same motif and finished with white tassels. The flare is the point: it holds a circle when you turn.",
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
    details:
      "A full ivory lehenga with a deep violet yoke and a wide mirror-square border. The choli is violet with a worked panel, and the drape carries multicolour pom-pom tassels. Photographed the way it is meant to be worn — mid-turn.",
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
    details:
      "A teal lehenga with fine gold vertical stripes and a scalloped hem of mixed brocade — florals, geometrics and gold. The choli is fully embroidered, with a deep teal waistband. Heavier than the cotton flares; best if you want richness over maximum spin.",
  },
];

export function dressBySlug(slug: string) {
  return DRESSES.find((dress) => dress.slug === slug);
}

export function collectionById(id: string) {
  return COLLECTIONS.find((collection) => collection.id === id);
}

export function dressesIn(id: CollectionId) {
  return DRESSES.filter((dress) => dress.collection === id);
}

export function relatedDresses(slug: string) {
  const current = dressBySlug(slug);
  if (!current) return DRESSES.slice(0, 3);
  const same = DRESSES.filter((dress) => dress.collection === current.collection && dress.slug !== slug);
  const rest = DRESSES.filter((dress) => dress.collection !== current.collection && dress.slug !== slug);
  return [...same, ...rest].slice(0, 3);
}

const BUILT_IN_COUNT = DRESSES.length;
export const BUILT_IN_SLUGS: string[] = DRESSES.map((dress) => dress.slug);

/** Outfits added from the admin panel. They are put into DRESSES, so every page sees them like the built-in ones. */
export function setExtraDresses(extra: Dress[]) {
  DRESSES.length = BUILT_IN_COUNT;
  for (const dress of extra) {
    if (!DRESSES.some((existing) => existing.slug === dress.slug)) DRESSES.push(dress);
  }
}
