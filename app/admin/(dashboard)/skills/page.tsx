import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteSkill } from "@/lib/actions/skills";
import { DeleteButton } from "@/components/admin/DeleteButton";

export default async function SkillsPage() {
  const skills = await prisma.skill.findMany({ orderBy: [{ category: "asc" }, { order: "asc" }] });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-heading">Skills</h1>
        <Link
          href="/admin/skills/new"
          className="rounded-card bg-primary px-5 py-2.5 font-medium text-white hover:bg-primary-dark"
        >
          Add New
        </Link>
      </div>
      <div className="overflow-hidden rounded-card bg-card shadow-card">
        <table className="w-full text-left text-sm">
          <thead className="bg-background text-heading">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Category</th>
              <th className="p-4">Percent</th>
              <th className="p-4">Icon</th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody>
            {skills.map((skill) => (
              <tr key={skill.id} className="border-t border-black/5">
                <td className="p-4 text-text">{skill.name}</td>
                <td className="p-4 text-text">{skill.category}</td>
                <td className="p-4 text-text">{skill.percent ?? "—"}</td>
                <td className="p-4 text-text">{skill.iconUrl ? "Yes" : "—"}</td>
                <td className="space-x-4 p-4 text-right">
                  <Link
                    href={`/admin/skills/${skill.id}/edit`}
                    className="font-medium text-primary hover:underline"
                  >
                    Edit
                  </Link>
                  <DeleteButton id={skill.id} action={deleteSkill} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
