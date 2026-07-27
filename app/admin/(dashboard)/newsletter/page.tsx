import { prisma } from "@/lib/prisma";
import { deleteSubscriber } from "@/lib/actions/newsletter";
import { DeleteButton } from "@/components/admin/DeleteButton";

export default async function NewsletterPage() {
  const subscribers = await prisma.newsletterSubscriber.findMany({
    orderBy: { subscribedAt: "desc" },
  });

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-heading">Newsletter Subscribers</h1>
      <div className="overflow-hidden rounded-card bg-card shadow-card">
        <table className="w-full text-left text-sm">
          <thead className="bg-background text-heading">
            <tr>
              <th className="p-4">Email</th>
              <th className="p-4">Subscribed</th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody>
            {subscribers.map((subscriber) => (
              <tr key={subscriber.id} className="border-t border-black/5">
                <td className="p-4 text-text">{subscriber.email}</td>
                <td className="p-4 text-text">
                  {subscriber.subscribedAt.toLocaleDateString()}
                </td>
                <td className="p-4 text-right">
                  <DeleteButton id={subscriber.id} action={deleteSubscriber} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
