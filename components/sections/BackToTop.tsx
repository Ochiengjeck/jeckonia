"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/components/ui/Icon";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 100);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href="#header"
      aria-label="Back to top"
      className={`fixed right-[30px] bottom-[30px] z-[99] flex h-[50px] w-[50px] items-center justify-center rounded-full bg-primary text-white shadow-[0_4px_10px_rgba(0,0,0,0.2)] transition-all duration-300 hover:-translate-y-1 hover:bg-primary-dark ${
        visible ? "visible opacity-100" : "invisible opacity-0"
      }`}
    >
      <Icon name="FaArrowUp" />
    </a>
  );
}
