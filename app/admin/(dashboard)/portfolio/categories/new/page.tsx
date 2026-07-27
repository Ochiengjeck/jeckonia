import { createPortfolioCategory } from "@/lib/actions/portfolio";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { inputClass, labelClass } from "@/components/admin/formStyles";

export default function NewPortfolioCategoryPage() {
  return (
    <div className="max-w-xl">
      <h1 className="mb-6 text-2xl font-bold text-heading">Add Category</h1>
      <form
        action={createPortfolioCategory}
        className="space-y-5 rounded-card bg-card p-6 shadow-card"
      >
        <div>
          <label className={labelClass}>Key (used for filtering, e.g. "web")</label>
          <input name="key" required className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Label</label>
          <input name="label" required className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Order</label>
          <input name="order" type="number" defaultValue={0} className={inputClass} />
        </div>
        <SubmitButton>Create</SubmitButton>
      </form>
    </div>
  );
}
