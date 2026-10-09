import {
  index,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const bookings = pgTable(
  "bookings",
  {
    id: uuid().defaultRandom().primaryKey(),
    ref: text().notNull().unique(),
    kind: text({ enum: ["rental", "trial"] }).notNull(),
    status: text({
      enum: [
        "pending_payment",
        "paid",
        "confirmed",
        "delivered",
        "returned",
        "cancelled",
        "requested",
        "expired",
      ],
    }).notNull(),
    name: text().notNull(),
    mobile: text().notNull(),
    whatsapp: text(),
    email: text().notNull(),
    address: text().notNull(),
    area: text().notNull(),
    pincode: text().notNull(),
    city: text().notNull(),
    preferred_time: text(),
    notes: text(),
    total: integer().notNull(),
    razorpay_link_id: text(),
    razorpay_link_url: text(),
    razorpay_payment_id: text(),
    paid_at: timestamp({ withTimezone: true, mode: "string" }),
    admin_notes: text(),
    delivery_slot: text(),
    created_at: timestamp({ withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
    updated_at: timestamp({ withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("bookings_email_idx").on(table.email),
    index("bookings_mobile_idx").on(table.mobile),
  ],
);

export const bookingItems = pgTable(
  "booking_items",
  {
    id: uuid().defaultRandom().primaryKey(),
    booking_id: uuid()
      .notNull()
      .references(() => bookings.id, { onDelete: "cascade" }),
    dress_slug: text().notNull(),
    rental_date: text(),
    days: integer(),
    fee: integer().notNull(),
  },
  (table) => [index("booking_items_booking_idx").on(table.booking_id)],
);

export const migrationState = pgTable("migration_state", {
  key: text().primaryKey(),
  completed_at: timestamp({ withTimezone: true }).defaultNow().notNull(),
});

export const legacyAccounts = pgTable("legacy_accounts", {
  id: uuid().primaryKey(),
  email: text().notNull(),
});

export const emailOutbox = pgTable(
  "email_outbox",
  {
    key: text().primaryKey(),
    message: jsonb()
      .$type<{ to: string; subject: string; html: string; replyTo?: string }>()
      .notNull(),
    status: text({ enum: ["pending", "sending", "sent", "failed"] })
      .default("pending")
      .notNull(),
    attempts: integer().default(0).notNull(),
    next_attempt_at: timestamp({ withTimezone: true }).defaultNow().notNull(),
    lease_until: timestamp({ withTimezone: true }),
    created_at: timestamp({ withTimezone: true }).defaultNow().notNull(),
    sent_at: timestamp({ withTimezone: true }),
    last_error: text(),
  },
  (table) => [
    index("email_outbox_pending_idx").on(table.status, table.next_attempt_at),
  ],
);
