"use client";

import Link from "next/link";
import { useDeferredValue, useMemo, useState } from "react";
import CategoryFilters from "@/components/CategoryFilters";
import BrandFooter from "@/components/BrandFooter";
import FavoriteButton from "@/components/FavoriteButton";
import SearchInput from "@/components/SearchInput";
import TagFilters from "@/components/TagFilters";
import type { SituationWithVariantes } from "@/lib/repositories/situations";

type BibliothequeClientProps = Readonly<{
  situations: SituationWithVariantes[];
  activeMetier: string;
  favoriteSituationIds: string[];
  isAuthenticated: boolean;
}>;

function normalizeText(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function getSearchableText(situation: SituationWithVariantes) {
  return normalizeText(
    [
      situation.titre,
      situation.description,
      situation.metier,
      situation.categorie,
      ...situation.tags,
      ...situation.variantes.flatMap(
        (variante: SituationWithVariantes["variantes"][number]) => [
          variante.label,
          variante.contenu
        ]
      )
    ].join(" ")
  );
}

export default function BibliothequeClient({
  situations,
  activeMetier,
  favoriteSituationIds,
  isAuthenticated
}: BibliothequeClientProps) {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const deferredQuery = useDeferredValue(query);
  const normalizedQuery = normalizeText(deferredQuery);

  const metierSituations = useMemo(
    () =>
      situations.filter(
        (situation: SituationWithVariantes) => situation.metier === activeMetier
      ),
    [activeMetier, situations]
  );

  const categories = useMemo(
    () =>
      Array.from(
        new Set(
          metierSituations.map(
            (situation: SituationWithVariantes) => situation.categorie
          )
        )
      ),
    [metierSituations]
  );

  const allTags = useMemo(
    () =>
      Array.from(
        new Set(
          metierSituations.flatMap(
            (situation: SituationWithVariantes) => situation.tags
          )
        )
      ),
    [metierSituations]
  );

  const mobileTags = useMemo(() => {
    const tagCounts = metierSituations.reduce(
      (counts: Map<string, number>, situation: SituationWithVariantes) => {
        situation.tags.forEach((tag: string) => {
          counts.set(tag, (counts.get(tag) ?? 0) + 1);
        });

        return counts;
      },
      new Map<string, number>()
    );

    return [...allTags]
      .sort((firstTag: string, secondTag: string) => {
        const countDifference =
          (tagCounts.get(secondTag) ?? 0) - (tagCounts.get(firstTag) ?? 0);

        if (countDifference !== 0) {
          return countDifference;
        }

        return firstTag.localeCompare(secondTag, "fr", {
          sensitivity: "base"
        });
      })
      .slice(0, 8);
  }, [allTags, metierSituations]);

  const filteredSituations = useMemo(() => {
    const favoriteIds = new Set(favoriteSituationIds);

    return metierSituations
      .filter((situation: SituationWithVariantes) => {
        const matchesQuery =
          normalizedQuery === "" ||
          getSearchableText(situation).includes(normalizedQuery);
        const matchesCategory =
          selectedCategory === null || situation.categorie === selectedCategory;
        const matchesTags = selectedTags.every((tag: string) =>
          situation.tags.includes(tag)
        );

        return matchesQuery && matchesCategory && matchesTags;
      })
      .sort(
        (
          firstSituation: SituationWithVariantes,
          secondSituation: SituationWithVariantes
        ) => {
          const firstIsFavorite = favoriteIds.has(firstSituation.id);
          const secondIsFavorite = favoriteIds.has(secondSituation.id);

          if (firstIsFavorite === secondIsFavorite) {
            return 0;
          }

          return firstIsFavorite ? -1 : 1;
        }
      );
  }, [
    favoriteSituationIds,
    metierSituations,
    normalizedQuery,
    selectedCategory,
    selectedTags
  ]);

  const hasActiveFilters =
    query.trim() !== "" || selectedCategory !== null || selectedTags.length > 0;

  function toggleCategory(category: string) {
    setSelectedCategory((currentCategory) =>
      currentCategory === category ? null : category
    );
  }

  function toggleTag(tag: string) {
    setSelectedTags((currentTags) =>
      currentTags.includes(tag)
        ? currentTags.filter((currentTag: string) => currentTag !== tag)
        : [...currentTags, tag]
    );
  }

  function clearFilters() {
    setQuery("");
    setSelectedCategory(null);
    setSelectedTags([]);
  }

  function isFavoriteSituation(situationId: string) {
    return favoriteSituationIds.includes(situationId);
  }

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-4 pb-28 sm:px-8 sm:py-16 sm:pb-16 lg:px-12">
      {metierSituations.length > 0 ? (
        <>
          <div className="hidden space-y-3 sm:block">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-100/74">
              Votre bibliothÃ¨que : {activeMetier}
            </p>
            <h1 className="text-4xl font-semibold tracking-tight text-white">
              BibliothÃ¨que
            </h1>
          </div>

          <div className="flex h-[calc(100svh-5.25rem)] flex-col sm:h-auto sm:space-y-8">
            <div className="space-y-3 rounded-[6px] bg-[linear-gradient(180deg,rgba(10,20,38,0.72)_0%,rgba(7,16,31,0.58)_100%)] px-0 py-3 shadow-[0_10px_18px_-14px_rgba(255,255,255,0.18),0_34px_66px_-40px_rgba(2,6,23,1),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl sm:space-y-4 sm:px-5 sm:py-5">
              <div className="px-2 sm:px-0">
                <SearchInput value={query} onChange={setQuery} />
              </div>

              <div className="px-2 pb-1 sm:hidden">
                <TagFilters
                  tags={mobileTags}
                  selectedTags={selectedTags}
                  onToggleTag={toggleTag}
                />
              </div>

              <div className="hidden sm:block sm:space-y-4">
                <CategoryFilters
                  categories={categories}
                  selectedCategory={selectedCategory}
                  onToggleCategory={toggleCategory}
                />
                <TagFilters
                  tags={allTags}
                  selectedTags={selectedTags}
                  onToggleTag={toggleTag}
                />
              </div>

              <div className="flex items-center justify-end px-2 sm:px-0">
                {hasActiveFilters ? (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="text-sm font-medium text-blue-100/82 transition hover:text-white"
                  >
                    Effacer
                  </button>
                ) : null}
              </div>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto py-3 sm:overflow-visible sm:py-0">
              {filteredSituations.length > 0 ? (
                <>
                  <div className="space-y-2.5 px-2 sm:hidden">
                    {filteredSituations.map((situation: SituationWithVariantes) => (
                      <div
                        key={situation.id}
                        className="rounded-[6px] bg-[linear-gradient(180deg,#f7fbff_0%,#ecf3fc_58%,#e0e9f7_100%)] px-3.5 py-3 shadow-[0_16px_24px_-18px_rgba(255,255,255,0.72),0_34px_58px_-34px_rgba(2,6,23,0.52),inset_0_1px_0_rgba(255,255,255,0.9)] ring-1 ring-[#d9e2f1]/88"
                      >
                        <div className="flex items-start gap-3">
                          <Link
                            href={`/bibliotheque/${situation.id}`}
                            className="min-w-0 flex-1"
                          >
                            <h2 className="text-[15px] font-semibold leading-5 text-slate-950">
                              {situation.titre}
                            </h2>
                          </Link>
                          <FavoriteButton
                            situationId={situation.id}
                            initialIsFavorite={isFavoriteSituation(situation.id)}
                            isAuthenticated={isAuthenticated}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="hidden sm:grid sm:gap-5 lg:grid-cols-2 xl:grid-cols-3">
                    {filteredSituations.map((situation: SituationWithVariantes) => (
                      <div
                        key={situation.id}
                        className="flex h-full flex-col rounded-[6px] bg-[linear-gradient(180deg,#f8fbff_0%,#edf3fb_58%,#e3ebf8_100%)] p-6 shadow-[0_16px_18px_-14px_rgba(255,255,255,0.7),0_38px_60px_-38px_rgba(2,6,23,0.46),inset_0_1px_0_rgba(255,255,255,0.88)] ring-1 ring-[#d9e2f1]/92"
                      >
                        <div className="mb-4 flex items-start justify-between gap-3">
                          <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-blue-800/88">
                            <span className="rounded-full bg-[linear-gradient(180deg,#edf4ff_0%,#dfe9f7_100%)] px-3 py-1 text-slate-700 shadow-[0_6px_12px_-10px_rgba(2,6,23,0.28),inset_0_1px_0_rgba(255,255,255,0.76)]">
                              {situation.metier}
                            </span>
                            <span className="rounded-full bg-[linear-gradient(180deg,#edf4ff_0%,#dfe9f7_100%)] px-3 py-1 text-slate-700 shadow-[0_6px_12px_-10px_rgba(2,6,23,0.28),inset_0_1px_0_rgba(255,255,255,0.76)]">
                              {situation.categorie}
                            </span>
                          </div>
                          <FavoriteButton
                            situationId={situation.id}
                            initialIsFavorite={isFavoriteSituation(situation.id)}
                            isAuthenticated={isAuthenticated}
                          />
                        </div>
                        <Link
                          href={`/bibliotheque/${situation.id}`}
                          className="group flex h-full flex-col transition hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-offset-2"
                        >
                          <div className="space-y-3">
                            <h2 className="text-xl font-semibold tracking-tight text-slate-950">
                              {situation.titre}
                            </h2>
                            <p className="text-sm leading-6 text-slate-700">
                              {situation.description}
                            </p>
                          </div>
                          <div className="mt-5 flex flex-wrap gap-2">
                            {situation.tags.slice(0, 3).map((tag: string) => (
                              <span
                                key={tag}
                                className="rounded-full bg-[linear-gradient(180deg,#edf4ff_0%,#dfe9f7_100%)] px-3 py-1 text-xs font-semibold text-slate-700 shadow-[0_6px_12px_-10px_rgba(2,6,23,0.28),inset_0_1px_0_rgba(255,255,255,0.76)]"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                          <span className="mt-6 inline-flex items-center text-sm font-semibold text-blue-700">
                            Voir les rÃ©ponses
                          </span>
                        </Link>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="mx-2 rounded-[6px] bg-[linear-gradient(180deg,rgba(10,20,38,0.62)_0%,rgba(7,16,31,0.48)_100%)] p-5 text-sm text-blue-50/80 shadow-[0_30px_56px_-40px_rgba(2,6,23,1),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl sm:mx-0 sm:p-8 sm:text-base">
                  Aucune situation ne correspond Ã  votre recherche.
                </div>
              )}
            </div>

            <div className="pt-2 sm:pt-4">
              <BrandFooter fixed />
            </div>
          </div>
        </>
      ) : (
        <div className="rounded-[6px] bg-[linear-gradient(180deg,rgba(10,20,38,0.62)_0%,rgba(7,16,31,0.48)_100%)] p-5 text-sm text-blue-50/80 shadow-[0_30px_56px_-40px_rgba(2,6,23,1),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl sm:p-8 sm:text-base">
          Aucune situation disponible pour ce mÃ©tier.
        </div>
      )}
    </section>
  );
}

