import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updateTestimonial } from "@/lib/actions/testimonials";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { inputClass, labelClass } from "@/components/admin/formStyles";
import { ImageUploadField } from "@/components/admin/ImageUploadField";

export default async function EditTestimonialPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const testimonial = await prisma.testimonial.findUnique({ where: { id } });
  if (!testimonial) notFound();

  const action = updateTestimonial.bind(null, id);

  return (
    <div className="max-w-xl">
      <h1 className="mb-6 text-2xl font-bold text-heading">Edit Testimonial</h1>
      <form action={action} className="space-y-5 rounded-card bg-card p-6 shadow-card">
        <div>
          <label className={labelClass}>Quote</label>
          <textarea
            name="quote"
            required
            rows={4}
            defaultValue={testimonial.quote}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Author Name</label>
          <input
            name="authorName"
            required
            defaultValue={testimonial.authorName}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Author Role</label>
          <input
            name="authorRole"
            required
            defaultValue={testimonial.authorRole}
            className={inputClass}
          />
        </div>
        <ImageUploadField
          name="authorImageUrl"
          label="Author Image"
          defaultValue={testimonial.authorImageUrl}
          purpose="TESTIMONIAL"
        />
        <div>
          <label className={labelClass}>Order</label>
          <input
            name="order"
            type="number"
            defaultValue={testimonial.order}
            className={inputClass}
          />
        </div>
        <SubmitButton>Save</SubmitButton>
      </form>
    </div>
  );
}
