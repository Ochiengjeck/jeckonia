import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updateService } from "@/lib/actions/services";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { inputClass, labelClass } from "@/components/admin/formStyles";

export default async function EditServicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const service = await prisma.service.findUnique({ where: { id } });
  if (!service) notFound();

  const action = updateService.bind(null, id);

  return (
    <div className="max-w-xl">
      <h1 className="mb-6 text-2xl font-bold text-heading">Edit Service</h1>
      <form action={action} className="space-y-5 rounded-card bg-card p-6 shadow-card">
        <div>
          <label className={labelClass}>Icon key (react-icons/fa6 name)</label>
          <input name="icon" required defaultValue={service.icon} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Title</label>
          <input name="title" required defaultValue={service.title} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Description</label>
          <textarea
            name="description"
            required
            rows={4}
            defaultValue={service.description}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Link Label</label>
          <input name="linkLabel" defaultValue={service.linkLabel} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Link URL</label>
          <input name="linkHref" defaultValue={service.linkHref} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Order</label>
          <input
            name="order"
            type="number"
            defaultValue={service.order}
            className={inputClass}
          />
        </div>
        <SubmitButton>Save</SubmitButton>
      </form>
    </div>
  );
}
