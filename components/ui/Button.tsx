import Link from "next/link";
import type { ReactNode } from "react";

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "outline";
  className?: string;
}) {
  const base =
    "inline-block rounded-card px-8 py-3 font-medium transition-all duration-300 shadow-[0_4px_6px_rgba(50,50,93,0.11),0_1px_3px_rgba(0,0,0,0.08)] hover:-translate-y-1 hover:shadow-[0_7px_14px_rgba(50,50,93,0.1),0_3px_6px_rgba(0,0,0,0.08)]";
  const styles =
    variant === "primary"
      ? "bg-primary text-white hover:bg-primary-dark"
      : "bg-transparent text-primary border-2 border-primary hover:bg-primary hover:text-white";

  return (
    <Link href={href} className={`${base} ${styles} ${className}`}>
      {children}
    </Link>
  );
}
