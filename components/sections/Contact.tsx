import { getContactInfo, contactHref } from "@/lib/content";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Icon } from "@/components/ui/Icon";
import { ContactForm } from "@/components/interactive/ContactForm";

const headingClass =
  "relative mb-[30px] pb-2.5 text-2xl font-semibold text-heading after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-[50px] after:rounded after:bg-primary";

export async function Contact() {
  const contactInfo = await getContactInfo();

  return (
    <section id="contact" className="scroll-mt-24 py-[100px]">
      <div className="container mx-auto max-w-[1200px] px-5">
        <SectionTitle
          title="Contact Me"
          subtitle="Feel free to reach out to me for any inquiries, project discussions, or collaboration opportunities."
        />
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div className="rounded-card bg-card p-10 shadow-card">
            <h3 className={headingClass}>Get In Touch</h3>
            {contactInfo.map((item) => {
              const href = contactHref(item);
              return (
                <div key={item.id} className="mb-[30px] flex">
                  <span className="mr-5 flex h-[50px] w-[50px] shrink-0 items-center justify-center rounded-full bg-background text-xl text-primary shadow-card">
                    <Icon name={item.icon} />
                  </span>
                  <div>
                    <h4 className="mb-1.5 text-lg font-semibold text-heading">
                      {item.label}
                    </h4>
                    {href ? (
                      <a
                        href={href}
                        className="text-[15px] text-text transition-colors duration-300 hover:text-primary"
                      >
                        {item.displayValue}
                      </a>
                    ) : (
                      <p className="text-[15px] text-text">{item.displayValue}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="rounded-card bg-card p-10 shadow-card">
            <h3 className={headingClass}>Send Message</h3>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
