import { and, desc, eq, inArray, sql } from "drizzle-orm";
import { database } from "../../db";
import {
  bookingItems,
  bookings,
  legacyAccounts,
  migrationState,
} from "../../db/schema";
import { legacyDb, type BookingRow } from "./db.server";
import { optionalEnv } from "./env.server";

let importChecked = false;

export async function bookingDatabase() {
  const store = database();
  if (importChecked) return store;
  // The one-time import of old Supabase orders only runs when the service role key is configured.
  // It never blocks new orders: on failure it is logged and retried on a later request.
  if (!optionalEnv("SUPABASE_URL") || !optionalEnv("SUPABASE_SERVICE_ROLE_KEY")) return store;
  try {
    await importLegacyBookings(store);
    importChecked = true;
  } catch (error) {
    console.error("[import] Existing Supabase orders could not be imported yet.", error);
  }
  return store;
}

async function importLegacyBookings(store: ReturnType<typeof database>) {
  const key = "supabase_bookings_v1";
  const [completed] = await store
    .select()
    .from(migrationState)
    .where(eq(migrationState.key, key));
  if (completed) return;
  await store.transaction(async (transaction) => {
    await transaction.execute(sql`select pg_advisory_xact_lock(2456, 2942)`);
    const [alreadyImported] = await transaction
      .select()
      .from(migrationState)
      .where(eq(migrationState.key, key));
    if (alreadyImported) return;
    for (let offset = 0; ; offset += 500) {
      const { data, error } = await legacyDb()
        .from("bookings")
        .select("*, booking_items(*)")
        .order("id")
        .range(offset, offset + 499);
      if (error)
        throw new Error(
          "Existing orders could not be imported. The original data has not been changed.",
        );
      for (const source of data ?? []) {
        const booking = source as BookingRow;
        const [imported] = await transaction
          .insert(bookings)
          .values({
            id: booking.id,
            ref: booking.ref,
            kind: booking.kind,
            status: booking.status,
            name: booking.name,
            mobile: booking.mobile,
            whatsapp: booking.whatsapp,
            email: booking.email.toLowerCase(),
            address: booking.address,
            area: booking.area,
            pincode: booking.pincode,
            city: booking.city,
            preferred_time: booking.preferred_time,
            notes: booking.notes,
            total: booking.total,
            razorpay_link_id: booking.razorpay_link_id,
            razorpay_link_url: booking.razorpay_link_url,
            razorpay_payment_id: booking.razorpay_payment_id,
            paid_at: booking.paid_at,
            admin_notes: booking.admin_notes,
            delivery_slot: booking.delivery_slot,
            created_at: booking.created_at,
            updated_at: booking.updated_at ?? booking.created_at,
          })
          .onConflictDoNothing()
          .returning({ id: bookings.id });
        if (imported && booking.booking_items?.length) {
          await transaction.insert(bookingItems).values(
            booking.booking_items.map((item) => ({
              id: item.id,
              booking_id: booking.id,
              dress_slug: item.dress_slug,
              rental_date: item.rental_date,
              days: item.days,
              fee: item.fee,
            })),
          );
        }
      }
      if ((data?.length ?? 0) < 500) break;
    }
    for (let page = 1; ; page += 1) {
      const { data, error } = await legacyDb().auth.admin.listUsers({
        page,
        perPage: 500,
      });
      if (error)
        throw new Error(
          "Existing accounts could not be preserved. The original accounts have not been changed.",
        );
      const accounts = data.users
        .filter((user) => user.email)
        .map((user) => ({ id: user.id, email: user.email!.toLowerCase() }));
      if (accounts.length)
        await transaction
          .insert(legacyAccounts)
          .values(accounts)
          .onConflictDoNothing();
      if (data.users.length < 500) break;
    }
    await transaction.insert(migrationState).values({ key });
  });
}

export async function listBookings(
  filter: { id?: string; ref?: string; email?: string; limit?: number } = {},
) {
  const store = await bookingDatabase();
  const rows = await store
    .select()
    .from(bookings)
    .where(
      and(
        filter.id ? eq(bookings.id, filter.id) : undefined,
        filter.ref ? eq(bookings.ref, filter.ref) : undefined,
        filter.email
          ? eq(bookings.email, filter.email.toLowerCase())
          : undefined,
      ),
    )
    .orderBy(desc(bookings.created_at))
    .limit(filter.limit ?? 500);
  if (!rows.length) return [];
  const items = await store
    .select()
    .from(bookingItems)
    .where(
      inArray(
        bookingItems.booking_id,
        rows.map((row) => row.id),
      ),
    );
  return rows.map((row) => ({
    ...row,
    booking_items: items.filter((item) => item.booking_id === row.id),
  }));
}
