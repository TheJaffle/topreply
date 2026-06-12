import Link from "next/link";
import { logout } from "@/app/auth/actions";
import MobileMenu from "@/components/MobileMenu";
import { getCurrentUser } from "@/lib/auth/session";
import { appConfig } from "@/lib/config/appConfig";

type HeaderLink = Readonly<{
  href: string;
  label: string;
}>;

const publicLinks: readonly HeaderLink[] = [
  { href: "/", label: "Accueil" },
  { href: "/bibliotheque", label: "Bibliothèque" }
];

export default async function Header() {
  const user = await getCurrentUser();
  const currentMetier = user?.metier || appConfig.currentMetier;

  const links: HeaderLink[] = user
    ? [...publicLinks, { href: "/favoris", label: "Favoris" }]
    : [...publicLinks];

  return (
    <header className="relative z-[80] border-b border-white/10 bg-slate-950/25 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-8 sm:py-4 lg:px-12">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-white sm:text-xl"
        >
          Que répondre quand...
        </Link>
        <MobileMenu
          isAuthenticated={Boolean(user)}
          logoutAction={logout}
          currentMetier={currentMetier}
        />
        <nav aria-label="Navigation principale" className="hidden sm:block">
          <ul className="flex flex-wrap items-center gap-2 rounded-full border border-white/10 bg-white/10 p-1 text-sm font-medium text-blue-50/78 shadow-[0_18px_40px_-28px_rgba(15,23,42,0.9)] backdrop-blur-xl">
            {links.map((link: HeaderLink) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block rounded-full px-4 py-2 transition hover:bg-white/14 hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            {user ? (
              <li>
                <form action={logout}>
                  <button
                    type="submit"
                    className="block rounded-full bg-[linear-gradient(135deg,#60a5fa_0%,#2563eb_100%)] px-4 py-2 text-white transition hover:brightness-105"
                  >
                    Déconnexion
                  </button>
                </form>
              </li>
            ) : (
              <li>
                <Link
                  href="/login"
                  className="block rounded-full bg-[linear-gradient(135deg,#60a5fa_0%,#2563eb_100%)] px-4 py-2 text-white transition hover:brightness-105"
                >
                  Connexion
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
