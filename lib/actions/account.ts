"use server";

import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/requireAdmin";

export async function updateAccount(
  formData: FormData
): Promise<{ error?: string; success?: string }> {
  const session = await requireAdmin();
  const userId = session.user.id;

  const currentPassword = formData.get("currentPassword") as string;
  const newEmail = formData.get("email") as string;
  const newPassword = formData.get("newPassword") as string;

  const user = await prisma.user.findUniqueOrThrow({ where: { id: userId } });
  const valid = await bcrypt.compare(currentPassword, user.passwordHash);
  if (!valid) {
    return { error: "Current password is incorrect." };
  }

  await prisma.user.update({
    where: { id: userId },
    data: {
      email: newEmail || user.email,
      passwordHash: newPassword
        ? await bcrypt.hash(newPassword, 10)
        : user.passwordHash,
    },
  });

  return { success: "Account updated. Log in again if you changed your email." };
}
