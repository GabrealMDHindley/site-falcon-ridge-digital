import SectionHeading from "./SectionHeading";
import { Stagger, StaggerItem } from "./Stagger";
import Tilt from "./Tilt";
import CountUp from "./CountUp";
import { stats } from "@/data/site";

// Falcon Ridge Digital's own published proof stats ("Engineered by
// Experience", falconridgedigital.com) — attributed as theirs, never restated.
export default function Stats() {
  return (
    <section className="border-t border-white/5 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <SectionHeading eyebrow="Engineered by Experience" title="Built on 15+ years in the trenches" />
        <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.1}>
          {stats.map((s) => (
            <StaggerItem key={s.label} className="h-full">
              <Tilt className="glass-card h-full overflow-hidden px-6 py-9 text-center">
                <CountUp
                  target={s.target}
                  decimals={s.decimals}
                  prefix={s.prefix}
                  suffix={s.suffix}
                  className="glow-text font-display text-4xl font-semibold text-ink sm:text-5xl"
                />
                <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.22em] text-accent-deep">
                  {s.label}
                </p>
                <p className="mx-auto mt-3 max-w-xs font-body text-sm leading-relaxed text-ink-dim">
                  {s.detail}
                </p>
              </Tilt>
            </StaggerItem>
          ))}
        </Stagger>
        <p className="mt-6 text-center text-xs text-ink-dim/70">
          Figures as published by Falcon Ridge Digital on falconridgedigital.com.
        </p>
      </div>
    </section>
  );
}
