import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteContactInfoItem } from "@/lib/actions/contactInfo";
import { DeleteButton } from "@/components/admin/DeleteButton";

export default async function ContactInfoPage() {
  const items = await prisma.contactInfoItem.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-heading">Contact Info</h1>
        <Link
          href="/admin/contact-info/new"
          className="rounded-card bg-primary px-5 py-2.5 font-medium text-white hover:bg-primary-dark"
        >
          Add New
        </Link>
      </div>
      <div className="overflow-hidden rounded-card bg-card shadow-card">
        <table className="w-full text-left text-sm">
          <thead className="bg-background text-heading">
            <tr>
              <th className="p-4">Type</th>
              <th className="p-4">Label</th>
              <th className="p-4">Value</th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-t border-black/5">
                <td className="p-4 text-text">{item.type}</td>
                <td className="p-4 text-text">{item.label}</td>
                <td className="p-4 text-text">{item.displayValue}</td>
                <td className="space-x-4 p-4 text-right">
                  <Link
                    href={`/admin/contact-info/${item.id}/edit`}
                    className="font-medium text-primary hover:underline"
                  >
                    Edit
                  </Link>
                  <DeleteButton id={item.id} action={deleteContactInfoItem} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
