"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/requireAdmin";

function readData(formData: FormData) {
  return {
    quote: formData.get("quote") as string,
    authorName: formData.get("authorName") as string,
    authorRole: formData.get("authorRole") as string,
    authorImageUrl: formData.get("authorImageUrl") as string,
    order: Number(formData.get("order") ?? 0),
  };
}

export async function createTestimonial(formData: FormData) {
  await requireAdmin();
  await prisma.testimonial.create({ data: readData(formData) });
  revalidatePath("/");
  redirect("/admin/testimonials");
}

export async function updateTestimonial(id: string, formData: FormData) {
  await requireAdmin();
  await prisma.testimonial.update({ where: { id }, data: readData(formData) });
  revalidatePath("/");
  redirect("/admin/testimonials");
}

export async function deleteTestimonial(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id") as string;
  await prisma.testimonial.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/testimonials");
}
