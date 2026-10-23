import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import DOMPurify from "isomorphic-dompurify";
import { getBlogPostBySlug, getSiteSettings } from "@/lib/content";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { BackToTop } from "@/components/sections/BackToTop";
import { Icon } from "@/components/ui/Icon";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const [post, settings] = await Promise.all([
    getBlogPostBySlug(slug),
    getSiteSettings(),
  ]);
  if (!post) return {};

  return {
    title: `${post.title} | ${settings?.siteTitle ?? "Jeckonia Opiyo"}`,
    description: post.excerpt,
    openGraph:
      post.coverImageUrl || settings?.ogImageUrl
        ? { images: [{ url: post.coverImageUrl ?? settings!.ogImageUrl! }] }
        : undefined,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  const contentHtml = DOMPurify.sanitize(post.contentHtml);

  return (
    <>
      <Header />
      <main className="scroll-mt-24 py-[100px] pt-40">
        <article className="container mx-auto max-w-[800px] px-5">
          <Link
            href="/#blog"
            className="mb-8 inline-flex items-center font-mono text-xs uppercase tracking-widest text-foreground transition-colors duration-200 hover:text-accent"
          >
            <Icon name="FaArrowLeft" className="mr-1.5" /> Back to Blog
          </Link>
          <div className="mb-5 flex items-center font-mono text-sm text-text">
            <Icon name="FaCalendarDays" className="mr-2 text-accent" />
            <span>
              {post.publishedAt?.toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
          <h1 className="mb-8 text-h1 font-black text-foreground">{post.title}</h1>
          {post.coverImageUrl && (
            <div className="relative mb-10 h-[300px] w-full overflow-hidden border border-muted-border md:h-[400px]">
              <Image
                src={post.coverImageUrl}
                alt={post.title}
                fill
                sizes="800px"
                className="object-cover"
                priority
              />
            </div>
          )}
          <div
            className="[&_a]:text-accent [&_blockquote]:border-l-4 [&_blockquote]:border-accent [&_blockquote]:pl-5 [&_blockquote]:italic [&_h2]:mt-8 [&_h2]:mb-4 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-foreground [&_h3]:mt-6 [&_h3]:mb-3 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-foreground [&_li]:mb-2 [&_ol]:mb-5 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:mb-5 [&_p]:text-base [&_p]:leading-[1.8] [&_p]:text-text [&_ul]:mb-5 [&_ul]:list-disc [&_ul]:pl-6"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
        </article>
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
