"use client";

import { useRef } from "react";
import { useScrollLift } from "@/lib/use-scroll-lift";
import { cn } from "@/lib/cn";

type ComingDeviceProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  imageClassName?: string;
};

export function ComingDevice({
  src,
  alt,
  width,
  height,
  className,
  imageClassName,
}: ComingDeviceProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  useScrollLift(wrapRef, frameRef);

  return (
    <div ref={wrapRef} className={cn("pointer-events-none absolute inset-0", className)}>
      <div ref={frameRef} className="size-full origin-bottom">
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={cn("max-w-none", imageClassName)}
        />
      </div>
    </div>
  );
}
