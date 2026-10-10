export const PHONE_DISPLAY = "+91 92321 43198";
export const PHONE_TEL = "+919232143198";
export const EMAIL = "Krishnanamdev382@gmail.com";
export const INSTAGRAM = "@tech_krishu";

/** Online payment (Razorpay) is switched off for now: bookings are cash on delivery. Set to true to turn it back on. */
export const ONLINE_PAYMENT = false;

export function waLink(text?: string) {
  const base = "https://wa.me/919232143198";
  if (!text) return base;
  return `${base}?text=${encodeURIComponent(text)}`;
}

export type SeasonDay = {
  iso: string;
  wd: string;
  day: string;
  mon: string;
};

const WEEKDAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"] as const;

function buildSeason(): SeasonDay[] {
  const days: SeasonDay[] = [];
  for (let day = 8; day <= 22; day++) {
    const date = new Date(Date.UTC(2026, 9, day));
    days.push({
      iso: `2026-10-${String(day).padStart(2, "0")}`,
      wd: WEEKDAYS[date.getUTCDay()],
      day: String(day),
      mon: "OCT",
    });
  }
  return days;
}

export const SEASON = buildSeason();

export function todayIso() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

export type DayStatus = "available" | "last" | "rented" | "closed";

export function dayStatus(slug: string, iso: string, today = todayIso()): DayStatus {
  if (iso < today) return "closed";
  if (iso < "2026-10-08" || iso > "2026-10-22") return "closed";
  let hash = 0;
  const key = `${slug}:${iso}`;
  for (let i = 0; i < key.length; i++) hash = (hash * 33 + key.charCodeAt(i)) >>> 0;
  const bucket = hash % 11;
  if (bucket <= 1) return "rented";
  if (bucket === 2) return "last";
  return "available";
}

export function firstOpenDate(slug: string, today = todayIso()) {
  return (
    SEASON.find((day) => {
      const status = dayStatus(slug, day.iso, today);
      return status === "available" || status === "last";
    })?.iso ?? null
  );
}

export function inr(amount: number) {
  return `₹${amount.toLocaleString("en-IN")}`;
}

export function quote(pricePerDay: number, days: 1 | 2 | 3) {
  const off = days === 1 ? 0 : days === 2 ? 0.1 : 0.2;
  const fee = Math.round(pricePerDay * days * (1 - off));
  return { fee, off, days, perDay: pricePerDay };
}

export function formatLong(iso: string) {
  const [year, month, day] = iso.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return new Intl.DateTimeFormat("en-IN", {
    timeZone: "UTC",
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}
