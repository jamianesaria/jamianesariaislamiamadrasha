"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { stegaClean } from "@sanity/client/stega";

interface IntroSettings {
  enabled: boolean;
  videoUrl: string;
  posterUrl: string;
  title: string;
  skipLabel: string;
}

const completedIntros = new Set<string>();
const changeEvent = "jamia-intro-completed";

function subscribe(callback: () => void) {
  const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
  window.addEventListener(changeEvent, callback);
  motion.addEventListener("change", callback);
  return () => {
    window.removeEventListener(changeEvent, callback);
    motion.removeEventListener("change", callback);
  };
}

export default function WebsiteIntro({ settings, children }: { settings: IntroSettings; children: ReactNode }) {
  const videoUrl = stegaClean(settings.videoUrl);
  const posterUrl = stegaClean(settings.posterUrl);
  const sessionKey = `jamia-intro:${videoUrl}`;
  const getSnapshot = useCallback(() => {
    // Keep the Studio preview and visitors who prefer reduced motion unobstructed.
    if (window.self !== window.top || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
    if (completedIntros.has(sessionKey)) return false;
    try { return sessionStorage.getItem(sessionKey) !== "seen"; } catch { return true; }
  }, [sessionKey]);
  const pending = useSyncExternalStore(subscribe, getSnapshot, () => true);
  const visible = settings.enabled && pending;
  const [leaving, setLeaving] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const skipRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const finishTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const finish = useCallback(() => {
    if (finishTimer.current !== null) return;
    videoRef.current?.pause();
    setLeaving(true);
    finishTimer.current = setTimeout(() => {
      completedIntros.add(sessionKey);
      try { sessionStorage.setItem(sessionKey, "seen"); } catch { /* Memory fallback for restricted browsers. */ }
      window.dispatchEvent(new Event(changeEvent));
    }, 350);
  }, [sessionKey]);

  useEffect(() => {
    if (!visible) return;
    const content = contentRef.current;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    if (content) {
      content.inert = true;
      content.setAttribute("aria-hidden", "true");
    }
    skipRef.current?.focus({ preventScroll: true });
    // A blocked autoplay, missing file, or stalled connection must never trap a visitor.
    const watchdog = setTimeout(finish, 10000);
    void videoRef.current?.play().catch(finish);
    return () => {
      clearTimeout(watchdog);
      if (finishTimer.current !== null) clearTimeout(finishTimer.current);
      document.body.style.overflow = previousOverflow;
      if (content) {
        content.inert = false;
        content.removeAttribute("aria-hidden");
      }
      if (previousFocus instanceof HTMLElement && previousFocus !== document.body && previousFocus.isConnected) {
        previousFocus.focus({ preventScroll: true });
      }
    };
  }, [visible, finish]);

  return (
    <>
      {visible && (
        <div
          className="website-intro fixed inset-0 z-[10000] grid h-dvh place-items-center overflow-hidden isolate bg-[#151309] transition-opacity duration-[350ms] motion-reduce:hidden print:hidden"
          style={{ opacity: leaving ? 0 : 1, pointerEvents: leaving ? "none" : undefined }}
          data-leaving={leaving}
          role="dialog"
          aria-modal="true"
          aria-label={stegaClean(settings.title)}
          onKeyDown={(event) => {
            if (event.key === "Escape") finish();
            if (event.key === "Tab") {
              event.preventDefault();
              skipRef.current?.focus();
            }
          }}
        >
          <Image src={posterUrl} alt="" fill priority unoptimized className="pointer-events-none scale-115 object-cover blur-[36px] brightness-[0.4]" aria-hidden="true" />
          <video
            ref={videoRef}
            className="relative size-full min-h-0 min-w-0 object-contain object-center"
            src={videoUrl}
            poster={posterUrl}
            width={1280}
            height={720}
            muted
            playsInline
            preload="none"
            onEnded={finish}
            onError={finish}
            aria-hidden="true"
            tabIndex={-1}
          />
          <button
            ref={skipRef}
            type="button"
            className="absolute top-[max(1rem,env(safe-area-inset-top))] right-[max(1rem,env(safe-area-inset-right))] inline-flex min-h-11 cursor-pointer items-center gap-2.5 rounded-full border border-white/35 bg-[#11180f]/75 px-4 py-2.5 text-[clamp(0.8125rem,2.5vw,0.9375rem)] font-semibold text-[#fffdf5] shadow-lg backdrop-blur-md transition-colors hover:bg-[#014d26]/95 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-200"
            onClick={finish}
          >
            <span>{settings.skipLabel}</span>
            <ArrowRight size={16} aria-hidden="true" />
          </button>
        </div>
      )}
      <noscript><style>{".website-intro { display: none !important; }"}</style></noscript>
      <div ref={contentRef}>{children}</div>
    </>
  );
}
