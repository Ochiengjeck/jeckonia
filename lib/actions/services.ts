"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/requireAdmin";

function readData(formData: FormData) {
  return {
    icon: formData.get("icon") as string,
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    linkLabel: (formData.get("linkLabel") as string) || "Learn More",
    linkHref: (formData.get("linkHref") as string) || "#",
    order: Number(formData.get("order") ?? 0),
  };
}

export async function createService(formData: FormData) {
  await requireAdmin();
  await prisma.service.create({ data: readData(formData) });
  revalidatePath("/");
  redirect("/admin/services");
}

export async function updateService(id: string, formData: FormData) {
  await requireAdmin();
  await prisma.service.update({ where: { id }, data: readData(formData) });
  revalidatePath("/");
  redirect("/admin/services");
}

export async function deleteService(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id") as string;
  await prisma.service.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/services");
}
