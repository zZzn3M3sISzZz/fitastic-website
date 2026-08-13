import { Reveal } from "@/components/reveal";
import { WaitlistForm } from "@/components/waitlist-form";

const COLUMNS = [
  {
    title: "EXPLORE",
    links: [
      { href: "#loop", label: "About Fitastic" },
      { href: "#waitlist", label: "Early Access" },
    ],
  },
  {
    title: "SOCIAL",
    links: [
      { href: "https://instagram.com", label: "Instagram" },
      { href: "https://youtube.com", label: "YouTube" },
      { href: "https://facebook.com", label: "Facebook" },
    ],
  },
  {
    title: "OTHERS",
    links: [
      { href: "#", label: "Terms of Use" },
      { href: "#", label: "Privacy Policy" },
      { href: "#", label: "Cookie Policy" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer id="waitlist" className="relative overflow-hidden bg-canvas scroll-mt-24">
      <div className="relative mx-auto max-w-page pb-8 pt-[120px]">
        <div className="h-px w-full bg-line" />

        <Reveal
          when="scroll"
          className="flex flex-col gap-8 px-gutter py-14 lg:flex-row lg:items-center lg:justify-between"
        >
          <div className="max-w-[602px]">
            <h2 className="font-display text-[clamp(26px,3vw,33px)] uppercase leading-[1.2] text-lime-bright">
              Be first to enter the fitverse
            </h2>
            <p className="mt-1 max-w-[456px] text-base leading-normal tracking-[-0.15px] text-muted">
              Join the waitlist for launch updates, early-access opportunities
              and exclusive surprises.
            </p>
          </div>
          <WaitlistForm />
        </Reveal>

        <div className="h-px w-full bg-line" />

        <Reveal
          when="scroll"
          delay={1}
          className="flex flex-col gap-12 px-gutter pb-8 pt-14 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="flex max-w-[355px] flex-col gap-[22px]">
            <span className="relative block h-[65px] w-[271px] overflow-hidden">
              <img
                src="/assets/logo.png"
                alt="Fitastic"
                width={271}
                height={65}
                className="absolute inset-0 size-full object-contain object-left"
              />
            </span>
            <p className="text-base leading-[1.4] text-white">
              The future of fitness is closer than you think.
            </p>
          </div>

          <div className="flex flex-wrap gap-10 sm:gap-14">
            {COLUMNS.map((column) => (
              <div key={column.title} className="flex min-w-[76px] flex-col gap-6">
                <p className="text-lg font-semibold text-white">{column.title}</p>
                <ul className="flex flex-col gap-4 text-base leading-normal text-[#fafafa]">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="transition-opacity duration-tap hover:opacity-70"
                        {...(link.href.startsWith("http")
                          ? { target: "_blank", rel: "noreferrer" }
                          : {})}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      <Reveal when="scroll" delay={2}>
        <div className="pointer-events-none relative mx-auto w-full max-w-[1062px] opacity-20">
          <img
            src="/assets/logo-wordmark.png"
            alt=""
            width={2172}
            height={724}
            className="h-auto w-full object-contain"
          />
        </div>
      </Reveal>
    </footer>
  );
}
