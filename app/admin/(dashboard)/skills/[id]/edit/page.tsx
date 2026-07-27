import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updateSkill } from "@/lib/actions/skills";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { inputClass, labelClass } from "@/components/admin/formStyles";

export default async function EditSkillPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const skill = await prisma.skill.findUnique({ where: { id } });
  if (!skill) notFound();

  const action = updateSkill.bind(null, id);

  return (
    <div className="max-w-xl">
      <h1 className="mb-6 text-2xl font-bold text-heading">Edit Skill</h1>
      <form action={action} className="space-y-5 rounded-card bg-card p-6 shadow-card">
        <div>
          <label className={labelClass}>Name</label>
          <input name="name" required defaultValue={skill.name} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Category</label>
          <select name="category" required className={inputClass} defaultValue={skill.category}>
            <option value="TECHNICAL">Technical</option>
            <option value="PROFESSIONAL">Professional</option>
          </select>
        </div>
        <div>
          <label className={labelClass}>Percent (leave blank for icon-only badge)</label>
          <input
            name="percent"
            type="number"
            min={0}
            max={100}
            defaultValue={skill.percent ?? ""}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Icon URL (leave blank for bar-only)</label>
          <input
            name="iconUrl"
            defaultValue={skill.iconUrl ?? ""}
            placeholder="/icons/flutter.svg"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Order</label>
          <input
            name="order"
            type="number"
            defaultValue={skill.order}
            className={inputClass}
          />
        </div>
        <SubmitButton>Save</SubmitButton>
      </form>
    </div>
  );
}
