import { getTestimonials } from "@/lib/content";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { TestimonialCarousel } from "@/components/interactive/TestimonialCarousel";

export async function Testimonials() {
  const testimonials = await getTestimonials();

  return (
    <section id="testimonials" className="scroll-mt-24 py-[100px]">
      <div className="container mx-auto max-w-[1200px] px-5">
        <SectionTitle
          title="Testimonials"
          subtitle="Here's what my clients and colleagues have to say about working with me."
        />
        <div className="mx-auto max-w-[700px]">
          <TestimonialCarousel testimonials={testimonials} />
        </div>
      </div>
    </section>
  );
}
