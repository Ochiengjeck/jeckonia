import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updatePortfolioCategory } from "@/lib/actions/portfolio";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { inputClass, labelClass } from "@/components/admin/formStyles";

export default async function EditPortfolioCategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const category = await prisma.portfolioCategory.findUnique({ where: { id } });
  if (!category) notFound();

  const action = updatePortfolioCategory.bind(null, id);

  return (
    <div className="max-w-xl">
      <h1 className="mb-6 text-2xl font-bold text-heading">Edit Category</h1>
      <form action={action} className="space-y-5 rounded-card bg-card p-6 shadow-card">
        <div>
          <label className={labelClass}>Key</label>
          <input name="key" required defaultValue={category.key} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Label</label>
          <input name="label" required defaultValue={category.label} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Order</label>
          <input
            name="order"
            type="number"
            defaultValue={category.order}
            className={inputClass}
          />
        </div>
        <SubmitButton>Save</SubmitButton>
      </form>
    </div>
  );
}
