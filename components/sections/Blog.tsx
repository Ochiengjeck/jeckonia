import Image from "next/image";
import Link from "next/link";
import { getPublishedBlogPosts, getSectionVisibility } from "@/lib/content";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/interactive/Reveal";
import { SECTION_IDS } from "@/lib/sectionIds";

export async function Blog() {
  const [posts, visibility] = await Promise.all([
    getPublishedBlogPosts(3),
    getSectionVisibility(),
  ]);
  if (visibility.get(SECTION_IDS.blog) === false) return null;

  return (
    <section id={SECTION_IDS.blog} className="scroll-mt-24 py-[100px]">
      <div className="container mx-auto max-w-[1200px] px-5">
        <SectionTitle
          index={6}
          label="Blog"
          title="Latest Blog Posts"
          subtitle="Stay updated with my latest thoughts, insights, and tutorials on software development and technology."
        />
        <div className="grid grid-cols-1 gap-[30px] sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <Reveal key={post.id} variant="fade-up" delay={i * 80}>
              <div className="group overflow-hidden border border-muted-border transition-colors duration-200 hover:border-accent">
                {post.coverImageUrl && (
                  <div className="relative h-[200px] overflow-hidden">
                    <Image
                      src={post.coverImageUrl}
                      alt={post.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                )}
                <div className="p-[25px]">
                  <div className="mb-2.5 flex items-center font-mono text-sm text-text">
                    <Icon name="FaCalendarDays" className="mr-2 text-accent" />
                    <span>
                      {post.publishedAt?.toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <h3 className="mb-[15px] text-xl leading-snug font-bold text-foreground">
                    {post.title}
                  </h3>
                  <p className="mb-5 text-[15px] leading-[1.7] text-text">{post.excerpt}</p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center font-mono text-xs uppercase tracking-widest text-foreground transition-colors duration-200 hover:text-accent"
                  >
                    Read More <Icon name="FaArrowRight" className="ml-1.5" />
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
