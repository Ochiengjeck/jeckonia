import { Reveal } from "@/components/interactive/Reveal";

export function SectionTitle({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <Reveal variant="fade-up" className="mb-15 text-center">
      <h2 className="relative mb-5 inline-block text-3xl font-bold text-heading after:absolute after:-bottom-2.5 after:left-1/2 after:h-1 after:w-[70px] after:-translate-x-1/2 after:rounded after:bg-primary md:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mx-auto max-w-[600px] text-base leading-[1.8] text-text">
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
