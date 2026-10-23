// Canonical slugs for the 8 public sections. Each value MUST match the
// `anchor` (minus "#") of the corresponding seeded NavLink row. If a future
// redesign merges/removes a section, update this file AND prisma/seed.ts's
// NavLink rows together -- not auto-derived from the DB (NavLink has no
// stable key besides the anchor string itself).
export const SECTION_IDS = {
  home: "home",
  about: "about",
  skills: "skills",
  services: "services",
  portfolio: "portfolio",
  testimonials: "testimonials",
  blog: "blog",
  contact: "contact",
} as const;
