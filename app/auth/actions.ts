"use server";

import { redirect } from "next/navigation";
import { hashPassword, verifyPassword } from "@/lib/auth/password";
import { createSession, deleteCurrentSession } from "@/lib/auth/session";
import {
  buildDisplayName,
  createUserProfile,
  getUserProfileByEmail,
  isUserProfileComplete
} from "@/lib/repositories/userProfiles";

const allowedMetiers = new Set(["Artisan", "Immobilier", "Commercial B2B"]);

function getLoginCredentials(formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");

  if (typeof email !== "string" || typeof password !== "string") {
    return null;
  }

  return {
    email: email.trim(),
    password
  };
}

function getSignupCredentials(formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");
  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");
  const metier = formData.get("metier");

  if (
    typeof email !== "string" ||
    typeof password !== "string" ||
    typeof firstName !== "string" ||
    typeof lastName !== "string" ||
    typeof metier !== "string"
  ) {
    return null;
  }

  return {
    email: email.trim(),
    password,
    firstName: firstName.trim(),
    lastName: lastName.trim(),
    metier: metier.trim()
  };
}

export async function login(formData: FormData) {
  const credentials = getLoginCredentials(formData);

  if (!credentials?.email || !credentials.password) {
    redirect("/login?error=missing-fields");
  }

  const profile = await getUserProfileByEmail(credentials.email);

  if (!profile || !verifyPassword(credentials.password, profile.passwordHash)) {
    redirect("/login?error=invalid-credentials");
  }

  await createSession(profile.id);

  redirect(isUserProfileComplete(profile) ? "/bibliotheque" : "/complete-profile");
}

export async function signup(formData: FormData) {
  const credentials = getSignupCredentials(formData);

  if (!credentials?.email || !credentials.password || !credentials.metier) {
    redirect("/signup?error=missing-fields");
  }

  if (!credentials.firstName) {
    redirect("/signup?error=missing-first-name");
  }

  if (!credentials.lastName) {
    redirect("/signup?error=missing-last-name");
  }

  if (!allowedMetiers.has(credentials.metier)) {
    redirect("/signup?error=invalid-metier");
  }

  const existingProfile = await getUserProfileByEmail(credentials.email);

  if (existingProfile) {
    redirect("/signup?error=email-exists");
  }

  await createUserProfile({
    email: credentials.email,
    passwordHash: hashPassword(credentials.password),
    firstName: credentials.firstName,
    lastName: credentials.lastName,
    displayName: buildDisplayName(credentials.firstName, credentials.lastName),
    metier: credentials.metier
  });

  redirect("/login?message=signup-success");
}

export async function logout() {
  await deleteCurrentSession();
  redirect("/login");
}
