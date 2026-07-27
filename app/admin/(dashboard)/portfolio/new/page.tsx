import { prisma } from "@/lib/prisma";
import { createPortfolioItem } from "@/lib/actions/portfolio";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { inputClass, labelClass } from "@/components/admin/formStyles";
import { ImageUploadField } from "@/components/admin/ImageUploadField";

export default async function NewPortfolioItemPage() {
  const categories = await prisma.portfolioCategory.findMany({ orderBy: { order: "asc" } });

  return (
    <div className="max-w-xl">
      <h1 className="mb-6 text-2xl font-bold text-heading">Add Portfolio Item</h1>
      <form action={createPortfolioItem} className="space-y-5 rounded-card bg-card p-6 shadow-card">
        <div>
          <label className={labelClass}>Title</label>
          <input name="title" required className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Description</label>
          <textarea name="description" required rows={3} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Category</label>
          <select name="categoryId" required className={inputClass}>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.label}
              </option>
            ))}
          </select>
        </div>
        <ImageUploadField
          name="thumbnailImageUrl"
          label="Thumbnail Image"
          purpose="PORTFOLIO_THUMB"
        />
        <ImageUploadField
          name="fullImageUrl"
          label="Full-size Image (lightbox)"
          purpose="PORTFOLIO_FULL"
        />
        <div>
          <label className={labelClass}>External Link</label>
          <input name="externalLink" placeholder="#" className={inputClass} />
        </div>
        <label className="flex items-center gap-2 text-sm text-text">
          <input type="checkbox" name="featured" /> Featured
        </label>
        <div>
          <label className={labelClass}>Order</label>
          <input name="order" type="number" defaultValue={0} className={inputClass} />
        </div>
        <SubmitButton>Create</SubmitButton>
      </form>
    </div>
  );
}
