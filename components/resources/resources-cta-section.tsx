"use client";

import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";
import { useInView } from "@/lib/use-in-view";

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

export function ResourcesCtaSection() {
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.12 });

  return (
    <section
      id="cta"
      ref={ref}
      className={cn("resources-cta relative overflow-hidden bg-black", inView && "is-in")}
    >
      <div className="relative mx-auto w-full max-w-[1920px]">
        {/* Desktop */}
        <div className="resources-cta-stage relative hidden aspect-[1920/1080] w-full md:block">
          <img
            src="/assets/resources/cta-bg.png"
            alt=""
            width={1920}
            height={2022}
            className="resources-cta-bg absolute inset-0 size-full object-cover object-[72%_center]"
            aria-hidden
          />

          <div className="absolute left-[10%] top-[14%] z-10 w-[min(48%,820px)]">
            <h2 className="resources-cta-title text-[clamp(36px,4.2vw,72px)] font-medium leading-[1.08] tracking-[-0.03em] text-white">
              Ready to Put Your Products
              <br />
              in Front of the Right Audience?
            </h2>

            <div className="resources-cta-pill mt-8 inline-flex max-w-full flex-wrap items-center gap-3 rounded-full border border-white px-2 py-2 sm:gap-4 sm:pl-2 sm:pr-6">
              <a
                href="#enquire"
                className="rounded-full bg-white px-5 py-2.5 text-[clamp(14px,1.2vw,20px)] font-semibold tracking-[-0.03em] text-black transition-opacity hover:opacity-80"
              >
                Partner with Fitastic.
              </a>
              <p className="px-2 text-[clamp(13px,1.15vw,18px)] font-light text-white/90 sm:px-0">
                Let&apos;s grow the fitness ecosystem together.
              </p>
            </div>
          </div>

          <div className="absolute bottom-[10%] left-[10%] z-10 grid w-[min(42%,640px)] grid-cols-2 gap-x-10 gap-y-5">
            <ul className="space-y-4">
              {CONTACT_LEFT.map((item, i) => (
                <li
                  key={item.label}
                  className="resources-cta-contact"
                  style={{ ["--i" as string]: i } as CSSProperties}
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
                  className="resources-cta-contact"
                  style={{ ["--i" as string]: i + CONTACT_LEFT.length } as CSSProperties}
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

        {/* Mobile */}
        <div className="resources-cta-stack relative md:hidden">
          <div className="absolute inset-0 overflow-hidden">
            <img
              src="/assets/resources/cta-bg.png"
              alt=""
              className="resources-cta-bg absolute inset-0 size-full object-cover object-[70%_center]"
              aria-hidden
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/55 to-black/85" aria-hidden />
          </div>

          <div className="relative z-10 flex min-h-[100svh] flex-col justify-between px-5 py-16 sm:px-8">
            <div>
              <h2 className="resources-cta-title text-[clamp(32px,9vw,48px)] font-medium leading-[1.08] tracking-[-0.03em] text-white">
                Ready to Put Your Products in Front of the Right Audience?
              </h2>

              <div className="resources-cta-pill mt-8 flex flex-col gap-3 rounded-[24px] border border-white p-3 sm:rounded-full sm:p-2">
                <a
                  href="#enquire"
                  className="inline-flex justify-center rounded-full bg-white px-5 py-3 text-[16px] font-semibold tracking-[-0.03em] text-black"
                >
                  Partner with Fitastic.
                </a>
                <p className="px-2 pb-1 text-center text-[15px] font-light text-white/90 sm:pb-0 sm:text-left">
                  Let&apos;s grow the fitness ecosystem together.
                </p>
              </div>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
              <ul className="space-y-4">
                {CONTACT_LEFT.map((item, i) => (
                  <li
                    key={item.label}
                    className="resources-cta-contact"
                    style={{ ["--i" as string]: i } as CSSProperties}
                  >
                    <p className="text-[12px] font-light text-white/55">{item.label}</p>
                    <a
                      href={item.href}
                      className="mt-0.5 block text-[16px] font-medium tracking-[-0.02em] text-white"
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
                    className="resources-cta-contact"
                    style={{ ["--i" as string]: i + CONTACT_LEFT.length } as CSSProperties}
                  >
                    <p className="text-[12px] font-light text-white/55">{item.label}</p>
                    <a
                      href={item.href}
                      className="mt-0.5 block text-[16px] font-medium tracking-[-0.02em] text-white"
                    >
                      {item.value}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
