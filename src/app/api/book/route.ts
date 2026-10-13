import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import {
  getAvailability,
  upsertContact,
  createAppointment,
  ghlConfigured,
  GhlApiError,
  GhlConfigError,
} from "@/lib/ghl";
import { clean, parseLead } from "@/lib/leadForm";
import { forwardConversion } from "@/lib/forward";
import { BOOKED_COOKIE } from "@/lib/booking";

export async function POST(request: Request) {
  if (!ghlConfigured()) {
    return NextResponse.json({ ok: false, reason: "not_configured" }, { status: 503 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, reason: "invalid_body" }, { status: 400 });
  }

  const lead = parseLead(body);
  const startTime = clean(body.startTime, 40);
  if (!lead || !startTime) {
    return NextResponse.json({ ok: false, reason: "missing_fields" }, { status: 400 });
  }

  try {
    // Re-check live availability right before booking — closes the race
    // window between the page loading and the visitor submitting; GHL is the
    // single source of truth, not anything cached client-side.
    const availability = await getAvailability();
    const stillFree = availability.days.some((d) => d.slots.includes(startTime));
    if (!stillFree) {
      return NextResponse.json({ ok: false, reason: "slot_taken" }, { status: 409 });
    }

    const contactId = await upsertContact(lead);

    await createAppointment({
      contactId,
      startTime,
      slotMinutes: availability.slotMinutes,
      title: `Strategy Call — ${lead.firstName} ${lead.lastName}`,
    });
  } catch (err) {
    console.error("POST /api/book failed:", err);
    if (err instanceof GhlConfigError) {
      return NextResponse.json({ ok: false, reason: "not_configured" }, { status: 503 });
    }
    if (err instanceof GhlApiError) {
      return NextResponse.json({ ok: false, reason: "ghl_error" }, { status: 502 });
    }
    return NextResponse.json({ ok: false, reason: "unknown_error" }, { status: 500 });
  }

  // Server-side conversion fan-out (email service / CRM / extra GHL webhook),
  // only to destinations that are configured. Never blocks the booking.
  await forwardConversion({ event: "booked", ...lead, startTime, source: "landing-page/booking" }).catch(
    (err) => console.error("forwardConversion failed:", err)
  );

  const res = NextResponse.json({ ok: true });
  // Gates /confirmation: only a request that just booked through this route
  // carries this cookie, so the page can't be reached by guessing the URL.
  res.cookies.set(BOOKED_COOKIE, randomUUID(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 1800,
  });
  return res;
}
