"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Magnetic from "./Magnetic";
import { track } from "@/lib/track";
import TrackedLink from "./TrackedLink";
import { nav, site, CTA_LABEL } from "@/data/site";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-3 z-50 flex justify-center px-3 sm:top-4">
      <div
        className={`glass-card flex w-full max-w-5xl items-center justify-between !rounded-full px-4 py-2.5 sm:px-6 ${
          scrolled ? "shadow-[0_16px_46px_-12px_rgba(0,0,0,0.6)]" : ""
        }`}
      >
        <Link href="/" className="flex items-center gap-2" aria-label={`${site.name} home`}>
          <Image
            src="/brand/mark.png"
            alt=""
            width={463}
            height={402}
            priority
            className="h-7 w-auto sm:h-8"
          />
          <span className="font-display text-[13px] font-bold uppercase leading-none tracking-[0.14em] text-accent-deep sm:text-sm">
            Falcon Ridge <span className="text-ink-dim">Digital</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex lg:gap-7" aria-label="Primary">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-ink-dim transition hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Magnetic strength={0.25}>
            <TrackedLink
              href="/#book"
              params={{ location: "header" }}
              className="inline-flex items-center rounded-full bg-accent px-5 py-2.5 font-mono text-sm font-bold text-ground transition hover:bg-white"
            >
              {CTA_LABEL}
            </TrackedLink>
          </Magnetic>
        </div>

        <button
          type="button"
          className="flex items-center justify-center rounded-full border border-white/15 p-2 text-ink lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            {open ? (
              <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            ) : (
              <path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="glass-card !absolute inset-x-3 top-[calc(100%+8px)] px-6 py-6 lg:hidden">
          <nav className="flex flex-col gap-5" aria-label="Primary mobile">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-base text-ink"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <a
              href="/#book"
              className="mt-2 inline-flex items-center justify-center rounded-full bg-accent px-5 py-3 font-mono text-sm font-bold text-ground"
              onClick={() => {
                setOpen(false);
                track("cta_click", { location: "header-mobile", href: "/#book" });
              }}
            >
              {CTA_LABEL}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
