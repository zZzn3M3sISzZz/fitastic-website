"use client";

import { cn } from "@/lib/cn";
import { useInView } from "@/lib/use-in-view";

const INDEX_ITEMS = [
  "The Fitastic Ecosystem",
  "A Marketplace Built for Fitness",
  "Two Ways for Businesses to Grow",
  "Turn Your Expertise Into Income",
  "Why Partner With Fitastic?",
  "A Community Where Opportunities Move",
  "The Strategic Core | CRM",
];

const DOTS = [
  { top: "12%", left: "18%", delay: 0 },
  { top: "18%", left: "42%", delay: 1 },
  { top: "10%", left: "68%", delay: 2 },
  { top: "28%", left: "78%", delay: 3 },
  { top: "36%", left: "55%", delay: 4 },
  { top: "44%", left: "30%", delay: 5 },
  { top: "52%", left: "62%", delay: 6 },
  { top: "58%", left: "82%", delay: 7 },
  { top: "66%", left: "48%", delay: 8 },
  { top: "72%", left: "22%", delay: 9 },
  { top: "78%", left: "70%", delay: 10 },
  { top: "84%", left: "40%", delay: 11 },
  { top: "22%", left: "88%", delay: 12 },
  { top: "48%", left: "12%", delay: 13 },
  { top: "62%", left: "8%", delay: 14 },
];

export function ResourcesIndexSection() {
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.18 });

  return (
    <section
      id="index"
      ref={ref}
      className={cn(
        "resources-index relative overflow-hidden bg-black",
        inView && "is-in",
      )}
    >
      <div className="relative mx-auto grid min-h-[min(100svh,1080px)] w-full max-w-[1920px] lg:grid-cols-2">
        <div className="relative z-10 flex flex-col justify-center px-6 py-16 sm:px-10 lg:px-16 lg:py-20">
          <h2 className="resources-index-title text-[clamp(40px,6vw,80px)] font-medium leading-none tracking-[-0.03em] text-white">
            Index
          </h2>
          <p className="resources-index-sub mt-4 max-w-[540px] text-[clamp(16px,2vw,28px)] leading-[1.39] text-[#bcbaba]">
            Discover how your brand can grow with Fitastic.
          </p>
          <ol className="mt-8 flex flex-col gap-4 sm:mt-10 sm:gap-5">
            {INDEX_ITEMS.map((label, index) => (
              <li
                key={label}
                className="resources-index-item flex items-center gap-2"
                style={{ ["--i" as string]: index }}
              >
                <span className="min-w-[2.4em] text-[clamp(22px,3.2vw,42px)] font-medium tracking-[-0.02em] text-white">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="border-l-[3px] border-[#bbf247] pl-4 text-[clamp(18px,2.8vw,36px)] font-medium leading-[1.2] tracking-[-0.02em] text-white sm:pl-5">
                  {label}
                </span>
              </li>
            ))}
          </ol>
        </div>

        <div className="relative min-h-[420px] overflow-hidden lg:min-h-full">
          <img
            src="/assets/resources/index-athlete.png"
            alt=""
            width={1080}
            height={1080}
            className="absolute inset-0 size-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent lg:from-black/80" />
          <div className="absolute inset-0 resources-index-dots" aria-hidden>
            {DOTS.map((dot, i) => (
              <span
                key={i}
                className="resources-index-dot absolute size-1.5 rounded-full bg-white/90 sm:size-2"
                style={{
                  top: dot.top,
                  left: dot.left,
                  ["--d" as string]: dot.delay,
                }}
              />
            ))}
            <p className="resources-index-connecting absolute left-[18%] top-[16%] text-[11px] font-medium uppercase tracking-[0.28em] text-white/80 sm:text-xs">
              Connecting
            </p>
            <p className="resources-index-connecting absolute right-[16%] top-[42%] text-[11px] font-medium uppercase tracking-[0.28em] text-white/80 sm:text-xs" style={{ ["--d" as string]: 4 }}>
              The
            </p>
            <p className="resources-index-connecting absolute bottom-[22%] left-[36%] text-[11px] font-medium uppercase tracking-[0.28em] text-white/80 sm:text-xs" style={{ ["--d" as string]: 8 }}>
              Dots
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
