import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import BookingForm from "./BookingForm";
import LeadForm from "./LeadForm";
import Magnetic from "./Magnetic";
import TrackedLink from "./TrackedLink";
import { ghlConfigured } from "@/lib/ghl";
import { leadWebhooksConfigured } from "@/lib/forward";
import { TIMEZONE_LABEL } from "@/lib/booking";
import { CTA_LABEL, STRATEGY_PROPOSAL_URL, site } from "@/data/site";

export type BookingMode = "calendar" | "lead-form" | "proposal-link";

export function bookingMode(): BookingMode {
  if (ghlConfigured()) return "calendar";
  if (leadWebhooksConfigured()) return "lead-form";
  return "proposal-link";
}

// The #book section. Three modes, never a dead button:
//  calendar      — GHL v3 env set: live slots, books on-site, → /confirmation
//  lead-form     — no calendar, but a lead webhook is set: on-site request form
//  proposal-link — nothing configured: Falcon Ridge's own /strategy-proposal/ form
export default function Booking() {
  const mode = bookingMode();

  return (
    <section id="book" className="scroll-mt-24 border-t border-white/5 py-24 sm:py-32">
      <div className="mx-auto max-w-2xl px-6 sm:px-8">
        <SectionHeading
          eyebrow={CTA_LABEL}
          title="Claim your free strategy & unlock your path to higher occupancy"
          description={
            mode === "calendar"
              ? `Pick a day and time (${TIMEZONE_LABEL}). We'll review your public-facing digital footprint and map the right level of help for your asset.`
              : "Tell us about your propert(ies). We'll send you a custom-engineered roadmap to maximize occupancy and reclaim ownership of your own data."
          }
        />

        <Reveal className="glass-card mt-12 p-7 sm:p-9" delay={0.1}>
          {mode === "calendar" && <BookingForm />}
          {mode === "lead-form" && <LeadForm />}
          {mode === "proposal-link" && (
            <div className="flex flex-col items-center gap-5 text-center">
              <p className="text-ink-dim">
                Answer four quick questions about your asset type, objective, lead sources, and
                marketing spend, and the Falcon Ridge team will build your custom strategy proposal.
              </p>
              <Magnetic>
                <TrackedLink
                  href={STRATEGY_PROPOSAL_URL}
                  params={{ location: "booking-section" }}
                  className="inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 font-mono text-sm font-bold uppercase tracking-wide text-ground transition hover:bg-white"
                >
                  {CTA_LABEL}
                  <span aria-hidden="true">&rarr;</span>
                </TrackedLink>
              </Magnetic>
            </div>
          )}
        </Reveal>

        <p className="mt-8 text-center text-sm text-ink-dim">
          Prefer to talk now? Call{" "}
          <a href={site.phoneHref} className="text-accent transition hover:text-white">
            {site.phone}
          </a>{" "}
          or email{" "}
          <a href={`mailto:${site.email}`} className="text-accent transition hover:text-white">
            {site.email}
          </a>
          .
        </p>
      </div>
    </section>
  );
}
