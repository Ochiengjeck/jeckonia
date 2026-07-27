import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { BackgroundAnimation } from "@/components/interactive/BackgroundAnimation";
import { prisma } from "@/lib/prisma";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
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
    <html lang="en" className={poppins.variable} suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <BackgroundAnimation />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
