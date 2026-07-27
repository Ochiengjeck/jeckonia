import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteTestimonial } from "@/lib/actions/testimonials";
import { DeleteButton } from "@/components/admin/DeleteButton";

export default async function TestimonialsPage() {
  const testimonials = await prisma.testimonial.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-heading">Testimonials</h1>
        <Link
          href="/admin/testimonials/new"
          className="rounded-card bg-primary px-5 py-2.5 font-medium text-white hover:bg-primary-dark"
        >
          Add New
        </Link>
      </div>
      <div className="overflow-hidden rounded-card bg-card shadow-card">
        <table className="w-full text-left text-sm">
          <thead className="bg-background text-heading">
            <tr>
              <th className="p-4">Author</th>
              <th className="p-4">Role</th>
              <th className="p-4">Order</th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody>
            {testimonials.map((testimonial) => (
              <tr key={testimonial.id} className="border-t border-black/5">
                <td className="p-4 text-text">{testimonial.authorName}</td>
                <td className="p-4 text-text">{testimonial.authorRole}</td>
                <td className="p-4 text-text">{testimonial.order}</td>
                <td className="space-x-4 p-4 text-right">
                  <Link
                    href={`/admin/testimonials/${testimonial.id}/edit`}
                    className="font-medium text-primary hover:underline"
                  >
                    Edit
                  </Link>
                  <DeleteButton id={testimonial.id} action={deleteTestimonial} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
