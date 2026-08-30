"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
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

/** Shared mobile headline size — sized so "EVERYTHING YOU NEED" fits the padded content width. */
const SHOP_HEADLINE_MOBILE =
  "text-[clamp(28px,calc((100vw-var(--space-gutter)*2)/11),115.375px)]";

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
      className="inline-flex h-[55px] shrink-0 cursor-default items-center justify-center gap-2 rounded-[60px] border border-solid border-black bg-black px-6 text-[16px] font-semibold leading-[1.3] text-lime"
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

type ShopPromo = (typeof PROMOS)[number];

type CarouselSlide = {
  promo: ShopPromo;
  /** Position in the extended track (includes clones). */
  domIndex: number;
  /** Index into PROMOS for real slides; clones map to their source. */
  logicalIndex: number;
  isClone: boolean;
  key: string;
};

/**
 * Infinite snap carousel: [last-clone, …promos, first-clone].
 * Jumping off clones keeps scroll continuous while peeks wrap at both ends.
 */
function buildCarouselSlides(): CarouselSlide[] {
  if (PROMOS.length <= 1) {
    return PROMOS.map((promo, index) => ({
      promo,
      domIndex: index,
      logicalIndex: index,
      isClone: false,
      key: promo.tag,
    }));
  }

  const last = PROMOS[PROMOS.length - 1]!;
  const first = PROMOS[0]!;
  const slides: CarouselSlide[] = [
    {
      promo: last,
      domIndex: 0,
      logicalIndex: PROMOS.length - 1,
      isClone: true,
      key: `clone-start-${last.tag}`,
    },
  ];

  PROMOS.forEach((promo, index) => {
    slides.push({
      promo,
      domIndex: index + 1,
      logicalIndex: index,
      isClone: false,
      key: promo.tag,
    });
  });

  slides.push({
    promo: first,
    domIndex: PROMOS.length + 1,
    logicalIndex: 0,
    isClone: true,
    key: `clone-end-${first.tag}`,
  });

  return slides;
}

function closestSlideIndex(track: HTMLDivElement): number {
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

  return closest;
}

const CAROUSEL_SLIDES = buildCarouselSlides();

function logicalIndexFromDom(domIndex: number): number {
  if (PROMOS.length <= 1) return 0;
  if (domIndex === 0) return PROMOS.length - 1;
  if (domIndex === PROMOS.length + 1) return 0;
  return domIndex - 1;
}

function ShopCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reducedMotion = useRef(false);
  const jumpingRef = useRef(false);
  const activeDomRef = useRef(PROMOS.length > 1 ? 1 : 0);
  const looped = PROMOS.length > 1;

  useEffect(() => {
    reducedMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
  }, []);

  const jumpToDomIndex = useCallback((domIndex: number) => {
    const track = trackRef.current;
    if (!track) return;
    const slide = track.children[domIndex] as HTMLElement | undefined;
    if (!slide) return;

    jumpingRef.current = true;
    track.classList.remove("scroll-smooth");
    track.scrollLeft = slide.offsetLeft;
    activeDomRef.current = domIndex;
    // Force layout so restoring scroll-smooth does not animate the jump.
    void track.offsetHeight;
    track.classList.add("scroll-smooth");
    requestAnimationFrame(() => {
      jumpingRef.current = false;
    });
  }, []);

  const scrollToDomIndex = useCallback((domIndex: number) => {
    const track = trackRef.current;
    if (!track) return;
    const slide = track.children[domIndex] as HTMLElement | undefined;
    if (!slide) return;
    activeDomRef.current = domIndex;
    track.scrollTo({ left: slide.offsetLeft, behavior: "smooth" });
  }, []);

  // Land on the first real slide (after the leading clone) before paint flashes.
  useLayoutEffect(() => {
    if (!looped) return;
    jumpToDomIndex(1);
  }, [jumpToDomIndex, looped]);

  const goNext = useCallback(() => {
    if (!looped) return;
    scrollToDomIndex(activeDomRef.current + 1);
  }, [looped, scrollToDomIndex]);

  const goPrev = useCallback(() => {
    if (!looped) return;
    scrollToDomIndex(activeDomRef.current - 1);
  }, [looped, scrollToDomIndex]);

  useEffect(() => {
    if (paused || reducedMotion.current || !looped) return;
    const timer = window.setInterval(goNext, AUTO_SCROLL_MS);
    return () => window.clearInterval(timer);
  }, [goNext, paused, looped]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const syncFromScroll = () => {
      if (jumpingRef.current) return;

      const closest = closestSlideIndex(track);
      activeDomRef.current = closest;
      setActiveIndex(logicalIndexFromDom(closest));
    };

    const settleClones = () => {
      if (jumpingRef.current || !looped) return;

      const closest = closestSlideIndex(track);
      // Leading clone of last → jump to real last; trailing clone of first → real first.
      if (closest === 0) {
        jumpToDomIndex(PROMOS.length);
        setActiveIndex(PROMOS.length - 1);
      } else if (closest === PROMOS.length + 1) {
        jumpToDomIndex(1);
        setActiveIndex(0);
      }
    };

    track.addEventListener("scroll", syncFromScroll, { passive: true });
    track.addEventListener("scrollend", settleClones);
    // Fallback when scrollend is unavailable (older Safari).
    let settleTimer = 0;
    const onScrollSettleFallback = () => {
      window.clearTimeout(settleTimer);
      settleTimer = window.setTimeout(settleClones, 120);
    };
    track.addEventListener("scroll", onScrollSettleFallback, { passive: true });

    return () => {
      track.removeEventListener("scroll", syncFromScroll);
      track.removeEventListener("scrollend", settleClones);
      track.removeEventListener("scroll", onScrollSettleFallback);
      window.clearTimeout(settleTimer);
    };
  }, [jumpToDomIndex, looped]);

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
        {CAROUSEL_SLIDES.map((slide) => (
          <article
            key={slide.key}
            aria-roledescription="slide"
            aria-label={`${slide.logicalIndex + 1} of ${PROMOS.length}`}
            aria-hidden={slide.isClone || undefined}
            className="relative h-[min(600px,70vw)] min-h-[360px] w-[calc(100%-48px)] shrink-0 snap-center overflow-hidden bg-[#1f1f21] sm:min-h-[420px] sm:w-[min(1280px,calc(100vw-120px))] lg:h-[600px]"
          >
            <img
              alt=""
              src={slide.promo.image}
              className="pointer-events-none absolute inset-0 size-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 flex flex-col items-start gap-2 p-5 sm:p-8">
              <p className="text-base font-medium leading-[1.6] text-black">
                {slide.promo.tag}
              </p>
              <h3 className="font-display text-[clamp(36px,6vw,62px)] uppercase leading-none text-black">
                {slide.promo.title.map((line) => (
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
        <Reveal when="scroll" className="flex min-w-0 flex-col gap-[8.125px]">
          <p
            className={cn(
              "max-w-full min-w-0 font-display whitespace-nowrap uppercase leading-none text-lime",
              SHOP_HEADLINE_MOBILE,
              "lg:text-[clamp(48px,10vw,115.375px)]",
            )}
          >
            EVERYTHING YOU NEED
          </p>
          <div className="relative w-full min-w-0 lg:min-h-[115.375px]">
            <div className="min-w-0 lg:absolute lg:inset-y-0 lg:left-[470px] lg:right-0">
              <p
                className={cn(
                  "max-w-full min-w-0 font-display whitespace-nowrap uppercase leading-none text-lime",
                  SHOP_HEADLINE_MOBILE,
                  "lg:absolute lg:right-0 lg:top-[-0.13px] lg:w-full lg:max-w-none lg:text-right lg:text-[clamp(36px,calc((100vw-var(--space-gutter)*2-470px)/10),100px)]",
                )}
              >
                TO MOVE BETTER
              </p>
            </div>
            <p className="mt-4 max-w-[321px] break-words text-[13px] font-medium leading-[1.6] text-[#fcfff7] lg:absolute lg:left-[109px] lg:top-1/2 lg:z-[1] lg:mt-0 lg:w-[300px] lg:max-w-[300px] lg:-translate-y-1/2">
              From activewear and equipment to accessories and everyday fitness
              essentials—shop everything you need to move, train and live
              better, all in one place.
            </p>
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
