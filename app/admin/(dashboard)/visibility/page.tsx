import { prisma } from "@/lib/prisma";
import { updateVisibility } from "@/lib/actions/visibility";
import { SubmitButton } from "@/components/admin/SubmitButton";

const SECTIONS = [
  { slug: "about", label: "About" },
  { slug: "skills", label: "Skills" },
  { slug: "services", label: "Services" },
  { slug: "portfolio", label: "Portfolio" },
  { slug: "testimonials", label: "Testimonials" },
  { slug: "blog", label: "Blog" },
  { slug: "contact", label: "Contact" },
] as const;

const COMPONENTS = [
  { name: "showHeroImage", label: "Hero image strip" },
  { name: "showExperienceStats", label: "Experience stats (Hero)" },
  { name: "showAboutImage", label: "About image" },
  { name: "showCvButton", label: "CV download button (About)" },
  { name: "showSocialLinks", label: "Social links row (Hero + Footer)" },
  { name: "showTechIcons", label: "Tech icon badges (Skills)" },
  { name: "showNewsletter", label: "Newsletter signup (Footer)" },
] as const;

export default async function VisibilityPage() {
  const [navLinks, profile, settings] = await Promise.all([
    prisma.navLink.findMany(),
    prisma.profile.findUnique({ where: { id: "singleton" } }),
    prisma.siteSettings.findUnique({ where: { id: "singleton" } }),
  ]);
  const visibleByAnchor = new Map(navLinks.map((l) => [l.anchor, l.visible]));

  const flags: Record<string, boolean | undefined> = {
    showHeroImage: profile?.showHeroImage,
    showExperienceStats: profile?.showExperienceStats,
    showAboutImage: profile?.showAboutImage,
    showCvButton: profile?.showCvButton,
    showSocialLinks: settings?.showSocialLinks,
    showTechIcons: settings?.showTechIcons,
    showNewsletter: settings?.showNewsletter,
  };

  return (
    <div className="max-w-xl">
      <h1 className="mb-2 text-2xl font-bold text-heading">Section Visibility</h1>
      <p className="mb-6 text-sm text-text">
        Turn individual sections or components on or off without deleting their
        content. The Home section always shows &mdash; use Nav Links to control
        whether &quot;Home&quot; appears in the menu.
      </p>
      <form action={updateVisibility} className="space-y-8">
        <fieldset className="space-y-3 rounded-card bg-card p-6 shadow-card">
          <legend className="mb-2 px-1 font-semibold text-heading">Sections</legend>
          {SECTIONS.map((section) => (
            <label key={section.slug} className="flex items-center gap-2 text-sm text-text">
              <input
                type="checkbox"
                name={`section_${section.slug}`}
                defaultChecked={visibleByAnchor.get(`#${section.slug}`) ?? true}
              />
              {section.label}
            </label>
          ))}
        </fieldset>

        <fieldset className="space-y-3 rounded-card bg-card p-6 shadow-card">
          <legend className="mb-2 px-1 font-semibold text-heading">Components</legend>
          {COMPONENTS.map((component) => (
            <label key={component.name} className="flex items-center gap-2 text-sm text-text">
              <input
                type="checkbox"
                name={component.name}
                defaultChecked={flags[component.name] ?? true}
              />
              {component.label}
            </label>
          ))}
        </fieldset>

        <SubmitButton>Save</SubmitButton>
      </form>
    </div>
  );
}
