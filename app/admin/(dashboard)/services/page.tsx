import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteService } from "@/lib/actions/services";
import { DeleteButton } from "@/components/admin/DeleteButton";

export default async function ServicesPage() {
  const services = await prisma.service.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-heading">Services</h1>
        <Link
          href="/admin/services/new"
          className="rounded-card bg-primary px-5 py-2.5 font-medium text-white hover:bg-primary-dark"
        >
          Add New
        </Link>
      </div>
      <div className="overflow-hidden rounded-card bg-card shadow-card">
        <table className="w-full text-left text-sm">
          <thead className="bg-background text-heading">
            <tr>
              <th className="p-4">Icon</th>
              <th className="p-4">Title</th>
              <th className="p-4">Order</th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service.id} className="border-t border-black/5">
                <td className="p-4 text-text">{service.icon}</td>
                <td className="p-4 text-text">{service.title}</td>
                <td className="p-4 text-text">{service.order}</td>
                <td className="space-x-4 p-4 text-right">
                  <Link
                    href={`/admin/services/${service.id}/edit`}
                    className="font-medium text-primary hover:underline"
                  >
                    Edit
                  </Link>
                  <DeleteButton id={service.id} action={deleteService} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
