import {
  getSiteSettings,
  getSocialLinks,
  getNavLinks,
  getServices,
} from "@/lib/content";
import { Icon } from "@/components/ui/Icon";
import { NewsletterForm } from "@/components/interactive/NewsletterForm";

const headingClass =
  "relative mb-[25px] pb-2.5 text-xl font-semibold text-heading after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-10 after:rounded after:bg-primary";

export async function Footer() {
  const [settings, socialLinks, navLinks, services] = await Promise.all([
    getSiteSettings(),
    getSocialLinks(),
    getNavLinks(),
    getServices(),
  ]);

  return (
    <footer className="relative bg-card pt-[60px] pb-5">
      <div className="container mx-auto max-w-[1200px] px-5">
        <div className="mb-[50px] grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className={headingClass}>{settings?.siteTitle.split(" |")[0] ?? "Jeckonia Opiyo"}</h3>
            <p className="mb-5 text-[15px] leading-[1.7] text-text">
              {settings?.footerTagline}
            </p>
            <div className="flex gap-[15px]">
              {socialLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-background text-text shadow-card transition-all duration-300 hover:-translate-y-1 hover:text-primary"
                >
                  <Icon name={link.iconKey ?? ""} />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h3 className={headingClass}>Quick Links</h3>
            <ul className="list-none">
              {navLinks.map((link) => (
                <li key={link.id} className="mb-[15px]">
                  <a
                    href={link.anchor}
                    className="flex items-center text-[15px] text-text transition-all duration-300 hover:translate-x-1 hover:text-primary"
                  >
                    <Icon name="FaChevronRight" className="mr-2.5 text-primary" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className={headingClass}>Services</h3>
            <ul className="list-none">
              {services.map((service) => (
                <li key={service.id} className="mb-[15px]">
                  <a
                    href={service.linkHref}
                    className="flex items-center text-[15px] text-text transition-all duration-300 hover:translate-x-1 hover:text-primary"
                  >
                    <Icon name="FaChevronRight" className="mr-2.5 text-primary" />
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className={headingClass}>Newsletter</h3>
            <p className="mb-5 text-[15px] leading-[1.7] text-text">
              Subscribe to my newsletter to receive updates on my latest
              projects, blog posts, and tech insights.
            </p>
            <NewsletterForm />
          </div>
        </div>
        <div className="border-t border-black/5 pt-[30px] text-center">
          <p className="text-sm text-text">
            &copy; {new Date().getFullYear()}{" "}
            {settings?.siteTitle.split(" |")[0] ?? "Jeckonia Opiyo"}. All
            Rights Reserved | {settings?.designerCreditText ?? ""}
          </p>
        </div>
      </div>
    </footer>
  );
}
