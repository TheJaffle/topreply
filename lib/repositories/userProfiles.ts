import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

type CreateUserProfileInput = Readonly<{
  email: string;
  passwordHash: string;
  displayName?: string | null;
  metier: string;
}>;

type UpdateUserProfileInput = Readonly<{
  displayName?: string | null;
  metier?: string;
  passwordHash?: string;
}>;

export type UserProfileRecord = Prisma.UserProfileGetPayload<Record<string, never>>;

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export async function getUserProfileById(id: string) {
  return prisma.userProfile.findUnique({
    where: { id }
  });
}

export async function getUserProfileByEmail(email: string) {
  return prisma.userProfile.findUnique({
    where: {
      email: normalizeEmail(email)
    }
  });
}

export async function listUserProfiles() {
  return prisma.userProfile.findMany({
    orderBy: {
      createdAt: "desc"
    }
  }) as Promise<UserProfileRecord[]>;
}

export function isUserProfileComplete(profile: {
  displayName: string | null;
  metier: string;
} | null) {
  return Boolean(profile?.displayName?.trim() && profile.metier.trim());
}

export async function createUserProfile({
  email,
  passwordHash,
  displayName = null,
  metier
}: CreateUserProfileInput) {
  return prisma.userProfile.create({
    data: {
      email: normalizeEmail(email),
      passwordHash,
      displayName,
      metier
    }
  });
}

export async function updateUserProfile(
  id: string,
  { displayName, metier, passwordHash }: UpdateUserProfileInput
) {
  return prisma.userProfile.update({
    where: { id },
    data: {
      ...(displayName !== undefined ? { displayName } : {}),
      ...(metier !== undefined ? { metier } : {}),
      ...(passwordHash !== undefined ? { passwordHash } : {})
    }
  });
}

export async function deleteUserProfilesByIds(userIds: string[]) {
  if (userIds.length === 0) {
    return;
  }

  await prisma.userProfile.deleteMany({
    where: {
      id: {
        in: userIds
      }
    }
  });
}
