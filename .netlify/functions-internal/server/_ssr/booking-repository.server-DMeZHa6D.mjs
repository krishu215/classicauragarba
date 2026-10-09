import { a as uuid, c as jsonb, d as desc, f as and, h as inArray, i as pgTable, l as integer, n as src_default, o as timestamp, p as eq, r as index, s as text, t as drizzle, y as sql } from "../_libs/drizzle-orm+postgres.mjs";
import { t as createClient } from "../_libs/supabase__supabase-js.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/booking-repository.server-DMeZHa6D.js
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var schema_exports = /* @__PURE__ */ __exportAll({
	bookingItems: () => bookingItems,
	bookings: () => bookings,
	emailOutbox: () => emailOutbox,
	legacyAccounts: () => legacyAccounts,
	migrationState: () => migrationState
});
var bookings = pgTable("bookings", {
	id: uuid().defaultRandom().primaryKey(),
	ref: text().notNull().unique(),
	kind: text({ enum: ["rental", "trial"] }).notNull(),
	status: text({ enum: [
		"pending_payment",
		"paid",
		"confirmed",
		"delivered",
		"returned",
		"cancelled",
		"requested",
		"expired"
	] }).notNull(),
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
	paid_at: timestamp({
		withTimezone: true,
		mode: "string"
	}),
	admin_notes: text(),
	delivery_slot: text(),
	created_at: timestamp({
		withTimezone: true,
		mode: "string"
	}).defaultNow().notNull(),
	updated_at: timestamp({
		withTimezone: true,
		mode: "string"
	}).defaultNow().notNull()
}, (table) => [index("bookings_email_idx").on(table.email), index("bookings_mobile_idx").on(table.mobile)]);
var bookingItems = pgTable("booking_items", {
	id: uuid().defaultRandom().primaryKey(),
	booking_id: uuid().notNull().references(() => bookings.id, { onDelete: "cascade" }),
	dress_slug: text().notNull(),
	rental_date: text(),
	days: integer(),
	fee: integer().notNull()
}, (table) => [index("booking_items_booking_idx").on(table.booking_id)]);
var migrationState = pgTable("migration_state", {
	key: text().primaryKey(),
	completed_at: timestamp({ withTimezone: true }).defaultNow().notNull()
});
var legacyAccounts = pgTable("legacy_accounts", {
	id: uuid().primaryKey(),
	email: text().notNull()
});
var emailOutbox = pgTable("email_outbox", {
	key: text().primaryKey(),
	message: jsonb().$type().notNull(),
	status: text({ enum: [
		"pending",
		"sending",
		"sent",
		"failed"
	] }).default("pending").notNull(),
	attempts: integer().default(0).notNull(),
	next_attempt_at: timestamp({ withTimezone: true }).defaultNow().notNull(),
	lease_until: timestamp({ withTimezone: true }),
	created_at: timestamp({ withTimezone: true }).defaultNow().notNull(),
	sent_at: timestamp({ withTimezone: true }),
	last_error: text()
}, (table) => [index("email_outbox_pending_idx").on(table.status, table.next_attempt_at)]);
var sqlClient = null;
function databaseUrl() {
	const url = process.env.SUPABASE_DB_URL ?? process.env.DATABASE_URL;
	if (!url) throw new Error("Missing database connection string: set SUPABASE_DB_URL (or DATABASE_URL).");
	return url;
}
function database() {
	if (!sqlClient) sqlClient = src_default(databaseUrl(), {
		ssl: "require",
		max: 1,
		prepare: false,
		connect_timeout: 10,
		idle_timeout: 20
	});
	return drizzle({
		client: sqlClient,
		schema: schema_exports
	});
}
/** Read a required environment variable on the server. Throws a clear error if it is missing. */
function env(name) {
	const value = process.env[name];
	if (!value) throw new Error(`Missing environment variable: ${name}`);
	return value;
}
function optionalEnv(name) {
	const value = process.env[name];
	return value ? value : void 0;
}
/** Public site URL without a trailing slash. Used for payment return links and emails. */
function siteUrl() {
	return (optionalEnv("SITE_URL") ?? "https://classicauragarba.netlify.app").replace(/\/+$/, "");
}
var admin = null;
/** Service-role client. Server only: it bypasses row level security. Never import this from client code. */
function legacyDb() {
	if (!admin) admin = createClient(env("SUPABASE_URL"), env("SUPABASE_SERVICE_ROLE_KEY"), { auth: {
		persistSession: false,
		autoRefreshToken: false
	} });
	return admin;
}
/** Anon client, used only to check admin email and password and to validate admin sessions. */
function authClient() {
	return createClient(env("SUPABASE_URL"), env("SUPABASE_ANON_KEY"), { auth: {
		persistSession: false,
		autoRefreshToken: false
	} });
}
async function bookingDatabase() {
	const store = database();
	const key = "supabase_bookings_v1";
	const [completed] = await store.select().from(migrationState).where(eq(migrationState.key, key));
	if (completed) return store;
	await store.transaction(async (transaction) => {
		await transaction.execute(sql`select pg_advisory_xact_lock(2456, 2942)`);
		const [alreadyImported] = await transaction.select().from(migrationState).where(eq(migrationState.key, key));
		if (alreadyImported) return;
		for (let offset = 0;; offset += 500) {
			const { data, error } = await legacyDb().from("bookings").select("*, booking_items(*)").order("id").range(offset, offset + 499);
			if (error) throw new Error("Existing orders could not be imported. The original data has not been changed.");
			for (const source of data ?? []) {
				const booking = source;
				const [imported] = await transaction.insert(bookings).values({
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
					updated_at: booking.updated_at ?? booking.created_at
				}).onConflictDoNothing().returning({ id: bookings.id });
				if (imported && booking.booking_items?.length) await transaction.insert(bookingItems).values(booking.booking_items.map((item) => ({
					id: item.id,
					booking_id: booking.id,
					dress_slug: item.dress_slug,
					rental_date: item.rental_date,
					days: item.days,
					fee: item.fee
				})));
			}
			if ((data?.length ?? 0) < 500) break;
		}
		for (let page = 1;; page += 1) {
			const { data, error } = await legacyDb().auth.admin.listUsers({
				page,
				perPage: 500
			});
			if (error) throw new Error("Existing accounts could not be preserved. The original accounts have not been changed.");
			const accounts = data.users.filter((user) => user.email).map((user) => ({
				id: user.id,
				email: user.email.toLowerCase()
			}));
			if (accounts.length) await transaction.insert(legacyAccounts).values(accounts).onConflictDoNothing();
			if (data.users.length < 500) break;
		}
		await transaction.insert(migrationState).values({ key });
	});
	return store;
}
async function isLegacyAccount(id) {
	const [account] = await (await bookingDatabase()).select({ id: legacyAccounts.id }).from(legacyAccounts).where(eq(legacyAccounts.id, id));
	return Boolean(account);
}
async function listBookings(filter = {}) {
	const store = await bookingDatabase();
	const rows = await store.select().from(bookings).where(and(filter.id ? eq(bookings.id, filter.id) : void 0, filter.ref ? eq(bookings.ref, filter.ref) : void 0, filter.email ? eq(bookings.email, filter.email.toLowerCase()) : void 0)).orderBy(desc(bookings.created_at)).limit(filter.limit ?? 500);
	if (!rows.length) return [];
	const items = await store.select().from(bookingItems).where(inArray(bookingItems.booking_id, rows.map((row) => row.id)));
	return rows.map((row) => ({
		...row,
		booking_items: items.filter((item) => item.booking_id === row.id)
	}));
}
//#endregion
export { bookings as a, env as c, listBookings as d, optionalEnv as f, bookingItems as i, isLegacyAccount as l, authClient as n, database as o, siteUrl as p, bookingDatabase as r, emailOutbox as s, __exportAll as t, legacyDb as u };
