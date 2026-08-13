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
  lift?: number;
  grow?: number;
  from?: number;
  flow?: boolean;
};

export function ComingDevice({
  src,
  alt,
  width,
  height,
  className,
  imageClassName,
  lift,
  grow,
  from,
  flow = false,
}: ComingDeviceProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  useScrollLift(wrapRef, frameRef, {
    ...(lift !== undefined ? { lift } : {}),
    ...(grow !== undefined ? { grow } : {}),
    ...(from !== undefined ? { from } : {}),
  });

  return (
    <div
      ref={wrapRef}
      className={cn(
        "pointer-events-none",
        flow ? "relative w-full" : "absolute",
        !flow && !className && "inset-x-0 bottom-0 top-0",
        className,
      )}
    >
      <div ref={frameRef} className={cn("origin-bottom", flow ? "w-full" : "size-full")}>
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
