// Shared booking domain types/constants. Real availability comes live from
// the GoHighLevel calendar (see lib/ghl.ts); this file holds the business
// timezone and the shapes both the client and server agree on.

// Falcon Ridge Digital's phone is a Utah (801) number → Mountain Time.
// Confirm with the client; override with NEXT_PUBLIC_BOOKING_TIMEZONE/_LABEL.
export const BUSINESS_TIMEZONE = process.env.NEXT_PUBLIC_BOOKING_TIMEZONE?.trim() || "America/Denver";
export const TIMEZONE_LABEL = process.env.NEXT_PUBLIC_BOOKING_TIMEZONE_LABEL?.trim() || "MT";

export const BOOKED_COOKIE = "frd_booked";

export type BookingDay = { iso: string; slots: string[] };
export type Availability = { days: BookingDay[]; slotMinutes: number };
