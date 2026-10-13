import Depth from "./Depth";
import KineticText from "./KineticText";
import Eyebrow from "./Eyebrow";
import Reveal from "./Reveal";
import { Stagger, StaggerItem } from "./Stagger";
import Tilt from "./Tilt";
import { why } from "@/data/site";

// Sits where Train & Scale's Guarantee section sits. Falcon Ridge Digital
// publishes no guarantee, so this is their own "Why Work With Us" — verbatim.
export default function WhyUs() {
  return (
    <section id="why" className="relative scroll-mt-24 overflow-hidden border-t border-white/5 py-24 sm:py-32">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(55% 45% at 50% 18%, rgba(12,204,175,0.14) 0%, rgba(4,40,57,0) 70%)",
        }}
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-6xl px-6 sm:px-8">
        <div className="mx-auto max-w-3xl">
          <Depth>
            <div className="glass-card px-8 py-12 text-center sm:px-14 sm:py-16">
              <p className="mb-4 font-mono text-xs uppercase tracking-[0.28em] text-accent-deep">
                <Eyebrow text={why.eyebrow} />
              </p>
              <KineticText
                as="h2"
                text={why.headline}
                stagger={0.03}
                className="text-balance font-display text-2xl font-semibold leading-tight sm:text-4xl"
              />
              <Reveal delay={0.2}>
                <p className="glow-text mt-5 text-balance font-display text-lg text-accent sm:text-xl">
                  {why.lead}
                </p>
                <p className="mt-5 text-balance font-body text-ink-dim">{why.body}</p>
              </Reveal>
            </div>
          </Depth>
        </div>

        <Stagger className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" stagger={0.07}>
          {why.cards.map((c) => (
            <StaggerItem key={c.title} className="h-full">
              <Tilt className="glass-card flex h-full flex-col gap-2 p-6">
                <h3 className="font-display text-base font-semibold text-ink">{c.title}</h3>
                <p className="font-body text-sm leading-relaxed text-ink-dim">{c.body}</p>
              </Tilt>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
