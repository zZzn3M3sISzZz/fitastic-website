import { LeaderboardsSection } from "@/components/leaderboards-section";
import { LoopSection } from "@/components/loop-section";

export function LeaderboardsLoopSection() {
  return (
    <section className="scroll-mt-24 bg-canvas">
      <div className="mx-auto grid max-w-page gap-8 px-gutter pb-8 lg:grid-cols-2 lg:gap-8 lg:pb-8">
        <div id="leaderboards" className="scroll-mt-24">
          <LeaderboardsSection />
        </div>
        <div id="loop" className="scroll-mt-24">
          <LoopSection />
        </div>
      </div>
    </section>
  );
}
