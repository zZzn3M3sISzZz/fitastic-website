"use client";

import { cn } from "@/lib/cn";
import { useInView } from "@/lib/use-in-view";

const CARDS = [
  {
    title: "For Fitness Businesses & Brands",
    items: [
      {
        heading: "🛍️ Sell Products",
        body: "Reach a highly relevant fitness audience through the Fitastic Marketplace.",
      },
      {
        heading: "📣 Build Brand Visibility",
        body: "Put your products and services in front of an engaged fitness community.",
      },
    ],
  },
  {
    title: "For Trainers & Freelancers",
    items: [
      {
        heading: "🏋️ Monetise Your Expertise",
        body: "Create and host paid fitness classes whenever you have availability.",
      },
      {
        heading: "💰 Earn Beyond Your 9–5",
        body: "Turn your free time and expertise into an additional income stream.",
      },
    ],
  },
  {
    title: "For the Fitastic Community",
    items: [
      {
        heading: "🤝 Connect & Collaborate",
        body: "Network with people who share your interests, ambitions and ideas.",
      },
      {
        heading: "💡 Turn Ideas Into Opportunities",
        body: "Pitch business concepts, find collaborators, attract potential investors and build relationships.",
      },
    ],
  },
];

export function ResourcesEcosystemSection() {
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.16 });

  return (
    <section
      id="ecosystem"
      ref={ref}
      className={cn(
        "resources-ecosystem relative overflow-hidden bg-black",
        inView && "is-in",
      )}
    >
      <div className="relative mx-auto aspect-[1920/1080] w-full max-w-[1920px]">
        <img
          src="/assets/resources/ecosystem-base.png"
          alt="The Fitastic Ecosystem — One Platform. An Entire Fitness Economy."
          width={1920}
          height={1080}
          className="absolute inset-0 size-full object-cover object-top"
        />

        <div className="absolute inset-x-[4%] bottom-[4%] z-10 sm:bottom-[5%]">
          <div className="mx-auto grid max-w-[1700px] gap-3 sm:grid-cols-3 sm:gap-4">
            {CARDS.map((card, index) => (
              <article
                key={card.title}
                className="resources-ecosystem-card rounded-lg bg-[rgba(22,22,22,0.92)] p-4 backdrop-blur-sm sm:p-5"
                style={{ ["--i" as string]: index }}
              >
                <h3 className="text-[clamp(16px,1.7vw,28px)] font-medium tracking-[-0.04em] text-white">
                  {card.title}
                </h3>
                <div className="mt-3 flex flex-col gap-3 sm:mt-4">
                  {card.items.map((item) => (
                    <div
                      key={item.heading}
                      className="border-l-[3px] border-[#bbf247] pl-3 sm:pl-4"
                    >
                      <p className="text-[clamp(14px,1.4vw,22px)] font-medium tracking-[-0.02em] text-white">
                        {item.heading}
                      </p>
                      <p className="mt-1 text-[clamp(12px,1.2vw,18px)] font-light leading-snug tracking-[-0.04em] text-white/90">
                        {item.body}
                      </p>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
