import { cache } from "react";
import { prisma } from "@/lib/prisma";

export const getSiteSettings = cache(async () => {
  return prisma.siteSettings.findUnique({ where: { id: "singleton" } });
});

export const getProfile = cache(async () => {
  return prisma.profile.findUnique({
    where: { id: "singleton" },
    include: {
      ctaButtons: { orderBy: { order: "asc" } },
      experienceStats: { orderBy: { order: "asc" } },
    },
  });
});

export const getSocialLinks = cache(async () => {
  return prisma.socialLink.findMany({ orderBy: { order: "asc" } });
});

export const getNavLinks = cache(async () => {
  return prisma.navLink.findMany({
    where: { visible: true },
    orderBy: { order: "asc" },
  });
});

export async function getSkills() {
  const skills = await prisma.skill.findMany({ orderBy: { order: "asc" } });
  return {
    technical: skills.filter((s) => s.category === "TECHNICAL" && s.percent !== null),
    techIcons: skills.filter((s) => s.category === "TECHNICAL" && s.iconUrl !== null),
    professional: skills.filter((s) => s.category === "PROFESSIONAL"),
  };
}

export const getServices = cache(async () => {
  return prisma.service.findMany({ orderBy: { order: "asc" } });
});

export async function getPortfolio() {
  const [categories, items] = await Promise.all([
    prisma.portfolioCategory.findMany({ orderBy: { order: "asc" } }),
    prisma.portfolioItem.findMany({
      orderBy: { order: "asc" },
      include: { category: true },
    }),
  ]);
  return { categories, items };
}

export async function getTestimonials() {
  return prisma.testimonial.findMany({ orderBy: { order: "asc" } });
}

export async function getPublishedBlogPosts(limit?: number) {
  return prisma.blogPost.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { publishedAt: "desc" },
    take: limit,
  });
}

export async function getBlogPostBySlug(slug: string) {
  return prisma.blogPost.findFirst({ where: { slug, status: "PUBLISHED" } });
}

export async function getContactInfo() {
  return prisma.contactInfoItem.findMany({ orderBy: { order: "asc" } });
}

export function contactHref(item: { type: string; displayValue: string }) {
  switch (item.type) {
    case "EMAIL":
      return `mailto:${item.displayValue}`;
    case "PHONE":
      return `tel:${item.displayValue.replace(/[^+\d]/g, "")}`;
    case "WEBSITE":
      return item.displayValue.startsWith("http")
        ? item.displayValue
        : `https://${item.displayValue}`;
    default:
      return undefined;
  }
}
