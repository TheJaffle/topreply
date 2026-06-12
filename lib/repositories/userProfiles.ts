import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

type CreateUserProfileInput = Readonly<{
  email: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
  displayName?: string | null;
  metier: string;
}>;

type UpdateUserProfileInput = Readonly<{
  firstName?: string;
  lastName?: string;
  displayName?: string | null;
  metier?: string;
  passwordHash?: string;
}>;

export type UserProfileRecord = Prisma.UserProfileGetPayload<Record<string, never>>;

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function normalizeNamePart(value: string) {
  return value.trim();
}

export function buildDisplayName(firstName: string, lastName: string) {
  const normalizedFirstName = normalizeNamePart(firstName);
  const normalizedLastName = normalizeNamePart(lastName);

  return `${normalizedFirstName} ${normalizedLastName}`.trim();
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
  firstName: string;
  lastName: string;
  metier: string;
} | null) {
  return Boolean(
    profile?.firstName.trim() && profile.lastName.trim() && profile.metier.trim()
  );
}

export async function createUserProfile({
  email,
  passwordHash,
  firstName,
  lastName,
  displayName = null,
  metier
}: CreateUserProfileInput) {
  return prisma.userProfile.create({
    data: {
      email: normalizeEmail(email),
      passwordHash,
      firstName: normalizeNamePart(firstName),
      lastName: normalizeNamePart(lastName),
      displayName,
      metier
    }
  });
}

export async function updateUserProfile(
  id: string,
  { firstName, lastName, displayName, metier, passwordHash }: UpdateUserProfileInput
) {
  return prisma.userProfile.update({
    where: { id },
    data: {
      ...(firstName !== undefined
        ? { firstName: normalizeNamePart(firstName) }
        : {}),
      ...(lastName !== undefined ? { lastName: normalizeNamePart(lastName) } : {}),
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
