import { getNavLinks } from "@/lib/content";
import { HeaderClient } from "@/components/interactive/HeaderClient";

export async function Header() {
  const navLinks = await getNavLinks();
  return <HeaderClient navLinks={navLinks} />;
}
