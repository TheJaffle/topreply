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

export async function addFavorite(userId: string, situationId: string) {
  return prisma.favorite.upsert({
    where: {
      userId_situationId: {
        userId,
        situationId
      }
    },
    create: {
      userId,
      situationId
    },
    update: {}
  });
}

export async function removeFavorite(userId: string, situationId: string) {
  await prisma.favorite.deleteMany({
    where: {
      userId,
      situationId
    }
  });
}

export async function isSituationFavorite(userId: string, situationId: string) {
  const favorite = await prisma.favorite.findUnique({
    where: {
      userId_situationId: {
        userId,
        situationId
      }
    },
    select: {
      id: true
    }
  });

  return favorite !== null;
}

export async function getFavoriteSituationIds(userId: string, situationIds?: string[]) {
  const favorites = await prisma.favorite.findMany({
    where: {
      userId,
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

export async function getFavoriteSituationsByUserId(userId: string): Promise<FavoriteWithSituation[]> {
  return prisma.favorite.findMany({
    where: {
      userId
    },
    include: favoriteWithSituation,
    orderBy: {
      createdAt: "desc"
    }
  });
}
