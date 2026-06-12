import Link from "next/link";
import BrandFooter from "@/components/BrandFooter";
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
        <div className="space-y-3 rounded-[6px] border border-white/12 bg-slate-950/26 p-4 text-blue-50 shadow-[0_28px_55px_-40px_rgba(2,6,23,1)] backdrop-blur-xl sm:space-y-4 sm:p-8">
          <h1 className="text-lg font-semibold tracking-tight text-white sm:text-4xl">
            Favoris
          </h1>
          <p className="text-sm text-blue-50/72 sm:text-base">
            Connectez-vous pour voir vos favoris.
          </p>
          <Link
            href="/login"
            className="inline-flex rounded-full border border-white/16 bg-white/8 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-white/12 sm:px-4 sm:py-2 sm:text-sm"
          >
            Connexion
          </Link>
        </div>
      </section>
    );
  }

  const favorites = await getFavoriteSituationsByUserId(currentUser.id);

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-4 sm:px-8 sm:py-16 lg:px-12">
      <div className="space-y-4 sm:space-y-8">
        <div className="space-y-1 sm:space-y-3">
          <h1 className="text-lg font-semibold tracking-tight text-white sm:text-4xl">
            Favoris
          </h1>
          <p className="hidden text-base leading-7 text-blue-50/72 sm:block">
            Retrouvez vos situations enregistrÃ©es.
          </p>
        </div>

        {favorites.length === 0 ? (
          <div className="space-y-3 rounded-[6px] border border-white/12 bg-slate-950/26 p-4 text-blue-50 shadow-[0_28px_55px_-40px_rgba(2,6,23,1)] backdrop-blur-xl sm:space-y-4 sm:p-8">
            <p className="text-sm text-blue-50/72 sm:text-base">
              Aucun favori.
            </p>
            <Link
              href="/bibliotheque"
              className="inline-flex rounded-full border border-white/16 bg-white/8 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-white/12 sm:px-4 sm:py-2 sm:text-sm"
            >
              Voir la bibliothÃ¨que
            </Link>
          </div>
        ) : (
          <>
            <p className="text-sm font-medium text-blue-50/76">
              {favorites.length === 1
                ? "1 situation favorite"
                : `${favorites.length} situations favorites`}
            </p>

            <div className="space-y-2.5 sm:hidden">
              {favorites.map(({ situation }: FavoriteWithSituation) => (
                <div
                  key={situation.id}
                  className="rounded-[6px] border border-white/12 bg-white/92 px-3.5 py-3 shadow-[0_22px_40px_-34px_rgba(2,6,23,0.95)]"
                >
                  <div className="flex items-start gap-3">
                    <Link
                      href={`/bibliotheque/${situation.id}`}
                      className="min-w-0 flex-1"
                    >
                      <div className="space-y-1.5">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-700/72">
                          {situation.categorie}
                        </p>
                        <h2 className="text-[15px] font-semibold leading-5 text-slate-900">
                          {situation.titre}
                        </h2>
                      </div>
                    </Link>
                    <FavoriteButton
                      situationId={situation.id}
                      initialIsFavorite={true}
                      isAuthenticated={true}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="hidden sm:grid sm:gap-5 lg:grid-cols-2 xl:grid-cols-3">
              {favorites.map(({ situation }: FavoriteWithSituation) => (
                <div
                  key={situation.id}
                  className="flex h-full flex-col rounded-[6px] border border-white/14 bg-white/92 p-6 shadow-[0_26px_52px_-36px_rgba(2,6,23,0.95)]"
                >
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-blue-700/70">
                      <span className="rounded-full bg-blue-50 px-3 py-1 text-slate-700">
                        {situation.metier}
                      </span>
                      <span className="rounded-full bg-blue-50 px-3 py-1 text-slate-700">
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
                      <h2 className="text-xl font-semibold tracking-tight text-slate-900">
                        {situation.titre}
                      </h2>
                      <p className="text-sm leading-6 text-slate-600">
                        {situation.description}
                      </p>
                    </div>
                    <span className="mt-6 inline-flex items-center text-sm font-semibold text-blue-600">
                      Voir les rÃ©ponses
                    </span>
                  </Link>
                </div>
              ))}
            </div>

            <BrandFooter />
          </>
        )}
      </div>
    </section>
  );
}