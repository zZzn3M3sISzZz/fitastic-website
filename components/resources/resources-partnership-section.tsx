"use client";

import { cn } from "@/lib/cn";
import { useInView } from "@/lib/use-in-view";

/**
 * Angles are degrees from 12 o'clock, clockwise.
 * Icons sit on the ring; labels hang outside without shifting the icon.
 *
 * Note: icon-growth.svg / icon-spark.svg filenames are swapped vs glyphs —
 * growth file draws the spark, spark file draws the chart.
 */
type PartnershipNode = {
  label: [string, string];
  icon: string;
  angle: number;
  side: "left" | "right";
  size: number;
  featured?: boolean;
};

const NODES: PartnershipNode[] = [
  {
    label: ["Brand", "Presence"],
    icon: "/assets/resources/icon-check.svg",
    angle: 32,
    side: "right",
    size: 52,
  },
  {
    label: ["Scalable", "Growth"],
    // file named spark, glyph is bar chart
    icon: "/assets/resources/icon-spark.svg",
    angle: 90,
    side: "right",
    size: 52,
  },
  {
    label: ["Direct", "Sales"],
    // file named growth, glyph is spark ★
    icon: "/assets/resources/icon-growth.svg",
    angle: 138,
    side: "right",
    size: 52,
  },
  {
    label: ["Fitness", "Ecosystem"],
    icon: "/assets/resources/icon-sync.svg",
    angle: 228,
    side: "left",
    size: 52,
  },
  {
    label: ["Current", "Trends"],
    icon: "/assets/resources/icon-user.svg",
    angle: 270,
    side: "left",
    size: 72,
    featured: true,
  },
  {
    label: ["Relevant", "Audience"],
    icon: "/assets/resources/icon-chat.svg",
    angle: 322,
    side: "left",
    size: 52,
  },
];

export function ResourcesPartnershipSection() {
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.22 });

  return (
    <section
      id="partnership"
      ref={ref}
      className={cn(
        "resources-partnership relative flex min-h-[100svh] max-h-[1080px] items-center justify-center overflow-x-clip bg-black",
        inView && "is-in",
      )}
    >
      <div className="relative flex w-full max-w-[1920px] items-center justify-center px-10 pb-10 pt-[6.5rem] sm:px-16 lg:px-28">
        <div
          className="resources-partnership-wheel relative aspect-square w-full max-w-[min(72vw,580px)] overflow-visible"
          aria-label="Fitastic Marketplace Partnership"
        >
          <svg
            className="absolute inset-0 size-full"
            viewBox="0 0 100 100"
            fill="none"
            aria-hidden
          >
            <defs>
              <linearGradient
                id="partnership-ring-grad"
                x1="0"
                y1="0"
                x2="100"
                y2="100"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="#F5D76E" />
                <stop offset="20%" stopColor="#F29B3F" />
                <stop offset="40%" stopColor="#EF5D7A" />
                <stop offset="60%" stopColor="#9B5DE5" />
                <stop offset="80%" stopColor="#4CC9F0" />
                <stop offset="100%" stopColor="#BBF247" />
              </linearGradient>
            </defs>
            <circle
              className="resources-partnership-ring-path"
              cx="50"
              cy="50"
              r="38"
              stroke="url(#partnership-ring-grad)"
              strokeWidth="0.55"
              pathLength="1"
            />
          </svg>

          <div className="resources-partnership-hub absolute left-1/2 top-1/2 z-10 w-[58%] -translate-x-1/2 -translate-y-1/2 text-center">
            <p className="text-[clamp(22px,4.2vw,42px)] font-semibold leading-[1.15] tracking-[-0.03em] text-white">
              Fitastic Marketplace Partnership
            </p>
          </div>

          {NODES.map((node, i) => {
            const rad = (node.angle * Math.PI) / 180;
            const ring = 38;
            const x = 50 + ring * Math.sin(rad);
            const y = 50 - ring * Math.cos(rad);

            return (
              <div
                key={node.label.join("-")}
                className="resources-partnership-node absolute z-20"
                style={{
                  ["--i" as string]: i,
                  left: `${x}%`,
                  top: `${y}%`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                {/* Icon + label as siblings so overflow on the icon never clips text */}
                <div className="relative" style={{ width: node.size, height: node.size }}>
                  <div
                    className={cn(
                      "flex size-full items-center justify-center overflow-hidden rounded-full",
                      node.featured
                        ? "bg-[#1a1a1a] shadow-[0_0_0_1px_rgba(255,255,255,0.12)]"
                        : "border border-white/35 bg-black/80",
                    )}
                  >
                    <img
                      src={node.icon}
                      alt=""
                      width={node.size}
                      height={node.size}
                      className={cn(
                        "select-none object-contain",
                        node.featured ? "size-[72%]" : "size-[58%]",
                      )}
                      draggable={false}
                    />
                  </div>

                  <span
                    className={cn(
                      "pointer-events-none absolute top-1/2 z-30 -translate-y-1/2 whitespace-nowrap text-[clamp(13px,1.65vw,18px)] font-medium leading-[1.15] tracking-[-0.02em] text-white/90",
                      node.side === "left"
                        ? "right-[calc(100%+14px)] text-right"
                        : "left-[calc(100%+14px)] text-left",
                    )}
                  >
                    {node.label[0]}
                    <br />
                    {node.label[1]}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
