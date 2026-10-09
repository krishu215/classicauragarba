import { imgSize } from "@/lib/images";
import { Link } from "@tanstack/react-router";
import type { Dress } from "@/lib/dresses";
import { inr } from "@/lib/site";

export function DressCard({ dress, tone = "light" }: { dress: Dress; tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  return (
    <article className="flex flex-col">
      <Link to="/dress/$slug" params={{ slug: dress.slug }} className="group block">
        <div className="portrait relative overflow-hidden bg-sand">
          <img
            src={dress.image} {...imgSize(dress.image)} loading="lazy" decoding="async"
            alt={dress.alt}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />
          {dress.badge ? (
            <span
              className={
                "absolute top-3 left-3 px-2 py-1 text-xs tracking-label uppercase " +
                "bg-ink text-cream"
              }
            >
              {dress.badge}
            </span>
          ) : null}
        </div>
        <h3 className={"mt-3 font-display text-2xl leading-tight " + "text-cream"}>
          {dress.name}
        </h3>
        <p className={"mt-1 text-sm " + (dark ? "text-mist" : "text-mute")}>
          <s className="opacity-70">{inr(dress.was)}</s>{" "}
          <span className={dark ? "text-cream" : "text-gold"}>{inr(dress.price)} / day</span>
        </p>
      </Link>
    </article>
  );
}
