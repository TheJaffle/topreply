import Link from "next/link";
import FavoriteButton from "@/components/FavoriteButton";
import { getCurrentUser } from "@/lib/auth/session";
import {
  getFavoriteSituationsByUserId,
  type FavoriteWithSituation
} from "@/lib/repositories/favorites";

export const dynamic = "force-dynamic";

export default async function FavorisPage() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <section className="mx-auto w-full max-w-4xl px-4 py-4 sm:px-8 sm:py-16 lg:px-12">
        <div className="space-y-3 rounded-2xl border border-stone-200 bg-white/90 p-3 shadow-panel sm:space-y-4 sm:rounded-[2rem] sm:p-8">
          <h1 className="text-lg font-semibold tracking-tight text-stone-900 sm:text-4xl">
            Favoris
          </h1>
          <p className="text-sm text-stone-600 sm:text-base">
            Connectez-vous pour voir vos favoris.
          </p>
          <Link
            href="/login"
            className="inline-flex rounded-full border border-stone-200 px-3 py-1.5 text-xs font-semibold text-stone-700 transition hover:bg-stone-50 sm:px-4 sm:py-2 sm:text-sm"
          >
            Connexion
          </Link>
        </div>
      </section>
    );
  }

  const favorites = await getFavoriteSituationsByUserId(currentUser.id);

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-3 sm:px-8 sm:py-16 lg:px-12">
      <div className="space-y-3 sm:space-y-8">
        <div className="space-y-1 sm:space-y-3">
          <h1 className="text-lg font-semibold tracking-tight text-stone-900 sm:text-4xl">
            Favoris
          </h1>
          <p className="hidden text-base leading-7 text-muted sm:block">
            Retrouvez rapidement les situations que vous avez mises de côté.
          </p>
        </div>

        {favorites.length === 0 ? (
          <div className="space-y-3 rounded-2xl border border-stone-200 bg-white/90 p-3 shadow-panel sm:space-y-4 sm:rounded-[2rem] sm:p-8">
            <p className="text-sm text-stone-600 sm:text-base">
              Aucun favori.
            </p>
            <Link
              href="/bibliotheque"
              className="inline-flex rounded-full border border-stone-200 px-3 py-1.5 text-xs font-semibold text-stone-700 transition hover:bg-stone-50 sm:px-4 sm:py-2 sm:text-sm"
            >
              Voir la bibliothèque
            </Link>
          </div>
        ) : (
          <>
            <p className="text-sm font-medium text-stone-600">
              {favorites.length === 1
                ? "1 situation favorite"
                : `${favorites.length} situations favorites`}
            </p>

            <div className="space-y-2 sm:hidden">
              {favorites.map(({ situation }: FavoriteWithSituation) => (
                <div
                  key={situation.id}
                  className="rounded-2xl border border-stone-200 bg-white/90 px-3 py-2.5 shadow-panel"
                >
                  <div className="space-y-1">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-stone-500">
                      {situation.categorie}
                    </p>
                    <div className="flex items-start gap-2">
                      <Link
                        href={`/bibliotheque/${situation.id}`}
                        className="min-w-0 flex-1"
                      >
                        <h2 className="text-base font-semibold leading-5 text-stone-900">
                          {situation.titre}
                        </h2>
                      </Link>
                      <FavoriteButton
                        situationId={situation.id}
                        initialIsFavorite={true}
                        isAuthenticated={true}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="hidden sm:grid sm:gap-5 lg:grid-cols-2 xl:grid-cols-3">
              {favorites.map(({ situation }: FavoriteWithSituation) => (
                <div
                  key={situation.id}
                  className="flex h-full flex-col rounded-[1.75rem] border border-stone-200 bg-white/90 p-6 shadow-panel"
                >
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">
                      <span className="rounded-full bg-stone-100 px-3 py-1">
                        {situation.metier}
                      </span>
                      <span className="rounded-full bg-stone-100 px-3 py-1">
                        {situation.categorie}
                      </span>
                    </div>
                    <FavoriteButton
                      situationId={situation.id}
                      initialIsFavorite={true}
                      isAuthenticated={true}
                    />
                  </div>
                  <Link
                    href={`/bibliotheque/${situation.id}`}
                    className="group flex h-full flex-col transition hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-offset-2"
                  >
                    <div className="space-y-3">
                      <h2 className="text-xl font-semibold tracking-tight text-stone-900">
                        {situation.titre}
                      </h2>
                      <p className="text-sm leading-6 text-muted">
                        {situation.description}
                      </p>
                    </div>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {situation.tags.slice(0, 3).map((tag: string) => (
                        <span
                          key={tag}
                          className="rounded-full border border-stone-200 px-3 py-1 text-xs font-medium text-stone-600"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="mt-6 inline-flex items-center text-sm font-semibold text-accent">
                      Voir les réponses
                    </span>
                  </Link>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
