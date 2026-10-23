import { getContactInfo, contactHref, getSectionVisibility } from "@/lib/content";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Icon } from "@/components/ui/Icon";
import { ContactForm } from "@/components/interactive/ContactForm";
import { Reveal } from "@/components/interactive/Reveal";
import { SECTION_IDS } from "@/lib/sectionIds";

const headingClass = "mb-10 font-mono text-label tracking-widest text-accent uppercase";

export async function Contact() {
  const [contactInfo, visibility] = await Promise.all([
    getContactInfo(),
    getSectionVisibility(),
  ]);
  if (visibility.get(SECTION_IDS.contact) === false) return null;

  return (
    <section id={SECTION_IDS.contact} className="scroll-mt-24 py-[100px]">
      <div className="container mx-auto max-w-[1200px] px-5">
        <SectionTitle
          index={7}
          label="Contact"
          title="Contact Me"
          subtitle="Feel free to reach out to me for any inquiries, project discussions, or collaboration opportunities."
        />
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:divide-x lg:divide-muted-border">
          <Reveal variant="fade-right">
            <h3 className={headingClass}>Get In Touch</h3>
            {contactInfo.map((item) => {
              const href = contactHref(item);
              return (
                <div key={item.id} className="mb-8 flex items-start gap-5">
                  <span className="shrink-0 text-xl text-accent">
                    <Icon name={item.icon} />
                  </span>
                  <div>
                    <h4 className="mb-1.5 text-lg font-bold text-foreground">{item.label}</h4>
                    {href ? (
                      <a
                        href={href}
                        className="text-text transition-colors duration-200 hover:text-accent"
                      >
                        {item.displayValue}
                      </a>
                    ) : (
                      <p className="text-text">{item.displayValue}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </Reveal>
          <Reveal variant="fade-left" className="lg:pl-16">
            <h3 className={headingClass}>Send Message</h3>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
