import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updateBlogPost } from "@/lib/actions/blog";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { TiptapEditor } from "@/components/admin/TiptapEditor";
import { inputClass, labelClass } from "@/components/admin/formStyles";
import { ImageUploadField } from "@/components/admin/ImageUploadField";

export default async function EditBlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await prisma.blogPost.findUnique({ where: { id } });
  if (!post) notFound();

  const action = updateBlogPost.bind(null, id);

  return (
    <div className="max-w-2xl">
      <h1 className="mb-6 text-2xl font-bold text-heading">Edit Blog Post</h1>
      <form action={action} className="space-y-5 rounded-card bg-card p-6 shadow-card">
        <div>
          <label className={labelClass}>Title</label>
          <input name="title" required defaultValue={post.title} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Excerpt</label>
          <textarea
            name="excerpt"
            required
            rows={2}
            defaultValue={post.excerpt}
            className={inputClass}
          />
        </div>
        <ImageUploadField
          name="coverImageUrl"
          label="Cover Image"
          defaultValue={post.coverImageUrl ?? ""}
          purpose="BLOG_COVER"
        />
        <div>
          <label className={labelClass}>Content</label>
          <TiptapEditor name="contentHtml" defaultValue={post.contentHtml} />
        </div>
        <div>
          <label className={labelClass}>Status</label>
          <select name="status" className={inputClass} defaultValue={post.status}>
            <option value="DRAFT">Draft</option>
            <option value="PUBLISHED">Published</option>
          </select>
        </div>
        <SubmitButton>Save</SubmitButton>
      </form>
    </div>
  );
}
