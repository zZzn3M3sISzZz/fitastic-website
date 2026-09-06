"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

export function ResourcesHeroSection() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReady(true);
      return;
    }
    const t = window.setTimeout(() => setReady(true), 120);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <section
      id="hero"
      className="relative isolate overflow-hidden bg-black pt-[88px] lg:pt-[100px]"
    >
      <div className="relative mx-auto aspect-[1920/1080] w-full max-w-[1920px]">
        <img
          src="/assets/resources/hero-base.png"
          alt=""
          width={1920}
          height={1080}
          className="absolute inset-0 size-full object-cover"
        />

        <div
          className={cn(
            "resources-contact-card absolute bottom-[6%] right-[4%] w-[min(46%,620px)] sm:bottom-[8%] sm:right-[5%]",
            ready && "is-in",
          )}
        >
          <img
            src="/assets/resources/contact-card.png"
            alt="Fitastic × Marketplace Partnership — Instagram @fitastic.app, www.fitastic.cc, support@fitastic.cc, Marketing & Sales +91 73394 11222, App Support +91 95660 30198, App Design +91 91678 45609"
            width={829}
            height={424}
            className="h-auto w-full select-none"
          />
        </div>
      </div>
    </section>
  );
}
