"use client";

import { useEffect, useState, useRef, useCallback } from "react";

const BENGALI_DIGITS = "০১২৩৪৫৬৭৮৯";
const toBengaliNumber = (num: number) =>
  Math.round(num)
    .toString()
    .replace(/\d/g, (d) => BENGALI_DIGITS[parseInt(d, 10)]);

export default function CustomScrollbar() {
  const [isScrolling, setIsScrolling] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const trackRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const tooltipTextRef = useRef<HTMLSpanElement>(null);

  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rafIdRef = useRef<number | null>(null);
  const isScrollingRef = useRef(false);
  const isDraggingRef = useRef(false);

  const applyProgressToDom = useCallback((progress: number) => {
    const clamped = Math.min(100, Math.max(0, progress));
    if (progressBarRef.current) {
      progressBarRef.current.style.height = `calc(${clamped}% - 8px)`;
    }
    if (thumbRef.current) {
      thumbRef.current.style.top = `calc(${clamped}% - ${clamped * 0.3}px)`;
    }
    if (tooltipTextRef.current) {
      tooltipTextRef.current.textContent = `${toBengaliNumber(clamped)}%`;
    }
  }, []);

  const updateScrollFromWindow = useCallback(() => {
    rafIdRef.current = null;
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    const maxScroll = scrollHeight - clientHeight;
    const currentProgress = maxScroll <= 0 ? 0 : (scrollTop / maxScroll) * 100;
    applyProgressToDom(currentProgress);
  }, [applyProgressToDom]);

  const handleScroll = useCallback(() => {
    if (isDraggingRef.current) return;

    if (!isScrollingRef.current) {
      isScrollingRef.current = true;
      setIsScrolling(true);
    }

    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    scrollTimeoutRef.current = setTimeout(() => {
      isScrollingRef.current = false;
      setIsScrolling(false);
    }, 1200);

    if (rafIdRef.current === null) {
      rafIdRef.current = window.requestAnimationFrame(updateScrollFromWindow);
    }
  }, [updateScrollFromWindow]);

  useEffect(() => {
    updateScrollFromWindow();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      if (rafIdRef.current !== null) {
        window.cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [handleScroll, updateScrollFromWindow]);

  const scrollToPosition = useCallback(
    (clientY: number, dragging: boolean) => {
      if (!trackRef.current) return;
      const rect = trackRef.current.getBoundingClientRect();
      const trackHeight = rect.height;
      const clickY = clientY - rect.top;
      const percentage = Math.min(1, Math.max(0, clickY / trackHeight));

      const { scrollHeight, clientHeight } = document.documentElement;
      const maxScroll = scrollHeight - clientHeight;
      const targetScrollTop = percentage * maxScroll;

      window.scrollTo({
        top: targetScrollTop,
        behavior: dragging ? "auto" : "smooth",
      });

      applyProgressToDom(percentage * 100);
    },
    [applyProgressToDom]
  );

  const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    scrollToPosition(e.clientY, isDraggingRef.current);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    isDraggingRef.current = true;
    setIsDragging(true);

    const onMouseMove = (moveEvent: MouseEvent) => {
      scrollToPosition(moveEvent.clientY, true);
    };

    const onMouseUp = () => {
      isDraggingRef.current = false;
      setIsDragging(false);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);

      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      scrollTimeoutRef.current = setTimeout(() => {
        isScrollingRef.current = false;
        setIsScrolling(false);
      }, 1200);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  const isVisible = isScrolling || isDragging || isHovering;

  return (
    <div
      ref={trackRef}
      onClick={handleTrackClick}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className={`fixed right-0 top-0 bottom-0 z-50 w-6 sm:w-7 flex items-center justify-center cursor-pointer select-none transition-all duration-300 ${
        isVisible
          ? "opacity-100 pointer-events-auto translate-x-0"
          : "opacity-0 pointer-events-none translate-x-2"
      }`}
      title="পৃষ্ঠা স্ক্রলবার"
      aria-label="পৃষ্ঠা স্ক্রলবার"
    >
      {/* Background Track Guide Line */}
      <div className="absolute top-2 bottom-2 w-[4px] bg-gray-300/40 group-hover:bg-gray-300/70 transition-colors rounded-full" />

      {/* Maroon Scroll Progress Line */}
      <div
        ref={progressBarRef}
        className="absolute top-2 w-[4px] rounded-full transition-[height] duration-75 ease-out"
        style={{
          height: "0px",
          maxHeight: "calc(100% - 16px)",
          background: "linear-gradient(to bottom, #6E0B13, #8B111A, #A81B26)",
          boxShadow: isHovering || isDragging ? "0 0 8px rgba(139, 17, 26, 0.5)" : "none",
        }}
      />

      {/* 📖 Emoji Thumb Indicator */}
      <div
        ref={thumbRef}
        onMouseDown={handleMouseDown}
        className={`absolute z-10 flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white border-2 border-[#8B111A] shadow-md transition-transform duration-75 ${
          isDragging
            ? "scale-125 cursor-grabbing shadow-xl ring-2 ring-[#8B111A]/40"
            : "hover:scale-120 cursor-grab"
        }`}
        style={{
          top: "0%",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <span className="text-sm sm:text-base leading-none select-none transition-transform group-hover:scale-105">
          📖
        </span>

        {/* Floating Tooltip displaying scroll percentage in Bengali */}
        <div
          className={`absolute right-9 px-2 py-1 bg-[#8B111A] text-white text-[11px] font-bold rounded-md shadow-lg whitespace-nowrap pointer-events-none transition-all duration-200 ${
            isHovering || isDragging
              ? "opacity-100 translate-x-0"
              : "opacity-0 translate-x-2"
          }`}
        >
          <span className="flex items-center gap-1">
            <span>স্ক্রল:</span>
            <span ref={tooltipTextRef}>০%</span>
          </span>
          <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-0 h-0 border-y-4 border-y-transparent border-l-4 border-l-[#8B111A]" />
        </div>
      </div>
    </div>
  );
}
