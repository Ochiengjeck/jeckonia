"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/requireAdmin";

function readItemData(formData: FormData) {
  return {
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    categoryId: formData.get("categoryId") as string,
    thumbnailImageUrl: formData.get("thumbnailImageUrl") as string,
    fullImageUrl: formData.get("fullImageUrl") as string,
    externalLink: (formData.get("externalLink") as string) || null,
    featured: formData.get("featured") === "on",
    order: Number(formData.get("order") ?? 0),
  };
}

export async function createPortfolioItem(formData: FormData) {
  await requireAdmin();
  await prisma.portfolioItem.create({ data: readItemData(formData) });
  revalidatePath("/");
  redirect("/admin/portfolio");
}

export async function updatePortfolioItem(id: string, formData: FormData) {
  await requireAdmin();
  await prisma.portfolioItem.update({ where: { id }, data: readItemData(formData) });
  revalidatePath("/");
  redirect("/admin/portfolio");
}

export async function deletePortfolioItem(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id") as string;
  await prisma.portfolioItem.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/portfolio");
}

function readCategoryData(formData: FormData) {
  return {
    key: formData.get("key") as string,
    label: formData.get("label") as string,
    order: Number(formData.get("order") ?? 0),
  };
}

export async function createPortfolioCategory(formData: FormData) {
  await requireAdmin();
  await prisma.portfolioCategory.create({ data: readCategoryData(formData) });
  revalidatePath("/");
  redirect("/admin/portfolio/categories");
}

export async function updatePortfolioCategory(id: string, formData: FormData) {
  await requireAdmin();
  await prisma.portfolioCategory.update({ where: { id }, data: readCategoryData(formData) });
  revalidatePath("/");
  redirect("/admin/portfolio/categories");
}

export async function deletePortfolioCategory(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id") as string;
  await prisma.portfolioCategory.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/portfolio/categories");
}
