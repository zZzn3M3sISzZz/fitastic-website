"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

export function ResourcesPartnershipSection() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setActive(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="partnership"
      ref={ref}
      className="relative flex h-[100svh] max-h-[1080px] items-center justify-center overflow-hidden bg-black"
    >
      <div
        className={cn(
          "resources-partnership-stage relative flex h-full w-full max-w-[1920px] items-center justify-center px-4 pb-8 pt-[6.5rem] sm:px-8",
          active && "is-active",
        )}
      >
        <div className="resources-partnership-frame relative flex h-full w-full max-w-[min(92vw,680px)] items-center justify-center">
          <img
            src="/assets/resources/partnership-graphic.png"
            alt="Fitastic Marketplace Partnership — Relevant Audience, Brand Presence, Scalable Growth, Direct Sales, Fitness Ecosystem"
            width={1058}
            height={798}
            className="resources-partnership-graphic max-h-full w-auto max-w-full select-none object-contain"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </section>
  );
}
