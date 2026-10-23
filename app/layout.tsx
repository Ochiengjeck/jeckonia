import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { prisma } from "@/lib/prisma";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await prisma.siteSettings.findUnique({
    where: { id: "singleton" },
  });

  return {
    title: settings?.siteTitle ?? "Jeckonia Opiyo | Software Engineer",
    description:
      settings?.metaDescription ??
      "Portfolio of Jeckonia Opiyo, a software engineer specializing in full-stack development, cloud architecture, and mobile apps.",
    openGraph: settings?.ogImageUrl
      ? { images: [{ url: settings.ogImageUrl }] }
      : undefined,
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
      data-scroll-behavior="smooth"
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
