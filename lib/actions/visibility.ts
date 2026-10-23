"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/requireAdmin";

const SECTION_ANCHORS = [
  "about",
  "skills",
  "services",
  "portfolio",
  "testimonials",
  "blog",
  "contact",
] as const;

export async function updateVisibility(formData: FormData) {
  await requireAdmin();

  await Promise.all(
    SECTION_ANCHORS.map((slug) =>
      prisma.navLink.updateMany({
        where: { anchor: `#${slug}` },
        data: { visible: formData.get(`section_${slug}`) === "on" },
      })
    )
  );

  await prisma.profile.update({
    where: { id: "singleton" },
    data: {
      showHeroImage: formData.get("showHeroImage") === "on",
      showExperienceStats: formData.get("showExperienceStats") === "on",
      showAboutImage: formData.get("showAboutImage") === "on",
      showCvButton: formData.get("showCvButton") === "on",
    },
  });

  await prisma.siteSettings.update({
    where: { id: "singleton" },
    data: {
      showSocialLinks: formData.get("showSocialLinks") === "on",
      showTechIcons: formData.get("showTechIcons") === "on",
      showNewsletter: formData.get("showNewsletter") === "on",
    },
  });

  revalidatePath("/");
  revalidatePath("/admin/visibility");
  revalidatePath("/admin/profile");
  revalidatePath("/admin/site-settings");
  revalidatePath("/admin/nav-links");
  redirect("/admin/visibility");
}
