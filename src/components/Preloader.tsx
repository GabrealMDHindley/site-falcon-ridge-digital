"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import LogoDrawIn from "./LogoDrawIn";
import Eyebrow from "./Eyebrow";
import { hasWebGL } from "@/lib/webgl";
import { serviceTags } from "@/data/site";

const FieldScene = dynamic(() => import("./three/FieldScene"), { ssr: false });

const SESSION_KEY = "frd-intro-seen";
const TAG_INTERVAL = 650;

// Full-screen intro, once per session: the site's own 3D field runs as the
// backdrop, the logo-reveal clip (once one exists) is screen-blended and edge-masked
// into it (so its black frame vanishes — no box), the real service tags
// cycle underneath, and the whole scene zooms through into the hero.
// Falls back to the code-only ridge draw-in without the clip, skippable,
// and skipped entirely under prefers-reduced-motion.
export default function Preloader({ hasVideo }: { hasVideo: boolean }) {
  const [closing, setClosing] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [field, setField] = useState<{ count: number } | null>(null);
  const [tag, setTag] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const duration = hasVideo ? 4800 : 2600;

  const finish = useCallback(() => {
    // Stop playback immediately rather than letting it keep running through
    // the fade-out: on iOS Safari a muted/inline video that's still marked
    // "playing" while it visually shrinks/fades away can trigger automatic
    // Picture-in-Picture, popping a floating mini-player over the page.
    videoRef.current?.pause();
    setClosing(true);
    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {}
    window.setTimeout(() => setHidden(true), 750);
  }, []);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {}
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (seen || reduce) {
      // Intentional: the preloader must render on the server/first paint
      // (hidden starts false) so it's never a blank/mismatched hero; this
      // effect immediately corrects it once we can read
      // sessionStorage/matchMedia (browser-only, unknown during SSR).
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setHidden(true);
      try {
        sessionStorage.setItem(SESSION_KEY, "1");
      } catch {}
      return;
    }

    if (hasWebGL()) {
      setField({ count: window.matchMedia("(max-width: 640px)").matches ? 220 : 420 });
    }

    const timer = window.setTimeout(finish, duration);
    const cycle = window.setInterval(
      () => setTag((t) => Math.min(t + 1, serviceTags.length - 1)),
      TAG_INTERVAL
    );
    return () => {
      window.clearTimeout(timer);
      window.clearInterval(cycle);
    };
  }, [finish, duration]);

  if (hidden) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] overflow-hidden bg-ground transition-[opacity,transform] duration-700 ease-out ${
        closing ? "pointer-events-none scale-[1.06] opacity-0" : "scale-100 opacity-100"
      }`}
      role="status"
      aria-label="Loading Falcon Ridge Digital"
    >
      {field && (
        <div className="absolute inset-0" aria-hidden="true">
          <FieldScene count={field.count} />
        </div>
      )}

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(45% 40% at 50% 48%, rgba(12,204,175,0.22) 0%, rgba(4,40,57,0) 70%)",
        }}
        aria-hidden="true"
      />

      <div className="absolute inset-0 flex items-center justify-center">
        {hasVideo ? (
          <video
            ref={videoRef}
            className="preloader-video"
            src="/videos/brand/logo-reveal.mp4"
            poster="/videos/brand/poster.jpg"
            autoPlay
            muted
            playsInline
            disablePictureInPicture
            disableRemotePlayback
            onEnded={finish}
          />
        ) : (
          <LogoDrawIn />
        )}
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-[22%] flex justify-center px-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-accent-deep">
          <Eyebrow key={tag} text={serviceTags[tag]} immediate />
        </p>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-[2px] bg-white/5" aria-hidden="true">
        <div className="preloader-rail h-full bg-accent-deep" style={{ animationDuration: `${duration}ms` }} />
      </div>

      <button
        type="button"
        onClick={finish}
        className="absolute bottom-8 right-6 font-mono text-xs uppercase tracking-widest text-ink-dim transition hover:text-ink sm:right-8"
      >
        Skip
      </button>
    </div>
  );
}
