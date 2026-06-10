"use server";

import { revalidatePath } from "next/cache";
import { addFavorite, removeFavorite } from "@/lib/repositories/favorites";
import { createClient } from "@/lib/supabase/server";

type FavoriteActionResult = Readonly<{
  ok: boolean;
  requiresLogin?: boolean;
}>;

async function getAuthUserId() {
  const supabase = await createClient();
  const {
    data: { session }
  } = await supabase.auth.getSession();

  return session?.user?.id ?? null;
}

function revalidateFavoritePaths(situationId: string) {
  revalidatePath("/bibliotheque");
  revalidatePath(`/bibliotheque/${situationId}`);
}

export async function addFavoriteAction(
  situationId: string
): Promise<FavoriteActionResult> {
  const authUserId = await getAuthUserId();

  if (!authUserId) {
    return {
      ok: false,
      requiresLogin: true
    };
  }

  await addFavorite(authUserId, situationId);
  revalidateFavoritePaths(situationId);

  return {
    ok: true
  };
}

export async function removeFavoriteAction(
  situationId: string
): Promise<FavoriteActionResult> {
  const authUserId = await getAuthUserId();

  if (!authUserId) {
    return {
      ok: false,
      requiresLogin: true
    };
  }

  await removeFavorite(authUserId, situationId);
  revalidateFavoritePaths(situationId);

  return {
    ok: true
  };
}
