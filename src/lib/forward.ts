// Server-side conversion fan-out: POSTs a lead/booking payload to every
// configured webhook — GHL (inbound webhook), the email marketing service, and
// the CRM. Each fires only when its env var is set; the CRM one is the
// "conditional" destination from the intake. Failures are logged, never
// surfaced to the visitor (the booking itself already succeeded).

const DESTINATIONS = [
  { name: "ghl", env: "GHL_WEBHOOK_URL" },
  { name: "email", env: "EMAIL_WEBHOOK_URL" },
  { name: "crm", env: "CRM_WEBHOOK_URL" },
] as const;

export type ConversionPayload = {
  event: "lead" | "booked";
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  assetType?: string;
  objective?: string;
  spend?: string;
  message?: string;
  startTime?: string;
  source: string;
};

function configured() {
  return DESTINATIONS.map((d) => ({ ...d, url: process.env[d.env]?.trim() || "" })).filter(
    (d) => /^https:\/\//.test(d.url)
  );
}

export function leadWebhooksConfigured(): boolean {
  return configured().length > 0;
}

export async function forwardConversion(payload: ConversionPayload): Promise<{ sent: string[]; failed: string[] }> {
  const body = JSON.stringify({ ...payload, site: "site-falcon-ridge-digital", at: new Date().toISOString() });
  const targets = configured();
  const results = await Promise.allSettled(
    targets.map(async (t) => {
      const res = await fetch(t.url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
        signal: AbortSignal.timeout(8000),
      });
      if (!res.ok) throw new Error(`${t.name} webhook ${res.status}`);
      return t.name;
    })
  );
  const sent: string[] = [];
  const failed: string[] = [];
  results.forEach((r, i) => {
    if (r.status === "fulfilled") sent.push(targets[i].name);
    else {
      failed.push(targets[i].name);
      console.error(`forwardConversion → ${targets[i].name} failed:`, r.reason);
    }
  });
  return { sent, failed };
}
