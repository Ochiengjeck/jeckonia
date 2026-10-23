import { getServices, getSectionVisibility } from "@/lib/content";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/interactive/Reveal";
import { SECTION_IDS } from "@/lib/sectionIds";

export async function Services() {
  const [services, visibility] = await Promise.all([getServices(), getSectionVisibility()]);
  if (visibility.get(SECTION_IDS.services) === false) return null;

  return (
    <section id={SECTION_IDS.services} className="scroll-mt-24 py-[100px]">
      <div className="container mx-auto max-w-[1200px] px-5">
        <SectionTitle
          index={3}
          label="Services"
          title="My Services"
          subtitle="Here are the key services I offer to help businesses and individuals achieve their technology goals."
        />
        <div className="border-t border-muted-border">
          {services.map((service, i) => (
            <Reveal key={service.id} variant="fade-up" delay={Math.min(i, 6) * 60}>
              <a
                id={`service-${service.id}`}
                href={service.linkHref}
                className="group flex scroll-mt-24 items-center gap-6 border-b border-muted-border py-8 transition-colors duration-200 hover:bg-muted"
              >
                <span className="w-12 shrink-0 font-mono text-sm text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="shrink-0 text-2xl text-accent">
                  <Icon name={service.icon} />
                </span>
                <span className="flex-1">
                  <span className="block text-h3 font-black text-foreground">
                    {service.title}
                  </span>
                  <span className="mt-1 block max-w-2xl text-text">{service.description}</span>
                </span>
                <span className="hidden shrink-0 font-mono text-xs tracking-widest text-text uppercase group-hover:text-accent md:block">
                  {service.linkLabel}
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
