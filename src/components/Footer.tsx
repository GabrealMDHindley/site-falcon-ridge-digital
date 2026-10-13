import Image from "next/image";
import Link from "next/link";
import TrackedLink from "./TrackedLink";
import { CTA_LABEL, nav, site } from "@/data/site";

export default function Footer() {
  return (
    <footer className="border-t border-white/5">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8">
        <div className="grid gap-12 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <Image
              src="/brand/logo.png"
              alt="Falcon Ridge Digital"
              width={634}
              height={756}
              className="mb-5 h-28 w-auto"
            />
            <p className="max-w-xs text-sm text-ink-dim">
              Real estate digital marketing services for multifamily, RV parks, storage, and other
              rentable assets.
            </p>
          </div>

          <div>
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.24em] text-ink-dim">
              Navigate
            </p>
            <ul className="space-y-3 text-sm">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-ink-dim transition hover:text-ink">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <a href={site.mainSite} className="text-ink-dim transition hover:text-ink">
                  falconridgedigital.com
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.24em] text-ink-dim">
              Contact
            </p>
            <ul className="space-y-3 text-sm text-ink-dim">
              <li>
                <a href={`mailto:${site.email}`} className="transition hover:text-ink">
                  {site.email}
                </a>
              </li>
              <li>
                <a href={site.phoneHref} className="transition hover:text-ink">
                  {site.phone}
                </a>
              </li>
              <li className="flex flex-wrap gap-x-4 gap-y-2 pt-1">
                {site.socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition hover:text-ink"
                  >
                    {s.label}
                  </a>
                ))}
              </li>
              <li>
                <TrackedLink
                  href="/#book"
                  params={{ location: "footer" }}
                  className="inline-flex items-center gap-1.5 pt-1 text-accent transition hover:text-white"
                >
                  {CTA_LABEL} &rarr;
                </TrackedLink>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/5 pt-6 text-xs text-ink-dim/80 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {site.legalName}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {site.legal.map((l) => (
              <li key={l.href}>
                <a href={l.href} target="_blank" rel="noopener noreferrer" className="transition hover:text-ink">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
