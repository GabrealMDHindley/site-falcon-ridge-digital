import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { Stagger, StaggerItem } from "./Stagger";
import Tilt from "./Tilt";
import TrackedLink from "./TrackedLink";
import { modules, modulesIntro } from "@/data/site";

function CheckIcon() {
  return (
    <svg viewBox="0 0 16 16" className="mt-0.5 h-4 w-4 shrink-0 text-accent" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.2" opacity="0.4" />
      <path d="M5 8.3l2 2 4-4.4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// What Falcon Ridge Digital deploys — their eight service modules, in their
// own words. "Discuss the Module" mirrors their home page CTA.
export default function InstallGrid() {
  return (
    <section id="modules" className="scroll-mt-24 border-t border-white/5 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <SectionHeading eyebrow="What We Deploy" title={modulesIntro.title} description={modulesIntro.body} />

        <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.07}>
          {modules.map((m, i) => (
            <StaggerItem key={m.title} className="h-full">
              <Tilt className="glass-card flex h-full flex-col overflow-hidden p-6">
                <p className="mono-num text-xs text-accent-deep">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-3 flex gap-2.5 font-display text-base font-semibold text-ink sm:text-lg">
                  <CheckIcon />
                  <span>{m.title}</span>
                </h3>
                <p className="mt-3 flex-1 font-body text-sm leading-relaxed text-ink-dim">{m.description}</p>
                <TrackedLink
                  href="#book"
                  params={{ location: `module:${m.title}` }}
                  className="mt-5 inline-flex text-sm text-accent transition hover:text-white"
                >
                  Discuss the Module &rarr;
                </TrackedLink>
              </Tilt>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.2}>
          <p className="mx-auto mt-10 max-w-2xl text-center font-body text-sm text-ink-dim">{modulesIntro.note}</p>
        </Reveal>
      </div>
    </section>
  );
}
