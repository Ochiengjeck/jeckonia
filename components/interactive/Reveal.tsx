"use client";

import type { ReactNode } from "react";
import { useInView } from "./useInView";

const variants = {
  "fade-up": "translate-y-8",
  "fade-left": "translate-x-8",
  "fade-right": "-translate-x-8",
  "fade-in": "",
} as const;

export function Reveal({
  children,
  variant = "fade-up",
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  variant?: keyof typeof variants;
  delay?: number;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${
        inView
          ? "translate-x-0 translate-y-0 opacity-100"
          : `opacity-0 ${variants[variant]}`
      } ${className}`}
    >
      {children}
    </div>
  );
}
