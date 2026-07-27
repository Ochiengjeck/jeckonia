import { getServices } from "@/lib/content";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Icon } from "@/components/ui/Icon";

export async function Services() {
  const services = await getServices();

  return (
    <section id="services" className="scroll-mt-24 py-[100px]">
      <div className="container mx-auto max-w-[1200px] px-5">
        <SectionTitle
          title="My Services"
          subtitle="Here are the key services I offer to help businesses and individuals achieve their technology goals."
        />
        <div className="grid grid-cols-1 gap-[30px] sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.id}
              className="group rounded-card bg-card p-[40px_30px] text-center shadow-card transition-transform duration-300 hover:-translate-y-2.5"
            >
              <div className="mx-auto mb-[25px] flex h-20 w-20 items-center justify-center rounded-full bg-background text-3xl text-primary shadow-card transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
                <Icon name={service.icon} />
              </div>
              <h3 className="mb-[15px] text-xl font-semibold text-heading">
                {service.title}
              </h3>
              <p className="mb-5 text-[15px] leading-[1.7] text-text">
                {service.description}
              </p>
              <a
                href={service.linkHref}
                className="inline-block rounded-full border border-primary px-5 py-2 text-sm font-medium text-primary transition-colors duration-300 hover:bg-primary hover:text-white"
              >
                {service.linkLabel}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
