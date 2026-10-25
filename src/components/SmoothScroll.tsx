"use client";

import Lenis from "lenis";
import { useEffect } from "react";

/**
 * Eased, inertial scrolling for mouse wheels and trackpads. Touch screens keep their own native
 * momentum, and anyone who prefers reduced motion gets normal scrolling (Lenis is not started).
 * In-page links such as the "Types of fostering" jump bar glide to their target, leaving room for the sticky header.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.1,
      wheelMultiplier: 0.95,
      anchors: { offset: -96 },
    });
    return () => lenis.destroy();
  }, []);
  return null;
}
