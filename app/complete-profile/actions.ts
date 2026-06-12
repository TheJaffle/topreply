"use server";

import { redirect } from "next/navigation";
import { requireCurrentUser } from "@/lib/auth/session";
import {
  buildDisplayName,
  updateUserProfile
} from "@/lib/repositories/userProfiles";

const allowedMetiers = new Set(["Artisan", "Immobilier", "Commercial B2B"]);

function getProfileData(formData: FormData) {
  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");
  const metier = formData.get("metier");

  if (
    typeof firstName !== "string" ||
    typeof lastName !== "string" ||
    typeof metier !== "string"
  ) {
    return null;
  }

  return {
    firstName: firstName.trim(),
    lastName: lastName.trim(),
    metier: metier.trim()
  };
}

export async function completeProfile(formData: FormData) {
  const profileData = getProfileData(formData);

  if (!profileData?.firstName || !profileData.lastName || !profileData.metier) {
    redirect("/complete-profile?error=missing-fields");
  }

  if (!allowedMetiers.has(profileData.metier)) {
    redirect("/complete-profile?error=missing-fields");
  }

  const user = await requireCurrentUser();

  await updateUserProfile(user.id, {
    firstName: profileData.firstName,
    lastName: profileData.lastName,
    displayName: buildDisplayName(profileData.firstName, profileData.lastName),
    metier: profileData.metier
  });

  redirect("/bibliotheque");
}
