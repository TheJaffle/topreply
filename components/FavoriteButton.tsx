"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import {
  addFavoriteAction,
  removeFavoriteAction
} from "@/app/favorites/actions";

type FavoriteButtonProps = Readonly<{
  situationId: string;
  initialIsFavorite: boolean;
  isAuthenticated: boolean;
}>;

export default function FavoriteButton({
  situationId,
  initialIsFavorite,
  isAuthenticated
}: FavoriteButtonProps) {
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);
  const [isPending, startTransition] = useTransition();

  function handleClick() {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    const nextValue = !isFavorite;
    setIsFavorite(nextValue);

    startTransition(async () => {
      const result = nextValue
        ? await addFavoriteAction(situationId)
        : await removeFavoriteAction(situationId);

      if (result.requiresLogin) {
        setIsFavorite(!nextValue);
        router.push("/login");
        return;
      }

      if (!result.ok) {
        setIsFavorite(!nextValue);
        router.refresh();
      }
    });
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={
        isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"
      }
      aria-pressed={isFavorite}
      disabled={isPending}
      className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-stone-200 bg-white text-sm leading-none text-amber-500 transition hover:border-stone-300 hover:bg-stone-50 focus:outline-none focus:ring-2 focus:ring-blue-100 disabled:opacity-60 sm:h-10 sm:w-10 sm:text-xl"
    >
      {isFavorite ? "★" : "☆"}
    </button>
  );
}
