"use client";

import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";
import { useInView } from "@/lib/use-in-view";

const FEATURES = [
  {
    title: "End-to-End Gym CRM",
    body: "Fitastic is more than a fitness marketplace. At its core is a complete CRM designed to help gyms run their entire business from one platform.",
  },
  {
    title: "Run Your Entire Gym From Fitastic",
    body: "The CRM brings gyms, trainers and members onto the platform, creating the foundation for the wider Fitastic ecosystem.",
  },
] as const;

const STACK =
  "CRM + Membership Management + Attendance + Payments + Classes + Trainers + Leads + Marketing + Retention + Analytics";

const FLOW = [
  {
    title: "GYM CRM",
    body: "Brings gyms, trainers and members together",
    left: 68,
    top: 12,
  },
  {
    title: "ENGAGED COMMUNITY",
    body: "Creates an active, targeted fitness audience",
    left: 74,
    top: 28,
  },
  {
    title: "MARKETPLACE",
    body: "Enables brands to sell directly to that audience",
    left: 68,
    top: 44,
  },
  {
    title: "TRAINER ECONOMY",
    body: "Allows trainers to host classes and earn",
    left: 74,
    top: 60,
  },
  {
    title: "NETWORKING",
    body: "Turns connections into collaborations, businesses and opportunities",
    left: 68,
    top: 76,
  },
] as const;

function FlowCard({
  title,
  body,
  className,
  style,
}: {
  title: string;
  body: string;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <article
      className={cn(
        "resources-crm-flow rounded-[16px] border border-white/45 bg-black/70 px-4 py-3.5 backdrop-blur-sm",
        className,
      )}
      style={style}
    >
      <p className="text-[clamp(13px,1.15vw,18px)] font-semibold uppercase tracking-[-0.02em] text-white">
        {title}
      </p>
      <p className="mt-1 text-[clamp(11px,0.95vw,15px)] font-light leading-snug text-white/85">
        {body}
      </p>
    </article>
  );
}

export function ResourcesCrmSection() {
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.12 });

  const links = FLOW.slice(0, -1).map((from, i) => {
    const to = FLOW[i + 1];
    const fromX = from.left + 8;
    const fromY = from.top + 8;
    const toX = to.left + 8;
    const toY = to.top;
    const midY = (fromY + toY) / 2;
    const bend = i % 2 === 0 ? fromX - 4 : fromX + 4;
    return {
      key: `${from.title}-${to.title}`,
      i: i + 1,
      d: `M ${fromX} ${fromY} C ${fromX} ${midY}, ${bend} ${midY}, ${toX} ${toY}`,
    };
  });

  return (
    <section
      id="crm"
      ref={ref}
      className={cn("resources-crm relative overflow-hidden bg-black", inView && "is-in")}
    >
      <div className="relative mx-auto w-full max-w-[1920px]">
        {/* Desktop */}
        <div className="resources-crm-stage relative hidden aspect-[1920/1080] w-full md:block">
          <img
            src="/assets/resources/crm-bg.png"
            alt=""
            width={1920}
            height={1873}
            className="resources-crm-bg absolute inset-0 size-full object-contain object-center"
            aria-hidden
          />

          <div className="absolute left-[10%] top-[8%] z-10 w-[min(48%,820px)]">
            <h2 className="resources-crm-title text-[clamp(36px,4vw,72px)] font-medium leading-[1.05] tracking-[-0.03em] text-white">
              The Strategic Core | CRM
            </h2>
            <p className="resources-crm-sub mt-[clamp(10px,1vw,18px)] text-[clamp(16px,1.35vw,26px)] font-light leading-snug text-[#bcbaba]">
              One Platform. One Source of Truth. An Entire Fitness Economy.
            </p>
          </div>

          <div className="absolute left-[10%] top-[30%] z-10 flex w-[min(42%,680px)] flex-col gap-4">
            {FEATURES.map((feature, i) => (
              <article
                key={feature.title}
                className="resources-crm-feature rounded-[20px] border border-white/45 bg-black/65 px-5 py-5"
                style={{ ["--i" as string]: i } as CSSProperties}
              >
                <p className="text-[clamp(16px,1.5vw,26px)] font-medium tracking-[-0.03em] text-white">
                  {feature.title}
                </p>
                <p className="mt-2 border-l-2 border-[#bbf247] pl-3 text-[clamp(12px,1.05vw,17px)] font-light leading-snug text-white/90">
                  {feature.body}
                </p>
              </article>
            ))}

            <article
              className="resources-crm-feature w-full max-w-full rounded-[20px] border border-white/45 bg-black/65 px-5 py-5"
              style={{ ["--i" as string]: 2 } as CSSProperties}
            >
              <p className="flex flex-wrap items-center gap-x-1.5 gap-y-2 text-[clamp(12px,1.05vw,17px)] font-light leading-snug tracking-[-0.02em] text-white">
                {STACK.split(" + ").map((part, i, arr) => (
                  <span key={part} className="inline-flex max-w-full items-center gap-1.5">
                    <span className="font-medium">{part}</span>
                    {i < arr.length - 1 ? (
                      <span className="shrink-0 text-white/45" aria-hidden>
                        +
                      </span>
                    ) : null}
                  </span>
                ))}
              </p>
            </article>
          </div>

          <svg
            className="pointer-events-none absolute inset-0 z-[5] size-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            fill="none"
            aria-hidden
          >
            <defs>
              <marker
                id="crm-arrow"
                markerWidth="3"
                markerHeight="3"
                refX="2.6"
                refY="1.5"
                orient="auto"
              >
                <path d="M0,0 L3,1.5 L0,3 Z" fill="rgba(188,192,197,0.95)" />
              </marker>
            </defs>
            {links.map((link) => (
              <path
                key={link.key}
                className="resources-crm-link"
                style={{ ["--i" as string]: link.i }}
                d={link.d}
                markerEnd="url(#crm-arrow)"
              />
            ))}
          </svg>

          {FLOW.map((item, i) => (
            <FlowCard
              key={item.title}
              title={item.title}
              body={item.body}
              className="absolute z-10 w-[min(18%,300px)]"
              style={
                {
                  left: `${item.left}%`,
                  top: `${item.top}%`,
                  ["--i" as string]: i,
                } as CSSProperties
              }
            />
          ))}
        </div>

        {/* Mobile */}
        <div className="resources-crm-stack relative md:hidden">
          <div className="absolute inset-0 overflow-hidden">
            <img
              src="/assets/resources/crm-bg.png"
              alt=""
              className="resources-crm-bg absolute inset-0 size-full object-contain object-center opacity-80"
              aria-hidden
            />
            <div className="absolute inset-0 bg-black/50" aria-hidden />
          </div>

          <div className="relative z-10 px-5 py-16 sm:px-8">
            <h2 className="resources-crm-title text-[clamp(32px,9vw,48px)] font-medium leading-[1.05] tracking-[-0.03em] text-white">
              The Strategic Core | CRM
            </h2>
            <p className="resources-crm-sub mt-4 text-[clamp(16px,4vw,22px)] font-light leading-snug text-[#bcbaba]">
              One Platform. One Source of Truth. An Entire Fitness Economy.
            </p>

            <div className="mt-8 space-y-4">
              {FEATURES.map((feature, i) => (
                <article
                  key={feature.title}
                  className="resources-crm-feature rounded-[18px] border border-white/45 bg-black/70 px-5 py-5"
                  style={{ ["--i" as string]: i } as CSSProperties}
                >
                  <p className="text-[18px] font-medium tracking-[-0.03em] text-white">
                    {feature.title}
                  </p>
                  <p className="mt-2 border-l-2 border-[#bbf247] pl-3 text-[14px] font-light leading-snug text-white/90">
                    {feature.body}
                  </p>
                </article>
              ))}

              <article
                className="resources-crm-feature rounded-[18px] border border-white/45 bg-black/70 px-5 py-5"
                style={{ ["--i" as string]: 2 } as CSSProperties}
              >
                <p className="flex flex-wrap items-center gap-x-1.5 gap-y-2 text-[14px] font-light leading-snug text-white">
                  {STACK.split(" + ").map((part, i, arr) => (
                    <span key={part} className="inline-flex max-w-full items-center gap-1.5">
                      <span className="font-medium">{part}</span>
                      {i < arr.length - 1 ? (
                        <span className="shrink-0 text-white/45" aria-hidden>
                          +
                        </span>
                      ) : null}
                    </span>
                  ))}
                </p>
              </article>
            </div>

            <div className="mt-6 space-y-3">
              {FLOW.map((item, i) => (
                <FlowCard
                  key={item.title}
                  title={item.title}
                  body={item.body}
                  style={{ ["--i" as string]: i } as CSSProperties}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
