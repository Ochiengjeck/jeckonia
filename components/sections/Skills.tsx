import Image from "next/image";
import { getSkills, getSiteSettings, getSectionVisibility } from "@/lib/content";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { SkillBar } from "@/components/interactive/SkillBar";
import { Reveal } from "@/components/interactive/Reveal";
import { SECTION_IDS } from "@/lib/sectionIds";

export async function Skills() {
  const [{ technical, techIcons, professional }, settings, visibility] = await Promise.all([
    getSkills(),
    getSiteSettings(),
    getSectionVisibility(),
  ]);
  if (visibility.get(SECTION_IDS.skills) === false) return null;

  return (
    <section id={SECTION_IDS.skills} className="scroll-mt-24 py-[100px]">
      <div className="container mx-auto max-w-[1200px] px-5">
        <SectionTitle
          index={2}
          label="Skills"
          title="My Skills"
          subtitle="These are the technologies and tools I've mastered throughout my professional journey."
        />
        <div className="grid grid-cols-2 gap-16 max-lg:grid-cols-1 max-lg:gap-10 md:divide-x md:divide-muted-border">
          <Reveal variant="fade-up">
            <h3 className="mb-10 font-mono text-label tracking-widest text-accent uppercase">
              Technical
            </h3>
            {technical.map((skill) => (
              <SkillBar key={skill.id} name={skill.name} percent={skill.percent!} />
            ))}
            {settings?.showTechIcons && techIcons.length > 0 && (
              <div className="mt-10 flex flex-wrap gap-3">
                {techIcons.map((skill) => (
                  <div
                    key={skill.id}
                    title={skill.name}
                    className="flex items-center gap-2 border border-muted-border px-3 py-2"
                  >
                    <Image src={skill.iconUrl!} alt={skill.name} width={20} height={20} />
                    <span className="text-sm text-text">{skill.name}</span>
                  </div>
                ))}
              </div>
            )}
          </Reveal>
          <Reveal variant="fade-up" delay={120} className="md:pl-16">
            <h3 className="mb-10 font-mono text-label tracking-widest text-accent uppercase">
              Professional
            </h3>
            {professional.map((skill) => (
              <SkillBar key={skill.id} name={skill.name} percent={skill.percent!} />
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
