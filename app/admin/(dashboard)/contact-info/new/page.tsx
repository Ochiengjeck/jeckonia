import { createContactInfoItem } from "@/lib/actions/contactInfo";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { inputClass, labelClass } from "@/components/admin/formStyles";

export default function NewContactInfoPage() {
  return (
    <div className="max-w-xl">
      <h1 className="mb-6 text-2xl font-bold text-heading">Add Contact Info</h1>
      <form action={createContactInfoItem} className="space-y-5 rounded-card bg-card p-6 shadow-card">
        <div>
          <label className={labelClass}>Type</label>
          <select name="type" required className={inputClass} defaultValue="LOCATION">
            <option value="LOCATION">Location</option>
            <option value="EMAIL">Email</option>
            <option value="PHONE">Phone</option>
            <option value="WEBSITE">Website</option>
            <option value="CUSTOM">Custom</option>
          </select>
        </div>
        <div>
          <label className={labelClass}>Icon key (react-icons/fa6 name)</label>
          <input name="icon" required placeholder="FaEnvelope" className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Label</label>
          <input name="label" required className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Value</label>
          <input
            name="displayValue"
            required
            placeholder="e.g. +254 7XX XXX XXX, an email, or a URL"
            className={inputClass}
          />
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
