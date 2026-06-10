"use client";

import Link from "next/link";
import { useDeferredValue, useMemo, useState } from "react";
import CategoryFilters from "@/components/CategoryFilters";
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
      ...situation.variantes.flatMap((variante) => [
        variante.label,
        variante.contenu
      ])
    ].join(" ")
  );
}

function getResultsLabel(count: number) {
  if (count === 0) {
    return "Aucune situation trouvée";
  }

  if (count === 1) {
    return "1 situation trouvée";
  }

  return `${count} situations trouvées`;
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
  const [showTags, setShowTags] = useState(false);
  const deferredQuery = useDeferredValue(query);
  const normalizedQuery = normalizeText(deferredQuery);

  const metierSituations = useMemo(
    () => situations.filter((situation) => situation.metier === activeMetier),
    [activeMetier, situations]
  );

  const categories = useMemo(
    () =>
      Array.from(
        new Set(metierSituations.map((situation) => situation.categorie))
      ),
    [metierSituations]
  );

  const allTags = useMemo(
    () =>
      Array.from(new Set(metierSituations.flatMap((situation) => situation.tags))),
    [metierSituations]
  );

  const filteredSituations = useMemo(() => {
    const favoriteIds = new Set(favoriteSituationIds);

    return metierSituations
      .filter((situation) => {
        const matchesQuery =
          normalizedQuery === "" ||
          getSearchableText(situation).includes(normalizedQuery);
        const matchesCategory =
          selectedCategory === null || situation.categorie === selectedCategory;
        const matchesTags = selectedTags.every((tag) =>
          situation.tags.includes(tag)
        );

        return matchesQuery && matchesCategory && matchesTags;
      })
      .sort((firstSituation, secondSituation) => {
        const firstIsFavorite = favoriteIds.has(firstSituation.id);
        const secondIsFavorite = favoriteIds.has(secondSituation.id);

        if (firstIsFavorite === secondIsFavorite) {
          return 0;
        }

        return firstIsFavorite ? -1 : 1;
      });
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
        ? currentTags.filter((currentTag) => currentTag !== tag)
        : [...currentTags, tag]
    );
  }

  function clearFilters() {
    setQuery("");
    setSelectedCategory(null);
    setSelectedTags([]);
    setShowTags(false);
  }

  function isFavoriteSituation(situationId: string) {
    return favoriteSituationIds.includes(situationId);
  }

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-3 sm:px-8 sm:py-16 lg:px-12">
      <div className="space-y-3 sm:space-y-8">
        {metierSituations.length > 0 ? (
          <>
            <div className="hidden space-y-3 sm:block">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-stone-500">
                Votre bibliothèque : {activeMetier}
              </p>
              <h1 className="text-4xl font-semibold tracking-tight text-stone-900">
                Bibliothèque
              </h1>
              <p className="max-w-2xl text-base leading-7 text-muted">
                Parcourez des situations professionnelles concrètes et trouvez
                rapidement la formulation la plus adaptée à votre contexte.
              </p>
            </div>
            <div className="space-y-2 sm:space-y-4 sm:rounded-[1.75rem] sm:border sm:border-stone-200 sm:bg-white/90 sm:p-5 sm:shadow-panel">
              <SearchInput value={query} onChange={setQuery} />
              <CategoryFilters
                categories={categories}
                selectedCategory={selectedCategory}
                onToggleCategory={toggleCategory}
              />
              <div className="space-y-2">
                <div className="flex items-center justify-between sm:hidden">
                  <button
                    type="button"
                    onClick={() => setShowTags((currentValue) => !currentValue)}
                    className="text-sm font-semibold text-stone-700"
                  >
                    {showTags ? "Masquer les filtres" : "Filtres"}
                  </button>
                  {hasActiveFilters ? (
                    <button
                      type="button"
                      onClick={clearFilters}
                      className="text-sm font-medium text-stone-500"
                    >
                      Effacer
                    </button>
                  ) : null}
                </div>
                <div className="hidden sm:block">
                  <p className="mb-2 text-sm font-semibold text-stone-700">
                    Tags
                  </p>
                  <TagFilters
                    tags={allTags}
                    selectedTags={selectedTags}
                    onToggleTag={toggleTag}
                  />
                </div>
                {showTags ? (
                  <div className="sm:hidden">
                    <TagFilters
                      tags={allTags}
                      selectedTags={selectedTags}
                      onToggleTag={toggleTag}
                    />
                  </div>
                ) : null}
              </div>
              {hasActiveFilters ? (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="hidden min-h-11 items-center justify-center rounded-full border border-stone-200 px-4 py-2 text-sm font-semibold text-stone-700 transition hover:border-stone-300 hover:bg-stone-50 focus:outline-none focus:ring-2 focus:ring-blue-100 sm:inline-flex"
                >
                  Tout effacer
                </button>
              ) : null}
            </div>
            <p className="text-sm font-medium text-stone-600">
              {getResultsLabel(filteredSituations.length)}
            </p>
          </>
        ) : (
          <div className="rounded-[1.75rem] border border-dashed border-stone-300 bg-white/70 p-6 text-sm leading-7 text-stone-600 sm:p-8 sm:text-base">
            Aucune situation disponible pour ce métier.
          </div>
        )}
        {metierSituations.length > 0 ? (
          filteredSituations.length > 0 ? (
            <>
              <div className="space-y-2 sm:hidden">
                {filteredSituations.map((situation) => (
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
                          initialIsFavorite={isFavoriteSituation(situation.id)}
                          isAuthenticated={isAuthenticated}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="hidden grid-cols-2 gap-5 lg:grid xl:grid-cols-3">
                {filteredSituations.map((situation) => (
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
                        initialIsFavorite={isFavoriteSituation(situation.id)}
                        isAuthenticated={isAuthenticated}
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
                        {situation.tags.slice(0, 3).map((tag) => (
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
              <div className="hidden sm:grid sm:gap-5 lg:hidden lg:grid-cols-2 xl:grid-cols-3">
                {filteredSituations.map((situation) => (
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
                        initialIsFavorite={isFavoriteSituation(situation.id)}
                        isAuthenticated={isAuthenticated}
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
                        {situation.tags.slice(0, 3).map((tag) => (
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
          ) : (
            <div className="rounded-[1.75rem] border border-dashed border-stone-300 bg-white/70 p-6 text-sm leading-7 text-stone-600 sm:p-8 sm:text-base">
              Aucune situation ne correspond à votre recherche.
            </div>
          )
        ) : null}
      </div>
    </section>
  );
}
