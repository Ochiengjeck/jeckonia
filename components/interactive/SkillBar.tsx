"use client";

import { useInView, usePrefersReducedMotion } from "./useInView";

export function SkillBar({ name, percent }: { name: string; percent: number }) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const reducedMotion = usePrefersReducedMotion();

  return (
    <div className="mb-6" ref={ref}>
      <div className="mb-2.5 flex justify-between">
        <span className="text-base text-foreground">{name}</span>
        <span className="font-mono text-sm text-accent">{percent}%</span>
      </div>
      <div className="h-px w-full bg-muted-border">
        <div
          className={`h-px bg-accent ${reducedMotion ? "" : "transition-[width] duration-[1500ms] ease-in-out"}`}
          style={{ width: inView || reducedMotion ? `${percent}%` : "0%" }}
        />
      </div>
    </div>
  );
}
