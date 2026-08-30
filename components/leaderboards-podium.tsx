"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

/**
 * Animate the full podium graphic as one unit.
 * Prior clip-path / strip approaches tore pillars when halves
 * transformed on different delays against a shared PNG.
 */
export function LeaderboardsPodium() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="pointer-events-none relative mx-auto w-full max-w-[380px] overflow-visible pt-2 sm:max-w-[420px]"
      aria-hidden="true"
    >
      <div
        className={cn(
          "leaderboard-pillar relative aspect-[504/461] w-full origin-bottom overflow-visible",
          inView && "is-in",
        )}
      >
        <img
          src="/assets/features/leaderboards-visual.png"
          alt=""
          width={504}
          height={461}
          className="absolute inset-0 size-full object-contain object-bottom"
        />
      </div>
      <div className="absolute inset-x-0 bottom-0 h-[28%] bg-gradient-to-b from-transparent via-canvas/30 to-canvas" />
      <span className="sr-only">Leaderboard podium with trophy standings</span>
    </div>
  );
}
