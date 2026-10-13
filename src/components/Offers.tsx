"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import Eyebrow from "./Eyebrow";
import { Stagger, StaggerItem } from "./Stagger";
import Tilt from "./Tilt";
import TrackedLink from "./TrackedLink";
import { CTA_LABEL, serviceLevels, type Offer } from "@/data/site";

function CheckIcon() {
  return (
    <svg viewBox="0 0 16 16" className="mt-0.5 h-4 w-4 shrink-0 text-accent-deep" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.2" opacity="0.4" />
      <path d="M5 8.3l2 2 4-4.4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function OfferCard({ offer, level, group }: { offer: Offer; level: string; group: string }) {
  const showGroup = group !== offer.name;
  return (
    <Tilt
      className={`glass-card flex h-full flex-col overflow-hidden p-6 sm:p-7 ${
        offer.featured ? "!border-accent/50" : ""
      }`}
    >
      {showGroup && (
        <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-accent-deep">{group}</p>
      )}
      <h3 className={`font-display text-lg font-semibold text-ink sm:text-xl ${showGroup ? "mt-2" : ""}`}>
        {offer.name}
      </h3>
      {offer.note && <p className="mt-1 text-sm text-ink-dim">{offer.note}</p>}

      {offer.includes.length > 0 && (
        <ul className="mt-5 space-y-2.5">
          {offer.includes.map((item) => (
            <li key={item} className="flex gap-2.5 font-body text-sm leading-relaxed text-ink-dim">
              <CheckIcon />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-auto pt-7">
        {offer.cta?.kind === "checkout" && (
          <TrackedLink
            href={offer.cta.href}
            event="offer_checkout_click"
            params={{ location: `offers:${offer.id}`, offer: offer.name }}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 font-mono text-sm font-bold uppercase tracking-wide text-ground transition hover:bg-white"
          >
            {offer.cta.label}
            <span aria-hidden="true">&rarr;</span>
          </TrackedLink>
        )}
        {offer.cta?.kind === "book" && (
          <TrackedLink
            href="#book"
            params={{ location: `offers:${level}:${offer.id}` }}
            className={`inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 font-mono text-sm font-bold uppercase tracking-wide transition ${
              offer.featured
                ? "bg-accent text-ground hover:bg-white"
                : "border border-white/15 text-ink hover:border-accent/60 hover:text-accent"
            }`}
          >
            {CTA_LABEL}
          </TrackedLink>
        )}
      </div>
    </Tilt>
  );
}

// The four service levels from the client's offer sheet, as the TAS-style
// tab switcher. Names and inclusions are verbatim from offers.md; no pricing
// is shown anywhere on the site (user instruction, 2026-10-13).
export default function Offers() {
  const [activeId, setActiveId] = useState(serviceLevels[0].id);
  const active = serviceLevels.find((l) => l.id === activeId) ?? serviceLevels[0];
  const reduce = useReducedMotion();

  return (
    <section id="offers" className="scroll-mt-24 border-t border-white/5 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <SectionHeading
          eyebrow="Offers"
          title="Pick your service level, see exactly what's included"
          description="From a do-it-yourself workshop to a full-service retainer — deploy any module, in any order, based on your current P&L needs."
        />

        <div className="mt-10 flex flex-wrap justify-center gap-2 px-2" role="tablist" aria-label="Service levels">
          {serviceLevels.map((l) => (
            <button
              key={l.id}
              type="button"
              role="tab"
              aria-selected={activeId === l.id}
              onClick={() => setActiveId(l.id)}
              className={`rounded-full border px-4 py-2 font-mono text-xs font-bold uppercase tracking-wide transition sm:px-5 ${
                activeId === l.id
                  ? "border-accent bg-accent text-ground"
                  : "border-white/10 text-ink-dim hover:border-white/25 hover:text-ink"
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            role="tabpanel"
            initial={reduce ? undefined : { opacity: 0, y: 16 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12"
          >
            <div className="text-center">
              <p className="font-mono text-xs uppercase tracking-[0.24em] text-accent-deep">
                <Eyebrow key={active.id} text={active.title} immediate />
              </p>
              {active.blurb && <p className="mt-3 text-sm text-ink-dim">{active.blurb}</p>}
            </div>

            <div className="mt-10 space-y-12">
              {active.groups.map((group) => {
                const single = group.offers.length === 1;
                return (
                  <div key={group.title}>
                    {active.groups.length > 1 && (
                      <h3 className="mb-5 font-display text-xl font-semibold text-ink">{group.title}</h3>
                    )}
                    <Stagger
                      className={
                        single
                          ? "mx-auto grid max-w-xl"
                          : `grid gap-5 sm:grid-cols-2 ${group.offers.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`
                      }
                      stagger={0.08}
                    >
                      {group.offers.map((offer) => (
                        <StaggerItem key={offer.id} className="h-full">
                          <OfferCard offer={offer} level={active.id} group={group.title} />
                        </StaggerItem>
                      ))}
                    </Stagger>
                  </div>
                );
              })}
            </div>

          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
