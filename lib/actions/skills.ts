"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/requireAdmin";

function readData(formData: FormData) {
  const percentRaw = formData.get("percent") as string;
  const iconUrl = (formData.get("iconUrl") as string) || null;
  return {
    name: formData.get("name") as string,
    percent: percentRaw ? Number(percentRaw) : null,
    iconUrl,
    category: formData.get("category") as never,
    order: Number(formData.get("order") ?? 0),
  };
}

export async function createSkill(formData: FormData) {
  await requireAdmin();
  await prisma.skill.create({ data: readData(formData) });
  revalidatePath("/");
  redirect("/admin/skills");
}

export async function updateSkill(id: string, formData: FormData) {
  await requireAdmin();
  await prisma.skill.update({ where: { id }, data: readData(formData) });
  revalidatePath("/");
  redirect("/admin/skills");
}

export async function deleteSkill(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id") as string;
  await prisma.skill.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/skills");
}
