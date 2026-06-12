import { notFound } from "next/navigation";
import CopyButton from "@/components/CopyButton";
import FavoriteButton from "@/components/FavoriteButton";
import { getCurrentUser } from "@/lib/auth/session";
import { isSituationFavorite } from "@/lib/repositories/favorites";
import { getSituationById } from "@/lib/repositories/situations";

export const dynamic = "force-dynamic";

type SituationDetailPageProps = Readonly<{
  params: Promise<{
    id: string;
  }>;
}>;

export default async function SituationDetailPage({
  params
}: SituationDetailPageProps) {
  const { id } = await params;
  const situation = await getSituationById(id);
  const currentUser = await getCurrentUser();
  const isAuthenticated = Boolean(currentUser);
  let favorite = false;

  if (!situation) {
    notFound();
  }

  if (currentUser) {
    favorite = await isSituationFavorite(currentUser.id, situation.id);
  }

  return (
    <section className="mx-auto w-full max-w-4xl px-4 py-4 sm:px-8 sm:py-16 lg:px-12">
      <div className="space-y-4 rounded-[1.5rem] border border-white/70 bg-white/90 p-4 shadow-panel sm:space-y-8 sm:rounded-[2rem] sm:p-8">
        <div className="space-y-3 sm:space-y-4">
          <div className="hidden flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-stone-500 sm:flex">
            <span className="rounded-full bg-stone-100 px-3 py-1">
              {situation.metier}
            </span>
            <span className="rounded-full bg-stone-100 px-3 py-1">
              {situation.categorie}
            </span>
          </div>
          <div className="space-y-2 sm:space-y-3">
            <div className="flex items-start justify-between gap-2">
              <h1 className="pr-2 text-xl font-semibold tracking-tight text-stone-900 sm:text-4xl">
                {situation.titre}
              </h1>
              <FavoriteButton
                situationId={situation.id}
                initialIsFavorite={favorite}
                isAuthenticated={isAuthenticated}
              />
            </div>
            <p className="hidden text-base leading-7 text-muted sm:block">
              {situation.description}
            </p>
          </div>
          <div className="hidden flex-wrap gap-2 sm:flex">
            {situation.tags.map((tag: string) => (
              <span
                key={tag}
                className="rounded-full border border-stone-200 px-3 py-1 text-sm font-medium text-stone-600"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="space-y-2.5 sm:space-y-4">
          {situation.variantes.map((variante: { id: string; label: string; contenu: string }) => (
            <article
              key={variante.id}
              className="rounded-[1.1rem] border border-stone-200 bg-stone-50 p-3 sm:rounded-[1.5rem] sm:p-6"
            >
              <div className="space-y-2.5 sm:space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <h2 className="pr-2 text-base font-semibold text-stone-900 sm:text-lg">
                    {variante.label}
                  </h2>
                  <CopyButton text={variante.contenu} />
                </div>
                <p className="text-sm leading-6 text-stone-700 sm:text-base sm:leading-7">
                  {variante.contenu}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
