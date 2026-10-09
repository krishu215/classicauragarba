/** Natural pixel size of every bundled image, so each <img> can reserve its space before it loads. */
const SIZES: Record<string, [number, number]> = {
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
  "/dresses/teal-patch.jpg": [1024, 1536],
};

export function imgSize(src: string) {
  const [width, height] = SIZES[src] ?? [900, 1200];
  return { width, height };
}
