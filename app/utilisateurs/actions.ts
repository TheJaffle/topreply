"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import { deleteUserProfilesByAuthUserIds } from "@/lib/repositories/userProfiles";

export async function deleteSelectedUsers(formData: FormData) {
  const authUserIds = formData
    .getAll("authUserIds")
    .filter((value): value is string => typeof value === "string");

  if (authUserIds.length === 0) {
    return;
  }

  const supabase = createAdminClient();

  for (const authUserId of authUserIds) {
    const { error } = await supabase.auth.admin.deleteUser(authUserId);

    if (error) {
      throw new Error(error.message);
    }
  }

  await deleteUserProfilesByAuthUserIds(authUserIds);
  revalidatePath("/utilisateurs");
}
