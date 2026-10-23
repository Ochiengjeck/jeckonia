import { getNavLinks, getSiteSettings } from "@/lib/content";
import { HeaderClient } from "@/components/interactive/HeaderClient";

export async function Header() {
  const [navLinks, settings] = await Promise.all([getNavLinks(), getSiteSettings()]);
  const siteName = settings?.siteTitle.split(" |")[0] ?? "Jeckonia Opiyo";
  return <HeaderClient navLinks={navLinks} siteName={siteName} />;
}
