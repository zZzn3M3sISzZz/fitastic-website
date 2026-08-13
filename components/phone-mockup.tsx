"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

type PhoneMockupProps = {
  compact?: boolean;
};

export function PhoneMockup({ compact = false }: PhoneMockupProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const frame = frameRef.current;
    if (!wrap || !frame) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionQuery.matches) return;

    const section = wrap.closest("section");
    if (!section) return;

    const lift = compact ? -36 : -42;
    const grow = compact ? 0.05 : 0.045;

    let targetY = 0;
    let targetScale = 1;
    let currentY = 0;
    let currentScale = 1;
    let raf = 0;

    const apply = () => {
      if (compact) {
        const rect = wrap.getBoundingClientRect();
        const start = window.innerHeight * 0.92;
        const end = window.innerHeight * 0.22;
        const progress = Math.min(
          1,
          Math.max(0, (start - rect.top) / Math.max(start - end, 1)),
        );
        targetY = progress * lift;
        targetScale = 1 + progress * grow;
        return;
      }

      const rect = section.getBoundingClientRect();
      const travel = Math.max(rect.height * 0.65, 1);
      const progress = Math.min(1, Math.max(0, -rect.top / travel));
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
  }, [compact]);

  return (
    <div
      ref={wrapRef}
      className={cn(
        compact
          ? "relative mx-auto h-[240px] w-[min(300px,86vw)]"
          : "absolute bottom-[21px] left-[45.83%] h-[548px] w-[47.57%]",
      )}
    >
      <div ref={frameRef} className="size-full origin-bottom">
        <div className="relative size-full overflow-hidden">
          <img
            src="/assets/phone-mockup.png"
            alt="Fitastic app preview on a phone"
            width={3840}
            height={2160}
            className="absolute left-[-46.53%] top-[-23.34%] h-[138.6%] w-[196.98%] max-w-none"
          />
        </div>
      </div>
    </div>
  );
}
