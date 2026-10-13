import Depth from "./Depth";
import KineticText from "./KineticText";
import Eyebrow from "./Eyebrow";
import Reveal from "./Reveal";
import { mission } from "@/data/site";

export default function Mission() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-24 text-center sm:px-8 sm:py-32">
      <Depth>
        <p className="mb-5 font-mono text-xs uppercase tracking-[0.28em] text-coral">
          <Eyebrow text={mission.eyebrow} />
        </p>
        <KineticText
          as="h2"
          stagger={0.035}
          text={mission.headline}
          highlights={["financial", "hostage"]}
          className="text-balance font-display text-3xl font-bold leading-tight text-ink sm:text-4xl md:text-5xl"
        />
        <Reveal delay={0.2}>
          <p className="mt-8 font-display text-xl font-medium text-ink sm:text-2xl">{mission.lead}</p>
          <p className="mx-auto mt-4 max-w-2xl font-body text-ink-dim">{mission.body}</p>
          <a
            href={mission.link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex text-sm text-accent underline underline-offset-4 transition hover:text-white"
          >
            {mission.link.label} &rarr;
          </a>
        </Reveal>
      </Depth>
    </section>
  );
}
