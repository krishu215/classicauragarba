import { createServerFn } from "@tanstack/react-start";
import { currentAdmin, isAllowedAdmin, requireAdmin } from "./admin-auth.server";
import { ADMIN_COOKIES, clearSession, writeSession } from "./session.server";
import { authClient, db, type BookingRow, type BookingStatus } from "./db.server";
import { sendConfirmedEmail } from "./mail.server";

const STATUSES: BookingStatus[] = ["pending_payment", "paid", "confirmed", "delivered", "returned", "cancelled", "requested", "expired"];

export const adminLogin = createServerFn({ method: "POST" })
  .inputValidator((data: { email: string; password: string }) => data)
  .handler(async ({ data }) => {
    const { data: result, error } = await authClient().auth.signInWithPassword({
      email: data.email.trim().toLowerCase(),
      password: data.password,
    });
    if (error || !result.session || !isAllowedAdmin(result.user?.email)) {
      throw new Error("Wrong email or password.");
    }
    writeSession(ADMIN_COOKIES, result.session);
    return { email: result.user.email ?? "" };
  });

export const adminLogout = createServerFn({ method: "POST" }).handler(async () => {
  clearSession(ADMIN_COOKIES);
  return { ok: true };
});

export const adminMe = createServerFn({ method: "GET" }).handler(async () => {
  return { email: await currentAdmin() };
});

export const adminListBookings = createServerFn({ method: "GET" }).handler(async () => {
  await requireAdmin();
  const { data, error } = await db()
    .from("bookings")
    .select("*, booking_items(dress_slug, rental_date, days, fee)")
    .order("created_at", { ascending: false })
    .limit(500);
  if (error) throw new Error("Could not load bookings.");
  return (data ?? []) as BookingRow[];
});

export const adminUpdateBooking = createServerFn({ method: "POST" })
  .inputValidator((data: { id: string; status?: BookingStatus; adminNotes?: string; deliverySlot?: string }) => data)
  .handler(async ({ data }) => {
    await requireAdmin();
    const patch: { status?: BookingStatus; admin_notes?: string | null; delivery_slot?: string | null } = {};
    if (data.status !== undefined) {
      if (!STATUSES.includes(data.status)) throw new Error("Invalid status.");
      patch.status = data.status;
    }
    if (data.adminNotes !== undefined) patch.admin_notes = data.adminNotes.slice(0, 2000) || null;
    if (data.deliverySlot !== undefined) patch.delivery_slot = data.deliverySlot.trim().slice(0, 120) || null;
    const { data: before } = await db().from("bookings").select("status").eq("id", data.id).maybeSingle();
    const { error } = await db().from("bookings").update(patch).eq("id", data.id);
    if (error) throw new Error("Could not save changes.");
    // First time a booking becomes confirmed, email the customer. The tracking page updates by itself.
    if (patch.status === "confirmed" && before?.status !== "confirmed") {
      const { data: row } = await db().from("bookings").select("*, booking_items(*)").eq("id", data.id).maybeSingle();
      if (row) await sendConfirmedEmail(row as BookingRow);
    }
    return { ok: true };
  });
