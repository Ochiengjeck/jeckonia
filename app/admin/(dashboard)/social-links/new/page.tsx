import { createSocialLink } from "@/lib/actions/socialLinks";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { inputClass, labelClass } from "@/components/admin/formStyles";

export default function NewSocialLinkPage() {
  return (
    <div className="max-w-xl">
      <h1 className="mb-6 text-2xl font-bold text-heading">Add Social Link</h1>
      <form action={createSocialLink} className="space-y-5 rounded-card bg-card p-6 shadow-card">
        <div>
          <label className={labelClass}>Platform</label>
          <select name="platform" required className={inputClass} defaultValue="GITHUB">
            <option value="GITHUB">GitHub</option>
            <option value="LINKEDIN">LinkedIn</option>
            <option value="TWITTER">Twitter</option>
            <option value="INSTAGRAM">Instagram</option>
            <option value="DRIBBBLE">Dribbble</option>
            <option value="OTHER">Other</option>
          </select>
        </div>
        <div>
          <label className={labelClass}>Icon key (react-icons/fa6 name)</label>
          <input name="iconKey" placeholder="FaGithub" className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>URL</label>
          <input name="url" required placeholder="https://..." className={inputClass} />
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
