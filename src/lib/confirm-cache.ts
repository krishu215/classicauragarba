import type { getBookingStatus } from "@/server/bookings";

export type ConfirmedBooking = NonNullable<Awaited<ReturnType<typeof getBookingStatus>>>;

let latest: ConfirmedBooking | null = null;

/** Keep the booking we just placed, so the confirmation page can show it instantly instead of loading it again. */
export function rememberBooking(booking: ConfirmedBooking) {
  latest = booking;
}

export function recallBooking(ref: string | undefined): ConfirmedBooking | null {
  return latest && ref && latest.ref === ref ? latest : null;
}
