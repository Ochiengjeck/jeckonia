import { Reveal } from "@/components/interactive/Reveal";

export function SectionTitle({
  index,
  label,
  title,
  subtitle,
}: {
  index: number;
  label: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <Reveal variant="fade-up" className="mb-16">
      <p className="mb-4 font-mono text-label tracking-widest text-accent uppercase">
        {`// ${String(index).padStart(2, "0")} — ${label}`}
      </p>
      <h2 className="mb-4 max-w-3xl text-h2 font-black text-foreground">{title}</h2>
      {subtitle && <p className="max-w-xl text-lead text-text">{subtitle}</p>}
    </Reveal>
  );
}
