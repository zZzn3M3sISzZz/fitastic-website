"use client";

import { cn } from "@/lib/cn";
import { useInView } from "@/lib/use-in-view";

/** Positions as % of 1920×1080 (Figma 383:1686 content + sidebar offset). */
const HOST_HUB = {
  left: 50.4,
  top: 26.2,
  width: 19.4,
  height: 13.3,
  /** Right-edge center — where links attach */
  x: 69.8,
  y: 32.9,
};

const BENEFIT_HUB = {
  left: 49.7,
  top: 64.9,
  width: 20.8,
  height: 23.0,
  x: 70.5,
  y: 76.4,
};

const HOST_STEPS = [
  {
    title: "Create",
    body: "Set up a class, choose the format, schedule and participant limit.",
    x: 75.8,
    y: 14.4,
  },
  {
    title: "Price",
    body: "Set your own registration fee.",
    x: 75.8,
    y: 27.0,
  },
  {
    title: "Promote",
    body: "Make your class discoverable to the Fitastic community.",
    x: 75.8,
    y: 42.5,
  },
  {
    title: "Earn",
    body: "Participants register and pay to join your class.",
    x: 75.8,
    y: 54.5,
  },
] as const;

const BENEFIT_STEPS = [
  {
    title: "For Trainers",
    body: "More flexibility. More reach. Another income stream.",
    x: 75.8,
    y: 70.5,
  },
  {
    title: "For Users",
    body: "More trainers. More classes. More ways to stay active.",
    x: 75.8,
    y: 85.5,
  },
] as const;

function linkPath(
  fromX: number,
  fromY: number,
  toX: number,
  toY: number,
) {
  const mx = (fromX + toX) / 2;
  return `M ${fromX} ${fromY} C ${mx} ${fromY}, ${mx} ${toY}, ${toX} ${toY}`;
}

export function ResourcesExpertiseSection() {
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.14 });

  const links = [
    ...HOST_STEPS.map((step, i) => ({
      key: step.title,
      d: linkPath(HOST_HUB.x, HOST_HUB.y, step.x, step.y),
      i: i + 1,
    })),
    ...BENEFIT_STEPS.map((step, i) => ({
      key: step.title,
      d: linkPath(BENEFIT_HUB.x, BENEFIT_HUB.y, step.x, step.y),
      i: HOST_STEPS.length + i + 1,
    })),
  ];

  return (
    <section
      id="expertise"
      ref={ref}
      className={cn(
        "resources-expertise relative overflow-hidden bg-black",
        inView && "is-in",
      )}
    >
      <div className="relative mx-auto aspect-[1920/1080] w-full max-w-[1920px]">
        <img
          src="/assets/resources/expertise-bg.png"
          alt=""
          width={1920}
          height={1080}
          className="absolute inset-0 size-full object-cover object-left"
          aria-hidden
        />

        <div className="absolute left-[10%] top-[8.5%] z-10 w-[min(42%,780px)]">
          <h2 className="resources-expertise-title text-[clamp(36px,4vw,76px)] font-medium leading-[1.02] tracking-[-0.03em] text-white">
            Turn Your Expertise
            <br />
            Into Income
          </h2>
          <p className="resources-expertise-sub mt-[clamp(10px,1vw,18px)] text-[clamp(16px,1.35vw,26px)] font-light leading-snug text-[#bcbaba]">
            The Marketplace Isn&apos;t Just for Products
          </p>
        </div>

        <svg
          className="pointer-events-none absolute inset-0 z-[5] size-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          fill="none"
          aria-hidden
        >
          <defs>
            <marker
              id="expertise-arrow"
              markerWidth="3.5"
              markerHeight="3.5"
              refX="3"
              refY="1.75"
              orient="auto"
            >
              <path d="M0,0 L3.5,1.75 L0,3.5 Z" fill="rgba(188,192,197,0.95)" />
            </marker>
          </defs>
          {links.map((link) => (
            <path
              key={link.key}
              className="resources-expertise-link"
              style={{ ["--i" as string]: link.i }}
              d={link.d}
              markerEnd="url(#expertise-arrow)"
            />
          ))}
        </svg>

        <div
          className="resources-expertise-hub absolute z-10 rounded-[20px] border border-white bg-black/55 px-5 py-5"
          style={{
            left: `${HOST_HUB.left}%`,
            top: `${HOST_HUB.top}%`,
            width: `${HOST_HUB.width}%`,
            ["--i" as string]: 0,
          }}
        >
          <p className="text-[clamp(16px,1.6vw,28px)] font-medium tracking-[-0.03em] text-white">
            Host Paid Classes
          </p>
          <p className="mt-2 text-[clamp(12px,1.05vw,18px)] font-light leading-snug text-white/85">
            Trainers can create and organise their own classes directly through Fitastic.
          </p>
        </div>

        <div
          className="resources-expertise-hub absolute z-10 rounded-[20px] border border-white bg-black/55 px-5 py-5"
          style={{
            left: `${BENEFIT_HUB.left}%`,
            top: `${BENEFIT_HUB.top}%`,
            width: `${BENEFIT_HUB.width}%`,
            ["--i" as string]: 1,
          }}
        >
          <p className="text-[clamp(16px,1.6vw,28px)] font-medium tracking-[-0.03em] text-white">
            Turn Your Expertise Into Extra Income
          </p>
          <p className="mt-2 text-[clamp(12px,1.05vw,18px)] font-light leading-snug text-white/85">
            Create and host your own classes — from Strength Training, Yoga, HIIT, Dance Fitness,
            Mobility, Nutrition, Sports Coaching, and Specialised Workshops — around your expertise,
            availability, and audience.
          </p>
        </div>

        {[...HOST_STEPS, ...BENEFIT_STEPS].map((step, i) => (
          <div
            key={step.title}
            className="resources-expertise-cat absolute z-10 w-[min(20%,280px)] -translate-y-1/2"
            style={{
              left: `${step.x}%`,
              top: `${step.y}%`,
              ["--i" as string]: i + 1,
            }}
          >
            <p className="text-[clamp(14px,1.35vw,24px)] font-semibold tracking-[-0.03em] text-white">
              {step.title}
            </p>
            <p className="mt-1 text-[clamp(11px,0.95vw,16px)] font-light leading-snug text-white/85">
              {step.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
