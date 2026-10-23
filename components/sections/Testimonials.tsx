import { getTestimonials, getSectionVisibility } from "@/lib/content";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { TestimonialCarousel } from "@/components/interactive/TestimonialCarousel";
import { Reveal } from "@/components/interactive/Reveal";
import { SECTION_IDS } from "@/lib/sectionIds";

export async function Testimonials() {
  const [testimonials, visibility] = await Promise.all([
    getTestimonials(),
    getSectionVisibility(),
  ]);
  if (visibility.get(SECTION_IDS.testimonials) === false) return null;

  return (
    <section id={SECTION_IDS.testimonials} className="scroll-mt-24 py-[100px]">
      <div className="container mx-auto max-w-[1200px] px-5">
        <SectionTitle
          index={5}
          label="Testimonials"
          title="Testimonials"
          subtitle="Here's what my clients and colleagues have to say about working with me."
        />
        <Reveal variant="fade-up" className="mx-auto max-w-[700px]">
          <TestimonialCarousel testimonials={testimonials} />
        </Reveal>
      </div>
    </section>
  );
}
