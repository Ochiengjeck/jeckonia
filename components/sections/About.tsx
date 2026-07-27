import Image from "next/image";
import { getProfile } from "@/lib/content";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/interactive/Reveal";

export async function About() {
  const profile = await getProfile();
  if (!profile) return null;

  const infoItems = [
    { icon: "FaEnvelope", text: profile.email },
    { icon: "FaPhone", text: profile.phone },
    { icon: "FaMapLocationDot", text: profile.location },
    { icon: "FaCalendarDays", text: profile.availabilityText },
  ];

  return (
    <section id="about" className="scroll-mt-24 py-[100px]">
      <div className="container mx-auto max-w-[1200px] px-5">
        <SectionTitle
          title={profile.aboutSectionTitle}
          subtitle={profile.aboutSectionSubtitle}
        />
        <div className="flex items-center gap-[50px] max-lg:flex-col">
          <Reveal variant="fade-right" className="relative flex-1 max-lg:mb-10">
            <div className="relative h-[450px] w-full max-w-[450px] overflow-hidden rounded-card bg-card shadow-card max-lg:max-w-full">
              {profile.aboutImageUrl && (
                <Image
                  src={profile.aboutImageUrl}
                  alt={profile.aboutHeading}
                  fill
                  sizes="450px"
                  className="object-cover"
                />
              )}
            </div>
          </Reveal>
          <Reveal variant="fade-left" className="flex-1">
            <h3 className="mb-5 text-[30px] font-bold text-heading max-sm:text-2xl">
              {profile.aboutHeading}
            </h3>
            <div
              className="[&_p]:mb-5 [&_p]:text-base [&_p]:leading-[1.8] [&_p]:text-text"
              dangerouslySetInnerHTML={{ __html: profile.aboutBioHtml }}
            />
            <div className="mt-[30px] grid grid-cols-2 gap-5 max-sm:grid-cols-1">
              {infoItems.map((item) => (
                <div key={item.icon} className="flex items-center">
                  <span className="mr-[15px] flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-card text-primary shadow-card">
                    <Icon name={item.icon} />
                  </span>
                  <span className="font-medium text-heading">{item.text}</span>
                </div>
              ))}
            </div>
            <div className="mt-10 flex gap-[30px] max-sm:flex-col">
              {profile.experienceStats.map((stat) => (
                <div
                  key={stat.id}
                  className="flex-1 rounded-card bg-card p-[30px] text-center shadow-card transition-transform duration-300 hover:-translate-y-2.5"
                >
                  <div className="mb-2.5 text-[36px] font-bold text-primary">
                    {stat.number}
                  </div>
                  <div className="text-base text-text">{stat.label}</div>
                </div>
              ))}
            </div>
            {profile.cvFileUrl && (
              <Button href={profile.cvFileUrl} className="mt-[30px]">
                Download CV
              </Button>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
