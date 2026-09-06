"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

export function ResourcesWorkflowSection() {
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
      { threshold: 0.22 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="marketplace"
      ref={ref}
      className="relative w-full overflow-hidden bg-black"
    >
      <div className={cn("resources-workflow-stage w-full", active && "is-active")}>
        <img
          src="/assets/resources/05-marketplace.png"
          alt="A Marketplace Built for Fitness — product category workflow"
          width={1920}
          height={1080}
          className="resources-workflow-image block h-auto w-full select-none"
          loading="lazy"
          decoding="async"
        />
        <div className="resources-workflow-pulse pointer-events-none absolute inset-0" aria-hidden />
      </div>
    </section>
  );
}
