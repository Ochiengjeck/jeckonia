import { createNavLink } from "@/lib/actions/navLinks";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { inputClass, labelClass } from "@/components/admin/formStyles";

export default function NewNavLinkPage() {
  return (
    <div className="max-w-xl">
      <h1 className="mb-6 text-2xl font-bold text-heading">Add Nav Link</h1>
      <form action={createNavLink} className="space-y-5 rounded-card bg-card p-6 shadow-card">
        <div>
          <label className={labelClass}>Label</label>
          <input name="label" required className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Anchor</label>
          <input name="anchor" required placeholder="#about" className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Order</label>
          <input name="order" type="number" defaultValue={0} className={inputClass} />
        </div>
        <label className="flex items-center gap-2 text-sm text-text">
          <input type="checkbox" name="visible" defaultChecked /> Visible
        </label>
        <SubmitButton>Create</SubmitButton>
      </form>
    </div>
  );
}
