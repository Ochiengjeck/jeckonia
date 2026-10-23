"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/components/ui/Icon";

type NavLink = { id: string; label: string; anchor: string };

export function HeaderClient({
  navLinks,
  siteName,
}: {
  navLinks: NavLink[];
  siteName: string;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeAnchor, setActiveAnchor] = useState(navLinks[0]?.anchor ?? "");

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
      className={`fixed top-0 left-0 z-[1000] w-full py-5 transition-colors duration-300 ${
        scrolled ? "bg-background/95 py-[15px] backdrop-blur border-b border-muted-border" : ""
      }`}
    >
      <div className="container mx-auto flex max-w-[1200px] items-center justify-between px-5">
        <a href="#home" className="font-mono text-sm tracking-widest text-foreground uppercase">
          {siteName}
        </a>
        <nav className="flex flex-grow items-center justify-end">
          <ul
            className={`items-center gap-10 max-md:fixed max-md:top-20 max-md:left-[-100%] max-md:z-[999] max-md:flex max-md:h-[calc(100vh-80px)] max-md:w-full max-md:flex-col max-md:justify-center max-md:gap-10 max-md:bg-background max-md:transition-all max-md:duration-300 md:inline-flex ${
              mobileOpen ? "max-md:left-0" : ""
            }`}
          >
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={link.anchor}
                  onClick={() => setMobileOpen(false)}
                  className={`border-b-2 pb-1 font-mono text-xs uppercase tracking-widest transition-colors duration-300 hover:text-foreground max-md:text-h3 max-md:tracking-normal ${
                    activeAnchor === link.anchor
                      ? "border-accent text-foreground"
                      : "border-transparent text-text/70"
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
            className="ml-4 hidden text-2xl text-foreground max-md:block"
          >
            <Icon name={mobileOpen ? "FaXmark" : "FaBars"} />
          </button>
        </nav>
      </div>
    </header>
  );
}
