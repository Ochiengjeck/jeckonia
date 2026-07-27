import { createSkill } from "@/lib/actions/skills";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { inputClass, labelClass } from "@/components/admin/formStyles";

export default function NewSkillPage() {
  return (
    <div className="max-w-xl">
      <h1 className="mb-6 text-2xl font-bold text-heading">Add Skill</h1>
      <form action={createSkill} className="space-y-5 rounded-card bg-card p-6 shadow-card">
        <div>
          <label className={labelClass}>Name</label>
          <input name="name" required className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Category</label>
          <select name="category" required className={inputClass} defaultValue="TECHNICAL">
            <option value="TECHNICAL">Technical</option>
            <option value="PROFESSIONAL">Professional</option>
          </select>
        </div>
        <div>
          <label className={labelClass}>Percent (leave blank for icon-only badge)</label>
          <input name="percent" type="number" min={0} max={100} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Icon URL (leave blank for bar-only)</label>
          <input name="iconUrl" placeholder="/icons/flutter.svg" className={inputClass} />
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
