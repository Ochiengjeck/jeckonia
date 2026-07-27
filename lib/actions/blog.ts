"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import DOMPurify from "isomorphic-dompurify";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/requireAdmin";

function slugify(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function readData(formData: FormData) {
  const status = formData.get("status") as "DRAFT" | "PUBLISHED";
  return {
    title: formData.get("title") as string,
    excerpt: formData.get("excerpt") as string,
    contentHtml: DOMPurify.sanitize(formData.get("contentHtml") as string),
    coverImageUrl: (formData.get("coverImageUrl") as string) || null,
    status,
    publishedAt: status === "PUBLISHED" ? new Date() : null,
  };
}

export async function createBlogPost(formData: FormData) {
  await requireAdmin();
  const title = formData.get("title") as string;
  const slug = slugify(title);
  await prisma.blogPost.create({ data: { ...readData(formData), slug } });
  revalidatePath("/");
  revalidatePath("/blog");
  redirect("/admin/blog");
}

export async function updateBlogPost(id: string, formData: FormData) {
  await requireAdmin();
  const existing = await prisma.blogPost.findUniqueOrThrow({ where: { id } });
  await prisma.blogPost.update({
    where: { id },
    data: {
      ...readData(formData),
      publishedAt:
        formData.get("status") === "PUBLISHED"
          ? (existing.publishedAt ?? new Date())
          : null,
    },
  });
  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath(`/blog/${existing.slug}`);
  redirect("/admin/blog");
}

export async function deleteBlogPost(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id") as string;
  const post = await prisma.blogPost.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath(`/blog/${post.slug}`);
  revalidatePath("/admin/blog");
}
