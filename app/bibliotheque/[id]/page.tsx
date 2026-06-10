import { notFound } from "next/navigation";
import CopyButton from "@/components/CopyButton";
import { getSituationById } from "@/lib/repositories/situations";

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

  if (!situation) {
    notFound();
  }

  return (
    <section className="mx-auto w-full max-w-4xl px-5 py-12 sm:px-8 sm:py-16 lg:px-12">
      <div className="space-y-8 rounded-[2rem] border border-white/70 bg-white/90 p-6 shadow-panel sm:p-8">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">
            <span className="rounded-full bg-stone-100 px-3 py-1">
              {situation.metier}
            </span>
            <span className="rounded-full bg-stone-100 px-3 py-1">
              {situation.categorie}
            </span>
          </div>
          <div className="space-y-3">
            <h1 className="text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">
              {situation.titre}
            </h1>
            <p className="text-base leading-7 text-muted">
              {situation.description}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {situation.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-stone-200 px-3 py-1 text-sm font-medium text-stone-600"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          {situation.variantes.map((variante) => (
            <article
              key={variante.id}
              className="rounded-[1.5rem] border border-stone-200 bg-stone-50 p-5 sm:p-6"
            >
              <div className="space-y-4">
                <div className="space-y-2">
                  <h2 className="text-lg font-semibold text-stone-900">
                    {variante.label}
                  </h2>
                  <p className="text-sm leading-7 text-stone-700 sm:text-base">
                    {variante.contenu}
                  </p>
                </div>
                <CopyButton text={variante.contenu} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
