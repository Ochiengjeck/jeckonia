import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteNavLink } from "@/lib/actions/navLinks";
import { DeleteButton } from "@/components/admin/DeleteButton";

export default async function NavLinksPage() {
  const links = await prisma.navLink.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-heading">Nav Links</h1>
        <Link
          href="/admin/nav-links/new"
          className="rounded-card bg-primary px-5 py-2.5 font-medium text-white hover:bg-primary-dark"
        >
          Add New
        </Link>
      </div>
      <div className="overflow-hidden rounded-card bg-card shadow-card">
        <table className="w-full text-left text-sm">
          <thead className="bg-background text-heading">
            <tr>
              <th className="p-4">Label</th>
              <th className="p-4">Anchor</th>
              <th className="p-4">Visible</th>
              <th className="p-4">Order</th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody>
            {links.map((link) => (
              <tr key={link.id} className="border-t border-black/5">
                <td className="p-4 text-text">{link.label}</td>
                <td className="p-4 text-text">{link.anchor}</td>
                <td className="p-4 text-text">{link.visible ? "Yes" : "No"}</td>
                <td className="p-4 text-text">{link.order}</td>
                <td className="space-x-4 p-4 text-right">
                  <Link
                    href={`/admin/nav-links/${link.id}/edit`}
                    className="font-medium text-primary hover:underline"
                  >
                    Edit
                  </Link>
                  <DeleteButton id={link.id} action={deleteNavLink} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
