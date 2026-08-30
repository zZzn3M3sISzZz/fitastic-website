import { Reveal } from "@/components/reveal";

const AGENTS = [
  { label: "Workout Agent", title: "Plans that adapt" },
  { label: "Nutrition Agent", title: "Guidance that fits" },
  { label: "Recovery Agent", title: "Progress, balanced" },
] as const;

export function MorganSection() {
  return (
    <section id="morgan" className="scroll-mt-24 bg-canvas">
      <div className="mx-auto max-w-page px-gutter py-16 lg:py-20">
        <Reveal
          when="scroll"
          className="relative overflow-hidden bg-surface px-6 py-14 sm:px-10 sm:py-16 lg:min-h-[418px] lg:px-[153px] lg:py-[87px]"
        >
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <img
              src="/assets/features/morgan-bg.png"
              alt=""
              width={2080}
              height={837}
              className="absolute left-1/2 top-0 h-[min(854px,160%)] w-[min(1282px,160%)] max-w-none -translate-x-1/2 object-cover object-top opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-canvas via-transparent to-canvas" />
          </div>

          <div className="relative z-10 mx-auto flex w-full max-w-[748px] flex-col items-center gap-10 lg:gap-[40px]">
            <div className="flex w-full flex-col items-center gap-6 sm:flex-row sm:items-center sm:justify-center sm:gap-8">
              <div className="feature-glow relative size-[120px] shrink-0 sm:size-[140px] lg:size-[155px]">
                <img
                  src="/assets/features/morgan-icon.png"
                  alt=""
                  width={512}
                  height={512}
                  className="absolute inset-0 size-full object-contain"
                />
              </div>
              <div className="flex min-w-0 flex-col items-center text-center sm:items-start sm:text-left">
                <p className="text-[11px] font-normal uppercase tracking-[0.08em] text-white sm:text-xs">
                  Your AI Fitness Coach
                </p>
                <h2 className="font-display text-[clamp(40px,8vw,87px)] uppercase leading-[1.2] text-white">
                  Meet Morgan
                </h2>
              </div>
            </div>

            <div className="flex w-full max-w-[662px] flex-col gap-8 md:flex-row md:flex-nowrap md:items-start md:justify-between md:gap-6 lg:gap-10">
              {AGENTS.map((agent) => (
                <div
                  key={agent.label}
                  className="flex min-w-0 flex-col gap-2 text-center md:flex-1 md:gap-3 md:text-left"
                >
                  <p className="text-[13px] leading-[1.4] text-white">{agent.label}</p>
                  <p className="font-display text-[clamp(18px,2.4vw,28px)] uppercase leading-[1.2] text-lime md:whitespace-nowrap">
                    {agent.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
