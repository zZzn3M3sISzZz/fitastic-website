"use client";

import { useState } from "react";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/cn";

const FAQS = [
  {
    question: "What is Fitastic?",
    answer:
      "Fitastic is a new connected fitness experience built around your workouts, progress and gym community. We’re keeping the best parts under wraps—for now.",
  },
  {
    question: "When will Fitastic be available?",
    answer:
      "Fitastic is coming soon. Join the waitlist, and you’ll be among the first to know when access opens.",
  },
  {
    question: "Is joining the waitlist free?",
    answer:
      "Yes. Joining is completely free and gives you priority access to future launch updates.",
  },
  {
    question: "What do I get by joining early?",
    answer:
      "Waitlist members may receive exclusive previews, launch benefits and early-access opportunities.",
  },
  {
    question: "Will Fitastic be available on iOS and Android?",
    answer:
      "That’s the plan. Final availability and download details will be shared with waitlist members first.",
  },
];

export function FaqSection() {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggle = (question: string) => {
    setOpenItems((current) =>
      current.includes(question)
        ? current.filter((item) => item !== question)
        : [...current, question],
    );
  };

  return (
    <section id="faqs" className="scroll-mt-24 bg-canvas">
      <div className="mx-auto flex max-w-page flex-col gap-14 px-gutter py-[60px] lg:flex-row lg:items-start lg:gap-14">
        <Reveal when="scroll" className="flex w-full max-w-[420px] flex-col gap-6">
          <h2 className="font-display text-[clamp(40px,6vw,64px)] uppercase leading-[1.1] text-white">
            Frequently Asked Questions
          </h2>
          <p className="max-w-[374px] text-base leading-[1.4] text-muted">
            Everything you need to know about reaching your peak performance.
          </p>
        </Reveal>

        <Reveal when="scroll" delay={1} className="flex min-w-0 flex-1 flex-col">
          {FAQS.map((item, index) => {
            const isOpen = openItems.includes(item.question);
            const panelId = `faq-panel-${index}`;
            const buttonId = `faq-button-${index}`;

            return (
              <div key={item.question} className="border-b border-white/20">
                <h3 className="m-0">
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggle(item.question)}
                    className="flex min-h-11 w-full cursor-pointer items-center gap-8 py-8 text-left"
                  >
                    <span className="min-w-0 flex-1 text-xl font-semibold capitalize leading-[1.4] text-white">
                      {item.question}
                    </span>
                    <span className="relative size-8 shrink-0 overflow-hidden">
                      <img
                        src="/icons/chevron-down.svg"
                        alt=""
                        width={32}
                        height={32}
                        className={cn(
                          "size-full transition-transform duration-tap",
                          isOpen && "rotate-180",
                        )}
                      />
                    </span>
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  hidden={!isOpen}
                  className="-mt-4 pb-8 pr-16 text-base leading-[1.4] text-muted"
                >
                  {item.answer}
                </div>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
