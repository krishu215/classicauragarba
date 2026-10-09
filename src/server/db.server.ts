import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { env, optionalEnv } from "./env.server";

let admin: SupabaseClient | null = null;

/** Service-role client. Server only: it bypasses row level security. Never import this from client code. */
export function legacyDb(): SupabaseClient {
  if (!admin) {
    admin = createClient(env("SUPABASE_URL"), env("SUPABASE_SERVICE_ROLE_KEY"), {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return admin;
}

/** Anon client for Supabase Auth: customer and admin sign-in, signup, email links and session checks. */
export function authClient(): SupabaseClient {
  const url = optionalEnv("SUPABASE_URL");
  const anonKey = optionalEnv("SUPABASE_ANON_KEY");
  if (!url || !anonKey) {
    console.error("[auth] Set SUPABASE_URL and SUPABASE_ANON_KEY in the Netlify environment variables.");
    throw new Error("Login is not available right now. Please try again later or WhatsApp us.");
  }
  return createClient(url, anonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export type BookingStatus =
  | "pending_payment"
  | "paid"
  | "confirmed"
  | "delivered"
  | "returned"
  | "cancelled"
  | "requested"
  | "expired";

export type BookingRow = {
  id: string;
  ref: string;
  kind: "rental" | "trial";
  status: BookingStatus;
  name: string;
  mobile: string;
  whatsapp: string | null;
  email: string;
  address: string;
  area: string;
  pincode: string;
  city: string;
  preferred_time: string | null;
  notes: string | null;
  total: number;
  razorpay_link_id: string | null;
  razorpay_link_url: string | null;
  razorpay_payment_id: string | null;
  paid_at: string | null;
  admin_notes: string | null;
  delivery_slot: string | null;
  created_at: string;
  updated_at?: string;
  booking_items?: { id?: string; dress_slug: string; rental_date: string | null; days: number | null; fee: number }[];
};
