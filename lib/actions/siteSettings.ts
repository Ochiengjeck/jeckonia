"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/requireAdmin";

export async function updateSiteSettings(formData: FormData) {
  await requireAdmin();

  const data = {
    siteTitle: formData.get("siteTitle") as string,
    metaDescription: formData.get("metaDescription") as string,
    ogImageUrl: (formData.get("ogImageUrl") as string) || null,
    footerTagline: formData.get("footerTagline") as string,
    designerCreditText: formData.get("designerCreditText") as string,
    designerCreditUrl: (formData.get("designerCreditUrl") as string) || null,
  };

  await prisma.siteSettings.upsert({
    where: { id: "singleton" },
    update: data,
    create: { id: "singleton", ...data },
  });

  revalidatePath("/");
  revalidatePath("/admin/site-settings");
  redirect("/admin/site-settings");
}
