import { prisma } from "@/lib/prisma";
import { updateSiteSettings } from "@/lib/actions/siteSettings";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { inputClass, labelClass } from "@/components/admin/formStyles";
import { ImageUploadField } from "@/components/admin/ImageUploadField";

export default async function SiteSettingsPage() {
  const settings = await prisma.siteSettings.findUnique({ where: { id: "singleton" } });

  return (
    <div className="max-w-xl">
      <h1 className="mb-6 text-2xl font-bold text-heading">Site Settings</h1>
      <form
        action={updateSiteSettings}
        className="space-y-5 rounded-card bg-card p-6 shadow-card"
      >
        <div>
          <label className={labelClass}>Site Title</label>
          <input name="siteTitle" required defaultValue={settings?.siteTitle} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Meta Description</label>
          <textarea
            name="metaDescription"
            rows={3}
            defaultValue={settings?.metaDescription}
            className={inputClass}
          />
        </div>
        <ImageUploadField
          name="ogImageUrl"
          label="Social Share (OG) Image"
          defaultValue={settings?.ogImageUrl ?? ""}
          purpose="OTHER"
        />
        <div>
          <label className={labelClass}>Footer Tagline</label>
          <textarea
            name="footerTagline"
            rows={2}
            defaultValue={settings?.footerTagline}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Designer Credit Text</label>
          <input
            name="designerCreditText"
            defaultValue={settings?.designerCreditText}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Designer Credit URL</label>
          <input
            name="designerCreditUrl"
            defaultValue={settings?.designerCreditUrl ?? ""}
            className={inputClass}
          />
        </div>
        <div className="space-y-2 border-t border-black/5 pt-4">
          <label className="flex items-center gap-2 text-sm text-text">
            <input
              type="checkbox"
              name="showSocialLinks"
              defaultChecked={settings?.showSocialLinks ?? true}
            />
            Show social links (Hero + Footer)
          </label>
          <label className="flex items-center gap-2 text-sm text-text">
            <input
              type="checkbox"
              name="showTechIcons"
              defaultChecked={settings?.showTechIcons ?? true}
            />
            Show tech icon badges (Skills)
          </label>
          <label className="flex items-center gap-2 text-sm text-text">
            <input
              type="checkbox"
              name="showNewsletter"
              defaultChecked={settings?.showNewsletter ?? true}
            />
            Show newsletter signup (Footer)
          </label>
        </div>
        <SubmitButton>Save</SubmitButton>
      </form>
    </div>
  );
}
