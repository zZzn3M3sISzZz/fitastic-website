"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

const CONTACT_LEFT = [
  { label: "Instagram", value: "@fitastic.app", href: "https://instagram.com/fitastic.app" },
  { label: "Website", value: "www.fitastic.cc", href: "https://www.fitastic.cc" },
  { label: "Email", value: "support@fitastic.cc", href: "mailto:support@fitastic.cc" },
] as const;

const CONTACT_RIGHT = [
  { label: "Marketing & Sales", value: "+91 73394 11222", href: "tel:+917339411222" },
  { label: "App Support & Helpline", value: "+91 95660 30198", href: "tel:+919566030198" },
  { label: "App Design & Experience", value: "+91 91678 45609", href: "tel:+919167845609" },
] as const;

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
      className={cn(
        "resources-hero relative isolate overflow-hidden bg-black pt-[88px] lg:pt-[100px]",
        ready && "is-in",
      )}
    >
      <div className="relative mx-auto flex min-h-[min(78vh,820px)] w-full max-w-[1920px] flex-col justify-end md:aspect-[1920/1080] md:min-h-0 md:block">
        {/* Solid black + runners */}
        <div className="pointer-events-none absolute inset-0 bg-black" aria-hidden />
        <img
          src="/assets/resources/hero-runners.png"
          alt=""
          width={1920}
          height={1173}
          className="resources-hero-runners absolute inset-0 m-auto h-[58%] w-auto max-w-[92%] object-contain object-center md:h-[72%] md:max-w-[88%]"
          aria-hidden
        />

        {/* Lime wordmark */}
        <div className="resources-hero-logo relative z-10 px-5 pb-4 pt-8 sm:px-8 md:absolute md:bottom-auto md:left-[6%] md:top-[8%] md:px-0 md:pb-0 md:pt-0">
          <img
            src="/assets/resources/hero-logo-lime.png"
            alt="Fitastic"
            width={320}
            height={76}
            className="h-auto w-[min(58vw,280px)] select-none md:w-[min(22vw,300px)]"
          />
        </div>

        {/* Contact card — HTML */}
        <div className="resources-hero-card relative z-10 mx-5 mb-10 rounded-2xl border border-white/25 bg-black/55 px-5 py-5 backdrop-blur-sm sm:mx-8 sm:px-6 sm:py-6 md:absolute md:bottom-[7%] md:right-[5%] md:mx-0 md:mb-0 md:w-[min(46%,620px)] md:bg-transparent md:px-0 md:py-0 md:backdrop-blur-none md:border-0">
          <p className="resources-hero-card-title text-[clamp(13px,1.4vw,22px)] font-medium uppercase tracking-[0.04em] text-white">
            Fitastic × Marketplace Partnership
          </p>
          <div className="mt-3 h-px w-full bg-white/80 md:mt-4" aria-hidden />

          <div className="mt-5 grid gap-6 sm:grid-cols-2 sm:gap-8 md:mt-6">
            <ul className="space-y-4">
              {CONTACT_LEFT.map((item, i) => (
                <li
                  key={item.label}
                  className="resources-hero-contact"
                  style={{ ["--i" as string]: i }}
                >
                  <p className="text-[clamp(11px,0.95vw,14px)] font-light text-white/55">
                    {item.label}
                  </p>
                  <a
                    href={item.href}
                    className="mt-0.5 block text-[clamp(14px,1.25vw,20px)] font-medium tracking-[-0.02em] text-white transition-opacity hover:opacity-70"
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  >
                    {item.value}
                  </a>
                </li>
              ))}
            </ul>
            <ul className="space-y-4">
              {CONTACT_RIGHT.map((item, i) => (
                <li
                  key={item.label}
                  className="resources-hero-contact"
                  style={{ ["--i" as string]: i + CONTACT_LEFT.length }}
                >
                  <p className="text-[clamp(11px,0.95vw,14px)] font-light text-white/55">
                    {item.label}
                  </p>
                  <a
                    href={item.href}
                    className="mt-0.5 block text-[clamp(14px,1.25vw,20px)] font-medium tracking-[-0.02em] text-white transition-opacity hover:opacity-70"
                  >
                    {item.value}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
