import { Reveal } from "@/components/reveal";
import { LeaderboardsPodium } from "@/components/leaderboards-podium";

export function LeaderboardsSection() {
  return (
    <Reveal
      when="scroll"
      className="relative flex min-h-[560px] flex-col overflow-hidden bg-surface lg:h-[640px]"
    >
      <div className="relative z-10 flex max-w-[424px] flex-col gap-4 p-6 pb-0 sm:p-10 sm:pb-0">
        <h3 className="font-display text-[clamp(22px,3vw,33px)] uppercase leading-[1.2] text-lime">
          Real-time Leaderboards
        </h3>
        <p className="text-base leading-[1.4] text-white">
          Friendly competition in your pocket. Get instant updates on where you
          stand globally or among your peers, tracking volume and intensity for
          competitive.
        </p>
      </div>

      <div className="relative z-0 flex flex-1 items-end overflow-visible px-2 sm:px-4">
        <LeaderboardsPodium />
      </div>
    </Reveal>
  );
}
