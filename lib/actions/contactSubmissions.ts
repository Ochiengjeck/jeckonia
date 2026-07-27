"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/requireAdmin";

export async function markSubmissionRead(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id") as string;
  await prisma.contactSubmission.update({
    where: { id },
    data: { isRead: true },
  });
  revalidatePath("/admin/contact-submissions");
  revalidatePath("/admin");
}

export async function deleteSubmission(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id") as string;
  await prisma.contactSubmission.delete({ where: { id } });
  revalidatePath("/admin/contact-submissions");
  revalidatePath("/admin");
}
