import * as Fa6 from "react-icons/fa6";
import type { IconType } from "react-icons";

const icons = Fa6 as unknown as Record<string, IconType>;

export function Icon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Component = icons[name];
  if (!Component) return null;
  return <Component className={className} aria-hidden="true" />;
}
