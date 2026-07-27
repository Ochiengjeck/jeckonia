import { createService } from "@/lib/actions/services";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { inputClass, labelClass } from "@/components/admin/formStyles";

export default function NewServicePage() {
  return (
    <div className="max-w-xl">
      <h1 className="mb-6 text-2xl font-bold text-heading">Add Service</h1>
      <form action={createService} className="space-y-5 rounded-card bg-card p-6 shadow-card">
        <div>
          <label className={labelClass}>Icon key (react-icons/fa6 name)</label>
          <input name="icon" required placeholder="FaLaptopCode" className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Title</label>
          <input name="title" required className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Description</label>
          <textarea name="description" required rows={4} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Link Label</label>
          <input name="linkLabel" defaultValue="Learn More" className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Link URL</label>
          <input name="linkHref" defaultValue="#" className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Order</label>
          <input name="order" type="number" defaultValue={0} className={inputClass} />
        </div>
        <SubmitButton>Create</SubmitButton>
      </form>
    </div>
  );
}
