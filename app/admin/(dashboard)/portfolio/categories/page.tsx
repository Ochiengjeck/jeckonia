import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deletePortfolioCategory } from "@/lib/actions/portfolio";
import { DeleteButton } from "@/components/admin/DeleteButton";

export default async function PortfolioCategoriesPage() {
  const categories = await prisma.portfolioCategory.findMany({
    orderBy: { order: "asc" },
    include: { _count: { select: { items: true } } },
  });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <Link href="/admin/portfolio" className="text-sm text-primary hover:underline">
            &larr; Back to Portfolio
          </Link>
          <h1 className="mt-1 text-2xl font-bold text-heading">Portfolio Categories</h1>
        </div>
        <Link
          href="/admin/portfolio/categories/new"
          className="rounded-card bg-primary px-5 py-2.5 font-medium text-white hover:bg-primary-dark"
        >
          Add New
        </Link>
      </div>
      <div className="overflow-hidden rounded-card bg-card shadow-card">
        <table className="w-full text-left text-sm">
          <thead className="bg-background text-heading">
            <tr>
              <th className="p-4">Key</th>
              <th className="p-4">Label</th>
              <th className="p-4">Items</th>
              <th className="p-4">Order</th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id} className="border-t border-black/5">
                <td className="p-4 text-text">{category.key}</td>
                <td className="p-4 text-text">{category.label}</td>
                <td className="p-4 text-text">{category._count.items}</td>
                <td className="p-4 text-text">{category.order}</td>
                <td className="space-x-4 p-4 text-right">
                  <Link
                    href={`/admin/portfolio/categories/${category.id}/edit`}
                    className="font-medium text-primary hover:underline"
                  >
                    Edit
                  </Link>
                  <DeleteButton id={category.id} action={deletePortfolioCategory} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
