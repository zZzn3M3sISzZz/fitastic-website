"use client";

import { useEffect, type RefObject } from "react";

type ScrollLiftOptions = {
  lift?: number;
  grow?: number;
};

export function useScrollLift(
  wrapRef: RefObject<HTMLElement | null>,
  frameRef: RefObject<HTMLElement | null>,
  { lift = -42, grow = 0.045 }: ScrollLiftOptions = {},
) {
  useEffect(() => {
    const wrap = wrapRef.current;
    const frame = frameRef.current;
    if (!wrap || !frame) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let targetY = 0;
    let targetScale = 1;
    let currentY = 0;
    let currentScale = 1;
    let raf = 0;

    const apply = () => {
      const rect = wrap.getBoundingClientRect();
      const start = window.innerHeight * 0.92;
      const end = window.innerHeight * 0.22;
      const progress = Math.min(
        1,
        Math.max(0, (start - rect.top) / Math.max(start - end, 1)),
      );
      targetY = progress * lift;
      targetScale = 1 + progress * grow;
    };

    const tick = () => {
      currentY += (targetY - currentY) * 0.16;
      currentScale += (targetScale - currentScale) * 0.16;
      frame.style.transform = `translate3d(0, ${currentY}px, 0) scale(${currentScale})`;

      if (
        Math.abs(targetY - currentY) > 0.15 ||
        Math.abs(targetScale - currentScale) > 0.0008
      ) {
        raf = window.requestAnimationFrame(tick);
      } else {
        frame.style.transform = `translate3d(0, ${targetY}px, 0) scale(${targetScale})`;
        frame.style.willChange = "auto";
        raf = 0;
      }
    };

    const start = () => {
      apply();
      frame.style.willChange = "transform";
      if (!raf) raf = window.requestAnimationFrame(tick);
    };

    start();
    window.addEventListener("scroll", start, { passive: true });
    window.addEventListener("resize", start);

    return () => {
      window.removeEventListener("scroll", start);
      window.removeEventListener("resize", start);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [wrapRef, frameRef, lift, grow]);
}
