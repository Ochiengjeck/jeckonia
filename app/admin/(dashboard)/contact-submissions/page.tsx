import { prisma } from "@/lib/prisma";
import { markSubmissionRead, deleteSubmission } from "@/lib/actions/contactSubmissions";
import { DeleteButton } from "@/components/admin/DeleteButton";

export default async function ContactSubmissionsPage() {
  const submissions = await prisma.contactSubmission.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-heading">Messages</h1>
      <div className="space-y-4">
        {submissions.length === 0 && (
          <p className="text-text">No messages yet.</p>
        )}
        {submissions.map((submission) => (
          <div
            key={submission.id}
            className={`rounded-card bg-card p-5 shadow-card ${
              submission.isRead ? "" : "border-l-4 border-primary"
            }`}
          >
            <div className="mb-2 flex items-start justify-between">
              <div>
                <p className="font-semibold text-heading">
                  {submission.name} &lt;{submission.email}&gt;
                </p>
                <p className="text-sm text-text">{submission.subject}</p>
              </div>
              <span className="text-xs text-text">
                {submission.createdAt.toLocaleString()}
              </span>
            </div>
            <p className="mb-3 text-sm whitespace-pre-wrap text-text">
              {submission.message}
            </p>
            <div className="flex gap-4">
              {!submission.isRead && (
                <form action={markSubmissionRead}>
                  <input type="hidden" name="id" value={submission.id} />
                  <button
                    type="submit"
                    className="text-sm font-medium text-primary hover:underline"
                  >
                    Mark as read
                  </button>
                </form>
              )}
              <DeleteButton id={submission.id} action={deleteSubmission} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
