"use client";

import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";
import { useInView } from "@/lib/use-in-view";

const OPPORTUNITIES = [
  {
    emoji: "🚀",
    title: "Looking for opportunities?",
    body: "Discover businesses, projects and people looking for collaborators.",
  },
  {
    emoji: "🤝",
    title: "Looking for a co-founder?",
    body: "Find people with complementary skills and interests.",
  },
  {
    emoji: "💰",
    title: "Looking for investors?",
    body: "Put your concept in front of people who may be interested in supporting it.",
  },
  {
    emoji: "💡",
    title: "Have an idea?",
    body: "Share your business concept with the Fitastic community.",
  },
  {
    emoji: "👩‍💼",
    title: "Looking for talent?",
    body: "Find designers, developers, marketers, trainers and other professionals to help bring your idea to life.",
  },
] as const;

/** Desktop absolute placements (% of 1920×1080 stage) */
const OPP_POS = [
  { left: 50, top: 44, width: 22 },
  { left: 18, top: 54, width: 22 },
  { left: 48, top: 60, width: 22 },
  { left: 12, top: 74, width: 24 },
  { left: 38, top: 80, width: 26 },
] as const;

const LOOP = [
  { title: "Businesses", action: "Sell & grow" },
  { title: "Trainers", action: "Teach & earn" },
  { title: "Members", action: "Connect & discover" },
  { title: "Entrepreneurs", action: "Pitch & collaborate" },
  { title: "Brands", action: "Reach & build" },
] as const;

function OpportunityCard({
  emoji,
  title,
  body,
  className,
  style,
}: {
  emoji: string;
  title: string;
  body: string;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <article
      className={cn(
        "resources-community-card rounded-[18px] border border-white/40 bg-black/70 px-4 py-4 backdrop-blur-sm",
        className,
      )}
      style={style}
    >
      <p className="text-[clamp(14px,1.2vw,20px)] font-semibold leading-tight tracking-[-0.03em] text-white">
        <span className="mr-1.5" aria-hidden>
          {emoji}
        </span>
        {title}
      </p>
      <p className="mt-2 text-[clamp(12px,1vw,16px)] font-light leading-snug text-white/85">
        {body}
      </p>
    </article>
  );
}

function LoopPanel({ className }: { className?: string }) {
  return (
    <aside
      className={cn(
        "resources-community-loop rounded-[22px] border border-white/50 bg-black/65 px-5 py-6 backdrop-blur-sm sm:px-6 sm:py-7",
        className,
      )}
    >
      <p className="text-[clamp(22px,2.2vw,36px)] font-medium tracking-[-0.03em] text-white">
        The Loop
      </p>
      <ul className="mt-5 space-y-4">
        {LOOP.map((item, i) => (
          <li
            key={item.title}
            className="resources-community-loop-item border-l-2 border-[#bbf247] pl-3"
            style={{ ["--i" as string]: i } as CSSProperties}
          >
            <p className="text-[clamp(15px,1.35vw,22px)] font-medium tracking-[-0.02em] text-white">
              {item.title}
            </p>
            <p className="mt-0.5 text-[clamp(13px,1.1vw,18px)] font-light text-white/75">
              → {item.action}
            </p>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export function ResourcesCommunitySection() {
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.12 });

  return (
    <section
      id="community"
      ref={ref}
      className={cn(
        "resources-community relative overflow-hidden bg-black",
        inView && "is-in",
      )}
    >
      <div className="relative mx-auto w-full max-w-[1920px]">
        {/* Desktop */}
        <div className="resources-community-stage relative hidden aspect-[1920/1080] w-full md:block">
          <img
            src="/assets/resources/community-bg.png"
            alt=""
            width={1920}
            height={1080}
            className="resources-community-bg absolute inset-0 size-full object-cover object-right"
            aria-hidden
          />
          <img
            src="/assets/resources/community-rings.png"
            alt=""
            width={1600}
            height={1101}
            className="resources-community-rings pointer-events-none absolute bottom-[-8%] left-[6%] z-[1] w-[62%] max-w-none"
            aria-hidden
          />

          <div className="absolute left-[10%] top-[8%] z-10 w-[min(42%,760px)]">
            <h2 className="resources-community-title text-[clamp(36px,4vw,72px)] font-medium leading-[1.05] tracking-[-0.03em] text-white">
              A Community Where
              <br />
              Opportunities Move
            </h2>
            <p className="resources-community-sub mt-[clamp(10px,1vw,18px)] text-[clamp(16px,1.35vw,26px)] font-light leading-snug text-[#bcbaba]">
              A Fitness Ecosystem Where Everyone Can Participate.
            </p>
          </div>

          <article className="resources-community-intro absolute left-[10%] top-[30%] z-10 w-[min(34%,580px)] rounded-[22px] border border-white/50 bg-black/60 px-6 py-5">
            <p className="text-[clamp(18px,1.7vw,30px)] font-medium tracking-[-0.03em] text-white">
              Connect. Pitch. Collaborate. Build.
            </p>
            <ul className="mt-3 space-y-2.5 text-[clamp(12px,1.05vw,17px)] font-light leading-snug text-white/90">
              <li className="border-l-2 border-[#bbf247] pl-3">
                Fitastic isn&apos;t trying to replace your existing sales channels.
              </li>
              <li className="border-l-2 border-[#bbf247] pl-3">
                The platform creates opportunities for members to connect with each other
                professionally and personally.
              </li>
            </ul>
          </article>

          {OPPORTUNITIES.map((item, i) => (
            <OpportunityCard
              key={item.title}
              emoji={item.emoji}
              title={item.title}
              body={item.body}
              className="absolute z-10"
              style={
                {
                  left: `${OPP_POS[i].left}%`,
                  top: `${OPP_POS[i].top}%`,
                  width: `${OPP_POS[i].width}%`,
                  minWidth: 200,
                  ["--i" as string]: i,
                } as CSSProperties
              }
            />
          ))}

          <LoopPanel className="absolute right-[5%] top-[10%] z-10 w-[min(20%,340px)]" />
        </div>

        {/* Mobile */}
        <div className="resources-community-stack relative md:hidden">
          <div className="absolute inset-0 overflow-hidden">
            <img
              src="/assets/resources/community-bg.png"
              alt=""
              className="resources-community-bg absolute inset-0 size-full object-cover object-right"
              aria-hidden
            />
            <div className="absolute inset-0 bg-black/55" aria-hidden />
            <img
              src="/assets/resources/community-rings.png"
              alt=""
              className="resources-community-rings pointer-events-none absolute -bottom-[5%] left-[-10%] w-[130%] max-w-none opacity-70"
              aria-hidden
            />
          </div>

          <div className="relative z-10 px-5 py-16 sm:px-8">
            <h2 className="resources-community-title text-[clamp(32px,9vw,48px)] font-medium leading-[1.05] tracking-[-0.03em] text-white">
              A Community Where Opportunities Move
            </h2>
            <p className="resources-community-sub mt-4 text-[clamp(16px,4vw,22px)] font-light leading-snug text-[#bcbaba]">
              A Fitness Ecosystem Where Everyone Can Participate.
            </p>

            <article className="resources-community-intro mt-8 rounded-[20px] border border-white/50 bg-black/70 px-5 py-5">
              <p className="text-[18px] font-medium tracking-[-0.03em] text-white">
                Connect. Pitch. Collaborate. Build.
              </p>
              <ul className="mt-3 space-y-2.5 text-[14px] font-light leading-snug text-white/90">
                <li className="border-l-2 border-[#bbf247] pl-3">
                  Fitastic isn&apos;t trying to replace your existing sales channels.
                </li>
                <li className="border-l-2 border-[#bbf247] pl-3">
                  The platform creates opportunities for members to connect with each other
                  professionally and personally.
                </li>
              </ul>
            </article>

            <div className="mt-6 space-y-4">
              {OPPORTUNITIES.map((item, i) => (
                <OpportunityCard
                  key={item.title}
                  emoji={item.emoji}
                  title={item.title}
                  body={item.body}
                  style={{ ["--i" as string]: i } as CSSProperties}
                />
              ))}
            </div>

            <LoopPanel className="mt-6" />
          </div>
        </div>
      </div>
    </section>
  );
}
