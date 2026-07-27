import { getPortfolio } from "@/lib/content";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { PortfolioGrid } from "@/components/interactive/PortfolioGrid";

export async function Portfolio() {
  const { categories, items } = await getPortfolio();

  return (
    <section id="portfolio" className="scroll-mt-24 py-[100px]">
      <div className="container mx-auto max-w-[1200px] px-5">
        <SectionTitle
          title="My Portfolio"
          subtitle="Take a look at some of the projects I've worked on throughout my career."
        />
        <PortfolioGrid categories={categories} items={items} />
      </div>
    </section>
  );
}
