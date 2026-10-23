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
  variant?: "primary" | "ghost";
  className?: string;
}) {
  const base = "inline-block font-mono text-xs uppercase tracking-widest transition-colors duration-200";
  const styles =
    variant === "primary"
      ? "rounded-card bg-accent px-8 py-3 text-background hover:bg-accent-dark"
      : "text-foreground underline-offset-4 decoration-accent hover:text-accent hover:underline";

  return (
    <Link href={href} className={`${base} ${styles} ${className}`}>
      {children}
    </Link>
  );
}
