import { ASSET_TYPES, OBJECTIVES, SPEND_OPTIONS } from "@/data/site";

// Contact + qualifying fields shared by the booking calendar and the lead form.
// The questions and options are Falcon Ridge Digital's own, from their
// /strategy-proposal/ form.
const input =
  "w-full rounded-lg border border-white/10 bg-surface px-4 py-3 text-sm text-ink outline-none transition focus:border-accent-deep";
const label = "mb-1.5 block font-mono text-xs uppercase tracking-wide text-ink-dim";

function Text({
  id,
  text,
  type = "text",
  autoComplete,
}: {
  id: string;
  text: string;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className={label}>
        {text}
      </label>
      <input id={id} name={id} type={type} required autoComplete={autoComplete} className={input} />
    </div>
  );
}

function Select({
  id,
  text,
  options,
  required = false,
}: {
  id: string;
  text: string;
  options: readonly string[];
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className={label}>
        {text}
        {!required && <span className="normal-case tracking-normal text-ink-dim/60"> (optional)</span>}
      </label>
      <select id={id} name={id} required={required} defaultValue="" className={`${input} appearance-none`}>
        <option value="" disabled={required}>
          Select…
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

export default function QualifierFields() {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Text id="firstName" text="First Name" autoComplete="given-name" />
        <Text id="lastName" text="Last Name" autoComplete="family-name" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Text id="email" text="Email" type="email" autoComplete="email" />
        <Text id="phone" text="Phone" type="tel" autoComplete="tel" />
      </div>
      <Select id="assetType" text="What Is Your Property Asset Type" options={ASSET_TYPES} required />
      <div className="grid gap-4 sm:grid-cols-2">
        <Select id="objective" text="Primary Objective" options={OBJECTIVES} />
        <Select id="spend" text="Est. Monthly Marketing Spend" options={SPEND_OPTIONS} />
      </div>
      <div>
        <label htmlFor="message" className={label}>
          Tell us about your propert(ies)
          <span className="normal-case tracking-normal text-ink-dim/60"> (optional)</span>
        </label>
        <textarea id="message" name="message" rows={3} className={input} />
      </div>
      {/* Honeypot — hidden from people, filled by bots. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="company_website">Company website</label>
        <input id="company_website" name="company_website" tabIndex={-1} autoComplete="off" />
      </div>
    </div>
  );
}
