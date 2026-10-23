"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { usePrefersReducedMotion } from "@/components/interactive/useInView";

export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 100);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" })}
      aria-label="Back to top"
      className={`group fixed right-[30px] bottom-[30px] z-[99] flex h-[50px] w-[50px] items-center justify-center bg-accent text-background transition-all duration-300 hover:-translate-y-1 hover:bg-accent-dark ${
        visible ? "visible opacity-100" : "invisible opacity-0"
      }`}
    >
      <Icon name="FaArrowUp" className="transition-transform duration-300 group-hover:-translate-y-0.5" />
    </button>
  );
}
