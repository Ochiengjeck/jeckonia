"use client";

import { useEffect, useRef } from "react";

export function Typewriter({
  text,
  speed = 100,
}: {
  text: string;
  speed?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let i = 0;
    const timeout = setTimeout(function type() {
      el.textContent = text.slice(0, i);
      i++;
      if (i <= text.length) {
        setTimeout(type, speed);
      }
    }, 1000);
    return () => clearTimeout(timeout);
  }, [text, speed]);

  // Full text is present in server-rendered HTML for SEO; the effect above
  // clears and retypes it client-side after mount only.
  return <span ref={ref}>{text}</span>;
}
