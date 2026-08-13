"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: 0 | 1 | 2 | 3;
  id?: string;
  when?: "load" | "scroll";
};

export function Reveal({
  children,
  className,
  delay = 0,
  id,
  when = "load",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(when === "load");

  useEffect(() => {
    if (when !== "scroll") return;
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
      { threshold: 0.16, rootMargin: "0px 0px -10% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [when]);

  return (
    <div
      id={id}
      ref={ref}
      className={cn(
        when === "load" ? "reveal-load" : "reveal-scroll",
        inView && when === "scroll" && "is-in",
        delay === 1 && "reveal-delay-1",
        delay === 2 && "reveal-delay-2",
        delay === 3 && "reveal-delay-3",
        className,
      )}
    >
      {children}
    </div>
  );
}
