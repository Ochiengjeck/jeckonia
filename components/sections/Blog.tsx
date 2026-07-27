import Image from "next/image";
import Link from "next/link";
import { getPublishedBlogPosts } from "@/lib/content";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Icon } from "@/components/ui/Icon";

export async function Blog() {
  const posts = await getPublishedBlogPosts(3);

  return (
    <section id="blog" className="scroll-mt-24 py-[100px]">
      <div className="container mx-auto max-w-[1200px] px-5">
        <SectionTitle
          title="Latest Blog Posts"
          subtitle="Stay updated with my latest thoughts, insights, and tutorials on software development and technology."
        />
        <div className="grid grid-cols-1 gap-[30px] sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <div
              key={post.id}
              className="group overflow-hidden rounded-card bg-card shadow-card transition-transform duration-300 hover:-translate-y-2.5"
            >
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
                <div className="mb-2.5 flex items-center text-sm text-text">
                  <Icon name="FaCalendarDays" className="mr-2 text-primary" />
                  <span>
                    {post.publishedAt?.toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <h3 className="mb-[15px] text-xl leading-snug font-semibold text-heading">
                  {post.title}
                </h3>
                <p className="mb-5 text-[15px] leading-[1.7] text-text">
                  {post.excerpt}
                </p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center font-medium text-primary transition-colors duration-300 hover:text-primary-dark"
                >
                  Read More <Icon name="FaArrowRight" className="ml-1.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
