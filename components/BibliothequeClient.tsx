"use client";

import Link from "next/link";
import { useDeferredValue, useMemo, useState } from "react";
import type { SituationWithVariantes } from "@/lib/repositories/situations";
import { appConfig } from "@/lib/config/appConfig";
import CategoryFilters from "@/components/CategoryFilters";
import SearchInput from "@/components/SearchInput";
import TagFilters from "@/components/TagFilters";

type BibliothequeClientProps = Readonly<{
  situations: SituationWithVariantes[];
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
  situations
}: BibliothequeClientProps) {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const deferredQuery = useDeferredValue(query);
  const normalizedQuery = normalizeText(deferredQuery);

  const metierSituations = useMemo(
    () =>
      situations.filter(
        (situation) => situation.metier === appConfig.currentMetier
      ),
    [situations]
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

  const filteredSituations = metierSituations.filter((situation) => {
    const matchesQuery =
      normalizedQuery === "" ||
      getSearchableText(situation).includes(normalizedQuery);
    const matchesCategory =
      selectedCategory === null || situation.categorie === selectedCategory;
    const matchesTags = selectedTags.every((tag) => situation.tags.includes(tag));

    return matchesQuery && matchesCategory && matchesTags;
  });

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
  }

  return (
    <section className="mx-auto w-full max-w-6xl px-5 py-12 sm:px-8 sm:py-16 lg:px-12">
      <div className="space-y-8">
        <div className="space-y-4">
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-stone-500">
              Votre bibliothèque : {appConfig.currentMetier}
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">
              Bibliothèque
            </h1>
            <p className="max-w-2xl text-base leading-7 text-muted">
              Parcourez des situations professionnelles concrètes et trouvez
              rapidement la formulation la plus adaptée à votre contexte.
            </p>
          </div>
          {metierSituations.length > 0 ? (
            <>
              <div className="space-y-4 rounded-[1.75rem] border border-stone-200 bg-white/85 p-4 shadow-panel sm:p-5">
                <SearchInput value={query} onChange={setQuery} />
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-stone-700">
                    Catégories
                  </p>
                  <CategoryFilters
                    categories={categories}
                    selectedCategory={selectedCategory}
                    onToggleCategory={toggleCategory}
                  />
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-stone-700">Tags</p>
                  <TagFilters
                    tags={allTags}
                    selectedTags={selectedTags}
                    onToggleTag={toggleTag}
                  />
                </div>
                {hasActiveFilters ? (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="inline-flex min-h-11 items-center justify-center rounded-full border border-stone-200 px-4 py-2 text-sm font-semibold text-stone-700 transition hover:border-stone-300 hover:bg-stone-50 focus:outline-none focus:ring-2 focus:ring-blue-100"
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
        </div>
        {metierSituations.length > 0 ? (
          filteredSituations.length > 0 ? (
            <div className="grid gap-4 sm:gap-5 lg:grid-cols-2 xl:grid-cols-3">
              {filteredSituations.map((situation) => (
                <Link
                  key={situation.id}
                  href={`/bibliotheque/${situation.id}`}
                  className="group flex h-full flex-col rounded-[1.75rem] border border-stone-200 bg-white/90 p-5 shadow-panel transition hover:-translate-y-0.5 hover:border-stone-300 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-offset-2 sm:p-6"
                >
                  <div className="mb-4 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">
                    <span className="rounded-full bg-stone-100 px-3 py-1">
                      {situation.metier}
                    </span>
                    <span className="rounded-full bg-stone-100 px-3 py-1">
                      {situation.categorie}
                    </span>
                  </div>
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
              ))}
            </div>
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
