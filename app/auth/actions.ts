"use server";

import { redirect } from "next/navigation";
import { ensureUserProfile } from "@/lib/repositories/userProfiles";
import {
  getUserProfileByAuthUserId,
  isUserProfileComplete
} from "@/lib/repositories/userProfiles";
import { createClient } from "@/lib/supabase/server";

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
  const displayName = formData.get("displayName");
  const metier = formData.get("metier");

  if (
    typeof email !== "string" ||
    typeof password !== "string" ||
    typeof displayName !== "string" ||
    typeof metier !== "string"
  ) {
    return null;
  }

  return {
    email: email.trim(),
    password,
    displayName: displayName.trim(),
    metier: metier.trim()
  };
}

export async function login(formData: FormData) {
  const credentials = getLoginCredentials(formData);

  if (!credentials?.email || !credentials.password) {
    redirect("/login?error=missing-fields");
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword(credentials);

  if (error) {
    redirect("/login?error=invalid-credentials");
  }

  const authUserId = data.user?.id;

  if (!authUserId) {
    redirect("/complete-profile");
  }

  const profile = await getUserProfileByAuthUserId(authUserId);

  redirect(isUserProfileComplete(profile) ? "/bibliotheque" : "/complete-profile");
}

export async function signup(formData: FormData) {
  const credentials = getSignupCredentials(formData);

  if (
    !credentials?.email ||
    !credentials.password ||
    !credentials.displayName ||
    !credentials.metier
  ) {
    redirect("/signup?error=missing-fields");
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email: credentials.email,
    password: credentials.password
  });

  if (error) {
    redirect(`/signup?error=${encodeURIComponent(error.message)}`);
  }

  if (data.user?.id && data.user.email) {
    await ensureUserProfile({
      authUserId: data.user.id,
      email: data.user.email,
      displayName: credentials.displayName,
      metier: credentials.metier
    });
  }

  redirect("/login?message=signup-success");
}

export async function logout() {
  const supabase = await createClient();

  await supabase.auth.signOut();
  redirect("/login");
}
