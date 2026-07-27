"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/requireAdmin";

function readData(formData: FormData) {
  return {
    type: formData.get("type") as never,
    icon: formData.get("icon") as string,
    label: formData.get("label") as string,
    displayValue: formData.get("displayValue") as string,
    order: Number(formData.get("order") ?? 0),
  };
}

export async function createContactInfoItem(formData: FormData) {
  await requireAdmin();
  await prisma.contactInfoItem.create({ data: readData(formData) });
  revalidatePath("/");
  redirect("/admin/contact-info");
}

export async function updateContactInfoItem(id: string, formData: FormData) {
  await requireAdmin();
  await prisma.contactInfoItem.update({ where: { id }, data: readData(formData) });
  revalidatePath("/");
  redirect("/admin/contact-info");
}

export async function deleteContactInfoItem(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id") as string;
  await prisma.contactInfoItem.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/contact-info");
}
