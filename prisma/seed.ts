import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const adapter = new PrismaBetterSqlite3({ url: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  // --- Admin user -----------------------------------------------------
  const adminEmail = process.env.ADMIN_SEED_EMAIL;
  const adminPassword = process.env.ADMIN_SEED_PASSWORD;
  if (!adminEmail || !adminPassword) {
    throw new Error(
      "ADMIN_SEED_EMAIL and ADMIN_SEED_PASSWORD must be set (see .env)"
    );
  }
  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      passwordHash: await bcrypt.hash(adminPassword, 10),
      name: "Jeckonia Opiyo",
    },
  });

  // --- Site settings ----------------------------------------------------
  await prisma.siteSettings.upsert({
    where: { id: "singleton" },
    update: {},
    create: {
      id: "singleton",
      siteTitle: "Jeckonia Opiyo | Software Engineer",
      metaDescription:
        "Portfolio of Jeckonia Opiyo, a software engineer specializing in full-stack development, cloud architecture, and mobile app development.",
      footerTagline:
        "A passionate software engineer dedicated to creating innovative and efficient solutions for complex problems. Let's work together to bring your ideas to life.",
      designerCreditText: "Designed with love by Jeckonia",
    },
  });

  // --- Profile (hero + about) --------------------------------------------
  await prisma.profile.upsert({
    where: { id: "singleton" },
    update: {},
    create: {
      id: "singleton",
      greeting: "Hello, I'm",
      name: "Jeckonia Opiyo",
      jobTitle: "Software Engineer",
      heroDescription:
        "I'm a passionate software engineer with expertise in building robust and scalable applications. I specialize in full-stack development, cloud architecture, and delivering high-quality software solutions that solve real-world problems.",
      heroImageUrl: "/uploads/profile/ppic.jpg",
      aboutSectionTitle: "About Me",
      aboutSectionSubtitle:
        "Get to know me better - my background, experience, and what drives me as a software engineer.",
      aboutImageUrl: "/uploads/about/2nrf.jpg",
      aboutHeading: "I'm Jeckonia, a Professional Software Engineer",
      aboutBioHtml:
        "<p>I am a dedicated software engineer with over 5 years of experience in developing innovative software solutions. My journey in the tech world began with a deep curiosity about how things work, which eventually led me to pursue a career in software engineering.</p><p>I specialize in full-stack development, creating seamless and responsive applications that deliver exceptional user experiences. My expertise spans across various programming languages and frameworks, allowing me to adapt to different project requirements and challenges.</p>",
      email: "ochiengjeck@gmail.com",
      phone: "+254 768 061759",
      location: "Kisumu, Kenya",
      availabilityText: "Available for freelance",
      cvFileUrl: null,
      ctaButtons: {
        create: [
          { label: "View My Work", href: "#portfolio", style: "PRIMARY", order: 0 },
          { label: "Contact Me", href: "#contact", style: "OUTLINE", order: 1 },
        ],
      },
      experienceStats: {
        create: [
          { number: "5+", label: "Years of Experience", order: 0 },
          { number: "50+", label: "Projects Completed", order: 1 },
          { number: "30+", label: "Happy Clients", order: 2 },
        ],
      },
    },
  });

  // --- Social links (shared by Hero + Footer) ----------------------------
  // Seeded with "#" placeholders since the original site never had real
  // profile URLs wired up — fill in via /admin/social-links.
  const socialLinks: {
    platform: "GITHUB" | "LINKEDIN" | "TWITTER" | "INSTAGRAM" | "DRIBBBLE";
    iconKey: string;
    url: string;
  }[] = [
    { platform: "GITHUB", iconKey: "FaGithub", url: "#" },
    { platform: "LINKEDIN", iconKey: "FaLinkedin", url: "#" },
    { platform: "TWITTER", iconKey: "FaTwitter", url: "#" },
    { platform: "INSTAGRAM", iconKey: "FaInstagram", url: "#" },
    { platform: "DRIBBBLE", iconKey: "FaDribbble", url: "#" },
  ];
  for (const [i, link] of socialLinks.entries()) {
    await upsertSingleton("socialLink", { platform: link.platform }, { ...link, order: i });
  }

  // --- Nav links (also drives Footer "Quick Links") ----------------------
  const navLinks = [
    { label: "Home", anchor: "#home" },
    { label: "About", anchor: "#about" },
    { label: "Skills", anchor: "#skills" },
    { label: "Services", anchor: "#services" },
    { label: "Portfolio", anchor: "#portfolio" },
    { label: "Testimonials", anchor: "#testimonials" },
    { label: "Blog", anchor: "#blog" },
    { label: "Contact", anchor: "#contact" },
  ];
  for (const [i, nav] of navLinks.entries()) {
    await upsertSingleton("navLink", { anchor: nav.anchor }, { ...nav, order: i, visible: true });
  }

  // --- Skills --------------------------------------------------------------
  // Docker had only an icon badge in the old markup with no local svg asset
  // and no skill-bar percentage; left out here rather than seeding a broken
  // row -- add it via /admin/skills once an icon has been uploaded.
  const technicalSkills = [
    { name: "Flutter", percent: 95, iconUrl: "/icons/flutter.svg" },
    { name: "Python", percent: 90, iconUrl: "/icons/python.svg" },
    { name: "React.js", percent: 88, iconUrl: "/icons/react.svg" },
    { name: "Django", percent: 85, iconUrl: "/icons/django.svg" },
    { name: "SQL/NoSQL", percent: 80, iconUrl: "/icons/sql.svg" },
    { name: "Firebase", percent: 75, iconUrl: "/icons/firebase.svg" },
  ];
  const professionalSkills = [
    { name: "Problem Solving", percent: 95 },
    { name: "Team Collaboration", percent: 90 },
    { name: "Project Management", percent: 85 },
    { name: "Communication", percent: 88 },
    { name: "Time Management", percent: 80 },
  ];
  for (const [i, s] of technicalSkills.entries()) {
    await upsertSingleton(
      "skill",
      { name: s.name, category: "TECHNICAL" },
      { ...s, category: "TECHNICAL", order: i }
    );
  }
  for (const [i, s] of professionalSkills.entries()) {
    await upsertSingleton(
      "skill",
      { name: s.name, category: "PROFESSIONAL" },
      { ...s, iconUrl: null, category: "PROFESSIONAL", order: i }
    );
  }

  // --- Services (shared by Services section + Footer) ---------------------
  const services = [
    {
      icon: "FaLaptopCode",
      title: "Web Development",
      description:
        "Creating responsive, user-friendly websites and web applications using modern technologies and best practices.",
    },
    {
      icon: "FaMobileScreenButton",
      title: "Mobile App Development",
      description:
        "Building native and cross-platform mobile applications that deliver exceptional user experiences.",
    },
    {
      icon: "FaDatabase",
      title: "Database Design",
      description:
        "Designing efficient, scalable database structures and implementing robust data management solutions.",
    },
    {
      icon: "FaCloud",
      title: "Cloud Solutions",
      description:
        "Implementing and managing cloud-based infrastructure and services for optimal performance and scalability.",
    },
    {
      icon: "FaGear",
      title: "API Development",
      description:
        "Creating robust, secure, and efficient APIs to connect applications and services seamlessly.",
    },
    {
      icon: "FaCodeBranch",
      title: "DevOps & CI/CD",
      description:
        "Setting up automated development workflows and continuous integration/deployment pipelines.",
    },
  ];
  for (const [i, s] of services.entries()) {
    await upsertSingleton(
      "service",
      { title: s.title },
      { ...s, linkLabel: "Learn More", linkHref: "#", order: i }
    );
  }

  // --- Portfolio categories + items -----------------------------------------
  const categories = [
    { key: "web", label: "Web Development" },
    { key: "mobile", label: "Mobile Apps" },
    { key: "api", label: "API" },
    { key: "cloud", label: "Cloud Solutions" },
  ];
  const categoryIds: Record<string, string> = {};
  for (const [i, c] of categories.entries()) {
    const row = await prisma.portfolioCategory.upsert({
      where: { key: c.key },
      update: {},
      create: { ...c, order: i },
    });
    categoryIds[c.key] = row.id;
  }

  // Images are temporary picsum.photos placeholders carried over from the
  // original site -- replace with real screenshots via /admin/portfolio.
  const portfolioItems = [
    {
      category: "web",
      title: "E-commerce Platform",
      description:
        "A fully responsive e-commerce platform with payment integration and inventory management.",
      thumbnailImageUrl: "https://picsum.photos/id/180/600/400",
      fullImageUrl: "https://picsum.photos/id/180/1200/800",
    },
    {
      category: "mobile",
      title: "Fitness Tracker App",
      description:
        "A mobile application for tracking workouts, nutrition, and health metrics.",
      thumbnailImageUrl: "https://picsum.photos/id/160/600/400",
      fullImageUrl: "https://picsum.photos/id/160/1200/800",
    },
    {
      category: "api",
      title: "Payment Gateway API",
      description:
        "A secure API for processing payments and managing transactions.",
      thumbnailImageUrl: "https://picsum.photos/id/48/600/400",
      fullImageUrl: "https://picsum.photos/id/48/1200/800",
    },
    {
      category: "cloud",
      title: "Cloud Migration Project",
      description:
        "Successfully migrated a legacy system to a modern cloud infrastructure.",
      thumbnailImageUrl: "https://picsum.photos/id/1/600/400",
      fullImageUrl: "https://picsum.photos/id/1/1200/800",
    },
    {
      category: "web",
      title: "Real Estate Platform",
      description:
        "A comprehensive platform for property listings, virtual tours, and agent management.",
      thumbnailImageUrl: "https://picsum.photos/id/20/600/400",
      fullImageUrl: "https://picsum.photos/id/20/1200/800",
    },
    {
      category: "mobile",
      title: "Food Delivery App",
      description:
        "A user-friendly food delivery application with real-time tracking and payment processing.",
      thumbnailImageUrl: "https://picsum.photos/id/119/600/400",
      fullImageUrl: "https://picsum.photos/id/119/1200/800",
    },
  ];
  for (const [i, item] of portfolioItems.entries()) {
    const { category, ...rest } = item;
    await upsertSingleton(
      "portfolioItem",
      { title: item.title },
      { ...rest, categoryId: categoryIds[category], order: i }
    );
  }

  // --- Testimonials -----------------------------------------------------
  const testimonials = [
    {
      quote:
        "Jeckonia is an exceptional software engineer. His technical expertise and problem-solving skills helped us deliver a complex project ahead of schedule. He's a valuable asset to any development team.",
      authorName: "Wilfred Mutwiri",
      authorRole: "CTO, DestiKert Technologies",
      authorImageUrl: "/uploads/testimonials/wilfred.jpg",
    },
    {
      quote:
        "Working with Jeckonia was a pleasure. He understood our business requirements perfectly and delivered a solution that exceeded our expectations. His attention to detail and commitment to quality are impressive.",
      authorName: "Abigail Kipchirchir",
      authorRole: "Product Manager, Digital Solutions",
      authorImageUrl: "/uploads/testimonials/abby.jpg",
    },
    {
      quote:
        "Jeckonia's expertise in cloud architecture saved us thousands in infrastructure costs. He redesigned our system for better scalability and performance. I highly recommend his services to anyone looking for a skilled software engineer.",
      authorName: "Mercy Jepchirchir",
      authorRole: "CEO, Cloud Enterprises",
      authorImageUrl: "/uploads/testimonials/mercy.jpg",
    },
  ];
  for (const [i, t] of testimonials.entries()) {
    await upsertSingleton("testimonial", { authorName: t.authorName }, { ...t, order: i });
  }

  // --- Blog posts ---------------------------------------------------------
  const blogPosts = [
    {
      slug: "comparing-modern-javascript-frameworks",
      title: "Comparing Modern JavaScript Frameworks: React vs Vue vs Angular",
      excerpt:
        "An in-depth analysis of the most popular JavaScript frameworks, their strengths, weaknesses, and ideal use cases.",
      coverImageUrl: "https://picsum.photos/id/0/600/400",
      publishedAt: new Date("2023-03-15"),
    },
    {
      slug: "best-practices-scalable-cloud-architecture",
      title: "Best Practices for Scalable Cloud Architecture",
      excerpt:
        "Learn how to design cloud systems that can handle growth, maintain performance, and optimize costs.",
      coverImageUrl: "https://picsum.photos/id/1/600/400",
      publishedAt: new Date("2023-02-28"),
    },
    {
      slug: "native-vs-cross-platform-mobile-development",
      title:
        "Native vs Cross-Platform Mobile Development: Making the Right Choice",
      excerpt:
        "A comprehensive guide to help you decide between native and cross-platform approaches for your mobile app project.",
      coverImageUrl: "https://picsum.photos/id/160/600/400",
      publishedAt: new Date("2023-01-10"),
    },
  ];
  for (const post of blogPosts) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: {},
      create: {
        ...post,
        contentHtml: `<p>${post.excerpt}</p>`,
        status: "PUBLISHED",
      },
    });
  }

  // --- Contact info items ---------------------------------------------------
  // `type` drives a derived href at render time (mailto:/tel:/raw url),
  // which is what fixes the original tel-href/display-number mismatch.
  const contactInfo: {
    type: "LOCATION" | "EMAIL" | "PHONE" | "WEBSITE";
    icon: string;
    label: string;
    displayValue: string;
  }[] = [
    { type: "LOCATION", icon: "FaMapLocationDot", label: "Location", displayValue: "Kisumu, Kenya" },
    { type: "EMAIL", icon: "FaEnvelope", label: "Email", displayValue: "ochiengjeck@gmail.com" },
    { type: "PHONE", icon: "FaPhone", label: "Phone", displayValue: "+254 768 061759" },
    { type: "WEBSITE", icon: "FaGlobe", label: "Website", displayValue: "https://jeckonia-opiyo-portfolio.vercel.app/" },
  ];
  for (const [i, c] of contactInfo.entries()) {
    await upsertSingleton("contactInfoItem", { type: c.type }, { ...c, order: i });
  }

  console.log("Seed complete.");
  console.log(
    `Admin login: ${adminEmail} / (the password from ADMIN_SEED_PASSWORD -- change it at /admin/account after first login)`
  );
}

// Small helper: several models above have no natural unique constraint to
// upsert on, so this finds-or-creates by a partial match instead of
// duplicating rows every time the seed script is re-run.
async function upsertSingleton(
  model: keyof PrismaClient,
  where: Record<string, unknown>,
  data: Record<string, unknown>
) {
  // @ts-expect-error -- generic delegate access, model-specific types checked by callers
  const existing = await prisma[model].findFirst({ where });
  if (existing) return existing;
  // @ts-expect-error -- generic delegate access, model-specific types checked by callers
  return prisma[model].create({ data });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
