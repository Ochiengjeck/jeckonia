import Image from "next/image";
import { getSkills } from "@/lib/content";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { SkillBar } from "@/components/interactive/SkillBar";

export async function Skills() {
  const { technical, techIcons, professional } = await getSkills();

  return (
    <section id="skills" className="scroll-mt-24 py-[100px]">
      <div className="container mx-auto max-w-[1200px] px-5">
        <SectionTitle
          title="My Skills"
          subtitle="These are the technologies and tools I've mastered throughout my professional journey."
        />
        <div className="grid grid-cols-2 gap-[50px] max-lg:grid-cols-1">
          <div className="rounded-card bg-card p-10 shadow-card">
            <h3 className="relative mb-[30px] pb-2.5 text-2xl font-semibold text-heading after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-[50px] after:rounded after:bg-primary">
              Technical Skills
            </h3>
            {technical.map((skill) => (
              <SkillBar key={skill.id} name={skill.name} percent={skill.percent!} />
            ))}
            {techIcons.length > 0 && (
              <div className="mt-[30px] flex flex-wrap gap-5">
                {techIcons.map((skill) => (
                  <div
                    key={skill.id}
                    title={skill.name}
                    className="flex h-[70px] w-[70px] items-center justify-center rounded-full bg-background text-primary shadow-card transition-transform duration-300 hover:-translate-y-1"
                  >
                    <Image
                      src={skill.iconUrl!}
                      alt={skill.name}
                      width={40}
                      height={40}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="rounded-card bg-card p-10 shadow-card max-lg:mt-[30px]">
            <h3 className="relative mb-[30px] pb-2.5 text-2xl font-semibold text-heading after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-[50px] after:rounded after:bg-primary">
              Professional Skills
            </h3>
            {professional.map((skill) => (
              <SkillBar key={skill.id} name={skill.name} percent={skill.percent!} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
