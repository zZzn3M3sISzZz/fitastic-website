"use client";

import { cn } from "@/lib/cn";
import { useInView } from "@/lib/use-in-view";

const BULLETS = [
  "Fitastic gives fitness-focused businesses a dedicated marketplace to showcase and sell their products to an audience already interested in health, wellness and active living.",
  "From the first workout to recovery and everything in between, Fitastic brings the fitness shopping journey together.",
] as const;

/** Positions as % of a 1920×1080 frame (Figma 381:885). */
const CATEGORIES = [
  {
    title: "🧘 RECOVERY & LIFESTYLE",
    body: "Recovery Products, Massage & Mobility Products, Wellness Accessories, and Fitness Lifestyle Products.",
    x: 72.7,
    y: 12.2,
    w: 14,
    vAlign: "center" as const,
  },
  {
    title: "👕 APPAREL",
    body: "T-Shirts, Trousers & Joggers, Activewear, Shorts, Sports Bras, Tank Tops, Hoodies & Sweatshirts, Compression Wear, and Socks.",
    x: 54.6,
    y: 1.8,
    w: 12,
    /** Top-align so a high placement doesn't clip the title */
    vAlign: "top" as const,
    linkY: 9,
  },
  {
    title: "🎒 FITNESS ACCESSORIES",
    body: "Gym Bags, Water Bottles, Shakers, Towels, Gloves, Belts, Straps, and Fitness Accessories.",
    x: 73.5,
    y: 33.7,
    w: 13,
    vAlign: "center" as const,
  },
  {
    title: "👟 FOOTWEAR",
    body: "Running Shoes, Training Shoes, Cross-Training Shoes, Sports Shoes, and Lifestyle / Athleisure Shoes.",
    x: 54.6,
    y: 46.0,
    w: 13,
    vAlign: "center" as const,
  },
  {
    title: "🩲 INNERWEAR & PERFORMANCE",
    body: "Sports Innerwear, Performance Underwear, Base Layers, Compression Innerwear, and Performance Socks.",
    x: 73.1,
    y: 56.9,
    w: 14,
    vAlign: "center" as const,
  },
  {
    title: "🏋️ EQUIPMENT",
    body: "Dumbbells & Weights, Resistance Bands, Kettlebells, Yoga & Mobility Equipment, Home Gym Equipment, Training Accessories, and Recovery Equipment.",
    x: 54.6,
    y: 98.2,
    w: 13,
    vAlign: "bottom" as const,
    linkY: 88,
  },
  {
    title: "🥗 NUTRITION & WELLNESS",
    body: "Sports Nutrition, Protein Products, Health Foods, Functional Foods, and Wellness Products.",
    x: 73.9,
    y: 80.2,
    w: 12,
    vAlign: "center" as const,
  },
] as const;

const HUB = { x: 31.4, y: 48.2 };

export function ResourcesMarketplaceSection() {
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.14 });

  return (
    <section
      id="marketplace"
      ref={ref}
      className={cn(
        "resources-marketplace relative overflow-hidden bg-black py-[clamp(72px,12vh,160px)]",
        inView && "is-in",
      )}
    >
      <div className="relative mx-auto w-full max-w-[1920px]">
        {/* Desktop / tablet: Figma- proporional stage */}
        <div className="relative hidden aspect-[1920/1080] w-full md:block">
          <img
            src="/assets/resources/marketplace-bg.png"
            alt=""
            className="absolute inset-0 size-full object-cover"
            aria-hidden
          />
          <div className="absolute inset-0 bg-black/45" aria-hidden />

          {/* Left copy — full width from Figma, never clipped */}
          <div className="absolute left-[10%] top-[8.3%] z-10 w-[min(55%,1057px)] max-w-[1057px] pr-4">
            <h2 className="resources-marketplace-title text-[clamp(40px,4.2vw,80px)] font-medium leading-none tracking-[-0.03em] text-white">
              A Marketplace
              <br />
              Built for Fitness
            </h2>
            <p className="resources-marketplace-sub mt-[clamp(12px,1.2vw,20px)] max-w-[677px] text-[clamp(18px,1.5vw,28px)] leading-[1.39] text-[#bcbaba]">
              Everything Fitness, Under One Roof
            </p>
          </div>

          <div className="absolute bottom-[8%] left-[10%] z-10 flex w-[min(28%,436px)] max-w-[436px] flex-col gap-6">
            {BULLETS.map((text, i) => (
              <p
                key={i}
                className="resources-marketplace-bullet border-l-[3px] border-[#bbf247] pl-5 text-[clamp(15px,1.35vw,25.5px)] font-medium leading-[1.25] tracking-[-0.04em] text-white"
                style={{ ["--i" as string]: i }}
              >
                {text}
              </p>
            ))}
          </div>

          {/* Links */}
          <svg
            className="pointer-events-none absolute inset-0 z-[5] size-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            fill="none"
            aria-hidden
          >
            {CATEGORIES.map((cat, i) => {
              const mx = (HUB.x + cat.x) / 2;
              const linkY = "linkY" in cat ? cat.linkY : cat.y;
              return (
                <path
                  key={cat.title}
                  className="resources-marketplace-link"
                  style={{ ["--i" as string]: i + 1 }}
                  d={`M ${HUB.x} ${HUB.y} C ${mx} ${HUB.y}, ${mx} ${linkY}, ${cat.x} ${linkY}`}
                  markerEnd="url(#mkt-arrow)"
                />
              );
            })}
            <defs>
              <marker
                id="mkt-arrow"
                markerWidth="4"
                markerHeight="4"
                refX="3"
                refY="2"
                orient="auto"
              >
                <path d="M0,0 L4,2 L0,4 Z" fill="rgba(188,192,197,0.9)" />
              </marker>
            </defs>
          </svg>

          {/* Hub */}
          <div
            className="resources-marketplace-hub absolute z-10 flex -translate-x-1/2 -translate-y-1/2 items-center rounded-[20px] border border-white bg-[#141414] px-[clamp(16px,1.4vw,26px)] py-3"
            style={{ left: `${HUB.x}%`, top: `${HUB.y}%` }}
          >
            <span className="whitespace-nowrap text-[clamp(14px,1.4vw,27px)] font-semibold tracking-[-0.04em] text-white">
              Product Categories
            </span>
          </div>

          {/* Categories */}
          {CATEGORIES.map((cat, i) => (
            <div
              key={cat.title}
              className={cn(
                "resources-marketplace-cat absolute z-10 text-left",
                cat.vAlign === "top" && "resources-marketplace-cat--top",
                cat.vAlign === "bottom" && "resources-marketplace-cat--bottom",
                cat.vAlign === "center" && "-translate-y-1/2",
              )}
              style={{
                left: `${cat.x}%`,
                top: `${cat.y}%`,
                width: `${cat.w}%`,
                minWidth: 160,
                ["--i" as string]: i + 1,
              }}
            >
              <p className="text-[clamp(13px,1.55vw,28px)] font-semibold leading-tight tracking-[-0.04em] text-white">
                {cat.title}
              </p>
              <p className="mt-2 text-[clamp(11px,0.85vw,16px)] font-light leading-[1.25] tracking-[-0.03em] text-white/85">
                {cat.body}
              </p>
            </div>
          ))}
        </div>

        {/* Mobile: stacked, no absolute truncation */}
        <div className="relative md:hidden">
          <div className="absolute inset-0">
            <img
              src="/assets/resources/marketplace-bg.png"
              alt=""
              className="size-full object-cover"
              aria-hidden
            />
            <div className="absolute inset-0 bg-black/70" />
          </div>
          <div className="relative z-10 px-5 py-16 sm:px-8">
            <h2 className="resources-marketplace-title text-[clamp(36px,9vw,56px)] font-medium leading-none tracking-[-0.03em] text-white">
              A Marketplace Built for Fitness
            </h2>
            <p className="resources-marketplace-sub mt-4 text-[clamp(18px,4vw,24px)] leading-[1.39] text-[#bcbaba]">
              Everything Fitness, Under One Roof
            </p>
            <div className="mt-10 space-y-6">
              {BULLETS.map((text, i) => (
                <p
                  key={i}
                  className="resources-marketplace-bullet border-l-[3px] border-[#bbf247] pl-5 text-[clamp(16px,3.8vw,20px)] font-medium leading-[1.3] tracking-[-0.03em] text-white"
                  style={{ ["--i" as string]: i }}
                >
                  {text}
                </p>
              ))}
            </div>
            <div className="resources-marketplace-hub mt-12 inline-flex rounded-[16px] border border-white bg-[#141414] px-4 py-2">
              <span className="text-[16px] font-semibold tracking-[-0.04em] text-white">
                Product Categories
              </span>
            </div>
            <div className="mt-6 grid gap-4">
              {CATEGORIES.map((cat, i) => (
                <div
                  key={cat.title}
                  className="resources-marketplace-cat rounded-xl border border-white/20 bg-black/55 p-4"
                  style={{ ["--i" as string]: i + 1 }}
                >
                  <p className="text-[17px] font-semibold leading-tight tracking-[-0.03em] text-white">
                    {cat.title}
                  </p>
                  <p className="mt-2 text-[14px] font-light leading-[1.3] text-white/85">
                    {cat.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
