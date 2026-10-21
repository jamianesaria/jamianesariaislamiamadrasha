"use client";

import { useContext, useEffect, useRef } from "react";
import { stegaClean } from "@sanity/client/stega";
import { IntroPlaybackContext } from "./IntroPlaybackContext";

export default function HeroVideo({ src, poster }: { src: string; poster: string }) {
  const introPending = useContext(IntroPlaybackContext);
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    if (!video || introPending || connection?.saveData || /(^|-)2g$/.test(connection?.effectiveType || "") || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let inView = false;
    const updatePlayback = () => {
      if (inView && !document.hidden) {
        if (!video.getAttribute("src")) video.src = stegaClean(src);
        void video.play().catch(() => { /* The poster remains visible if autoplay is denied. */ });
      } else video.pause();
    };
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      updatePlayback();
    });
    observer.observe(video);
    document.addEventListener("visibilitychange", updatePlayback);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", updatePlayback);
      video.pause();
    };
  }, [introPending, src]);

  return <video ref={ref} loop muted playsInline preload="none" poster={stegaClean(poster)}
    className="absolute inset-0 w-full h-full object-cover object-[center_68%]"
    style={{ objectFit: "cover", objectPosition: "center 68%", width: "100%", height: "100%" }}
    aria-hidden="true" />;
}
