"use server";

import { redirect } from "next/navigation";
import { deleteCurrentSession, requireCurrentUser } from "@/lib/auth/session";
import { deleteUserProfilesByIds } from "@/lib/repositories/userProfiles";

function getSelectedUserIds(formData: FormData) {
  return formData
    .getAll("userIds")
    .filter((value): value is string => typeof value === "string")
    .map((value: string) => value.trim())
    .filter(Boolean);
}

export async function deleteSelectedUsers(formData: FormData) {
  const currentUser = await requireCurrentUser();
  const userIds = getSelectedUserIds(formData);

  if (userIds.length === 0) {
    redirect("/utilisateurs?status=empty");
  }

  const includesCurrentUser = userIds.includes(currentUser.id);

  await deleteUserProfilesByIds(userIds);

  if (includesCurrentUser) {
    await deleteCurrentSession();
    redirect("/login?message=account-deleted");
  }

  redirect(`/utilisateurs?status=deleted&count=${userIds.length}`);
}
