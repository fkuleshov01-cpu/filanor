"use client";

import { usePathname } from "next/navigation";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollProgress from "@/components/ui/scroll-progress";
import ScrollToTop from "@/components/ui/scroll-to-top";

// Désactive le chrome global filanor sur les routes mockup privées Justine.
const HIDDEN_PREFIXES = ["/justine-light", "/justine-full"];

export default function GlobalChrome() {
  const pathname = usePathname();
  const hidden = HIDDEN_PREFIXES.some((prefix) => pathname?.startsWith(prefix));

  if (hidden) return null;

  return (
    <>
      <SmoothScroll />
      <ScrollProgress />
      <ScrollToTop />
    </>
  );
}
