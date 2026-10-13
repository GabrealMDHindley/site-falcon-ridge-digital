import Reveal from "./Reveal";
import KineticText from "./KineticText";
import Magnetic from "./Magnetic";
import TrackedLink from "./TrackedLink";
import { CTA_LABEL } from "@/data/site";

export default function FinalCta() {
  return (
    <section className="relative overflow-hidden border-t border-white/5 py-28 sm:py-36">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(50% 60% at 50% 100%, rgba(12,204,175,0.18) 0%, rgba(4,40,57,0) 70%)",
        }}
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-2xl px-6 text-center sm:px-8">
        <KineticText
          as="h2"
          text="Ready to Upgrade Your Asset's Performance?"
          highlights={["Upgrade"]}
          className="text-balance font-display text-3xl font-bold leading-tight sm:text-5xl"
        />
        <Reveal delay={0.3}>
          <p className="mt-5 font-body text-ink-dim">
            Start with the strategy audit — we&rsquo;ll find exactly where you&rsquo;re losing money
            and map your path to higher occupancy.
          </p>
          <Magnetic className="mt-9">
            <TrackedLink
              href="#book"
              params={{ location: "final-cta" }}
              className="inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 font-mono text-sm font-bold uppercase tracking-wide text-ground transition hover:bg-white"
            >
              {CTA_LABEL}
              <span aria-hidden="true">&rarr;</span>
            </TrackedLink>
          </Magnetic>
        </Reveal>
      </div>
    </section>
  );
}
