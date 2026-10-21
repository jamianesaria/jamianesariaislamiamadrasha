"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { ArrowRight, Play } from "lucide-react";
import { stegaClean } from "@sanity/client/stega";
import { IntroPlaybackContext } from "./IntroPlaybackContext";

interface IntroSettings {
  enabled: boolean;
  videoUrl: string;
  mobileVideoUrl: string;
  posterUrl: string;
  mobilePosterUrl: string;
  title: string;
  skipLabel: string;
  playLabel: string;
  loadingLabel: string;
}

const completedIntros = new Set<string>();
const changeEvent = "jamia-intro-completed";
type Phase = "loading" | "playing" | "manual";

function subscribe(callback: () => void) {
  window.addEventListener(changeEvent, callback);
  return () => window.removeEventListener(changeEvent, callback);
}

export default function WebsiteIntro({ settings, children }: { settings: IntroSettings; children: ReactNode }) {
  const videoUrl = stegaClean(settings.videoUrl);
  const mobileVideoUrl = stegaClean(settings.mobileVideoUrl);
  const posterUrl = stegaClean(settings.posterUrl);
  const mobilePosterUrl = stegaClean(settings.mobilePosterUrl);
  const sessionKey = `jamia-intro:${videoUrl}:${mobileVideoUrl}`;
  const getSnapshot = useCallback(() => {
    if (window.self !== window.top || completedIntros.has(sessionKey)) return false;
    try { return sessionStorage.getItem(sessionKey) !== "seen"; } catch { return true; }
  }, [sessionKey]);
  // Never cover the server-rendered homepage before working controls are available.
  const pending = useSyncExternalStore(subscribe, getSnapshot, () => false);
  const hydrated = useSyncExternalStore(subscribe, () => true, () => false);
  const visible = settings.enabled && pending;
  const [phase, setPhase] = useState<Phase>("loading");
  const phaseRef = useRef<Phase>("loading");
  const [leaving, setLeaving] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const skipRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const sourceRef = useRef("");
  const resumeTime = useRef(0);
  const attempt = useRef(0);
  const finishTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const loadTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const invalidatePlayback = useCallback(() => ++attempt.current, []);

  const updatePhase = useCallback((next: Phase) => {
    phaseRef.current = next;
    setPhase(next);
  }, []);
  const clearLoadTimer = useCallback(() => {
    if (loadTimer.current !== null) clearTimeout(loadTimer.current);
    loadTimer.current = null;
  }, []);
  const offerPlay = useCallback(() => {
    invalidatePlayback();
    clearLoadTimer();
    videoRef.current?.pause();
    updatePhase("manual");
  }, [clearLoadTimer, invalidatePlayback, updatePhase]);
  const finish = useCallback((remember = true) => {
    if (finishTimer.current !== null) return;
    invalidatePlayback();
    clearLoadTimer();
    videoRef.current?.pause();
    setLeaving(true);
    finishTimer.current = setTimeout(() => {
      completedIntros.add(sessionKey);
      // A failed request must not count as a successfully viewed intro.
      if (remember) {
        try { sessionStorage.setItem(sessionKey, "seen"); } catch { /* Memory fallback. */ }
      }
      window.dispatchEvent(new Event(changeEvent));
    }, 150);
  }, [clearLoadTimer, invalidatePlayback, sessionKey]);
  const startPlayback = useCallback(() => {
    const video = videoRef.current;
    if (!video || finishTimer.current !== null) return;
    const request = invalidatePlayback();
    video.muted = true;
    video.defaultMuted = true;
    if (video.getAttribute("src") !== sourceRef.current) video.src = sourceRef.current;
    updatePhase("loading");
    clearLoadTimer();
    loadTimer.current = setTimeout(offerPlay, 5000);
    // A direct button click preserves the user gesture required by some browsers.
    void video.play().catch(() => { if (request === attempt.current) offerPlay(); });
  }, [clearLoadTimer, invalidatePlayback, offerPlay, updatePhase]);

  useEffect(() => {
    if (!visible || !getSnapshot()) return;
    const video = videoRef.current;
    if (!video) return;
    const portrait = window.matchMedia("(orientation: portrait)");
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    const requiresGesture = window.matchMedia("(prefers-reduced-motion: reduce)").matches || connection?.saveData;
    const chooseSource = () => {
      sourceRef.current = portrait.matches && mobileVideoUrl ? mobileVideoUrl : videoUrl;
      video.poster = portrait.matches && mobilePosterUrl ? mobilePosterUrl : posterUrl;
    };
    chooseSource();
    const frame = requestAnimationFrame(() => {
      if (requiresGesture) offerPlay();
      else if (!document.hidden) startPlayback();
    });
    const rotate = () => {
      resumeTime.current = video.currentTime;
      chooseSource();
      if (phaseRef.current !== "manual" && !document.hidden) startPlayback();
    };
    const visibility = () => {
      if (document.hidden) {
        invalidatePlayback();
        clearLoadTimer();
        video.pause();
      } else if (phaseRef.current !== "manual") startPlayback();
    };
    portrait.addEventListener("change", rotate);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      invalidatePlayback();
      cancelAnimationFrame(frame);
      portrait.removeEventListener("change", rotate);
      document.removeEventListener("visibilitychange", visibility);
      clearLoadTimer();
      video.pause();
      video.removeAttribute("src");
      video.load();
      if (finishTimer.current !== null) clearTimeout(finishTimer.current);
      finishTimer.current = null;
    };
  }, [visible, getSnapshot, mobileVideoUrl, mobilePosterUrl, posterUrl, videoUrl, startPlayback, offerPlay, clearLoadTimer, invalidatePlayback]);

  useEffect(() => {
    if (!visible) return;
    const content = contentRef.current;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    if (content) { content.inert = true; content.setAttribute("aria-hidden", "true"); }
    skipRef.current?.focus({ preventScroll: true });
    return () => {
      document.body.style.overflow = previousOverflow;
      if (content) { content.inert = false; content.removeAttribute("aria-hidden"); }
      if (previousFocus instanceof HTMLElement && previousFocus !== document.body && previousFocus.isConnected) previousFocus.focus({ preventScroll: true });
    };
  }, [visible]);

  return (
    <>
      {visible && (
        <div ref={dialogRef}
          className="website-intro fixed inset-0 z-[10000] grid h-dvh place-items-center overflow-hidden isolate bg-[#151309] transition-opacity duration-150 motion-reduce:transition-none print:hidden"
          style={{ opacity: leaving ? 0 : 1, pointerEvents: leaving ? "none" : undefined }}
          data-phase={phase} data-leaving={leaving} role="dialog" aria-modal="true" aria-label={stegaClean(settings.title)}
          onKeyDown={(event) => {
            if (event.key === "Escape") finish();
            if (event.key === "Tab") {
              const buttons = [...(dialogRef.current?.querySelectorAll<HTMLButtonElement>("button") || [])];
              const current = buttons.indexOf(document.activeElement as HTMLButtonElement);
              event.preventDefault();
              buttons[(current + (event.shiftKey ? -1 : 1) + buttons.length) % buttons.length]?.focus();
            }
          }}>
          <video ref={videoRef} className="absolute inset-0 size-full object-cover object-center" width={1280} height={720}
            muted playsInline preload="none" disablePictureInPicture aria-hidden="true" tabIndex={-1}
            onLoadedMetadata={() => {
              if (videoRef.current && resumeTime.current > 0) videoRef.current.currentTime = Math.min(resumeTime.current, videoRef.current.duration - 0.05);
              resumeTime.current = 0;
            }}
            onPlaying={() => {
              clearLoadTimer();
              if (finishTimer.current === null && !videoRef.current?.paused) {
                updatePhase("playing");
                skipRef.current?.focus({ preventScroll: true });
              }
            }}
            onWaiting={() => {
              if (phaseRef.current !== "manual" && !document.hidden) { clearLoadTimer(); loadTimer.current = setTimeout(offerPlay, 5000); }
            }}
            onEnded={() => finish()} onError={() => finish(false)} />
          {phase === "loading" && <p role="status" className="absolute bottom-[max(1.5rem,env(safe-area-inset-bottom))] rounded-full bg-black/65 px-4 py-2 text-sm text-white">{settings.loadingLabel}</p>}
          {phase === "manual" && (
            <button type="button" onClick={startPlayback}
              className="relative inline-flex min-h-12 cursor-pointer items-center gap-3 rounded-full border border-white/60 bg-[#014d26]/95 px-6 py-3 font-semibold text-white shadow-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-200">
              <Play size={20} aria-hidden="true" /><span>{settings.playLabel}</span>
            </button>
          )}
          <button ref={skipRef} type="button" onClick={() => finish()}
            className="absolute top-[max(1rem,env(safe-area-inset-top))] right-[max(1rem,env(safe-area-inset-right))] inline-flex min-h-11 cursor-pointer items-center gap-2.5 rounded-full border border-white/35 bg-[#11180f]/75 px-4 py-2.5 text-[clamp(0.8125rem,2.5vw,0.9375rem)] font-semibold text-[#fffdf5] shadow-lg backdrop-blur-md transition-colors hover:bg-[#014d26]/95 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-200">
            <span>{settings.skipLabel}</span><ArrowRight size={16} aria-hidden="true" />
          </button>
        </div>
      )}
      <IntroPlaybackContext value={settings.enabled && (!hydrated || pending)}><div ref={contentRef}>{children}</div></IntroPlaybackContext>
    </>
  );
}
