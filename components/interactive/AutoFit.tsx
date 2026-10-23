"use client";

import { useLayoutEffect, useRef, useState, type ReactNode } from "react";

/**
 * Scales its children down (never up) so they always fit the available
 * height of the nearest parent, instead of overflowing/scrolling. Used by
 * Hero, whose content length is admin-editable and unbounded -- a CSS
 * clamp() can tune typography for realistic content but can't guarantee a
 * fit for arbitrary amounts of it; this measures and corrects for real.
 */
export function AutoFit({ children, className = "" }: { children: ReactNode; className?: string }) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [fittedHeight, setFittedHeight] = useState<number | undefined>(undefined);

  useLayoutEffect(() => {
    const content = contentRef.current;
    const parent = content?.parentElement;
    if (!content || !parent) return;

    let frame = 0;

    function fit() {
      if (!content || !parent) return;
      const style = getComputedStyle(parent);
      const availableHeight =
        parent.clientHeight - parseFloat(style.paddingTop) - parseFloat(style.paddingBottom);

      content.style.transform = "none";
      const naturalHeight = content.scrollHeight;

      const nextScale = naturalHeight > availableHeight ? availableHeight / naturalHeight : 1;
      setScale(nextScale);
      setFittedHeight(naturalHeight * nextScale);
    }

    function scheduleFit() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(fit);
    }

    fit();
    const observer = new ResizeObserver(scheduleFit);
    observer.observe(parent);
    observer.observe(content);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  return (
    <div style={{ height: fittedHeight }} className={className}>
      <div
        ref={contentRef}
        style={scale !== 1 ? { transform: `scale(${scale})`, transformOrigin: "top left" } : undefined}
      >
        {children}
      </div>
    </div>
  );
}
