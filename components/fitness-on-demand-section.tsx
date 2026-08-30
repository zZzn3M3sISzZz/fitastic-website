import { Reveal } from "@/components/reveal";

const calloutPillClass =
  "rounded-full border border-[#424242] bg-[#272728] px-3 py-[3.5px] text-[15px] font-medium leading-[1.5] text-lime whitespace-nowrap";

/**
 * Anchors as % of the phone mockup box (fitness-phone.png), mapped into
 * a 0–100 viewBox that matches the phone wrapper.
 */
const A = {
  chooseAccent: { x: 6.5, y: 38 },
  avatar: { x: 30.2, y: 50.7 },
  avatarAim: { x: 28, y: 50.5 },
  /** Right edge of Book Online Session — line emerges flush with the button */
  bookButton: { x: 82, y: 74.8 },
  bookAccent: { x: 94, y: 74.8 },
} as const;

const MASK_ID = "fitness-ondemand-connector-mask";

function ConnectorLines() {
  const segs: [number, number, number, number][] = [
    [A.chooseAccent.x, A.chooseAccent.y, 14, A.chooseAccent.y],
    [14, A.chooseAccent.y, A.avatarAim.x, A.avatarAim.y],
    [A.bookButton.x, A.bookButton.y, 88, A.bookAccent.y],
    [88, A.bookAccent.y, A.bookAccent.x, A.bookAccent.y],
  ];

  return (
    <svg
      className="absolute inset-0 size-full overflow-visible"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        {/*
          objectBoundingBox holes over avatar + Book button.
          Invisible full-size rect expands the masked group's bbox
          so holes align to the phone wrapper (not the stroke tight-box).
        */}
        <mask
          id={MASK_ID}
          maskUnits="objectBoundingBox"
          maskContentUnits="objectBoundingBox"
        >
          <rect width="1" height="1" fill="white" />
          <circle cx="0.302" cy="0.507" r="0.1" fill="black" />
          <rect x="0.17" y="0.72" width="0.64" height="0.065" rx="0.02" fill="black" />
        </mask>
      </defs>

      <g mask={`url(#${MASK_ID})`}>
        <rect width="100%" height="100%" fill="white" opacity="0" />
        {segs.map(([x1, y1, x2, y2], i) => (
          <line
            key={i}
            x1={`${x1}%`}
            y1={`${y1}%`}
            x2={`${x2}%`}
            y2={`${y2}%`}
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
          />
        ))}
      </g>
    </svg>
  );
}

function AccentDot({ x, y }: { x: number; y: number }) {
  return (
    <span
      className="absolute size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-lime bg-[#1E1E20]"
      style={{ left: `${x}%`, top: `${y}%` }}
    />
  );
}

export function FitnessOnDemandSection() {
  return (
    <section id="fitness-on-demand" className="scroll-mt-24 bg-canvas">
      <div className="mx-auto max-w-page px-gutter pb-16 lg:pb-20">
        <Reveal
          when="scroll"
          className="relative overflow-hidden bg-surface lg:h-[640px]"
        >
          <div
            className="pointer-events-none absolute inset-0 z-0"
            aria-hidden="true"
          >
            <div className="absolute left-1/2 top-[8%] h-[75%] w-[150%] -translate-x-1/2 rounded-[100%] border border-white/[0.06]" />
            <div className="absolute left-1/2 top-[18%] h-[60%] w-[120%] -translate-x-1/2 rounded-[100%] border border-white/[0.07]" />
            <div className="absolute left-1/2 top-[28%] h-[48%] w-[92%] -translate-x-1/2 rounded-[100%] border border-white/[0.08]" />
            <div className="absolute left-1/2 top-[40%] h-[34%] w-[62%] -translate-x-1/2 rounded-[100%] border border-white/[0.1]" />
          </div>

          {/*
            Phone stack — oversized so it bleeds past the 640px frame.
            Wrapper width drives height (no object-contain letterboxing),
            so connector % anchors stay locked to the PNG UI.
              z-10 phone
              z-20 masked connectors (enter UI; punched out over avatar/button)
              z-30 exterior pills + accent dots
          */}
          <div className="relative z-10 flex flex-col items-center px-6 pb-10 pt-4 lg:absolute lg:inset-x-0 lg:top-[-56px] lg:px-0 lg:pb-0 lg:pt-0">
            <div className="relative w-full max-w-[260px] sm:max-w-[300px] lg:mx-auto lg:w-[min(460px,42vw)] lg:max-w-none">
              <img
                src="/assets/features/fitness-phone.png"
                alt="Fitastic app booking an online strength session with trainer Arjun Mehta"
                width={914}
                height={1721}
                className="relative z-10 mx-auto h-auto w-full"
              />

              <div
                className="pointer-events-none absolute inset-0 z-20 hidden lg:block"
                aria-hidden="true"
              >
                <ConnectorLines />
              </div>

              <div
                className="pointer-events-none absolute inset-0 z-30 hidden lg:block"
                aria-hidden="true"
              >
                <AccentDot x={A.chooseAccent.x} y={A.chooseAccent.y} />
                <span
                  className={`absolute -translate-x-full -translate-y-1/2 ${calloutPillClass}`}
                  style={{
                    left: `calc(${A.chooseAccent.x}% - 4px)`,
                    top: `${A.chooseAccent.y}%`,
                  }}
                >
                  Choose Your Trainer
                </span>

                <AccentDot x={A.bookAccent.x} y={A.bookAccent.y} />
                <span
                  className={`absolute -translate-y-1/2 ${calloutPillClass}`}
                  style={{
                    left: `calc(${A.bookAccent.x}% + 4px)`,
                    top: `${A.bookAccent.y}%`,
                  }}
                >
                  Book at Your Convenience
                </span>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap justify-center gap-3 lg:hidden">
              <span className="rounded-full border border-[#424242] bg-[#272728] px-3 py-1.5 text-sm font-medium text-lime">
                Choose Your Trainer
              </span>
              <span className="rounded-full border border-[#424242] bg-[#272728] px-3 py-1.5 text-sm font-medium text-lime">
                Book at Your Convenience
              </span>
            </div>
          </div>

          {/* Top-half tint over phone, under copy */}
          <div
            className="pointer-events-none absolute inset-x-0 top-0 z-40 h-[55%] bg-gradient-to-b from-surface from-[32%] via-surface/92 via-[58%] to-transparent"
            aria-hidden="true"
          />

          {/* Full-width horizontal copy across the top */}
          <div className="relative z-50 w-full p-6 sm:p-10">
            <div className="flex w-full max-w-[720px] flex-col gap-3 sm:gap-4">
              <h3 className="font-display text-[clamp(22px,3vw,33px)] uppercase leading-[1.2] text-lime">
                Fitness, on Demand
              </h3>
              <p className="text-lg leading-[1.4] text-white sm:text-xl">
                Choose from expert trainers, book online sessions that fit your
                schedule, and train wherever you are—all through one seamless
                platform.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
