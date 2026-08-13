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
  { icon: "🔥", value: "2,123", label: "kcal burnt" },
  { icon: "⌛", value: "15h 30m", label: "total time" },
  { icon: "💪", value: "67", label: "exercises" },
] as const;

export function WeeklyStatsCard() {
  return (
    <div className="w-full max-w-[362px] rounded-[22px] bg-[#2e2e2f] p-[17px]">
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
                <p className="text-base font-bold tracking-[-0.64px] text-white">{stat.value}</p>
                <p className="text-xs tracking-[-0.48px] text-[#9d9ea1]">{stat.label}</p>
              </div>
              <span className="sr-only">
                {index === 0 ? "Calories" : index === 1 ? "Time" : "Exercises"}
              </span>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between rounded-2xl border border-[#54575b] px-5 py-[18px]">
          <div className="leading-[1.5]">
            <p className="text-xs tracking-[-0.48px] text-[#9d9ea1]">Most active</p>
            <p className="text-base font-bold tracking-[-0.64px] text-white">Monday</p>
          </div>
          <div className="flex items-end gap-4" aria-hidden="true">
            {DAYS.map((day) => (
              <div key={day.label} className="flex flex-col items-center gap-1.5">
                <div
                  className="w-3.5 rounded"
                  style={{
                    height: day.height,
                    background: day.active ? "#bbf247" : "#54575b",
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
