"use client";

import { useEffect, useState, useRef, useCallback } from "react";

export default function CustomScrollbar() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Calculate scroll percentage and trigger auto-hide timer
  const handleScroll = useCallback(() => {
    if (isDragging) return;

    // Show scrollbar while scrolling
    setIsScrolling(true);

    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    // Hide scrollbar 1.2s after user stops scrolling
    scrollTimeoutRef.current = setTimeout(() => {
      setIsScrolling(false);
    }, 1200);

    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    const maxScroll = scrollHeight - clientHeight;
    if (maxScroll <= 0) {
      setScrollProgress(0);
      return;
    }
    const currentProgress = (scrollTop / maxScroll) * 100;
    setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
  }, [isDragging]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [handleScroll]);

  // Scroll to position based on click or drag Y coordinate
  const scrollToPosition = useCallback((clientY: number) => {
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
      behavior: isDragging ? "auto" : "smooth",
    });

    setScrollProgress(percentage * 100);
  }, [isDragging]);

  // Handle Track Click
  const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    scrollToPosition(e.clientY);
  };

  // Handle Dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);

    const onMouseMove = (moveEvent: MouseEvent) => {
      scrollToPosition(moveEvent.clientY);
    };

    const onMouseUp = () => {
      setIsDragging(false);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);

      // Start fade out timer after drag release
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 1200);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  // Bengali number formatter for tooltip
  const toBengaliNumber = (num: number) =>
    Math.round(num)
      .toString()
      .replace(/\d/g, (d) => "০১২৩৪৫৬৭৮৯"[parseInt(d)]);

  // Clamp thumb position so it doesn't overflow top or bottom bounds
  const thumbOffset = `calc(${scrollProgress}% - ${scrollProgress * 0.3}px)`;

  // Only visible when actively scrolling, dragging, or hovering near it
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

      {/* Maroon Scroll Progress Line (comes from up to below as you scroll down, and below to up as you scroll up) */}
      <div
        className="absolute top-2 w-[4px] rounded-full transition-[height] duration-75 ease-out"
        style={{
          height: `calc(${scrollProgress}% - 8px)`,
          maxHeight: "calc(100% - 16px)",
          background: "linear-gradient(to bottom, #6E0B13, #8B111A, #A81B26)",
          boxShadow: isHovering || isDragging ? "0 0 8px rgba(139, 17, 26, 0.5)" : "none",
        }}
      />

      {/* 📖 Emoji Thumb Indicator */}
      <div
        onMouseDown={handleMouseDown}
        className={`absolute z-10 flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white border-2 border-[#8B111A] shadow-md transition-transform duration-75 ${
          isDragging
            ? "scale-125 cursor-grabbing shadow-xl ring-2 ring-[#8B111A]/40"
            : "hover:scale-120 cursor-grab"
        }`}
        style={{
          top: thumbOffset,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Book Emoji */}
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
            <span>{toBengaliNumber(scrollProgress)}%</span>
          </span>
          {/* Arrow */}
          <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-0 h-0 border-y-4 border-y-transparent border-l-4 border-l-[#8B111A]" />
        </div>
      </div>
    </div>
  );
}
