"use client";

import { cn } from "@/lib/cn";
import { useInView } from "@/lib/use-in-view";

const CARDS = [
  {
    num: "01",
    title: "The Opportunity",
    body: "Dedicated product listings to showcase your products, pricing, descriptions and brand identity.",
    left: 59.6,
    top: 8.2,
    width: 16.5,
  },
  {
    num: "02",
    title: "Lower Customer Acquisition Friction",
    body: "Put your products directly in front of users while they're already engaging with the fitness ecosystem.",
    left: 51.9,
    top: 25.3,
    width: 18.1,
  },
  {
    num: "03",
    title: "Flexible Commercials",
    body: "Choose between a predictable fixed-fee model or a performance-based revenue share.",
    left: 45.9,
    top: 45.7,
    width: 22.3,
  },
  {
    num: "04",
    title: "Brand Visibility",
    body: "Build awareness beyond individual transactions through your presence across the Fitastic ecosystem.",
    left: 51.9,
    top: 60.1,
    width: 17.6,
  },
  {
    num: "05",
    title: "Scalable Partnership",
    body: "Start small, validate demand, and expand your product portfolio as your business grows.",
    left: 60.1,
    top: 76.2,
    width: 22.1,
  },
] as const;

export function ResourcesWhyPartnerSection() {
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.14 });

  return (
    <section
      id="why-partner"
      ref={ref}
      className={cn(
        "resources-why-partner relative overflow-hidden bg-black",
        inView && "is-in",
      )}
    >
      <div className="relative mx-auto aspect-[1920/1080] w-full max-w-[1920px]">
        <img
          src="/assets/resources/why-partner-bg.png"
          alt=""
          width={1920}
          height={1080}
          className="absolute inset-0 size-full object-cover object-bottom brightness-[0.6] blur-sm scale-105"
          aria-hidden
        />

        <img
          src="/assets/resources/why-partner-circles.png"
          alt=""
          width={1600}
          height={867}
          className="resources-why-partner-circles pointer-events-none absolute -right-[4%] -top-[8%] z-[1] w-[78%] max-w-none"
          aria-hidden
        />

        <div className="absolute left-[10%] top-[8%] z-10 w-[min(42%,760px)]">
          <h2 className="resources-why-partner-title text-[clamp(36px,4vw,76px)] font-medium leading-[1.02] tracking-[-0.03em] text-white">
            Why Partner With Fitastic?
          </h2>
          <p className="resources-why-partner-sub mt-[clamp(10px,1vw,18px)] text-[clamp(16px,1.35vw,26px)] font-light leading-snug text-[#bcbaba]">
            Fitastic becomes another growth engine for your brand.
          </p>
        </div>

        <article className="resources-why-partner-intro absolute left-[10%] top-[32%] z-10 w-[min(34%,620px)] rounded-[24px] border border-white/90 bg-black/55 px-6 py-6 sm:px-7 sm:py-7">
          <p className="text-[clamp(18px,1.7vw,32px)] font-medium leading-tight tracking-[-0.03em] text-white">
            Your Products. Our Ecosystem. Shared Growth.
          </p>
          <ul className="mt-4 space-y-3 text-[clamp(13px,1.1vw,18px)] font-light leading-snug text-white/90">
            <li className="border-l-2 border-[#bbf247] pl-3">
              Fitastic isn&apos;t trying to replace your existing sales channels.
            </li>
            <li className="border-l-2 border-[#bbf247] pl-3">
              We&apos;re creating an additional channel specifically around fitness consumers.
            </li>
          </ul>
        </article>

        {CARDS.map((card, i) => (
          <article
            key={card.num}
            className="resources-why-partner-card absolute z-10 rounded-[24px] border border-white bg-black/70 px-5 py-5"
            style={{
              left: `${card.left}%`,
              top: `${card.top}%`,
              width: `${card.width}%`,
              minWidth: 220,
              ["--i" as string]: i,
            }}
          >
            <div className="flex items-start gap-2">
              <span className="text-[clamp(16px,1.4vw,25px)] font-medium tracking-[-0.02em] text-white">
                {card.num}
              </span>
              <div className="border-l-[2px] border-[#bbf247] pl-3">
                <p className="text-[clamp(14px,1.35vw,24px)] font-medium leading-tight tracking-[-0.02em] text-white">
                  {card.title}
                </p>
              </div>
            </div>
            <p className="mt-2 text-[clamp(12px,1.05vw,18px)] font-light leading-snug tracking-[-0.03em] text-white/90">
              {card.body}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
