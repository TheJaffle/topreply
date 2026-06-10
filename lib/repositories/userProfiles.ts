import { prisma } from "@/lib/prisma";

type EnsureUserProfileInput = Readonly<{
  authUserId: string;
  email: string;
  displayName?: string | null;
  metier: string;
}>;

export async function getUserProfileByAuthUserId(authUserId: string) {
  return prisma.userProfile.findUnique({
    where: { authUserId }
  });
}

export function isUserProfileComplete(profile: {
  displayName: string | null;
  metier: string;
} | null) {
  return Boolean(profile?.displayName?.trim() && profile.metier.trim());
}

export async function getUserProfilesByAuthUserIds(authUserIds: string[]) {
  if (authUserIds.length === 0) {
    return [];
  }

  return prisma.userProfile.findMany({
    where: {
      authUserId: {
        in: authUserIds
      }
    }
  });
}

export async function ensureUserProfile({
  authUserId,
  email,
  displayName = null,
  metier
}: EnsureUserProfileInput) {
  return prisma.userProfile.upsert({
    where: { authUserId },
    create: {
      authUserId,
      email,
      displayName,
      metier
    },
    update: {
      email,
      displayName: displayName ?? undefined,
      metier
    }
  });
}

export async function deleteUserProfilesByAuthUserIds(authUserIds: string[]) {
  if (authUserIds.length === 0) {
    return;
  }

  await prisma.userProfile.deleteMany({
    where: {
      authUserId: {
        in: authUserIds
      }
    }
  });
}
