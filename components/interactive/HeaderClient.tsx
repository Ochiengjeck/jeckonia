"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Icon } from "@/components/ui/Icon";

type NavLink = { id: string; label: string; anchor: string };

export function HeaderClient({ navLinks }: { navLinks: NavLink[] }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeAnchor, setActiveAnchor] = useState(navLinks[0]?.anchor ?? "");
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 100);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks
      .map((link) => document.querySelector(link.anchor))
      .filter((el): el is Element => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveAnchor(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [navLinks]);

  return (
    <header
      id="header"
      className={`fixed top-0 left-0 z-[1000] w-full py-5 transition-all duration-300 ${
        scrolled ? "bg-card py-[15px] shadow-[0_5px_20px_rgba(0,0,0,0.1)]" : ""
      }`}
    >
      <div className="container mx-auto flex max-w-[1200px] items-center justify-between px-5">
        <nav className="flex flex-grow items-center justify-end">
          <ul
            className={`items-center gap-[30px] max-md:fixed max-md:top-20 max-md:left-[-100%] max-md:z-[999] max-md:flex max-md:h-[calc(100vh-80px)] max-md:w-full max-md:flex-col max-md:justify-center max-md:gap-[30px] max-md:bg-card max-md:transition-all max-md:duration-300 md:inline-flex md:gap-5 ${
              mobileOpen ? "max-md:left-0" : ""
            }`}
          >
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={link.anchor}
                  onClick={() => setMobileOpen(false)}
                  className={`relative pb-1 font-medium transition-colors duration-300 hover:text-primary ${
                    activeAnchor === link.anchor ? "text-primary" : "text-text"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <button
            aria-label="Toggle menu"
            onClick={() => setMobileOpen((v) => !v)}
            className="ml-4 hidden text-2xl text-text max-md:block"
          >
            <Icon name={mobileOpen ? "FaXmark" : "FaBars"} />
          </button>
        </nav>
        <button
          aria-label="Toggle theme"
          onClick={() => setTheme(mounted && theme === "dark" ? "light" : "dark")}
          className="relative ml-5 h-[30px] w-[60px] cursor-pointer rounded-full bg-card shadow-card"
        >
          <span
            className={`absolute top-[3px] h-6 w-6 rounded-full bg-primary transition-all duration-300 ${
              mounted && theme === "dark" ? "left-[33px]" : "left-[3px]"
            }`}
          />
          <Icon
            name="FaSun"
            className="absolute top-1/2 left-2 -translate-y-1/2 text-sm text-text"
          />
          <Icon
            name="FaMoon"
            className="absolute top-1/2 right-2 -translate-y-1/2 text-sm text-text"
          />
        </button>
      </div>
    </header>
  );
}
