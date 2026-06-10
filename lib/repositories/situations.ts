import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

const situationWithVariantes = {
  variantes: {
    orderBy: {
      createdAt: "asc"
    }
  }
} satisfies Prisma.SituationInclude;

export type SituationWithVariantes = Prisma.SituationGetPayload<{
  include: typeof situationWithVariantes;
}>;

export async function getSituations(): Promise<SituationWithVariantes[]> {
  return prisma.situation.findMany({
    include: situationWithVariantes,
    orderBy: {
      titre: "asc"
    }
  });
}

export async function getSituationById(
  id: string
): Promise<SituationWithVariantes | null> {
  return prisma.situation.findUnique({
    where: { id },
    include: situationWithVariantes
  });
}
