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
      aria-label={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
      aria-pressed={isFavorite}
      disabled={isPending}
      className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-[6px] bg-[linear-gradient(180deg,#f5f8fe_0%,#e3eaf6_100%)] text-base leading-none shadow-[0_16px_28px_-18px_rgba(2,6,23,0.45),inset_0_1px_0_rgba(255,255,255,0.75)] transition focus:outline-none focus:ring-2 focus:ring-blue-100 disabled:opacity-60 sm:h-10 sm:w-10 sm:text-lg ${
        isFavorite
          ? "text-amber-500"
          : "text-slate-500 hover:bg-[linear-gradient(180deg,#ffffff_0%,#eaf0fb_100%)]"
      }`}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-4 w-4 sm:h-5 sm:w-5"
        fill={isFavorite ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m12 3.8 2.55 5.16 5.7.83-4.12 4.02.97 5.68L12 16.8l-5.1 2.69.97-5.68L3.75 9.79l5.7-.83L12 3.8Z" />
      </svg>
    </button>
  );
}
