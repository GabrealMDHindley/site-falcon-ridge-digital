// Shared shape for the booking calendar and the lead form, so both validate
// against the same allowed values — Falcon Ridge Digital's own qualifying
// questions from their /strategy-proposal/ form.
import { ASSET_TYPES, OBJECTIVES, SPEND_OPTIONS } from "@/data/site";

export function clean(value: unknown, max = 500): string {
  return typeof value === "string" ? value.slice(0, max).trim() : "";
}

const isOneOf = (list: readonly string[]) => (value: string) => list.includes(value);
export const isAssetType = isOneOf(ASSET_TYPES);
export const isObjective = isOneOf(OBJECTIVES);
export const isSpend = isOneOf(SPEND_OPTIONS);

export const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export type LeadFields = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  assetType: string;
  objective: string;
  spend: string;
  message: string;
};

/** Parses + validates the common contact/qualifier fields. Returns null when a required field is missing or invalid. */
export function parseLead(body: Record<string, unknown>): LeadFields | null {
  const f: LeadFields = {
    firstName: clean(body.firstName, 60),
    lastName: clean(body.lastName, 60),
    email: clean(body.email, 160),
    phone: clean(body.phone, 40),
    assetType: clean(body.assetType, 40),
    objective: clean(body.objective, 60),
    spend: clean(body.spend, 30),
    message: clean(body.message, 2000),
  };
  if (!f.firstName || !f.lastName || !isEmail(f.email) || !f.phone || !isAssetType(f.assetType)) return null;
  if (f.objective && !isObjective(f.objective)) f.objective = "";
  if (f.spend && !isSpend(f.spend)) f.spend = "";
  return f;
}
