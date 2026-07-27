import { prisma } from "@/lib/prisma";

async function getCounts() {
  const [unreadMessages, publishedPosts, draftPosts, subscribers, portfolioItems] =
    await Promise.all([
      prisma.contactSubmission.count({ where: { isRead: false } }),
      prisma.blogPost.count({ where: { status: "PUBLISHED" } }),
      prisma.blogPost.count({ where: { status: "DRAFT" } }),
      prisma.newsletterSubscriber.count(),
      prisma.portfolioItem.count(),
    ]);
  return { unreadMessages, publishedPosts, draftPosts, subscribers, portfolioItems };
}

async function getPlaceholderFlags() {
  const [deadSocialLinks, placeholderPortfolioImages] = await Promise.all([
    prisma.socialLink.count({ where: { url: "#" } }),
    prisma.portfolioItem.count({
      where: { thumbnailImageUrl: { contains: "picsum.photos" } },
    }),
  ]);
  return { deadSocialLinks, placeholderPortfolioImages };
}

export default async function AdminDashboardPage() {
  const counts = await getCounts();
  const flags = await getPlaceholderFlags();

  const stats = [
    { label: "Unread Messages", value: counts.unreadMessages },
    { label: "Published Posts", value: counts.publishedPosts },
    { label: "Draft Posts", value: counts.draftPosts },
    { label: "Newsletter Subscribers", value: counts.subscribers },
    { label: "Portfolio Items", value: counts.portfolioItems },
  ];

  const checklist = [
    {
      label: "Social links still point to \"#\"",
      count: flags.deadSocialLinks,
    },
    {
      label: "Portfolio items still use placeholder images",
      count: flags.placeholderPortfolioImages,
    },
  ].filter((item) => item.count > 0);

  return (
    <div>
      <h1 className="mb-8 text-2xl font-bold text-heading">Dashboard</h1>
      <div className="mb-8 grid grid-cols-2 gap-5 lg:grid-cols-5">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-card bg-card p-5 text-center shadow-card"
          >
            <div className="text-3xl font-bold text-primary">{stat.value}</div>
            <div className="mt-1 text-sm text-text">{stat.label}</div>
          </div>
        ))}
      </div>
      {checklist.length > 0 && (
        <div className="rounded-card bg-card p-5 shadow-card">
          <h2 className="mb-3 font-semibold text-heading">Content Health</h2>
          <ul className="space-y-2 text-sm text-text">
            {checklist.map((item) => (
              <li key={item.label}>
                <span className="font-medium text-warning">{item.count}</span>{" "}
                {item.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
