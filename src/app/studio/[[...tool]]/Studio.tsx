"use client";

import { NextStudio } from "next-sanity/studio/client-component";
import Script from "next/script";
import config from "@/../sanity.config";
import "@/sanity/management/management.css";

export function Studio() {
  return <>
    {/* The bridge appends to document.body; load it after hydration, not from a hoisted async script. */}
    <Script src="https://core.sanity-cdn.com/bridge.js" type="module" strategy="afterInteractive" data-sanity-core />
    <NextStudio config={config} />
  </>;
}

