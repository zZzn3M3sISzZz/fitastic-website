import { ComingDevice } from "@/components/coming-device";
import { Reveal } from "@/components/reveal";
import { WeeklyStatsCard } from "@/components/weekly-stats-card";

export function ComingSection() {
  return (
    <section id="coming" className="scroll-mt-24 bg-canvas">
      <div className="mx-auto flex max-w-page flex-col gap-[46px] px-gutter py-20">
        <Reveal when="scroll" className="flex max-w-[447px] flex-col gap-2.5">
          <p className="text-base leading-normal text-white">THE EXPERIENCE</p>
          <h2 className="font-display text-[clamp(48px,8vw,100px)] uppercase leading-[1.2] text-white">
            <span className="block">More than</span>
            <span className="block">Fitness</span>
          </h2>
          <p className="max-w-[421px] text-base leading-[1.4] text-white">
            Your workouts, progress and people—coming together in ways you haven’t
            experienced before.
          </p>
        </Reveal>

        <div className="flex flex-col gap-8">
          <Reveal
            when="scroll"
            className="relative flex flex-col overflow-hidden bg-surface lg:block lg:h-[640px]"
          >
            <div className="relative z-10 flex max-w-[424px] flex-col gap-4 p-6 sm:p-10">
              <h3 className="font-display text-[clamp(22px,3vw,33px)] uppercase leading-[1.2] text-lime">
                Built around you
              </h3>
              <p className="text-base leading-[1.4] text-white">
                An experience that understands your rhythm, evolves with your journey
                and keeps you moving forward.
              </p>
            </div>
            <ComingDevice
              src="/assets/coming-phone.png"
              alt="Fitastic app on a phone, with weekly momentum and a personal insight card"
              width={2080}
              height={1280}
              flow
              lift={0}
              grow={0}
              className="lg:hidden -mt-16"
              imageClassName="h-auto w-[120%] max-w-none -ml-[10%]"
            />
            <ComingDevice
              src="/assets/coming-phone.png"
              alt="Fitastic app on a phone, with weekly momentum and a personal insight card"
              width={2080}
              height={1280}
              from={16}
              lift={-20}
              className="inset-0 hidden lg:block"
              imageClassName="absolute inset-0 size-full object-cover object-right-bottom"
            />
          </Reveal>

          <div className="grid gap-8 lg:grid-cols-2">
            <Reveal
              when="scroll"
              delay={1}
              className="flex min-h-[560px] flex-col bg-surface p-6 sm:p-10 lg:min-h-[640px]"
            >
              <div className="flex max-w-[399px] flex-col gap-4">
                <h3 className="font-display text-[clamp(22px,2.4vw,33px)] uppercase leading-[1.2] text-lime">
                  <span className="block">Your progress,</span>
                  <span className="block">reimagined</span>
                </h3>
                <p className="text-base leading-[1.4] text-white">
                  See your effort turn into momentum. Every workout, every milestone
                  and every active day—brought together in one clear view.
                </p>
              </div>
              <div className="mt-8 flex flex-1 items-center justify-center lg:mt-10 lg:items-end lg:pb-2">
                <WeeklyStatsCard />
              </div>
            </Reveal>

            <Reveal
              when="scroll"
              delay={2}
              className="relative min-h-[560px] overflow-hidden bg-surface lg:h-[640px]"
            >
              <ComingDevice
                src="/assets/coming-watch.png"
                alt="Fitastic schedule on an Apple Watch Ultra"
                width={1008}
                height={1067}
                imageClassName="absolute left-0 top-[17%] h-[96%] w-auto object-left-top"
              />
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-full bg-gradient-to-b from-transparent from-[50%] to-canvas"
                aria-hidden="true"
              />
              <div className="relative z-10 flex max-w-[375px] flex-col gap-4 p-6 sm:p-10">
                <h3 className="font-display text-[clamp(22px,2.4vw,33px)] uppercase leading-[1.2] text-lime">
                  Everything, connected
                </h3>
                <p className="text-base leading-[1.4] text-white">
                  Your workouts, goals and progress—all moving together in one
                  connected experience.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
