import {
  getSiteSettings,
  getSocialLinks,
  getNavLinks,
  getServices,
  getSectionVisibility,
} from "@/lib/content";
import { Icon } from "@/components/ui/Icon";
import { NewsletterForm } from "@/components/interactive/NewsletterForm";
import { SECTION_IDS } from "@/lib/sectionIds";

const headingClass = "mb-6 font-mono text-label tracking-widest text-accent uppercase";

export async function Footer() {
  const [settings, socialLinks, navLinks, services, visibility] = await Promise.all([
    getSiteSettings(),
    getSocialLinks(),
    getNavLinks(),
    getServices(),
    getSectionVisibility(),
  ]);
  const servicesVisible = visibility.get(SECTION_IDS.services) !== false;

  return (
    <footer className="border-t border-muted-border bg-background pt-[60px] pb-5">
      <div className="container mx-auto max-w-[1200px] px-5">
        <div className="mb-[50px] grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-6 text-h3 font-black text-foreground">
              {settings?.siteTitle.split(" |")[0] ?? "Jeckonia Opiyo"}
            </h3>
            <p className="mb-5 text-[15px] leading-[1.7] text-text">
              {settings?.footerTagline}
            </p>
            {settings?.showSocialLinks && (
              <div className="flex gap-5">
                {socialLinks.map((link) => (
                  <a
                    key={link.id}
                    href={link.url}
                    className="text-lg text-text transition-colors duration-200 hover:text-accent"
                  >
                    <Icon name={link.iconKey ?? ""} />
                  </a>
                ))}
              </div>
            )}
          </div>
          <div>
            <h3 className={headingClass}>Quick Links</h3>
            <ul className="list-none">
              {navLinks.map((link) => (
                <li key={link.id} className="mb-[15px]">
                  <a
                    href={link.anchor}
                    className="inline-block text-[15px] text-text transition-all duration-300 hover:translate-x-1 hover:text-accent"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          {servicesVisible && (
            <div>
              <h3 className={headingClass}>Services</h3>
              <ul className="list-none">
                {services.map((service) => (
                  <li key={service.id} className="mb-[15px]">
                    <a
                      href={`#service-${service.id}`}
                      className="inline-block text-[15px] text-text transition-all duration-300 hover:translate-x-1 hover:text-accent"
                    >
                      {service.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {settings?.showNewsletter && (
            <div>
              <h3 className={headingClass}>Newsletter</h3>
              <p className="mb-5 text-[15px] leading-[1.7] text-text">
                Subscribe to my newsletter to receive updates on my latest
                projects, blog posts, and tech insights.
              </p>
              <NewsletterForm />
            </div>
          )}
        </div>
        <div className="border-t border-muted-border pt-[30px] text-center">
          <p className="font-mono text-sm text-text">
            &copy; {new Date().getFullYear()}{" "}
            {settings?.siteTitle.split(" |")[0] ?? "Jeckonia Opiyo"}. All
            Rights Reserved | {settings?.designerCreditText ?? ""}
          </p>
        </div>
      </div>
    </footer>
  );
}
