"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { Icon } from "@/components/ui/Icon";

const links = [
  { href: "/admin", label: "Dashboard", icon: "FaGauge" },
  { href: "/admin/profile", label: "Profile", icon: "FaUser" },
  { href: "/admin/social-links", label: "Social Links", icon: "FaShareNodes" },
  { href: "/admin/nav-links", label: "Nav Links", icon: "FaBars" },
  { href: "/admin/visibility", label: "Section Visibility", icon: "FaEye" },
  { href: "/admin/skills", label: "Skills", icon: "FaChartSimple" },
  { href: "/admin/services", label: "Services", icon: "FaGear" },
  { href: "/admin/portfolio", label: "Portfolio", icon: "FaBriefcase" },
  { href: "/admin/testimonials", label: "Testimonials", icon: "FaQuoteLeft" },
  { href: "/admin/blog", label: "Blog", icon: "FaNewspaper" },
  { href: "/admin/contact-info", label: "Contact Info", icon: "FaAddressCard" },
  { href: "/admin/contact-submissions", label: "Messages", icon: "FaEnvelope" },
  { href: "/admin/newsletter", label: "Subscribers", icon: "FaPaperPlane" },
  { href: "/admin/site-settings", label: "Site Settings", icon: "FaSliders" },
  { href: "/admin/account", label: "Account", icon: "FaKey" },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex w-64 shrink-0 flex-col bg-card p-5 shadow-card">
      <h2 className="mb-8 px-2 text-lg font-bold text-heading">Admin Panel</h2>
      <nav className="flex-1 space-y-1">
        {links.map((link) => {
          const active =
            link.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 rounded-card px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                active
                  ? "bg-primary text-white"
                  : "text-text hover:bg-background"
              }`}
            >
              <Icon name={link.icon} />
              {link.label}
            </Link>
          );
        })}
      </nav>
      <button
        onClick={() => signOut({ callbackUrl: "/admin/login" })}
        className="mt-5 flex items-center gap-3 rounded-card px-3 py-2 text-sm font-medium text-danger transition-colors duration-200 hover:bg-background"
      >
        <Icon name="FaArrowRightFromBracket" />
        Log Out
      </button>
    </aside>
  );
}
