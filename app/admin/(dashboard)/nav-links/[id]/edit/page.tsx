import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updateNavLink } from "@/lib/actions/navLinks";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { inputClass, labelClass } from "@/components/admin/formStyles";

export default async function EditNavLinkPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const link = await prisma.navLink.findUnique({ where: { id } });
  if (!link) notFound();

  const action = updateNavLink.bind(null, id);

  return (
    <div className="max-w-xl">
      <h1 className="mb-6 text-2xl font-bold text-heading">Edit Nav Link</h1>
      <form action={action} className="space-y-5 rounded-card bg-card p-6 shadow-card">
        <div>
          <label className={labelClass}>Label</label>
          <input name="label" required defaultValue={link.label} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Anchor</label>
          <input name="anchor" required defaultValue={link.anchor} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Order</label>
          <input
            name="order"
            type="number"
            defaultValue={link.order}
            className={inputClass}
          />
        </div>
        <label className="flex items-center gap-2 text-sm text-text">
          <input type="checkbox" name="visible" defaultChecked={link.visible} /> Visible
        </label>
        <SubmitButton>Save</SubmitButton>
      </form>
    </div>
  );
}
