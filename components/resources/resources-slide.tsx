"use client";

import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/cn";

type ResourcesSlideProps = {
  src: string;
  alt: string;
  id?: string;
  className?: string;
};

export function ResourcesSlide({
  src,
  alt,
  id,
  className,
}: ResourcesSlideProps) {
  return (
    <section
      id={id}
      className={cn("relative w-full overflow-hidden bg-black", className)}
    >
      <Reveal when="scroll" className="w-full">
        <img
          src={src}
          alt={alt}
          width={1920}
          height={1080}
          className="block h-auto w-full select-none"
          loading="lazy"
          decoding="async"
        />
      </Reveal>
    </section>
  );
}
