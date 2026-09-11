"use client";

import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";
import { useInView } from "@/lib/use-in-view";

const PLANS = [
  { plan: "Starter", duration: "1 Month", products: "Up to 10 Products", investment: "₹50,000" },
  { plan: "Growth", duration: "3 Months", products: "Up to 15 Products", investment: "₹1,50,000" },
  { plan: "Scale", duration: "6 Months", products: "Up to 20 Products", investment: "₹2,50,000" },
] as const;

/** Hub + branch anchors in % of the 1920×1080 stage */
const HUB = { x: 50, y: 34 };
const LEFT = { x: 28, y: 48 };
const RIGHT = { x: 72, y: 48 };

function FixedModelContent({
  className,
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div className={className} style={style}>
      <div className="flex items-baseline gap-3">
        <span className="text-[clamp(28px,3vw,48px)] font-medium tracking-[-0.04em] text-white">
          01
        </span>
        <div>
          <p className="text-[clamp(18px,2vw,32px)] font-medium tracking-[-0.03em] text-white">
            Fixed Model Partnership
          </p>
          <p className="mt-1 text-[clamp(13px,1.2vw,20px)] text-[#bcbaba]">
            Predictable. Simple. Scalable.
          </p>
        </div>
      </div>

      <div className="resources-two-ways-table mt-5 overflow-x-auto rounded-lg border border-white/50 bg-black">
        <table className="w-full min-w-[320px] border-collapse text-left text-[clamp(11px,1.05vw,18px)] text-white">
          <thead>
            <tr className="border-b border-white/30 bg-white/5">
              <th className="px-3 py-2.5 font-medium">Plan</th>
              <th className="px-3 py-2.5 font-medium">Duration</th>
              <th className="px-3 py-2.5 font-medium">Products</th>
              <th className="px-3 py-2.5 font-medium">Investment</th>
            </tr>
          </thead>
          <tbody>
            {PLANS.map((row) => (
              <tr key={row.plan} className="border-b border-white/20 last:border-b-0">
                <td className="px-3 py-2.5 font-medium">{row.plan}</td>
                <td className="px-3 py-2.5 font-light">{row.duration}</td>
                <td className="px-3 py-2.5 font-light">{row.products}</td>
                <td className="px-3 py-2.5 font-light">{row.investment}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-3 max-w-[42ch] text-[clamp(11px,1vw,15px)] font-light italic leading-snug text-white/75">
        *Best suited for established businesses looking for predictable marketplace costs and
        direct control over their product margins.
      </p>
    </div>
  );
}

function PerformanceContent({
  className,
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div className={className} style={style}>
      <div className="flex items-baseline gap-3">
        <span className="text-[clamp(28px,3vw,48px)] font-medium tracking-[-0.04em] text-white">
          02
        </span>
        <div>
          <p className="text-[clamp(18px,2vw,32px)] font-medium tracking-[-0.03em] text-white">
            Performance Partnership
          </p>
          <p className="mt-1 text-[clamp(13px,1.2vw,20px)] text-[#bcbaba]">
            No upfront listing fee. Pay as you sell.
          </p>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-lg border border-white/50 bg-black px-4 py-5 text-center">
          <p className="text-[clamp(22px,2.4vw,36px)] font-semibold text-white">80%</p>
          <p className="mt-1 text-[clamp(12px,1.1vw,16px)] font-light text-white/85">
            Goes to the Brand
          </p>
        </div>
        <div className="rounded-lg border border-white/50 bg-black px-4 py-5 text-center">
          <p className="text-[clamp(22px,2.4vw,36px)] font-semibold text-white">20%</p>
          <p className="mt-1 text-[clamp(12px,1.1vw,16px)] font-light text-white/85">
            Goes to Fitastic
          </p>
        </div>
      </div>

      <div className="mt-3 rounded-lg border border-white/50 bg-black px-4 py-4">
        <p className="text-[clamp(12px,1.15vw,17px)] font-light leading-snug text-white/90">
          For every successful product sale:{" "}
          <span className="font-medium text-white">80% → Brand</span>
          {" · "}
          <span className="font-medium text-white">20% → Fitastic</span>
        </p>
      </div>

      <p className="mt-3 max-w-[42ch] text-[clamp(11px,1vw,15px)] font-light italic leading-snug text-white/75">
        *Best suited for emerging brands and businesses that want to test the marketplace with
        minimal upfront commitment.
      </p>
    </div>
  );
}

export function ResourcesTwoWaysSection() {
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.14 });

  return (
    <section
      id="two-ways"
      ref={ref}
      className={cn(
        "resources-two-ways relative overflow-x-visible bg-black md:overflow-x-clip",
        inView && "is-in",
      )}
    >
      <div className="relative mx-auto w-full max-w-[1920px] bg-black">
        {/* Desktop / tablet: Figma-proportional stage */}
        <div className="resources-two-ways-stage relative hidden aspect-[1920/1080] w-full md:block">
          <div className="absolute left-[10%] top-[8%] z-10 w-[min(70%,1100px)]">
            <h2 className="resources-two-ways-title text-[clamp(36px,4vw,76px)] font-medium leading-[1.02] tracking-[-0.03em] text-white">
              Two Ways for Businesses to Grow
            </h2>
            <p className="resources-two-ways-sub mt-[clamp(10px,1vw,18px)] text-[clamp(16px,1.35vw,26px)] font-light leading-snug text-[#bcbaba]">
              You choose the model. We provide the audience and the platform.
            </p>
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
                id="two-ways-arrow"
                markerWidth="3.2"
                markerHeight="3.2"
                refX="2.8"
                refY="1.6"
                orient="auto"
              >
                <path d="M0,0 L3.2,1.6 L0,3.2 Z" fill="rgba(188,192,197,0.95)" />
              </marker>
            </defs>
            <path
              className="resources-two-ways-link"
              style={{ ["--i" as string]: 1 }}
              markerEnd="url(#two-ways-arrow)"
              d={`M ${HUB.x} ${HUB.y + 2.2} C ${HUB.x} ${(HUB.y + LEFT.y) / 2}, ${LEFT.x} ${(HUB.y + LEFT.y) / 2}, ${LEFT.x} ${LEFT.y}`}
            />
            <path
              className="resources-two-ways-link"
              style={{ ["--i" as string]: 2 }}
              markerEnd="url(#two-ways-arrow)"
              d={`M ${HUB.x} ${HUB.y + 2.2} C ${HUB.x} ${(HUB.y + RIGHT.y) / 2}, ${RIGHT.x} ${(HUB.y + RIGHT.y) / 2}, ${RIGHT.x} ${RIGHT.y}`}
            />
          </svg>

          <div
            className="resources-two-ways-hub absolute left-1/2 z-20 -translate-x-1/2 -translate-y-1/2"
            style={{ top: `${HUB.y}%` }}
          >
            <div className="rounded-full border border-white bg-[#141414] px-6 py-3 sm:px-8 sm:py-3.5">
              <p className="whitespace-nowrap text-[clamp(14px,1.4vw,24px)] font-semibold tracking-[-0.04em] text-white">
                Two Ways to Grow With Fitastic
              </p>
            </div>
          </div>

          <FixedModelContent
            className="resources-two-ways-option absolute z-10 w-[min(42%,700px)] -translate-x-1/2"
            style={
              {
                left: `${LEFT.x}%`,
                top: `${LEFT.y + 1}%`,
                ["--i" as string]: 0,
              } as CSSProperties
            }
          />

          <PerformanceContent
            className="resources-two-ways-option absolute z-10 w-[min(40%,640px)] -translate-x-1/2"
            style={
              {
                left: `${RIGHT.x}%`,
                top: `${RIGHT.y + 1}%`,
                ["--i" as string]: 1,
              } as CSSProperties
            }
          />
        </div>

        {/* Mobile: stacked, no absolute overlap */}
        <div className="resources-two-ways-stack relative overflow-x-auto px-5 py-16 sm:px-8 md:hidden">
          <h2 className="resources-two-ways-title text-[clamp(32px,9vw,48px)] font-medium leading-[1.05] tracking-[-0.03em] text-white">
            Two Ways for Businesses to Grow
          </h2>
          <p className="resources-two-ways-sub mt-4 text-[clamp(16px,4vw,22px)] font-light leading-snug text-[#bcbaba]">
            You choose the model. We provide the audience and the platform.
          </p>

          <div className="resources-two-ways-hub mt-10 inline-flex max-w-full">
            <div className="rounded-full border border-white bg-[#141414] px-5 py-3">
              <p className="whitespace-normal text-[15px] font-semibold tracking-[-0.04em] text-white sm:whitespace-nowrap">
                Two Ways to Grow With Fitastic
              </p>
            </div>
          </div>

          <div className="mt-10 space-y-10">
            <FixedModelContent
              className="resources-two-ways-option w-full"
              style={{ ["--i" as string]: 0 } as CSSProperties}
            />
            <PerformanceContent
              className="resources-two-ways-option w-full"
              style={{ ["--i" as string]: 1 } as CSSProperties}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
