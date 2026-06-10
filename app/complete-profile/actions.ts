"use server";

import { redirect } from "next/navigation";
import { ensureUserProfile } from "@/lib/repositories/userProfiles";
import { createClient } from "@/lib/supabase/server";

function getProfileData(formData: FormData) {
  const displayName = formData.get("displayName");
  const metier = formData.get("metier");

  if (typeof displayName !== "string" || typeof metier !== "string") {
    return null;
  }

  return {
    displayName: displayName.trim(),
    metier: metier.trim()
  };
}

export async function completeProfile(formData: FormData) {
  const profileData = getProfileData(formData);

  if (!profileData?.displayName || !profileData.metier) {
    redirect("/complete-profile?error=missing-fields");
  }

  const supabase = await createClient();
  const {
    data: { session }
  } = await supabase.auth.getSession();

  const user = session?.user;

  if (!user?.id || !user.email) {
    redirect("/login");
  }

  await ensureUserProfile({
    authUserId: user.id,
    email: user.email,
    displayName: profileData.displayName,
    metier: profileData.metier
  });

  redirect("/bibliotheque");
}
