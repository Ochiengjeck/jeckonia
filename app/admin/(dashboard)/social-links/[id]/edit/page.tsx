import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updateSocialLink } from "@/lib/actions/socialLinks";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { inputClass, labelClass } from "@/components/admin/formStyles";

export default async function EditSocialLinkPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const link = await prisma.socialLink.findUnique({ where: { id } });
  if (!link) notFound();

  const action = updateSocialLink.bind(null, id);

  return (
    <div className="max-w-xl">
      <h1 className="mb-6 text-2xl font-bold text-heading">Edit Social Link</h1>
      <form action={action} className="space-y-5 rounded-card bg-card p-6 shadow-card">
        <div>
          <label className={labelClass}>Platform</label>
          <select name="platform" required className={inputClass} defaultValue={link.platform}>
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
          <input
            name="iconKey"
            defaultValue={link.iconKey ?? ""}
            placeholder="FaGithub"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>URL</label>
          <input name="url" required defaultValue={link.url} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Order</label>
          <input
            name="order"
            type="number"
            defaultValue={link.order}
            className={inputClass}
          />
        </div>
        <SubmitButton>Save</SubmitButton>
      </form>
    </div>
  );
}
