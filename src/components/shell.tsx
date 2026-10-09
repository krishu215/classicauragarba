import { imgSize } from "@/lib/images";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, Monitor, Moon, Phone, Search, Shirt, ShoppingBag, Sun, X } from "lucide-react";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Logo } from "@/components/logo";
import { DRESSES } from "@/lib/dresses";
import { useBooking } from "@/lib/booking-store";
import { setMode, useThemeMode, type ThemeMode } from "@/lib/theme";
import { PHONE_DISPLAY, PHONE_TEL, EMAIL, INSTAGRAM, waLink } from "@/lib/site";

type NavLink = {
  to: "/" | "/shop" | "/collections" | "/how-it-works" | "/faq" | "/about" | "/login";
  label: string;
  hash?: string;
};

const LINKS: NavLink[] = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "New arrivals" },
  { to: "/collections", label: "Collections" },
  { to: "/how-it-works", label: "How it works" },
  { to: "/faq", label: "FAQ" },
  { to: "/about", label: "About" },
  { to: "/login", label: "Login / My orders" },
];

const MORE_LINKS = [
  { to: "/trial", label: "Home trial" },
  { to: "/checkout", label: "Checkout" },
  { to: "/size-guide", label: "Size guide" },
  { to: "/shipping", label: "Shipping" },
  { to: "/exchange", label: "Exchange" },
  { to: "/contact", label: "Contact" },
] as const;

const MODES: { id: ThemeMode; label: string }[] = [
  { id: "system", label: "Auto" },
  { id: "light", label: "Light" },
  { id: "dark", label: "Dark" },
];

function ModeIcon({ mode }: { mode: ThemeMode }) {
  if (mode === "light") return <Sun className="size-5" strokeWidth={1.5} />;
  if (mode === "dark") return <Moon className="size-5" strokeWidth={1.5} />;
  return <Monitor className="size-5" strokeWidth={1.5} />;
}

/** Header button: cycles Auto, Light, Dark. */
function ThemeToggle() {
  const mode = useThemeMode();
  const next = MODES[(MODES.findIndex((item) => item.id === mode) + 1) % MODES.length];
  const current = MODES.find((item) => item.id === mode)?.label ?? "Auto";
  const label = `Theme: ${current}. Switch to ${next.label}`;
  return (
    <button
      type="button"
      className="grid size-8 place-items-center min-[380px]:size-9 sm:size-11"
      aria-label={label}
      title={label}
      onClick={() => setMode(next.id)}
    >
      <ModeIcon mode={mode} />
    </button>
  );
}

/** Menu control: pick Auto, Light or Dark directly. */
function ThemePicker() {
  const mode = useThemeMode();
  return (
    <div className="mt-6 border-t border-line pt-6" role="group" aria-label="Theme">
      <p className="label">Theme</p>
      <div className="grid grid-cols-3 gap-2">
        {MODES.map((item) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={mode === item.id}
            className={"btn min-h-11 gap-2 px-2 " + (mode === item.id ? "btn-solid" : "btn-line")}
            onClick={() => setMode(item.id)}
          >
            <ModeIcon mode={item.id} />
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export function Shell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const home = pathname === "/";
  const trialCount = useBooking((state) => state.trial.length);
  const rentalCount = useBooking((state) => state.rentals.length);
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    void useBooking.persist.rehydrate();
  }, []);

  useEffect(() => {
    setMenu(false);
    setSearch(false);
  }, [pathname]);

  useEffect(() => {
    if (!menu && !search) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenu(false);
        setSearch(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menu, search]);

  useEffect(() => {
    document.body.style.overflow = menu || search ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menu, search]);

  // Over the hero the header floats on the photo, so it keeps light text in both themes.
  const overHero = home && !scrolled;

  return (
    <div className="flex min-h-screen flex-col overflow-x-clip bg-ink text-cream">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-cream focus:px-3 focus:py-2 focus:text-ink"
      >
        Skip to content
      </a>
      {home ? null : (
        <div className="bg-wine text-center text-sm text-ivory">
          <p className="px-4 py-2">
            Free home trial in Indore ·{" "}
            <a className="underline underline-offset-2" href={`tel:${PHONE_TEL}`}>
              {PHONE_DISPLAY}
            </a>
          </p>
        </div>
      )}
      <header
        className={
          "z-30 transition-colors duration-300 " +
          (home ? "fixed inset-x-0 top-0 " : "sticky top-0 ") +
          (overHero
            ? "bg-linear-to-b from-night/70 to-transparent text-ivory"
            : "border-b border-line bg-ink/95 text-cream backdrop-blur")
        }
      >
        <div
          className={
            "mx-auto grid max-w-[1500px] grid-cols-[minmax(0,1fr)_auto] items-center gap-2 px-4 sm:gap-4 sm:px-5 xl:grid-cols-[auto_1fr_auto] xl:px-[6vw] " +
            (home && !scrolled ? "py-4 xl:py-6" : "py-2 xl:py-3")
          }
        >
          <Logo size={overHero ? "md" : "sm"} />
          <nav className="hidden items-center justify-center gap-7 text-[0.95rem] font-light xl:flex 2xl:gap-10" aria-label="Primary">
            {LINKS.map((link) => {
              const on = link.hash ? false : link.to === "/" ? pathname === "/" : pathname.startsWith(link.to);
              return (
                <Link
                  key={link.label}
                  to={link.to}
                  hash={link.hash}
                  className={"border-b py-1 " + (on ? "border-current" : "border-transparent hover:border-current")}
                  aria-current={on ? "page" : undefined}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
          <div className="flex items-center justify-end">
            <button type="button" className="grid size-8 place-items-center min-[380px]:size-9 sm:size-11" aria-label="Search dresses" onClick={() => setSearch(true)}>
              <Search className="size-5" strokeWidth={1.5} />
            </button>
            <ThemeToggle />
            <Link to="/trial" className="relative hidden size-11 place-items-center xl:grid" aria-label="Free home trial">
              <Shirt className="size-5" strokeWidth={1.5} />
              {trialCount > 0 ? (
                <span className="absolute top-1 right-1 grid size-4 place-items-center bg-wine text-xs text-ivory">{trialCount}</span>
              ) : null}
            </Link>
            <Link to="/checkout" className="relative grid size-8 place-items-center min-[380px]:size-9 sm:size-11" aria-label={rentalCount > 0 ? `Checkout, ${rentalCount} outfit${rentalCount > 1 ? "s" : ""}` : "Checkout"}>
              <ShoppingBag className="size-5" strokeWidth={1.5} />
              {rentalCount > 0 ? (
                <span className="absolute top-1 right-1 grid size-4 place-items-center bg-wine text-xs text-ivory">{rentalCount}</span>
              ) : trialCount > 0 ? (
                <span className="absolute top-1 right-1 grid size-4 place-items-center bg-wine text-xs text-ivory xl:hidden">{trialCount}</span>
              ) : null}
            </Link>
            <button type="button" className="grid size-8 place-items-center min-[380px]:size-9 sm:size-11 xl:hidden" aria-label="Menu" onClick={() => setMenu(true)}>
              <Menu className="size-5" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </header>
      {menu ? <MobileMenu onClose={() => setMenu(false)} /> : null}
      {search ? <SearchPanel onClose={() => setSearch(false)} /> : null}
      <div className="flex-1" id="content">
        {children}
      </div>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

function WhatsAppButton() {
  return (
    <a
      href={waLink("Hi Classic Aura, I want to rent a Garba dress.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Classic Aura on WhatsApp"
      title="Chat on WhatsApp"
      className="fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-20 grid size-14 place-items-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/30 transition hover:scale-105 hover:bg-[#1ebe5b] md:right-6 md:bottom-6 md:size-16"
    >
      <svg viewBox="0 0 24 24" className="size-8 md:size-9" fill="currentColor" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
      </svg>
    </a>
  );
}

function MobileMenu({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-ink px-6 py-5 text-cream">
      <div className="flex items-center justify-between">
        <Logo size="sm" />
        <button type="button" className="grid size-11 place-items-center" aria-label="Close menu" onClick={onClose}>
          <X className="size-5" />
        </button>
      </div>
      <nav className="mt-8 flex flex-col gap-3" aria-label="Mobile">
        {LINKS.map((link) => (
          <Link key={link.label} to={link.to} hash={link.hash} className="font-display text-4xl" onClick={onClose}>
            {link.label}
          </Link>
        ))}
      </nav>
      <nav className="mt-8 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-line pt-6 text-base text-mist" aria-label="More">
        {MORE_LINKS.map((link) => (
          <Link key={link.to} to={link.to} onClick={onClose}>
            {link.label}
          </Link>
        ))}
      </nav>
      <ThemePicker />
      <a className="mt-auto flex items-center gap-3 py-6 text-lg" href={`tel:${PHONE_TEL}`}>
        <Phone className="size-5" strokeWidth={1.5} />
        {PHONE_DISPLAY}
      </a>
    </div>
  );
}

function SearchPanel({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return DRESSES.slice(0, 5);
    return DRESSES.filter((dress) =>
      `${dress.name} ${dress.colors} ${dress.work} ${dress.collection}`.toLowerCase().includes(needle),
    );
  }, [query]);

  return (
    <div className="fixed inset-0 z-40 bg-ink/70" onClick={onClose}>
      <div
        className="mx-auto mt-16 max-h-[calc(100svh-5rem)] w-[calc(100%-1.5rem)] max-w-xl overflow-auto border border-line bg-paper p-5 text-cream"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-label="Search dresses"
      >
        <div className="flex items-center justify-between gap-3">
          <label className="label mb-0" htmlFor="dress-search">
            Search the rail
          </label>
          <button type="button" className="grid size-11 place-items-center" aria-label="Close search" onClick={onClose}>
            <X className="size-5" />
          </button>
        </div>
        <input
          id="dress-search"
          autoFocus
          className="field mt-2"
          placeholder="Peacock, magenta, mirror, teal…"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <ul className="mt-4 divide-y divide-line">
          {results.length === 0 ? <li className="py-4 text-mute">Nothing under that name. Try a colour.</li> : null}
          {results.map((dress) => (
            <li key={dress.slug}>
              <Link
                to="/dress/$slug"
                params={{ slug: dress.slug }}
                className="flex items-center gap-3 py-3"
                onClick={onClose}
              >
                <img src={dress.image} {...imgSize(dress.image)} loading="lazy" decoding="async" alt="" className="size-16 object-cover" />
                <span>
                  <span className="block font-display text-2xl leading-none">{dress.name}</span>
                  <span className="text-sm text-mute">{dress.colors}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-ink text-cream">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm text-mist">
            Handcrafted Garba dresses, rented for the night and delivered across Indore.
          </p>
        </div>
        <div>
          <h2 className="text-sm tracking-label uppercase text-gold">Shop</h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link to="/shop">New arrivals</Link></li>
            <li><Link to="/collections">Collections</Link></li>
            <li><Link to="/how-it-works">How it works</Link></li>
            <li><Link to="/trial">Free home trial</Link></li>
            <li><Link to="/checkout">Checkout</Link></li>
            <li><Link to="/login">Login / My orders</Link></li>
            <li><Link to="/about">About</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="text-sm tracking-label uppercase text-gold">Help</h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link to="/faq">Questions, answered</Link></li>
            <li><Link to="/contact">Contact us</Link></li>
            <li><Link to="/size-guide">Size guide</Link></li>
            <li><Link to="/shipping">Shipping</Link></li>
            <li><Link to="/exchange">Exchange</Link></li>
            <li><Link to="/terms">Rental terms</Link></li>
            <li><Link to="/privacy">Privacy</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="text-sm tracking-label uppercase text-gold">Contact</h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li><a href={`tel:${PHONE_TEL}`}>{PHONE_DISPLAY}</a></li>
            <li><a href={waLink()}>WhatsApp</a></li>
            <li><a href={`mailto:${EMAIL}`}>{EMAIL}</a></li>
            <li><a href={`https://instagram.com/${INSTAGRAM.replace("@", "")}`} target="_blank" rel="noopener noreferrer">Instagram: {INSTAGRAM}</a></li>
          </ul>
        </div>
      </div>
      <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-2 border-t hair px-5 pt-4 pb-24 text-xs text-mist md:pb-4">
        <span>© 2026 Classic Aura. All rights reserved.</span>
        <span>Garba dresses · Indore</span>
      </div>
    </footer>
  );
}

export function PageIntro({ kicker, title, lede }: { kicker: string; title: string; lede?: string }) {
  return (
    <header className="mb-10 max-w-3xl">
      <p className="kicker">{kicker}</p>
      <h1 className="mt-2 font-display text-4xl text-cream sm:text-5xl md:text-6xl">{title}</h1>
      {lede ? <p className="mt-4 max-w-2xl text-lg text-mute">{lede}</p> : null}
    </header>
  );
}
