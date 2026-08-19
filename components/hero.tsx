import { HeroBackground } from "@/components/hero-background";
import { LaunchCountdown } from "@/components/launch-countdown";
import { PhoneMockup } from "@/components/phone-mockup";
import { PillButton } from "@/components/pill-button";
import { Reveal } from "@/components/reveal";

export function Hero() {
  return (
    <section
      id="movement"
      className="relative isolate overflow-hidden bg-canvas"
    >
      <HeroBackground />

      <div className="relative mx-auto min-h-[981px] max-w-page">
        <LaunchCountdown />

        <div className="relative z-10 flex max-w-[648px] flex-col gap-4 px-gutter pb-10 pt-8 lg:absolute lg:left-0 lg:top-[342px] lg:pb-0 lg:pt-0">
          <Reveal delay={1} className="flex flex-col gap-[7px]">
            <p className="flex items-center gap-3 whitespace-nowrap text-base leading-normal text-white">
              <span className="status-dot" aria-hidden="true">
                <span className="status-dot__ripple" />
                <span className="status-dot__ripple status-dot__ripple--late" />
                <span className="status-dot__core">
                  <img
                    src="/icons/dot-lime.svg"
                    alt=""
                    width={16}
                    height={16}
                    className="size-full"
                  />
                </span>
              </span>
              SOMETHING NEW IS COMING
            </p>
            <h1 className="max-w-[648px] font-display text-[clamp(36px,7.2vw,100px)] uppercase leading-[1.2] text-white">
              <span className="block whitespace-nowrap">Your next level</span>
              <span className="block whitespace-nowrap">Starts here</span>
            </h1>
          </Reveal>

          <Reveal delay={2} id="loop" className="flex scroll-mt-28 flex-col gap-4">
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-1">
                <span className="relative size-7 overflow-hidden">
                  <img
                    src="/icons/quote.svg"
                    alt=""
                    width={28}
                    height={28}
                    className="size-full"
                  />
                </span>
                <p className="font-display text-[clamp(26px,4.2vw,48px)] uppercase leading-[1.2] text-lime sm:whitespace-nowrap">
                  Your Fitness. Reimagined.
                </p>
              </div>
              <p className="text-[12px] leading-[1.4] text-white sm:text-[14px]">
                <span className="block whitespace-nowrap">
                  Track your progress, crush your goals, and redefine
                </span>
                <span className="block whitespace-nowrap">
                  what’s possible with real-time AI analytics.
                </span>
              </p>
            </div>
            <PillButton href="#waitlist" showDot className="self-start">
              JOIN WAITLIST
            </PillButton>
          </Reveal>
        </div>

        <Reveal delay={3} className="pointer-events-none relative lg:h-[981px]">
          <div className="absolute bottom-[639px] right-[504px] hidden size-[103px] bg-lime lg:block" />
          <div className="flex flex-col bg-lime px-6 pb-10 pt-8 lg:absolute lg:inset-x-auto lg:bottom-0 lg:right-0 lg:block lg:h-[639px] lg:w-[504px] lg:p-0">
            <p className="flex items-center gap-3 text-base leading-normal text-ink lg:absolute lg:left-[39px] lg:top-[52px]">
              <span className="relative size-4 shrink-0 overflow-hidden">
                <img
                  src="/icons/dot-dark.svg"
                  alt=""
                  width={16}
                  height={16}
                  className="size-full"
                />
              </span>
              THE LOOP
            </p>
            <div className="my-6 lg:hidden">
              <PhoneMockup compact />
            </div>
            <p className="max-w-[280px] text-[22px] font-semibold capitalize leading-[1.2] tracking-[-0.03em] text-ink lg:absolute lg:bottom-[50px] lg:right-10 lg:mt-0 lg:max-w-[344px] lg:text-right lg:text-[28px]">
              Stop Making Excuses. Start Building Your Legacy.
            </p>
          </div>

          <div className="hidden lg:block">
            <PhoneMockup />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
