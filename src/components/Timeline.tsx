"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "./SectionHeading";
import { timelines } from "@/data/site";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Track = "path" | "next";

export default function Timeline() {
  const [track, setTrack] = useState<Track>("path");
  const containerRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const phases = timelines[track];

  useLayoutEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set("[data-phase], [data-phase-item]", { opacity: 1, x: 0 });
        if (railRef.current) gsap.set(railRef.current, { scaleY: 1 });
        return;
      }

      if (railRef.current) {
        gsap.fromTo(
          railRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 75%",
              end: "bottom 60%",
              scrub: 0.6,
            },
          }
        );
      }

      gsap.utils.toArray<HTMLElement>("[data-phase]").forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, x: -24, rotateY: -16, z: -60, transformPerspective: 1000, filter: "blur(6px)" },
          {
            opacity: 1,
            x: 0,
            rotateY: 0,
            z: 0,
            filter: "blur(0px)",
            duration: 0.7,
            ease: "power3.out",
            delay: (i % 5) * 0.03,
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          }
        );
        gsap.fromTo(
          el.querySelectorAll("[data-phase-item]"),
          { opacity: 0, x: 14 },
          {
            opacity: 1,
            x: 0,
            duration: 0.45,
            stagger: 0.05,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [track]);

  return (
    <section id="how-it-works" className="scroll-mt-24 border-t border-white/5 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-6 sm:px-8">
        <SectionHeading
          eyebrow="How It Works"
          title="The Path to Asset Dominance"
          description="Start with the free strategy audit, then build the engine and keep tuning it with your own data."
        />

        <div className="mt-10 flex justify-center">
          <div className="inline-flex max-w-full flex-wrap justify-center rounded-3xl border border-white/10 bg-ground p-1 sm:rounded-full">
            {(
              [
                { key: "path", label: "The Path To Asset Dominance" },
                { key: "next", label: "What Happens Next" },
              ] as { key: Track; label: string }[]
            ).map((opt) => (
              <button
                key={opt.key}
                type="button"
                onClick={() => setTrack(opt.key)}
                className={`rounded-full px-3 py-2 font-mono text-[11px] font-bold uppercase tracking-wide transition sm:px-5 sm:text-xs ${
                  track === opt.key
                    ? "bg-accent text-ground"
                    : "text-ink-dim hover:text-ink"
                }`}
                aria-pressed={track === opt.key}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div ref={containerRef} className="relative mt-16">
          <div className="absolute left-[13px] top-2 bottom-2 w-px bg-white/10 sm:left-[17px]" aria-hidden="true">
            <div
              ref={railRef}
              className="h-full w-full origin-top bg-accent-deep"
              style={{ transform: "scaleY(0)" }}
            />
          </div>

          <ol className="space-y-12">
            {phases.map((phase) => (
              <li key={phase.label} data-phase className="relative pl-10 sm:pl-14">
                <span
                  className="absolute left-0 top-1 flex h-7 w-7 items-center justify-center rounded-full border border-accent-deep/60 bg-ground sm:h-9 sm:w-9"
                  aria-hidden="true"
                >
                  <span className="h-2 w-2 rounded-full bg-accent" />
                </span>
                <p className="mono-num text-xs uppercase tracking-[0.2em] text-accent-deep">
                  {phase.kicker}
                </p>
                <h3 className="mt-1 font-display text-xl font-medium sm:text-2xl">
                  {phase.label}
                </h3>
                <p data-phase-item className="mt-3 max-w-2xl font-body text-sm leading-relaxed text-ink-dim sm:text-base">
                  {phase.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
