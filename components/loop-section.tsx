import { Reveal } from "@/components/reveal";

const PROFILES = [
  {
    name: "Vignesh M K",
    role: "Designer/Photographer",
    floatClass: "feature-float",
    offsetClass: "sm:left-[50px] sm:top-[239px]",
    mobileClass: "-rotate-1",
  },
  {
    name: "Vignesh Senthilvel",
    role: "Full-Stack Developer",
    floatClass: "feature-float-delayed",
    offsetClass: "sm:left-[163px] sm:top-[337px]",
    mobileClass: "translate-x-6 rotate-1",
  },
] as const;

function ProfileAvatar({ size = "md" }: { size?: "sm" | "md" }) {
  const dim = size === "sm" ? "size-8" : "size-[35px]";
  return (
    <span
      className={`relative ${dim} shrink-0 overflow-hidden rounded-full border border-white/40 shadow-[0_8px_11px_-7px_rgba(212,251,151,0.7),0_0_0_2px_rgba(212,251,151,0.18)]`}
      aria-hidden="true"
    >
      <span
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 10%), linear-gradient(180deg, #d4fb97 0%, #37520d 140%)",
        }}
      />
      <span className="absolute inset-0 shadow-[inset_0_5px_13px_rgba(255,255,255,0.11)]" />
    </span>
  );
}

function ProfileCard({
  name,
  role,
  className,
}: {
  name: string;
  role: string;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center gap-3 rounded-[10px] border border-[#424242] bg-[#272728] px-3 py-3 shadow-[-5px_11px_10px_rgba(0,0,0,0.25)] ${className ?? ""}`}
    >
      <div className="flex items-center gap-3">
        <ProfileAvatar />
        <div className="min-w-0 leading-tight">
          <p className="truncate text-[13px] font-semibold text-white sm:text-[15px]">
            {name}
          </p>
          <p className="truncate text-[11px] text-[#a39a9a] sm:text-[13px]">
            {role}
          </p>
        </div>
      </div>
      <span className="inline-flex h-7 shrink-0 items-center rounded-full bg-lime px-2 text-[8px] font-medium text-canvas sm:h-[31px] sm:px-2.5">
        Connect
      </span>
    </div>
  );
}

export function LoopSection() {
  return (
    <Reveal
      when="scroll"
      delay={1}
      className="relative flex min-h-[560px] flex-col overflow-hidden bg-surface lg:h-[640px]"
    >
      <div className="relative z-10 flex max-w-[424px] flex-col gap-4 p-6 sm:p-10">
        <h3 className="font-display text-[clamp(22px,3vw,33px)] uppercase leading-[1.2] text-lime">
          The Loop
        </h3>
        <p className="text-base leading-[1.4] text-white">
          Connect with entrepreneurs near you. Build valuable partnerships, grow
          your visibility and unlock new opportunities within the fitness
          community.
        </p>
      </div>

      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <img
          src="/assets/features/loop-logo.png"
          alt=""
          width={1448}
          height={1086}
          className="absolute left-[-67%] top-[150px] w-[191%] max-w-none opacity-[0.06] sm:opacity-[0.08]"
        />
        <div className="absolute inset-x-0 top-0 h-[55%] bg-gradient-to-b from-surface via-surface/80 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-b from-transparent to-canvas" />
      </div>

      {/* Mobile: stacked cards */}
      <div className="relative z-[2] mt-auto flex flex-col gap-4 px-6 pb-10 sm:hidden">
        {PROFILES.map((profile) => (
          <div key={profile.name} className={`${profile.floatClass} ${profile.mobileClass}`}>
            <ProfileCard name={profile.name} role={profile.role} />
          </div>
        ))}
      </div>

      {/* Desktop: staggered absolute cards */}
      <div className="pointer-events-none absolute inset-0 hidden sm:block" aria-hidden="true">
        {PROFILES.map((profile) => (
          <div
            key={profile.name}
            className={`absolute z-[2] ${profile.floatClass} ${profile.offsetClass}`}
          >
            <ProfileCard name={profile.name} role={profile.role} />
          </div>
        ))}
      </div>
    </Reveal>
  );
}
