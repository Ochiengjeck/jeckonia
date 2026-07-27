import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updatePortfolioItem } from "@/lib/actions/portfolio";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { inputClass, labelClass } from "@/components/admin/formStyles";
import { ImageUploadField } from "@/components/admin/ImageUploadField";

export default async function EditPortfolioItemPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [item, categories] = await Promise.all([
    prisma.portfolioItem.findUnique({ where: { id } }),
    prisma.portfolioCategory.findMany({ orderBy: { order: "asc" } }),
  ]);
  if (!item) notFound();

  const action = updatePortfolioItem.bind(null, id);

  return (
    <div className="max-w-xl">
      <h1 className="mb-6 text-2xl font-bold text-heading">Edit Portfolio Item</h1>
      <form action={action} className="space-y-5 rounded-card bg-card p-6 shadow-card">
        <div>
          <label className={labelClass}>Title</label>
          <input name="title" required defaultValue={item.title} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Description</label>
          <textarea
            name="description"
            required
            rows={3}
            defaultValue={item.description}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Category</label>
          <select name="categoryId" required className={inputClass} defaultValue={item.categoryId}>
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
          defaultValue={item.thumbnailImageUrl}
          purpose="PORTFOLIO_THUMB"
        />
        <ImageUploadField
          name="fullImageUrl"
          label="Full-size Image (lightbox)"
          defaultValue={item.fullImageUrl}
          purpose="PORTFOLIO_FULL"
        />
        <div>
          <label className={labelClass}>External Link</label>
          <input
            name="externalLink"
            defaultValue={item.externalLink ?? ""}
            className={inputClass}
          />
        </div>
        <label className="flex items-center gap-2 text-sm text-text">
          <input type="checkbox" name="featured" defaultChecked={item.featured} /> Featured
        </label>
        <div>
          <label className={labelClass}>Order</label>
          <input name="order" type="number" defaultValue={item.order} className={inputClass} />
        </div>
        <SubmitButton>Save</SubmitButton>
      </form>
    </div>
  );
}
