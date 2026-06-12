export const dynamic = "force-dynamic";

export default function UtilisateursPage() {
  return (
    <section className="mx-auto w-full max-w-4xl px-4 py-6 sm:px-8 sm:py-12">
      <div className="rounded-[1.75rem] border border-stone-200 bg-white/90 p-4 shadow-panel sm:p-8">
        <h1 className="text-2xl font-semibold tracking-tight text-stone-900 sm:text-3xl">
          Utilisateurs
        </h1>
        <p className="mt-2 text-sm leading-6 text-stone-600 sm:text-base">
          Cette page de maintenance Supabase a ete retiree. La gestion des comptes
          passe maintenant par l&apos;authentification locale Relvia.
        </p>
      </div>
    </section>
  );
}
