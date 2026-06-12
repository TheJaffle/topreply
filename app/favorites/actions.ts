"use server";

import { revalidatePath } from "next/cache";
import { getCurrentUserId } from "@/lib/auth/session";
import { addFavorite, removeFavorite } from "@/lib/repositories/favorites";

type FavoriteActionResult = Readonly<{
  ok: boolean;
  requiresLogin?: boolean;
}>;

function revalidateFavoritePaths(situationId: string) {
  revalidatePath("/bibliotheque");
  revalidatePath(`/bibliotheque/${situationId}`);
  revalidatePath("/favoris");
}

export async function addFavoriteAction(
  situationId: string
): Promise<FavoriteActionResult> {
  const userId = await getCurrentUserId();

  if (!userId) {
    return {
      ok: false,
      requiresLogin: true
    };
  }

  await addFavorite(userId, situationId);
  revalidateFavoritePaths(situationId);

  return {
    ok: true
  };
}

export async function removeFavoriteAction(
  situationId: string
): Promise<FavoriteActionResult> {
  const userId = await getCurrentUserId();

  if (!userId) {
    return {
      ok: false,
      requiresLogin: true
    };
  }

  await removeFavorite(userId, situationId);
  revalidateFavoritePaths(situationId);

  return {
    ok: true
  };
}
