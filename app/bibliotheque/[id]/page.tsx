import Link from "next/link";
import { notFound } from "next/navigation";
import BrandFooter from "@/components/BrandFooter";
import FavoriteButton from "@/components/FavoriteButton";
import SituationVariantsPanel from "@/components/SituationVariantsPanel";
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

  const favoriteButton = (
    <FavoriteButton
      situationId={situation.id}
      initialIsFavorite={favorite}
      isAuthenticated={isAuthenticated}
    />
  );

  return (
    <section className="mx-auto flex min-h-[calc(100svh-5.25rem)] w-full max-w-4xl flex-col px-4 py-4 pb-28 sm:min-h-0 sm:px-8 sm:py-14 sm:pb-14 lg:px-12">
      <div className="flex flex-1 flex-col space-y-3 sm:space-y-6">
        <div className="flex items-center justify-between">
          <Link
            href="/bibliotheque"
            className="inline-flex h-9 min-w-9 items-center justify-center rounded-[6px] bg-[linear-gradient(180deg,rgba(21,49,97,0.95)_0%,rgba(14,36,77,0.95)_100%)] px-3 text-[18px] font-semibold leading-none text-white shadow-[0_14px_24px_-18px_rgba(2,6,23,0.55)] transition hover:brightness-110"
            aria-label="Retour à la bibliothèque"
          >
            &lt;
          </Link>
          <div className="-mt-[10px] -mb-1 flex justify-end sm:hidden">
            {favoriteButton}
          </div>
        </div>

        <div className="space-y-2 sm:space-y-5">
          <div className="hidden justify-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-blue-100/72 sm:flex">
            <span className="rounded-full border border-white/12 bg-white/8 px-3 py-1.5 backdrop-blur">
              {situation.metier}
            </span>
            <span className="rounded-full border border-white/12 bg-white/8 px-3 py-1.5 backdrop-blur">
              {situation.categorie}
            </span>
          </div>

          <div className="-mt-[10px] space-y-2 text-center sm:mt-0 sm:space-y-4">
            <h1 className="mx-auto max-w-3xl text-[1.55rem] font-semibold leading-8 tracking-tight text-white sm:text-4xl lg:text-5xl">
              {situation.titre}
            </h1>
            <p className="mx-auto hidden max-w-2xl text-base leading-7 text-blue-50/72 sm:block">
              {situation.description}
            </p>
          </div>
        </div>

        <SituationVariantsPanel
          variantes={situation.variantes}
          favoriteSlot={<div className="hidden sm:block">{favoriteButton}</div>}
        />

        <div className="mt-auto pt-2 sm:pt-4">
          <BrandFooter fixed />
        </div>
      </div>
    </section>
  );
}
