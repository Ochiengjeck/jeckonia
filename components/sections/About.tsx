import Image from "next/image";
import { getProfile, getSectionVisibility } from "@/lib/content";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/interactive/Reveal";
import { SECTION_IDS } from "@/lib/sectionIds";

export async function About() {
  const [profile, visibility] = await Promise.all([getProfile(), getSectionVisibility()]);
  if (!profile) return null;
  if (visibility.get(SECTION_IDS.about) === false) return null;

  const infoItems = [
    { label: "Email", value: profile.email },
    { label: "Phone", value: profile.phone },
    { label: "Location", value: profile.location },
    { label: "Status", value: profile.availabilityText },
  ];

  return (
    <section id={SECTION_IDS.about} className="scroll-mt-24 py-[100px]">
      <div className="container mx-auto max-w-[1200px] px-5">
        <SectionTitle
          index={1}
          label="About"
          title={profile.aboutSectionTitle}
          subtitle={profile.aboutSectionSubtitle}
        />
        <div className="flex items-start gap-[50px] max-lg:flex-col">
          {profile.showAboutImage && (
            <Reveal variant="fade-right" className="relative flex-1 max-lg:mb-10">
              <div className="relative w-full max-w-[450px] border border-accent p-3 max-lg:max-w-full">
                <div className="relative aspect-square w-full overflow-hidden">
                  {profile.aboutImageUrl && (
                    <Image
                      src={profile.aboutImageUrl}
                      alt={profile.aboutHeading}
                      fill
                      sizes="450px"
                      className="object-cover grayscale transition-all duration-700 ease-out hover:scale-105 hover:grayscale-0"
                    />
                  )}
                </div>
              </div>
            </Reveal>
          )}
          <Reveal variant="fade-left" className="flex-1">
            <h3 className="mb-5 text-h3 font-black text-foreground">{profile.aboutHeading}</h3>
            <div
              className="[&_p]:mb-5 [&_p]:text-base [&_p]:leading-[1.8] [&_p]:text-text"
              dangerouslySetInnerHTML={{ __html: profile.aboutBioHtml }}
            />
            <div className="mt-10 grid grid-cols-2 gap-5 max-sm:grid-cols-1">
              {infoItems.map((item) => (
                <div key={item.label} className="border-b border-muted-border pb-3">
                  <div className="font-mono text-label tracking-widest text-accent uppercase">
                    {item.label}
                  </div>
                  <div className="mt-1 text-foreground">{item.value}</div>
                </div>
              ))}
            </div>
            {profile.showCvButton && profile.cvFileUrl && (
              <Button href={profile.cvFileUrl} className="mt-10">
                Download CV
              </Button>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
