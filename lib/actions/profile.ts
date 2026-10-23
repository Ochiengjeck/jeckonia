"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/requireAdmin";

const CTA_SLOTS = 4;
const STAT_SLOTS = 4;

export async function updateProfile(formData: FormData) {
  await requireAdmin();

  const data = {
    greeting: formData.get("greeting") as string,
    name: formData.get("name") as string,
    jobTitle: formData.get("jobTitle") as string,
    heroDescription: formData.get("heroDescription") as string,
    heroImageUrl: (formData.get("heroImageUrl") as string) || null,
    aboutSectionTitle: formData.get("aboutSectionTitle") as string,
    aboutSectionSubtitle: formData.get("aboutSectionSubtitle") as string,
    aboutImageUrl: (formData.get("aboutImageUrl") as string) || null,
    aboutHeading: formData.get("aboutHeading") as string,
    aboutBioHtml: formData.get("aboutBioHtml") as string,
    email: formData.get("email") as string,
    phone: formData.get("phone") as string,
    location: formData.get("location") as string,
    availabilityText: formData.get("availabilityText") as string,
    cvFileUrl: (formData.get("cvFileUrl") as string) || null,
    showHeroImage: formData.get("showHeroImage") === "on",
    showExperienceStats: formData.get("showExperienceStats") === "on",
    showAboutImage: formData.get("showAboutImage") === "on",
    showCvButton: formData.get("showCvButton") === "on",
  };

  await prisma.profile.upsert({
    where: { id: "singleton" },
    update: data,
    create: { id: "singleton", ...data },
  });

  await prisma.heroCtaButton.deleteMany({ where: { profileId: "singleton" } });
  const ctaCreates = [];
  for (let i = 0; i < CTA_SLOTS; i++) {
    const label = formData.get(`cta${i}Label`) as string;
    const href = formData.get(`cta${i}Href`) as string;
    if (!label || !href) continue;
    ctaCreates.push({
      profileId: "singleton",
      label,
      href,
      style: (formData.get(`cta${i}Style`) as never) ?? "PRIMARY",
      order: i,
    });
  }
  if (ctaCreates.length) {
    await prisma.heroCtaButton.createMany({ data: ctaCreates });
  }

  await prisma.experienceStat.deleteMany({ where: { profileId: "singleton" } });
  const statCreates = [];
  for (let i = 0; i < STAT_SLOTS; i++) {
    const number = formData.get(`stat${i}Number`) as string;
    const label = formData.get(`stat${i}Label`) as string;
    if (!number || !label) continue;
    statCreates.push({ profileId: "singleton", number, label, order: i });
  }
  if (statCreates.length) {
    await prisma.experienceStat.createMany({ data: statCreates });
  }

  revalidatePath("/");
  revalidatePath("/admin/profile");
  redirect("/admin/profile");
}
