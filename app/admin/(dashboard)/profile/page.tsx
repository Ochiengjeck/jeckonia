import { prisma } from "@/lib/prisma";
import { updateProfile } from "@/lib/actions/profile";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { inputClass, labelClass } from "@/components/admin/formStyles";
import { ImageUploadField } from "@/components/admin/ImageUploadField";

const CTA_SLOTS = 4;
const STAT_SLOTS = 4;

export default async function ProfilePage() {
  const profile = await prisma.profile.findUnique({
    where: { id: "singleton" },
    include: {
      ctaButtons: { orderBy: { order: "asc" } },
      experienceStats: { orderBy: { order: "asc" } },
    },
  });

  return (
    <div className="max-w-2xl">
      <h1 className="mb-6 text-2xl font-bold text-heading">Profile</h1>
      <form action={updateProfile} className="space-y-8">
        <fieldset className="space-y-5 rounded-card bg-card p-6 shadow-card">
          <legend className="mb-2 px-1 font-semibold text-heading">Hero</legend>
          <div>
            <label className={labelClass}>Greeting</label>
            <input
              name="greeting"
              defaultValue={profile?.greeting}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Name</label>
            <input name="name" required defaultValue={profile?.name} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Job Title</label>
            <input
              name="jobTitle"
              required
              defaultValue={profile?.jobTitle}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Hero Description</label>
            <textarea
              name="heroDescription"
              required
              rows={3}
              defaultValue={profile?.heroDescription}
              className={inputClass}
            />
          </div>
          <ImageUploadField
            name="heroImageUrl"
            label="Hero Image"
            defaultValue={profile?.heroImageUrl ?? ""}
            purpose="PROFILE"
          />
        </fieldset>

        <fieldset className="space-y-4 rounded-card bg-card p-6 shadow-card">
          <legend className="mb-2 px-1 font-semibold text-heading">
            Hero CTA Buttons (leave label/href blank to omit a slot)
          </legend>
          {Array.from({ length: CTA_SLOTS }).map((_, i) => {
            const cta = profile?.ctaButtons[i];
            return (
              <div key={i} className="grid grid-cols-3 gap-3 border-t border-black/5 pt-4 first:border-0 first:pt-0">
                <input
                  name={`cta${i}Label`}
                  placeholder="Label"
                  defaultValue={cta?.label ?? ""}
                  className={inputClass}
                />
                <input
                  name={`cta${i}Href`}
                  placeholder="#portfolio"
                  defaultValue={cta?.href ?? ""}
                  className={inputClass}
                />
                <select
                  name={`cta${i}Style`}
                  defaultValue={cta?.style ?? "PRIMARY"}
                  className={inputClass}
                >
                  <option value="PRIMARY">Primary</option>
                  <option value="OUTLINE">Outline</option>
                </select>
              </div>
            );
          })}
        </fieldset>

        <fieldset className="space-y-5 rounded-card bg-card p-6 shadow-card">
          <legend className="mb-2 px-1 font-semibold text-heading">About</legend>
          <div>
            <label className={labelClass}>Section Title</label>
            <input
              name="aboutSectionTitle"
              defaultValue={profile?.aboutSectionTitle}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Section Subtitle</label>
            <textarea
              name="aboutSectionSubtitle"
              rows={2}
              defaultValue={profile?.aboutSectionSubtitle}
              className={inputClass}
            />
          </div>
          <ImageUploadField
            name="aboutImageUrl"
            label="About Image"
            defaultValue={profile?.aboutImageUrl ?? ""}
            purpose="ABOUT"
          />
          <div>
            <label className={labelClass}>Heading</label>
            <input
              name="aboutHeading"
              defaultValue={profile?.aboutHeading}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Bio (HTML)</label>
            <textarea
              name="aboutBioHtml"
              rows={6}
              defaultValue={profile?.aboutBioHtml}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Email</label>
            <input name="email" required defaultValue={profile?.email} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Phone</label>
            <input name="phone" required defaultValue={profile?.phone} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Location</label>
            <input
              name="location"
              required
              defaultValue={profile?.location}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Availability Text</label>
            <input
              name="availabilityText"
              defaultValue={profile?.availabilityText}
              className={inputClass}
            />
          </div>
          <ImageUploadField
            name="cvFileUrl"
            label="CV File (PDF)"
            defaultValue={profile?.cvFileUrl ?? ""}
            purpose="CV"
            accept="application/pdf"
            preview={false}
          />
        </fieldset>

        <fieldset className="space-y-4 rounded-card bg-card p-6 shadow-card">
          <legend className="mb-2 px-1 font-semibold text-heading">
            Experience Stats (leave number/label blank to omit a slot)
          </legend>
          {Array.from({ length: STAT_SLOTS }).map((_, i) => {
            const stat = profile?.experienceStats[i];
            return (
              <div key={i} className="grid grid-cols-2 gap-3 border-t border-black/5 pt-4 first:border-0 first:pt-0">
                <input
                  name={`stat${i}Number`}
                  placeholder="5+"
                  defaultValue={stat?.number ?? ""}
                  className={inputClass}
                />
                <input
                  name={`stat${i}Label`}
                  placeholder="Years of Experience"
                  defaultValue={stat?.label ?? ""}
                  className={inputClass}
                />
              </div>
            );
          })}
        </fieldset>

        <SubmitButton>Save Profile</SubmitButton>
      </form>
    </div>
  );
}
