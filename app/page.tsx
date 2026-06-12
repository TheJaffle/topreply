import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/session";

function isMobileUserAgent(userAgent: string) {
  return /Android|iPhone|iPad|iPod|Mobile|Opera Mini|IEMobile/i.test(
    userAgent
  );
}

export default async function HomePage() {
  const headerStore = await headers();
  const userAgent = headerStore.get("user-agent") ?? "";

  if (isMobileUserAgent(userAgent)) {
    const user = await getCurrentUser();
    redirect(user ? "/bibliotheque" : "/login");
  }

  return (
    <section className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-6xl items-center px-5 py-16 sm:px-8 lg:px-12">
      <div className="grid w-full gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div className="space-y-6">
          <span className="inline-flex rounded-full border border-stone-300 bg-white/80 px-4 py-2 text-sm font-medium text-stone-600 shadow-panel backdrop-blur">
            Communication professionnelle
          </span>
          <div className="space-y-4">
            <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-stone-900 sm:text-5xl lg:text-6xl">
              Que répondre quand...
            </h1>
            <p className="max-w-xl text-base leading-7 text-muted sm:text-lg">
              Trouvez rapidement une réponse professionnelle adaptée à votre
              situation.
            </p>
          </div>
          <Link
            href="/bibliotheque"
            className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-offset-2"
          >
            Accéder à la bibliothèque
          </Link>
        </div>
        <div className="rounded-[2rem] border border-white/70 bg-white/85 p-6 shadow-panel backdrop-blur sm:p-8">
          <div className="space-y-4 rounded-[1.5rem] border border-stroke bg-stone-50 p-5 sm:p-6">
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-stone-500">
              Approche
            </p>
            <h2 className="text-2xl font-semibold text-stone-900">
              Des réponses claires, adaptées et prêtes à l&apos;emploi
            </h2>
            <p className="text-sm leading-7 text-muted sm:text-base">
              Une interface simple, pensée mobile, pour retrouver rapidement le
              bon ton et la bonne formulation selon votre contexte
              professionnel.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
