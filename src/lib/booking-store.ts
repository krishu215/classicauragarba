import { useEffect, useState } from "react";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { Customer } from "@/lib/customer";

export type Rental = { slug: string; days: 1 | 2 | 3; date: string };

export type Confirmation = {
  id: string;
  kind: "rental" | "trial";
  name: string;
  mobile: string;
  email: string;
  area: string;
  address?: string;
  time?: string;
  notes?: string;
  lines: { slug: string; date?: string; days?: 1 | 2 | 3; fee?: number }[];
  total: number;
};

type State = {
  /** Outfits in the rental booking. One line per dress; adding it again updates that line. */
  rentals: Rental[];
  trial: string[];
  saved: Customer | null;
  confirmation: Confirmation | null;
  addRental: (rental: Rental) => "added" | "updated";
  updateRental: (slug: string, patch: Partial<Pick<Rental, "days" | "date">>) => void;
  removeRental: (slug: string) => void;
  clearRentals: () => void;
  clearTrial: () => void;
  toggleTrial: (slug: string) => "added" | "removed" | "full";
  setSaved: (customer: Customer | null) => void;
  setConfirmation: (confirmation: Confirmation) => void;
};

const memory = {
  getItem: () => null,
  setItem: () => undefined,
  removeItem: () => undefined,
};

export const useBooking = create<State>()(
  persist(
    (set, get) => ({
      rentals: [],
      trial: [],
      saved: null,
      confirmation: null,
      addRental: (rental) => {
        const current = get().rentals;
        if (current.some((item) => item.slug === rental.slug)) {
          set({ rentals: current.map((item) => (item.slug === rental.slug ? rental : item)) });
          return "updated";
        }
        set({ rentals: [...current, rental] });
        return "added";
      },
      updateRental: (slug, patch) =>
        set({ rentals: get().rentals.map((item) => (item.slug === slug ? { ...item, ...patch } : item)) }),
      removeRental: (slug) => set({ rentals: get().rentals.filter((item) => item.slug !== slug) }),
      clearRentals: () => set({ rentals: [] }),
      clearTrial: () => set({ trial: [] }),
      toggleTrial: (slug) => {
        const trial = get().trial;
        if (trial.includes(slug)) {
          set({ trial: trial.filter((item) => item !== slug) });
          return "removed";
        }
        if (trial.length >= 3) return "full";
        set({ trial: [...trial, slug] });
        return "added";
      },
      setSaved: (saved) => set({ saved }),
      setConfirmation: (confirmation) => set({ confirmation }),
    }),
    {
      name: "classic-aura-booking",
      version: 2,
      storage: createJSONStorage(() => (typeof window === "undefined" ? memory : localStorage)),
      skipHydration: true,
      // v1 kept a single outfit as slug/days/date; carry it over as the first booking line.
      migrate: (persisted) => {
        const old = (persisted ?? {}) as Record<string, unknown> & {
          slug?: string | null;
          days?: 1 | 2 | 3;
          date?: string | null;
        };
        const { slug, days, date, ...rest } = old;
        const rentals: Rental[] = slug && date ? [{ slug, days: days ?? 1, date }] : [];
        return { ...rest, rentals } as unknown as State;
      },
    },
  ),
);

/** True once the saved booking has been read from this device, so pages can avoid flashing an empty state. */
export function useBookingReady() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (useBooking.persist.hasHydrated()) setReady(true);
    return useBooking.persist.onFinishHydration(() => setReady(true));
  }, []);
  return ready;
}
