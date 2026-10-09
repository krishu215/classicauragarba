import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";
import { bookingItems, bookings } from "../../db/schema";
import { currentAdmin, isAllowedAdmin, requireAdmin } from "./admin-auth.server";
import { ADMIN_COOKIES, clearSession, writeSession } from "./session.server";
import { authClient, type BookingStatus } from "./db.server";
import { bookingDatabase, listBookings } from "./booking-repository.server";
import { bookingMessages, queueMessages, tryDeliverEmails } from "./mail.server";

const STATUSES: BookingStatus[] = ["pending_payment", "paid", "confirmed", "delivered", "returned", "cancelled", "requested", "expired"];

export const adminLogin = createServerFn({ method: "POST" })
  .inputValidator((data: { email: string; password: string }) => data)
  .handler(async ({ data }) => {
    const { data: result, error } = await authClient().auth.signInWithPassword({
      email: data.email.trim().toLowerCase(),
      password: data.password,
    });
    if (error?.code === "email_not_confirmed") {
      throw new Error("Please verify this email first using the link Supabase sent you, then sign in again.");
    }
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
  return listBookings();
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
    const store = await bookingDatabase();
    const keys = await store.transaction(async (transaction) => {
      const [before] = await transaction.select().from(bookings).where(eq(bookings.id, data.id)).for("update");
      if (!before) throw new Error("Order not found.");
      const [row] = await transaction.update(bookings).set({ ...patch, updated_at: new Date().toISOString() }).where(eq(bookings.id, data.id)).returning();
      if ((row.status === "confirmed" || row.status === "delivered") && row.status !== before.status) {
        const items = await transaction.select().from(bookingItems).where(eq(bookingItems.booking_id, data.id));
        return queueMessages(transaction, bookingMessages({ ...row, booking_items: items }, row.status));
      }
      return [] as string[];
    });
    if (keys.length) await tryDeliverEmails(keys);
    return { ok: true };
  });
