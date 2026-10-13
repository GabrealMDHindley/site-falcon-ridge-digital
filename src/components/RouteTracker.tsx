"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { track } from "@/lib/track";

// Sends a page_view to every configured platform on first load and on each
// client-side route change (e.g. booking → /confirmation). Base tags load
// "afterInteractive", so the first event waits briefly for them.
export default function RouteTracker() {
  const pathname = usePathname();
  const first = useRef(true);

  useEffect(() => {
    const initial = first.current;
    first.current = false;
    const t = window.setTimeout(
      () => track("page_view", { path: pathname, spa: !initial }),
      initial ? 1200 : 0
    );
    return () => window.clearTimeout(t);
  }, [pathname]);

  return null;
}
