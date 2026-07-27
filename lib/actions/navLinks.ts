"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/requireAdmin";

function readData(formData: FormData) {
  return {
    label: formData.get("label") as string,
    anchor: formData.get("anchor") as string,
    order: Number(formData.get("order") ?? 0),
    visible: formData.get("visible") === "on",
  };
}

export async function createNavLink(formData: FormData) {
  await requireAdmin();
  await prisma.navLink.create({ data: readData(formData) });
  revalidatePath("/");
  redirect("/admin/nav-links");
}

export async function updateNavLink(id: string, formData: FormData) {
  await requireAdmin();
  await prisma.navLink.update({ where: { id }, data: readData(formData) });
  revalidatePath("/");
  redirect("/admin/nav-links");
}

export async function deleteNavLink(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id") as string;
  await prisma.navLink.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/nav-links");
}
