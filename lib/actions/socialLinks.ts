"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/requireAdmin";

export async function createSocialLink(formData: FormData) {
  await requireAdmin();
  await prisma.socialLink.create({
    data: {
      platform: formData.get("platform") as never,
      iconKey: (formData.get("iconKey") as string) || null,
      url: formData.get("url") as string,
      order: Number(formData.get("order") ?? 0),
    },
  });
  revalidatePath("/");
  redirect("/admin/social-links");
}

export async function updateSocialLink(id: string, formData: FormData) {
  await requireAdmin();
  await prisma.socialLink.update({
    where: { id },
    data: {
      platform: formData.get("platform") as never,
      iconKey: (formData.get("iconKey") as string) || null,
      url: formData.get("url") as string,
      order: Number(formData.get("order") ?? 0),
    },
  });
  revalidatePath("/");
  redirect("/admin/social-links");
}

export async function deleteSocialLink(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id") as string;
  await prisma.socialLink.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/social-links");
}
