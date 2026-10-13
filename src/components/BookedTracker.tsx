"use client";

import { useEffect } from "react";
import { track } from "@/lib/track";

// Fires the "booked" conversion once when the gated /confirmation page renders.
// Waits briefly so the afterInteractive base tags have loaded on a hard load.
export default function BookedTracker() {
  useEffect(() => {
    const t = window.setTimeout(() => track("booked", { location: "confirmation" }), 800);
    return () => window.clearTimeout(t);
  }, []);
  return null;
}
