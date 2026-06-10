import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

const favoriteWithSituation = {
  situation: {
    include: {
      variantes: {
        orderBy: {
          createdAt: "asc"
        }
      }
    }
  }
} satisfies Prisma.FavoriteInclude;

export type FavoriteWithSituation = Prisma.FavoriteGetPayload<{
  include: typeof favoriteWithSituation;
}>;

export async function addFavorite(authUserId: string, situationId: string) {
  return prisma.favorite.upsert({
    where: {
      authUserId_situationId: {
        authUserId,
        situationId
      }
    },
    create: {
      authUserId,
      situationId
    },
    update: {}
  });
}

export async function removeFavorite(authUserId: string, situationId: string) {
  await prisma.favorite.deleteMany({
    where: {
      authUserId,
      situationId
    }
  });
}

export async function isSituationFavorite(
  authUserId: string,
  situationId: string
) {
  const favorite = await prisma.favorite.findUnique({
    where: {
      authUserId_situationId: {
        authUserId,
        situationId
      }
    },
    select: {
      id: true
    }
  });

  return favorite !== null;
}

export async function getFavoriteSituationIds(
  authUserId: string,
  situationIds?: string[]
) {
  const favorites = await prisma.favorite.findMany({
    where: {
      authUserId,
      ...(situationIds && situationIds.length > 0
        ? {
            situationId: {
              in: situationIds
            }
          }
        : {})
    },
    select: {
      situationId: true
    }
  });

  return favorites.map((favorite: { situationId: string }) => favorite.situationId);
}

export async function getFavoriteSituationsByAuthUserId(
  authUserId: string
): Promise<FavoriteWithSituation[]> {
  return prisma.favorite.findMany({
    where: {
      authUserId
    },
    include: favoriteWithSituation,
    orderBy: {
      createdAt: "desc"
    }
  });
}
