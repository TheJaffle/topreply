import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import BrandFooter from "@/components/BrandFooter";
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
      <div className="grid w-full gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="space-y-6">
          <span className="inline-flex rounded-full border border-white/12 bg-white/8 px-4 py-2 text-sm font-medium text-blue-100/80 backdrop-blur-xl">
            Communication professionnelle
          </span>
          <div className="space-y-4">
            <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Que rÃ©pondre quand...
            </h1>
            <p className="max-w-xl text-base leading-7 text-blue-50/74 sm:text-lg">
              Trouvez rapidement une rÃ©ponse professionnelle adaptÃ©e Ã  votre
              situation.
            </p>
          </div>
          <Link
            href="/bibliotheque"
            className="inline-flex items-center justify-center rounded-full bg-[linear-gradient(135deg,#60a5fa_0%,#2563eb_100%)] px-6 py-3 text-sm font-semibold text-white shadow-[0_20px_34px_-22px_rgba(37,99,235,0.9)] transition hover:brightness-105 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-offset-2 focus:ring-offset-slate-950/0"
          >
            AccÃ©der Ã  la bibliothÃ¨que
          </Link>
        </div>

        <div className="space-y-4 rounded-[6px] border border-white/12 bg-slate-950/30 p-6 shadow-[0_34px_60px_-38px_rgba(2,6,23,1)] backdrop-blur-xl sm:p-8">
          <div className="space-y-4 rounded-[6px] border border-white/10 bg-white/8 p-5 sm:p-6">
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-blue-100/62">
              Approche
            </p>
            <h2 className="text-2xl font-semibold text-white">
              Des rÃ©ponses claires, adaptÃ©es et prÃªtes Ã  l&apos;emploi
            </h2>
            <p className="text-sm leading-7 text-blue-50/72 sm:text-base">
              Une interface pensÃ©e mobile pour lire vite, choisir le bon ton et
              rÃ©pondre sans repartir de zÃ©ro.
            </p>
          </div>
          <BrandFooter />
        </div>
      </div>
    </section>
  );
}