"use client";

import { useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { VisualEditing } from "next-sanity/visual-editing";

export default function PreviewOverlays() {
  const router = useRouter();
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const waiting = useRef<(() => void)[]>([]);
  const refresh = useCallback(() => new Promise<void>((resolve) => {
    waiting.current.push(resolve);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      router.refresh();
      waiting.current.splice(0).forEach((done) => done());
      timer.current = null;
    }, 250);
  }), [router]);
  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
    waiting.current.splice(0).forEach((done) => done());
  }, []);
  return <VisualEditing refresh={refresh} />;
}
