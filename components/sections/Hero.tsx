import Image from "next/image";
import { getProfile, getSocialLinks, getSiteSettings } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Typewriter } from "@/components/interactive/Typewriter";
import { Reveal } from "@/components/interactive/Reveal";
import { AutoFit } from "@/components/interactive/AutoFit";
import { SECTION_IDS } from "@/lib/sectionIds";

export async function Hero() {
  const [profile, socialLinks, settings] = await Promise.all([
    getProfile(),
    getSocialLinks(),
    getSiteSettings(),
  ]);
  if (!profile) return null;

  return (
    <section
      id={SECTION_IDS.home}
      className="relative flex h-dvh items-center overflow-hidden pt-20"
    >
      {profile.showHeroImage && profile.heroImageUrl && (
        <Reveal
          variant="scale-in"
          className="absolute top-0 right-0 hidden h-full w-[28vw] md:block"
        >
          <div className="relative h-full w-full overflow-hidden">
            <Image
              src={profile.heroImageUrl}
              alt={profile.name}
              fill
              sizes="28vw"
              className="object-cover opacity-60 grayscale transition-all duration-700 ease-out hover:scale-105 hover:opacity-100 hover:grayscale-0"
              priority
            />
          </div>
        </Reveal>
      )}
      <AutoFit className="container relative mx-auto max-w-[1200px] px-5">
        <Reveal variant="fade-right" className="max-w-4xl">
          <p className="mb-4 font-mono text-sm tracking-widest text-accent uppercase sm:mb-6">
            {`// ${profile.greeting}`}
          </p>
          <h1 className="text-display font-black leading-[0.9] text-foreground">
            {profile.name}
          </h1>
          <h2 className="mt-4 font-mono text-h3 text-accent sm:mt-6">
            <Typewriter text={profile.jobTitle} />
          </h2>
          <p className="mt-4 max-w-xl text-lead text-text sm:mt-6">{profile.heroDescription}</p>

          <div className="mt-6 flex flex-wrap items-center gap-8 sm:mt-10">
            {profile.ctaButtons.map((cta) => (
              <Button key={cta.id} href={cta.href} variant={cta.style === "PRIMARY" ? "primary" : "ghost"}>
                {cta.label}
              </Button>
            ))}
          </div>

          {settings?.showSocialLinks && (
            <div className="mt-6 flex gap-6 sm:mt-10">
              {socialLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  className="text-xl text-text transition-colors duration-200 hover:text-accent"
                >
                  <Icon name={link.iconKey ?? ""} />
                </a>
              ))}
            </div>
          )}

          {profile.showExperienceStats && profile.experienceStats.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-10 sm:mt-16">
              {profile.experienceStats.map((stat) => (
                <div key={stat.id} className="border-l border-muted-border pl-6">
                  <div className="font-mono text-h3 text-accent">{stat.number}</div>
                  <div className="text-sm text-text">{stat.label}</div>
                </div>
              ))}
            </div>
          )}
        </Reveal>
      </AutoFit>
      <a
        href={`#${SECTION_IDS.about}`}
        className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2.5 text-sm font-mono text-text uppercase"
      >
        <span>Scroll</span>
        <Icon name="FaChevronDown" className="text-xl motion-safe:animate-bounce" />
      </a>
    </section>
  );
}
