import { createTestimonial } from "@/lib/actions/testimonials";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { inputClass, labelClass } from "@/components/admin/formStyles";
import { ImageUploadField } from "@/components/admin/ImageUploadField";

export default function NewTestimonialPage() {
  return (
    <div className="max-w-xl">
      <h1 className="mb-6 text-2xl font-bold text-heading">Add Testimonial</h1>
      <form action={createTestimonial} className="space-y-5 rounded-card bg-card p-6 shadow-card">
        <div>
          <label className={labelClass}>Quote</label>
          <textarea name="quote" required rows={4} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Author Name</label>
          <input name="authorName" required className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Author Role</label>
          <input name="authorRole" required className={inputClass} />
        </div>
        <ImageUploadField
          name="authorImageUrl"
          label="Author Image"
          purpose="TESTIMONIAL"
        />
        <div>
          <label className={labelClass}>Order</label>
          <input name="order" type="number" defaultValue={0} className={inputClass} />
        </div>
        <SubmitButton>Create</SubmitButton>
      </form>
    </div>
  );
}
