"use client";

import type { ReactNode } from "react";
import { track, type TrackEvent, type TrackParams } from "@/lib/track";

// Plain anchor that reports a conversion event on click. In-page anchors
// (#book, #offers) scroll natively (Lenis picks them up); external links open
// in a new tab so the landing page stays open.
export default function TrackedLink({
  href,
  event = "cta_click",
  params,
  className,
  children,
  ariaLabel,
}: {
  href: string;
  event?: TrackEvent;
  params?: TrackParams;
  className?: string;
  children: ReactNode;
  ariaLabel?: string;
}) {
  const external = /^https?:\/\//.test(href);
  return (
    <a
      href={href}
      className={className}
      aria-label={ariaLabel}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      onClick={() => track(event, { ...params, href })}
    >
      {children}
    </a>
  );
}
