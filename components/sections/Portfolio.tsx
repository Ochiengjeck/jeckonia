import { getPortfolio, getSectionVisibility } from "@/lib/content";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { PortfolioGrid } from "@/components/interactive/PortfolioGrid";
import { SECTION_IDS } from "@/lib/sectionIds";

export async function Portfolio() {
  const [{ categories, items }, visibility] = await Promise.all([
    getPortfolio(),
    getSectionVisibility(),
  ]);
  if (visibility.get(SECTION_IDS.portfolio) === false) return null;

  return (
    <section id={SECTION_IDS.portfolio} className="scroll-mt-24 py-[100px]">
      <div className="container mx-auto max-w-[1200px] px-5">
        <SectionTitle
          index={4}
          label="Portfolio"
          title="My Portfolio"
          subtitle="Take a look at some of the projects I've worked on throughout my career."
        />
        <PortfolioGrid categories={categories} items={items} />
      </div>
    </section>
  );
}
