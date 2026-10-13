import { NextResponse } from "next/server";
import { getAvailability, ghlConfigured, GhlApiError, GhlConfigError } from "@/lib/ghl";

export async function GET() {
  if (!ghlConfigured()) {
    return NextResponse.json({ ok: false, reason: "not_configured" }, { status: 503 });
  }

  try {
    const availability = await getAvailability();
    return NextResponse.json({ ok: true, ...availability });
  } catch (err) {
    console.error("GET /api/book/availability failed:", err);
    if (err instanceof GhlConfigError) {
      return NextResponse.json({ ok: false, reason: "not_configured" }, { status: 503 });
    }
    const status = err instanceof GhlApiError ? 502 : 500;
    return NextResponse.json({ ok: false, reason: "ghl_error" }, { status });
  }
}
