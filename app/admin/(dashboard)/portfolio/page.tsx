import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deletePortfolioItem } from "@/lib/actions/portfolio";
import { DeleteButton } from "@/components/admin/DeleteButton";

export default async function PortfolioPage() {
  const items = await prisma.portfolioItem.findMany({
    orderBy: { order: "asc" },
    include: { category: true },
  });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-heading">Portfolio</h1>
          <Link href="/admin/portfolio/categories" className="text-sm text-primary hover:underline">
            Manage categories &rarr;
          </Link>
        </div>
        <Link
          href="/admin/portfolio/new"
          className="rounded-card bg-primary px-5 py-2.5 font-medium text-white hover:bg-primary-dark"
        >
          Add New
        </Link>
      </div>
      <div className="overflow-hidden rounded-card bg-card shadow-card">
        <table className="w-full text-left text-sm">
          <thead className="bg-background text-heading">
            <tr>
              <th className="p-4">Title</th>
              <th className="p-4">Category</th>
              <th className="p-4">Order</th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-t border-black/5">
                <td className="p-4 text-text">{item.title}</td>
                <td className="p-4 text-text">{item.category.label}</td>
                <td className="p-4 text-text">{item.order}</td>
                <td className="space-x-4 p-4 text-right">
                  <Link
                    href={`/admin/portfolio/${item.id}/edit`}
                    className="font-medium text-primary hover:underline"
                  >
                    Edit
                  </Link>
                  <DeleteButton id={item.id} action={deletePortfolioItem} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
