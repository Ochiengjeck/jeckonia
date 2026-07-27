"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/requireAdmin";

export async function deleteSubscriber(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id") as string;
  await prisma.newsletterSubscriber.delete({ where: { id } });
  revalidatePath("/admin/newsletter");
  revalidatePath("/admin");
}
