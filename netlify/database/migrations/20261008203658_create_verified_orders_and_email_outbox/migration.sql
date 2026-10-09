CREATE TABLE "booking_items" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"booking_id" uuid NOT NULL,
	"dress_slug" text NOT NULL,
	"rental_date" text,
	"days" integer,
	"fee" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "bookings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"ref" text NOT NULL UNIQUE,
	"kind" text NOT NULL,
	"status" text NOT NULL,
	"name" text NOT NULL,
	"mobile" text NOT NULL,
	"whatsapp" text,
	"email" text NOT NULL,
	"address" text NOT NULL,
	"area" text NOT NULL,
	"pincode" text NOT NULL,
	"city" text NOT NULL,
	"preferred_time" text,
	"notes" text,
	"total" integer NOT NULL,
	"razorpay_link_id" text,
	"razorpay_link_url" text,
	"razorpay_payment_id" text,
	"paid_at" timestamp with time zone,
	"admin_notes" text,
	"delivery_slot" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "email_outbox" (
	"key" text PRIMARY KEY,
	"message" jsonb NOT NULL,
	"status" text DEFAULT 'pending' NOT NULL,
	"attempts" integer DEFAULT 0 NOT NULL,
	"next_attempt_at" timestamp with time zone DEFAULT now() NOT NULL,
	"lease_until" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"sent_at" timestamp with time zone,
	"last_error" text
);
--> statement-breakpoint
CREATE TABLE "migration_state" (
	"key" text PRIMARY KEY,
	"completed_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX "booking_items_booking_idx" ON "booking_items" ("booking_id");--> statement-breakpoint
CREATE INDEX "bookings_email_idx" ON "bookings" ("email");--> statement-breakpoint
CREATE INDEX "bookings_mobile_idx" ON "bookings" ("mobile");--> statement-breakpoint
CREATE INDEX "email_outbox_pending_idx" ON "email_outbox" ("status","next_attempt_at");--> statement-breakpoint
ALTER TABLE "booking_items" ADD CONSTRAINT "booking_items_booking_id_bookings_id_fkey" FOREIGN KEY ("booking_id") REFERENCES "bookings"("id") ON DELETE CASCADE;