"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/cn";

const PROMOS = [
  {
    tag: "PERFORMANCE, DESIGNED TO MOVE.",
    title: ["Premium activewear", "built for every workout."],
    image: "/assets/shop/promo-activewear.png",
  },
  {
    tag: "EVERY ESSENTIAL. ONE PLACE.",
    title: ["find everything that", "keeps you moving."],
    image: "/assets/shop/promo-essentials.png",
  },
  {
    tag: "BUILD YOUR STRONGER.",
    title: ["Discover the equipment", "you need to train your way."],
    image: "/assets/shop/promo-equipment.png",
  },
] as const;

const TICKER_ITEMS = [
  "Shirt",
  "Cap",
  "Trouser",
  "Shorts",
  "Shoes",
  "Sock",
  "Jacket",
  "Hoodie",
  "Glasses",
  "Bag",
  "Jeans",
  "Watch",
  "Crewneck",
] as const;

const AUTO_SCROLL_MS = 5000;

function StarSeparator() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 12 12"
      className="size-3 shrink-0 text-lime"
      fill="currentColor"
    >
      <path d="M6 0 7.4 4.6 12 6 7.4 7.4 6 12 4.6 7.4 0 6 4.6 4.6Z" />
    </svg>
  );
}

function ArrowUpRight({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className={cn("size-6 shrink-0", className)}
    >
      <path
        d="M7 17 17 7M17 7H9M17 7v8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CarouselArrow({ direction }: { direction: "prev" | "next" }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 32 32"
      fill="none"
      className={cn("size-8", direction === "prev" && "rotate-180")}
    >
      <path
        d="M12 8l8 8-8 8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ComingSoonButton() {
  return (
    <button
      type="button"
      disabled
      aria-label="Coming soon"
      className="inline-flex h-[55px] shrink-0 cursor-default items-center justify-center gap-2 rounded-[60px] border border-solid border-white px-6 text-[16px] font-semibold leading-[1.3] text-white"
    >
      Coming Soon
      <ArrowUpRight />
    </button>
  );
}

function ShopTicker() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <div
      className="overflow-hidden bg-[#1f1f21] py-6"
      aria-label="Shop categories"
    >
      <div className="shop-ticker-track flex w-max items-center gap-8 px-gutter">
        {items.map((item, index) => (
          <span key={`${item}-${index}`} className="flex items-center gap-8">
            <span className="font-display text-[clamp(20px,4vw,28px)] uppercase leading-none text-lime">
              {item}
            </span>
            <StarSeparator />
          </span>
        ))}
      </div>
    </div>
  );
}

function ShopCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
  }, []);

  const scrollToIndex = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const slide = track.children[index] as HTMLElement | undefined;
    if (!slide) return;
    track.scrollTo({ left: slide.offsetLeft, behavior: "smooth" });
    setActiveIndex(index);
  }, []);

  const goNext = useCallback(() => {
    scrollToIndex((activeIndex + 1) % PROMOS.length);
  }, [activeIndex, scrollToIndex]);

  const goPrev = useCallback(() => {
    scrollToIndex((activeIndex - 1 + PROMOS.length) % PROMOS.length);
  }, [activeIndex, scrollToIndex]);

  useEffect(() => {
    if (paused || reducedMotion.current) return;
    const timer = window.setInterval(goNext, AUTO_SCROLL_MS);
    return () => window.clearInterval(timer);
  }, [goNext, paused]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const onScroll = () => {
      const slides = Array.from(track.children) as HTMLElement[];
      const center = track.scrollLeft + track.clientWidth / 2;
      let closest = 0;
      let minDistance = Number.POSITIVE_INFINITY;

      slides.forEach((slide, index) => {
        const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
        const distance = Math.abs(center - slideCenter);
        if (distance < minDistance) {
          minDistance = distance;
          closest = index;
        }
      });

      setActiveIndex(closest);
    };

    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="relative -mx-gutter"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
    >
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-gutter [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-6 [&::-webkit-scrollbar]:hidden"
        aria-roledescription="carousel"
        aria-label="Shop promotions"
      >
        {PROMOS.map((promo, index) => (
          <article
            key={promo.tag}
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${PROMOS.length}`}
            className="relative h-[min(600px,70vw)] min-h-[360px] w-[calc(100%-48px)] shrink-0 snap-center overflow-hidden bg-[#1f1f21] sm:min-h-[420px] sm:w-[min(1280px,calc(100vw-120px))] lg:h-[600px]"
          >
            <img
              alt=""
              src={promo.image}
              className="pointer-events-none absolute inset-0 size-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 flex flex-col items-start gap-2 p-5 sm:p-8">
              <p className="text-base font-medium leading-[1.6] text-lime">
                {promo.tag}
              </p>
              <h3 className="font-display text-[clamp(36px,6vw,62px)] uppercase leading-none text-white">
                {promo.title.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </h3>
              <ComingSoonButton />
            </div>
          </article>
        ))}
      </div>

      <button
        type="button"
        aria-label="Previous promotion"
        onClick={goPrev}
        className="absolute left-4 top-1/2 z-10 hidden size-[62px] -translate-y-1/2 items-center justify-center rounded-full bg-lime text-canvas shadow-[0_0_40px_rgba(212,251,151,0.35)] transition-opacity duration-tap hover:opacity-90 sm:flex lg:left-2"
      >
        <CarouselArrow direction="prev" />
      </button>
      <button
        type="button"
        aria-label="Next promotion"
        onClick={goNext}
        className="absolute right-4 top-1/2 z-10 hidden size-[62px] -translate-y-1/2 items-center justify-center rounded-full bg-lime text-canvas shadow-[0_0_40px_rgba(212,251,151,0.35)] transition-opacity duration-tap hover:opacity-90 sm:flex lg:right-2"
      >
        <CarouselArrow direction="next" />
      </button>

      <div
        className="mt-4 flex justify-center gap-2 px-gutter sm:hidden"
        aria-hidden="true"
      >
        {PROMOS.map((promo, index) => (
          <span
            key={promo.tag}
            className={cn(
              "size-2 rounded-full transition-colors duration-tap",
              index === activeIndex ? "bg-lime" : "bg-white/30",
            )}
          />
        ))}
      </div>
    </div>
  );
}

export function ShopSection() {
  return (
    <section id="shop" className="scroll-mt-24 bg-canvas">
      <div className="mx-auto flex max-w-page flex-col gap-10 px-gutter py-20 lg:gap-14">
        <Reveal when="scroll" className="flex flex-col gap-[8.125px]">
          <p className="font-display whitespace-nowrap text-[clamp(48px,10vw,115.375px)] uppercase leading-none text-lime">
            EVERYTHING YOU NEED
          </p>
          <div className="relative w-full lg:min-h-[115.375px]">
            <p className="max-w-[321px] break-words text-[13px] font-medium leading-[1.6] text-[#fcfff7] lg:absolute lg:left-[109px] lg:top-1/2 lg:z-[1] lg:w-[321px] lg:max-w-[321px] lg:-translate-y-1/2">
              From activewear and equipment to accessories and everyday fitness
              essentials—shop everything you need to move, train and live
              better, all in one place.
            </p>
            <div className="lg:absolute lg:inset-y-0 lg:left-[430px] lg:right-0 lg:overflow-hidden">
              <p className="mt-4 font-display whitespace-nowrap text-[clamp(32px,9vw,115.375px)] uppercase leading-none text-lime lg:absolute lg:right-0 lg:top-[-0.13px] lg:mt-0 lg:w-[min(849px,100%)] lg:text-right lg:text-[clamp(36px,calc((100vw-var(--space-gutter)*2-430px)/8.5),115.375px)]">
                TO MOVE BETTER
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal when="scroll" delay={1}>
          <ShopCarousel />
        </Reveal>
      </div>

      <Reveal when="scroll" delay={2}>
        <ShopTicker />
      </Reveal>
    </section>
  );
}
