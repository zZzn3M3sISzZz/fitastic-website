"use client";

import type { CSSProperties } from "react";
import { useCallback, useState } from "react";
import { BusinessEnquireForm } from "@/components/resources/business-enquire-form";
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

function ContactLists({ className }: { className?: string }) {
  return (
    <div className={cn("grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-x-10", className)}>
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
  );
}

export function ResourcesCtaSection() {
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.12 });
  const [enquireOpen, setEnquireOpen] = useState(false);

  const openEnquire = useCallback(() => {
    setEnquireOpen(true);
  }, []);

  return (
    <section
      id="cta"
      ref={ref}
      className={cn("resources-cta relative overflow-hidden bg-black", inView && "is-in")}
    >
      <div className="relative mx-auto w-full max-w-[1920px]">
        <div className="absolute inset-0 overflow-hidden" aria-hidden>
          <img
            src="/assets/resources/cta-bg.png"
            alt=""
            width={1920}
            height={2022}
            className="resources-cta-bg absolute inset-0 size-full object-cover object-[72%_center] max-md:object-[70%_center]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/50 to-black/88 md:from-transparent md:via-black/25 md:to-black/80" />
        </div>

        <div className="relative z-10 flex min-h-[min(100svh,1080px)] flex-col justify-between px-5 py-16 sm:px-8 md:px-[10%] md:py-[clamp(72px,10vh,120px)]">
          <div className="w-full max-w-[820px]">
            <h2 className="resources-cta-title text-[clamp(32px,4.2vw,72px)] font-medium leading-[1.08] tracking-[-0.03em] text-white">
              Ready to Put Your Products{" "}
              <br className="hidden sm:block" />
              in Front of the Right Audience?
            </h2>

            <div
              className={cn(
                "resources-cta-pill mt-8 inline-flex max-w-full flex-col gap-3 rounded-[24px] border border-white p-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4 sm:rounded-full sm:py-2 sm:pl-2 sm:pr-6",
                enquireOpen && "border-[#bbf247]/70",
              )}
            >
              <button
                type="button"
                aria-expanded={enquireOpen}
                aria-controls="partner-enquire-panel"
                onClick={openEnquire}
                className="inline-flex justify-center rounded-full bg-white px-5 py-2.5 text-[clamp(14px,1.2vw,20px)] font-semibold tracking-[-0.03em] text-black transition-opacity hover:opacity-80 sm:py-2.5"
              >
                Partner with Fitastic.
              </button>
              <p className="px-2 pb-1 text-center text-[clamp(13px,1.15vw,18px)] font-light text-white/90 sm:pb-0 sm:text-left sm:px-0">
                Let&apos;s grow the fitness ecosystem together.
              </p>
            </div>

            <div
              id="partner-enquire-panel"
              className={cn(
                "grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                enquireOpen
                  ? "mt-6 grid-rows-[1fr] opacity-100"
                  : "mt-0 grid-rows-[0fr] opacity-0",
              )}
              aria-hidden={!enquireOpen}
            >
              <div className="overflow-hidden">
                <div className="rounded-2xl border border-white/30 bg-black/65 p-5 backdrop-blur-sm sm:p-6">
                  <p className="border-l-[3px] border-[#bbf247] pl-4 text-[clamp(15px,1.35vw,20px)] font-medium leading-snug tracking-[-0.02em] text-white">
                    Tell us about your business — we&apos;ll get back to you.
                  </p>
                  {enquireOpen ? (
                    <BusinessEnquireForm className="mt-5" autoFocus />
                  ) : null}
                </div>
              </div>
            </div>
          </div>

          <ContactLists className="mt-14 w-full max-w-[640px] md:mt-16" />
        </div>
      </div>
    </section>
  );
}
