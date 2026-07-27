"use client";

import { useEffect, useRef } from "react";

export function BackgroundAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const spans: HTMLSpanElement[] = [];
    for (let i = 0; i < 20; i++) {
      const span = document.createElement("span");
      const size = Math.random() * 30 + 5;
      span.style.width = `${size}px`;
      span.style.height = `${size}px`;
      span.style.top = `${Math.random() * 100}%`;
      span.style.left = `${Math.random() * 100}%`;
      span.style.animationDelay = `${Math.random() * 20}s`;
      span.style.animationDuration = `${Math.random() * 10 + 10}s`;
      container.appendChild(span);
      spans.push(span);
    }

    return () => {
      spans.forEach((span) => span.remove());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden [&>span]:absolute [&>span]:block [&>span]:animate-[bg-float_10s_linear_infinite] [&>span]:rounded-full [&>span]:bg-primary/10"
    />
  );
}
