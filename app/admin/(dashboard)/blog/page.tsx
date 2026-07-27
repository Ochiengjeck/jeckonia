import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteBlogPost } from "@/lib/actions/blog";
import { DeleteButton } from "@/components/admin/DeleteButton";

export default async function BlogAdminPage() {
  const posts = await prisma.blogPost.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-heading">Blog Posts</h1>
        <Link
          href="/admin/blog/new"
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
              <th className="p-4">Status</th>
              <th className="p-4">Published</th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id} className="border-t border-black/5">
                <td className="p-4 text-text">{post.title}</td>
                <td className="p-4 text-text">{post.status}</td>
                <td className="p-4 text-text">
                  {post.publishedAt?.toLocaleDateString() ?? "—"}
                </td>
                <td className="space-x-4 p-4 text-right">
                  <Link
                    href={`/blog/${post.slug}`}
                    target="_blank"
                    className="font-medium text-text hover:underline"
                  >
                    View
                  </Link>
                  <Link
                    href={`/admin/blog/${post.id}/edit`}
                    className="font-medium text-primary hover:underline"
                  >
                    Edit
                  </Link>
                  <DeleteButton id={post.id} action={deleteBlogPost} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
