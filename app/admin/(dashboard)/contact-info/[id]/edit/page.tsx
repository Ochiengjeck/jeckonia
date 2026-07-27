import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updateContactInfoItem } from "@/lib/actions/contactInfo";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { inputClass, labelClass } from "@/components/admin/formStyles";

export default async function EditContactInfoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = await prisma.contactInfoItem.findUnique({ where: { id } });
  if (!item) notFound();

  const action = updateContactInfoItem.bind(null, id);

  return (
    <div className="max-w-xl">
      <h1 className="mb-6 text-2xl font-bold text-heading">Edit Contact Info</h1>
      <form action={action} className="space-y-5 rounded-card bg-card p-6 shadow-card">
        <div>
          <label className={labelClass}>Type</label>
          <select name="type" required className={inputClass} defaultValue={item.type}>
            <option value="LOCATION">Location</option>
            <option value="EMAIL">Email</option>
            <option value="PHONE">Phone</option>
            <option value="WEBSITE">Website</option>
            <option value="CUSTOM">Custom</option>
          </select>
        </div>
        <div>
          <label className={labelClass}>Icon key (react-icons/fa6 name)</label>
          <input name="icon" required defaultValue={item.icon} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Label</label>
          <input name="label" required defaultValue={item.label} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Value</label>
          <input
            name="displayValue"
            required
            defaultValue={item.displayValue}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Order</label>
          <input
            name="order"
            type="number"
            defaultValue={item.order}
            className={inputClass}
          />
        </div>
        <SubmitButton>Save</SubmitButton>
      </form>
    </div>
  );
}
