"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Fades content in as it scrolls into view, sliding from below by default or from a side.
 * The hidden state only applies when scripting is enabled and motion is not reduced
 * (see globals.css), so the page is always readable without JavaScript.
 */
export default function Reveal({
  children,
  delay = 0,
  className = "",
  variant = "up",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  variant?: "up" | "left" | "right" | "zoom";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      // The inline script in layout.tsx may add "is-visible" before React hydrates; that is intentional.
      suppressHydrationWarning
      data-reveal={variant}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
