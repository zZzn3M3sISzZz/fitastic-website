"use client";

import { useEffect, useState } from "react";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/cn";

/** Midnight IST on launch day — 2026-09-06 00:00:00 Asia/Kolkata */
export const LAUNCH_AT_ISO = "2026-09-06T00:00:00+05:30";
const LAUNCH_AT_MS = Date.parse(LAUNCH_AT_ISO);

const UNITS = [
  { key: "days", label: "Days" },
  { key: "hours", label: "Hrs" },
  { key: "minutes", label: "Min" },
  { key: "seconds", label: "Sec" },
] as const;

type Remaining = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  launched: boolean;
};

function getRemaining(nowMs: number, targetMs: number): Remaining {
  const diff = Math.max(0, targetMs - nowMs);
  const totalSeconds = Math.floor(diff / 1000);

  return {
    days: Math.floor(totalSeconds / 86_400),
    hours: Math.floor((totalSeconds % 86_400) / 3_600),
    minutes: Math.floor((totalSeconds % 3_600) / 60),
    seconds: totalSeconds % 60,
    launched: diff <= 0,
  };
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function LaunchCountdown() {
  const [nowMs, setNowMs] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setNowMs(Date.now());
    tick();
    const id = window.setInterval(tick, 1000);
    const onVisibility = () => {
      if (document.visibilityState === "visible") tick();
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.clearInterval(id);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  const remaining = nowMs === null ? null : getRemaining(nowMs, LAUNCH_AT_MS);
  const launched = remaining?.launched ?? false;
  const values = remaining ?? { days: 0, hours: 0, minutes: 0, seconds: 0 };

  return (
    <div
      aria-label="Launch countdown"
      className="pointer-events-none relative z-[5] px-gutter pb-4 pt-32 sm:pt-36 lg:absolute lg:inset-x-0 lg:top-[6.75rem] lg:z-[5] lg:pb-0 lg:pt-0"
    >
      <Reveal className="mx-auto flex max-w-page flex-col gap-4 sm:gap-6 lg:gap-0">
        {launched ? (
          <p className="flex items-center justify-center gap-3 text-base leading-normal text-white">
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
            IT'S HERE
          </p>
        ) : null}

        <div
          className="grid grid-cols-2 items-end justify-items-center gap-x-4 gap-y-8 sm:grid-cols-4 sm:gap-6"
          aria-hidden="true"
        >
          {UNITS.map((unit) => (
            <div key={unit.key} className="flex min-w-0 flex-col items-center">
              <span
                className={cn(
                  "whitespace-nowrap font-display text-[clamp(5.5rem,28vw,8.5rem)] leading-none text-lime [text-shadow:0_4px_28px_rgba(0,0,0,0.55)] sm:text-[clamp(4.5rem,10vw,7.5rem)] lg:text-[clamp(4rem,5vw,4.75rem)]",
                  remaining ? "opacity-100" : "opacity-0",
                )}
              >
                {pad(values[unit.key])}
              </span>
              <span className="mt-1 text-[11px] font-medium uppercase tracking-[0.22em] text-white/80 [text-shadow:0_2px_12px_rgba(0,0,0,0.7)] sm:text-sm">
                {unit.label}
              </span>
            </div>
          ))}
        </div>

        <p className="sr-only" aria-live="polite">
          {remaining === null
            ? ""
            : launched
              ? "Fitastic is live."
              : `${values.days} days, ${values.hours} hours, ${values.minutes} minutes remaining until launch on September 6, 2026.`}
        </p>
        <time dateTime={LAUNCH_AT_ISO} className="sr-only">
          September 6, 2026, midnight India Standard Time
        </time>
      </Reveal>
    </div>
  );
}
