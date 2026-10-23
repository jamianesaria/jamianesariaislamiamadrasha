"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import CustomScrollbar from "./CustomScrollbar";
import HashScrollHandler from "./HashScrollHandler";

export default function WebsiteRuntime({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (pathname === "/studio" || pathname.startsWith("/studio/")) return null;
  return <><CustomScrollbar /><HashScrollHandler />{children}</>;
}
