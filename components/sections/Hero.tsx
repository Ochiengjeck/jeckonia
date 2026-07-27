import Image from "next/image";
import { getProfile, getSocialLinks } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Typewriter } from "@/components/interactive/Typewriter";
import { Reveal } from "@/components/interactive/Reveal";

export async function Hero() {
  const [profile, socialLinks] = await Promise.all([
    getProfile(),
    getSocialLinks(),
  ]);
  if (!profile) return null;

  return (
    <section
      id="home"
      className="relative flex h-screen items-center overflow-hidden pt-20"
    >
      <div className="container mx-auto flex w-full max-w-[1200px] items-center justify-between gap-10 px-5 max-md:flex-col-reverse max-md:text-center">
        <Reveal variant="fade-right" className="flex-1 max-md:mt-10">
          <h3 className="mb-5 text-lg font-semibold text-primary">
            {profile.greeting}
          </h3>
          <h1 className="mb-2.5 text-5xl font-bold text-heading max-lg:text-[40px] max-sm:text-[32px]">
            {profile.name}
          </h1>
          <h2 className="mb-5 text-2xl font-semibold text-text max-lg:text-xl max-sm:text-lg">
            <Typewriter text={profile.jobTitle} />
          </h2>
          <p className="mb-[30px] max-w-[600px] text-base leading-[1.8] text-text max-md:mx-auto">
            {profile.heroDescription}
          </p>
          <div className="mt-[30px] flex gap-5 max-md:justify-center">
            {profile.ctaButtons.map((cta) => (
              <Button
                key={cta.id}
                href={cta.href}
                variant={cta.style === "PRIMARY" ? "primary" : "outline"}
              >
                {cta.label}
              </Button>
            ))}
          </div>
          <div className="mt-[30px] flex gap-[15px] max-md:justify-center">
            {socialLinks.map((link) => (
              <a
                key={link.id}
                href={link.url}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-card text-text shadow-card transition-all duration-300 hover:-translate-y-1 hover:text-primary"
              >
                <Icon name={link.iconKey ?? ""} />
              </a>
            ))}
          </div>
        </Reveal>
        <Reveal
          variant="fade-left"
          className="flex flex-1 justify-end max-md:justify-center"
        >
          <div className="relative h-[350px] w-[350px] overflow-hidden rounded-full bg-card shadow-card max-sm:h-[250px] max-sm:w-[250px]">
            {profile.heroImageUrl && (
              <Image
                src={profile.heroImageUrl}
                alt={profile.name}
                fill
                sizes="350px"
                className="object-cover"
                priority
              />
            )}
          </div>
        </Reveal>
      </div>
      <a
        href="#about"
        className="absolute bottom-[30px] left-1/2 flex -translate-x-1/2 flex-col items-center gap-2.5 text-sm font-medium text-text"
      >
        <span>Scroll Down</span>
        <Icon name="FaChevronDown" className="animate-bounce text-xl" />
      </a>
    </section>
  );
}
