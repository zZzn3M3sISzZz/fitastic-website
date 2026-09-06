"use client";

import { useEffect, useId, useRef, useState } from "react";
import { PillButton } from "@/components/pill-button";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/cn";

const COMING_ITEMS = [
  { href: "/#morgan", label: "Morgan" },
  { href: "/#leaderboards", label: "Leaderboards" },
  { href: "/#loop", label: "Loop" },
  { href: "/#fitness-on-demand", label: "On Demand" },
] as const;

const NAV = [
  { href: "/#shop", label: "Shop" },
  { href: "/#faqs", label: "FAQs" },
  { href: "/resources", label: "Business" },
] as const;

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 12 12"
      aria-hidden
      className={cn(
        "size-3 shrink-0 text-white/70 transition-transform duration-tap",
        open && "rotate-180",
      )}
    >
      <path
        d="M2.5 4.25 6 7.75l3.5-3.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [comingOpen, setComingOpen] = useState(false);
  const [mobileComingOpen, setMobileComingOpen] = useState(false);
  const comingRef = useRef<HTMLDivElement>(null);
  const comingMenuId = useId();

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

  useEffect(() => {
    if (!comingOpen) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!comingRef.current?.contains(event.target as Node)) {
        setComingOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setComingOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [comingOpen]);

  useEffect(() => {
    if (!open) setMobileComingOpen(false);
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
          <nav aria-label="Primary" className="hidden items-center xl:flex">
            <div
              ref={comingRef}
              className="relative"
              onMouseEnter={() => setComingOpen(true)}
              onMouseLeave={() => setComingOpen(false)}
            >
              <button
                type="button"
                className="inline-flex items-center gap-1.5 px-2.5 py-2 text-[15px] font-medium text-white transition-opacity duration-tap hover:opacity-70 xl:px-3"
                aria-expanded={comingOpen}
                aria-haspopup="menu"
                aria-controls={comingMenuId}
                onClick={() => setComingOpen((value) => !value)}
              >
                What’s Coming
                <Chevron open={comingOpen} />
              </button>
              <div
                id={comingMenuId}
                role="menu"
                hidden={!comingOpen}
                className="absolute left-0 top-full z-50 min-w-[200px] pt-2"
              >
                <div className="rounded-2xl border border-white/15 bg-canvas py-2 shadow-lg">
                  {COMING_ITEMS.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      role="menuitem"
                      className="block px-4 py-2.5 text-[15px] font-medium text-white transition-opacity duration-tap hover:opacity-70"
                      onClick={() => setComingOpen(false)}
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="px-2.5 py-2 text-[15px] font-medium text-white transition-opacity duration-tap hover:opacity-70 xl:px-3"
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
            className="inline-flex size-11 items-center justify-center rounded-full text-white xl:hidden"
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
        className="border-t border-line bg-canvas px-gutter py-6 xl:hidden"
      >
        <nav aria-label="Mobile" className="flex flex-col gap-2">
          <div>
            <button
              type="button"
              className="flex min-h-11 w-full items-center justify-between text-base font-medium text-white"
              aria-expanded={mobileComingOpen}
              onClick={() => setMobileComingOpen((value) => !value)}
            >
              What’s Coming
              <Chevron open={mobileComingOpen} />
            </button>
            {mobileComingOpen ? (
              <div className="mb-1 ml-3 flex flex-col border-l border-white/15 pl-3">
                {COMING_ITEMS.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="flex min-h-11 items-center text-base font-medium text-white/85"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            ) : null}
          </div>
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
