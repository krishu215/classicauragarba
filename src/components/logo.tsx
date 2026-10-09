import { Link } from "@tanstack/react-router";

export function Mark({ className = "size-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1.3">
        <ellipse cx="16" cy="9" rx="2.6" ry="6" />
        <ellipse cx="16" cy="9" rx="2.6" ry="6" transform="rotate(90 16 16)" />
        <ellipse cx="16" cy="9" rx="2.6" ry="6" transform="rotate(45 16 16)" />
        <ellipse cx="16" cy="9" rx="2.6" ry="6" transform="rotate(-45 16 16)" />
      </g>
      <circle cx="16" cy="16" r="2" fill="currentColor" />
    </svg>
  );
}

/** Stacked logo: ornament, CLASSIC AURA, — GARBA DRESSES —. */
export function Logo({ size = "md" }: { size?: "sm" | "md" }) {
  const small = size === "sm";
  return (
    <Link
      to="/"
      className="flex w-max flex-col items-center leading-none"
      aria-label="Classic Aura Garba Dresses"
    >
      <Mark className={small ? "size-5" : "size-7"} />
      <span
        className={
          "mt-1 font-display tracking-[0.03em] " + (small ? "text-[1.05rem] min-[380px]:text-[1.25rem] sm:text-[1.6rem]" : "text-[1.1rem] min-[380px]:text-[1.35rem] sm:text-[1.75rem] md:text-[2.4rem]")
        }
      >
        CLASSIC AURA
      </span>
      <span
        className={
          "mt-1.5 flex w-full items-center gap-2 font-sans " +
          (small ? "text-[0.45rem] tracking-[0.2em] min-[380px]:text-[0.5rem] min-[380px]:tracking-[0.22em] sm:text-[0.55rem] sm:tracking-[0.26em]" : "text-[0.46rem] tracking-[0.2em] min-[380px]:text-[0.52rem] min-[380px]:tracking-[0.24em] sm:text-[0.6rem] sm:tracking-[0.28em] md:text-[0.78rem] md:tracking-[0.3em]")
        }
      >
        <i className="h-px flex-1 bg-current opacity-80" />
        GARBA DRESSES
        <i className="h-px flex-1 bg-current opacity-80" />
      </span>
    </Link>
  );
}
