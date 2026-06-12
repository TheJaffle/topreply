"use server";

import { redirect } from "next/navigation";
import { requireCurrentUser } from "@/lib/auth/session";
import { updateUserProfile } from "@/lib/repositories/userProfiles";

const allowedMetiers = new Set(["Artisan", "Immobilier", "Commercial B2B"]);

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

  if (!allowedMetiers.has(profileData.metier)) {
    redirect("/complete-profile?error=missing-fields");
  }

  const user = await requireCurrentUser();

  await updateUserProfile(user.id, {
    displayName: profileData.displayName,
    metier: profileData.metier
  });

  redirect("/bibliotheque");
}
