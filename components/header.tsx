"use client";

import { useEffect, useState } from "react";
import { PillButton } from "@/components/pill-button";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/cn";

const NAV = [
  { href: "/#coming", label: "What’s Coming" },
  { href: "/#faqs", label: "FAQs" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-tap",
        scrolled || open ? "bg-canvas/90 backdrop-blur-md" : "bg-transparent",
      )}
    >
      <Reveal className="mx-auto flex max-w-page items-center justify-between px-gutter py-6">
        <div className="flex items-center gap-6">
          <a href="/" className="flex items-center" aria-label="Fitastic home">
            <span className="relative block h-[43px] w-[129px] overflow-hidden lg:h-[54px] lg:w-[163px]">
              <img
                src="/assets/logo.png"
                alt=""
                width={163}
                height={54}
                className="absolute inset-0 size-full object-contain object-left"
              />
            </span>
          </a>
          <nav aria-label="Primary" className="hidden items-center lg:flex">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="px-3.5 py-2 text-base font-medium text-white transition-opacity duration-tap hover:opacity-70"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <PillButton href="/#waitlist" showDot className="hidden sm:inline-flex">
            Early Access
          </PillButton>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-full text-white lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <span className="relative block h-3.5 w-5" aria-hidden="true">
              <span
                className={cn(
                  "absolute left-0 h-0.5 w-5 bg-white transition-transform duration-tap",
                  open ? "top-1.5 rotate-45" : "top-0",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 top-1.5 h-0.5 w-5 bg-white transition-opacity duration-tap",
                  open && "opacity-0",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 h-0.5 w-5 bg-white transition-transform duration-tap",
                  open ? "top-1.5 -rotate-45" : "top-3",
                )}
              />
            </span>
          </button>
        </div>
      </Reveal>

      <div
        id="mobile-nav"
        hidden={!open}
        className="border-t border-line bg-canvas px-gutter py-6 lg:hidden"
      >
        <nav aria-label="Mobile" className="flex flex-col gap-2">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="flex min-h-11 items-center text-base font-medium text-white"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <PillButton
            href="/#waitlist"
            showDot
            className="mt-2 self-start sm:hidden"
            onClick={() => setOpen(false)}
          >
            Early Access
          </PillButton>
        </nav>
      </div>
    </header>
  );
}
