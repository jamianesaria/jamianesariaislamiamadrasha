"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function HashScrollHandler() {
  const pathname = usePathname();

  useEffect(() => {
    const scrollToTarget = () => {
      if (typeof window === "undefined") return;
      const hash = window.location.hash;
      if (!hash) return;

      const rawId = hash.replace(/^#/, "");
      if (!rawId) return;

      let attempts = 0;
      const maxAttempts = 20;

      const attemptScroll = () => {
        // Try getElementById first, then querySelector
        const el =
          document.getElementById(rawId) ||
          document.getElementById(decodeURIComponent(rawId)) ||
          document.querySelector(hash);

        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        } else if (attempts < maxAttempts) {
          attempts++;
          setTimeout(attemptScroll, 60);
        }
      };

      // Slight delay to allow React hydration/DOM render to complete
      setTimeout(attemptScroll, 80);
    };

    // Run on route change
    scrollToTarget();

    // Listen to in-page hash changes
    const onHashChange = () => {
      scrollToTarget();
    };

    window.addEventListener("hashchange", onHashChange);

    // Global click listener to handle in-page hash clicks cleanly
    const handleClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href || !href.includes("#")) return;

      const [targetPath, hashPart] = href.split("#");
      if (!hashPart) return;

      const currentPath = window.location.pathname;
      const normalizedTargetPath = targetPath === "" || targetPath === "/" ? currentPath : targetPath;

      if (normalizedTargetPath === currentPath) {
        // Same page navigation to hash
        const targetElement =
          document.getElementById(hashPart) ||
          document.getElementById(decodeURIComponent(hashPart)) ||
          document.querySelector(`#${hashPart}`);

        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    };

    document.addEventListener("click", handleClick, true);

    return () => {
      window.removeEventListener("hashchange", onHashChange);
      document.removeEventListener("click", handleClick, true);
    };
  }, [pathname]);

  return null;
}

