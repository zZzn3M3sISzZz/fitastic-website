"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

const DAYS = [
  { label: "Mo", height: 33, active: true },
  { label: "Tu", height: 15, active: false },
  { label: "We", height: 21, active: false },
  { label: "Th", height: 18, active: false },
  { label: "Fr", height: 25, active: false },
  { label: "Sa", height: 28, active: false },
  { label: "Su", height: 11, active: false },
] as const;

const STATS = [
  { icon: "🔥", label: "kcal burnt", sr: "2,123 kcal burnt" },
  { icon: "⌛", label: "total time", sr: "15h 30m total time" },
  { icon: "💪", label: "exercises", sr: "67 exercises" },
] as const;

const KCAL = 2123;
const EXERCISES = 67;
const TIME_MINUTES = 15 * 60 + 30;
const COUNTER_MS = 1000;
const BAR_DURATION_MS = 280;
const BAR_STAGGER_MS = 90;

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3;
}

function formatTime(totalMinutes: number) {
  const mins = Math.round(totalMinutes);
  const hours = Math.floor(mins / 60);
  const minutes = mins % 60;
  return `${hours}h ${minutes}m`;
}

export function WeeklyStatsCard() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [counts, setCounts] = useState({ kcal: 0, minutes: 0, exercises: 0 });

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let raf = 0;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const play = () => {
      setInView(true);
      if (reduced) {
        setCounts({ kcal: KCAL, minutes: TIME_MINUTES, exercises: EXERCISES });
        return;
      }

      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / COUNTER_MS);
        const eased = easeOutCubic(t);
        setCounts({
          kcal: KCAL * eased,
          minutes: TIME_MINUTES * eased,
          exercises: EXERCISES * eased,
        });
        if (t < 1) raf = window.requestAnimationFrame(tick);
      };
      raf = window.requestAnimationFrame(tick);
    };

    if (reduced) {
      play();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          play();
          observer.disconnect();
        }
      },
      { threshold: 0.16, rootMargin: "0px 0px -10% 0px" },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  const values = [
    Math.round(counts.kcal).toLocaleString("en-US"),
    formatTime(counts.minutes),
    String(Math.round(counts.exercises)),
  ];

  return (
    <div
      ref={ref}
      className="weekly-stats-card w-full max-w-[362px] rounded-[22px] bg-[#2e2e2f] p-[17px]"
    >
      <div className="flex flex-col gap-4">
        <p className="text-lg font-bold tracking-[-0.72px] text-white">Weekly Stats</p>
        <div className="flex overflow-hidden rounded-[18px] border border-[#54575b]">
          {STATS.map((stat, index) => (
            <div
              key={stat.label}
              className="flex flex-1 flex-col items-center gap-3 border-[#54575b] px-2 py-6 first:border-0 [&:not(:first-child)]:border-l"
            >
              <div className="flex size-11 items-center justify-center rounded-full bg-white text-lg">
                <span aria-hidden="true">{stat.icon}</span>
              </div>
              <div className="flex flex-col items-center leading-[1.5]">
                <p className="text-base font-bold tabular-nums tracking-[-0.64px] text-white">
                  {values[index]}
                </p>
                <p className="text-xs tracking-[-0.48px] text-[#9d9ea1]">{stat.label}</p>
              </div>
              <span className="sr-only">{stat.sr}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between rounded-2xl border border-[#54575b] px-5 py-[18px]">
          <div className="leading-[1.5]">
            <p className="text-xs tracking-[-0.48px] text-[#9d9ea1]">Most active</p>
            <p className="text-base font-bold tracking-[-0.64px] text-white">Monday</p>
          </div>
          <div className="flex items-end gap-4" aria-hidden="true">
            {DAYS.map((day, index) => (
              <div key={day.label} className="flex flex-col items-center gap-1.5">
                <div
                  className={cn(
                    "weekly-stats-bar w-3.5 origin-bottom rounded",
                    inView ? "scale-y-100" : "scale-y-0",
                  )}
                  style={{
                    height: day.height,
                    background: day.active ? "#bbf247" : "#54575b",
                    transitionProperty: "transform",
                    transitionDuration: `${BAR_DURATION_MS}ms`,
                    transitionDelay: inView ? `${index * BAR_STAGGER_MS}ms` : "0ms",
                    transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
                  }}
                />
                <span className="text-xs tracking-[-0.48px] text-white">{day.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
