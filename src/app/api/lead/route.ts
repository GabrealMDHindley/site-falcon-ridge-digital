import { NextResponse } from "next/server";
import { forwardConversion, leadWebhooksConfigured } from "@/lib/forward";
import { parseLead } from "@/lib/leadForm";

// Lead form (used when the GHL calendar isn't configured but at least one lead
// webhook is). Delivers to every configured webhook; succeeds if any accepted.
export async function POST(request: Request) {
  if (!leadWebhooksConfigured()) {
    return NextResponse.json({ ok: false, reason: "not_configured" }, { status: 503 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, reason: "invalid_body" }, { status: 400 });
  }
  // Honeypot: bots fill every field.
  if (typeof body.company_website === "string" && body.company_website) {
    return NextResponse.json({ ok: true });
  }

  const lead = parseLead(body);
  if (!lead) {
    return NextResponse.json({ ok: false, reason: "missing_fields" }, { status: 400 });
  }

  const { sent } = await forwardConversion({ event: "lead", ...lead, source: "landing-page/lead-form" });
  if (sent.length === 0) {
    return NextResponse.json({ ok: false, reason: "delivery_failed" }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
