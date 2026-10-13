"use client";

import Image from "next/image";

// Code-only intro for the preloader (no logo-reveal video yet): a ridge line
// draws across, echoing the ridge in Falcon Ridge Digital's logo, then their
// actual logo mark (cropped from logo.png — never redrawn) rises in above it.
export default function LogoDrawIn() {
  return (
    <div className="flex flex-col items-center gap-5">
      <div className="relative h-[120px] w-[150px]">
        <Image
          src="/brand/mark.png"
          alt=""
          width={463}
          height={402}
          priority
          className="absolute inset-0 m-auto h-[110px] w-auto opacity-0"
          style={{ animation: "mark-rise 0.7s cubic-bezier(0.16,1,0.3,1) 0.55s forwards" }}
        />
      </div>
      <svg width="220" height="28" viewBox="0 0 220 28" fill="none" aria-hidden="true">
        <path
          d="M4 24 C 60 22, 110 6, 140 6 C 160 6, 185 16, 216 24"
          stroke="var(--color-accent)"
          strokeWidth="2"
          strokeLinecap="round"
          pathLength={1}
          style={{
            strokeDasharray: 1,
            strokeDashoffset: 1,
            animation: "draw-ridge 0.9s ease-out 0.1s forwards",
          }}
        />
      </svg>
      <p
        className="font-display text-sm font-bold uppercase tracking-[0.35em] text-ink opacity-0"
        style={{ animation: "fade-up 0.5s ease-out 0.95s forwards" }}
      >
        Falcon Ridge Digital
      </p>
      <style>{`
        @keyframes draw-ridge {
          to { stroke-dashoffset: 0; }
        }
        @keyframes mark-rise {
          from { opacity: 0; transform: translateY(14px) scale(0.96); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
