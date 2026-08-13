"use client";

import { useEffect, useRef, useState } from "react";

const mediaClassName =
  "absolute left-1/2 top-0 h-full min-h-[981px] w-[120%] max-w-none -translate-x-1/2 object-cover object-[center_20%]";

export function HeroBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || reduceMotion) return;

    const play = () => {
      void video.play().catch(() => {});
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) play();
        else video.pause();
      },
      { threshold: 0.15 },
    );

    observer.observe(video);
    play();
    return () => observer.disconnect();
  }, [reduceMotion]);

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      {reduceMotion ? (
        <img
          src="/assets/hero-bg.png"
          alt=""
          width={1920}
          height={1080}
          className={mediaClassName}
        />
      ) : (
        <video
          ref={videoRef}
          className={mediaClassName}
          poster="/assets/hero-bg.png"
          width={1920}
          height={1080}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          disablePictureInPicture
        >
          <source src="/assets/hero-bg.mp4" type="video/mp4" />
        </video>
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-canvas" />
      <div className="absolute inset-x-0 top-0 h-[360px] bg-gradient-to-b from-black/62 to-transparent" />
    </div>
  );
}
