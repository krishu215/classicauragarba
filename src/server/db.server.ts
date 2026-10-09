import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { env } from "./env.server";

let admin: SupabaseClient | null = null;

/** Service-role client. Server only: it bypasses row level security. Never import this from client code. */
export function db(): SupabaseClient {
  if (!admin) {
    admin = createClient(env("SUPABASE_URL"), env("SUPABASE_SERVICE_ROLE_KEY"), {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return admin;
}

/** Anon client, used only to check admin email and password and to validate admin sessions. */
export function authClient(): SupabaseClient {
  return createClient(env("SUPABASE_URL"), env("SUPABASE_ANON_KEY"), {
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
  booking_items?: { dress_slug: string; rental_date: string | null; days: number | null; fee: number }[];
};
