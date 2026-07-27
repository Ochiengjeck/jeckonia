import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteSocialLink } from "@/lib/actions/socialLinks";
import { DeleteButton } from "@/components/admin/DeleteButton";

export default async function SocialLinksPage() {
  const links = await prisma.socialLink.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-heading">Social Links</h1>
        <Link
          href="/admin/social-links/new"
          className="rounded-card bg-primary px-5 py-2.5 font-medium text-white hover:bg-primary-dark"
        >
          Add New
        </Link>
      </div>
      <div className="overflow-hidden rounded-card bg-card shadow-card">
        <table className="w-full text-left text-sm">
          <thead className="bg-background text-heading">
            <tr>
              <th className="p-4">Platform</th>
              <th className="p-4">URL</th>
              <th className="p-4">Order</th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody>
            {links.map((link) => (
              <tr key={link.id} className="border-t border-black/5">
                <td className="p-4 text-text">{link.platform}</td>
                <td className="max-w-[300px] truncate p-4 text-text">{link.url}</td>
                <td className="p-4 text-text">{link.order}</td>
                <td className="space-x-4 p-4 text-right">
                  <Link
                    href={`/admin/social-links/${link.id}/edit`}
                    className="font-medium text-primary hover:underline"
                  >
                    Edit
                  </Link>
                  <DeleteButton id={link.id} action={deleteSocialLink} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
