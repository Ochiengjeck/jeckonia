"use client";

import { useInView } from "./useInView";

export function SkillBar({ name, percent }: { name: string; percent: number }) {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div className="mb-[25px]" ref={ref}>
      <div className="mb-2.5 flex justify-between">
        <span className="text-base font-medium text-heading">{name}</span>
        <span className="text-base font-medium text-primary">{percent}%</span>
      </div>
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-background">
        <div
          className="h-full rounded-full bg-primary transition-[width] duration-[1500ms] ease-in-out"
          style={{ width: inView ? `${percent}%` : "0%" }}
        />
      </div>
    </div>
  );
}
