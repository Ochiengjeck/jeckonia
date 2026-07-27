import { createBlogPost } from "@/lib/actions/blog";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { TiptapEditor } from "@/components/admin/TiptapEditor";
import { inputClass, labelClass } from "@/components/admin/formStyles";
import { ImageUploadField } from "@/components/admin/ImageUploadField";

export default function NewBlogPostPage() {
  return (
    <div className="max-w-2xl">
      <h1 className="mb-6 text-2xl font-bold text-heading">Add Blog Post</h1>
      <form action={createBlogPost} className="space-y-5 rounded-card bg-card p-6 shadow-card">
        <div>
          <label className={labelClass}>Title</label>
          <input name="title" required className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Excerpt</label>
          <textarea name="excerpt" required rows={2} className={inputClass} />
        </div>
        <ImageUploadField
          name="coverImageUrl"
          label="Cover Image"
          purpose="BLOG_COVER"
        />
        <div>
          <label className={labelClass}>Content</label>
          <TiptapEditor name="contentHtml" />
        </div>
        <div>
          <label className={labelClass}>Status</label>
          <select name="status" className={inputClass} defaultValue="DRAFT">
            <option value="DRAFT">Draft</option>
            <option value="PUBLISHED">Published</option>
          </select>
        </div>
        <SubmitButton>Create</SubmitButton>
      </form>
    </div>
  );
}
