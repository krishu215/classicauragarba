import type { ReactNode } from "react";

/** A titled block of explanatory copy used under the main content of a page. */
export function Prose({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-14 max-w-3xl space-y-4 text-mute">
      <h2 className="font-display text-3xl text-cream md:text-4xl">{title}</h2>
      {children}
    </section>
  );
}
