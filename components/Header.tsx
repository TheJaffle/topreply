import Link from "next/link";
import { logout } from "@/app/auth/actions";
import MobileMenu from "@/components/MobileMenu";
import { getCurrentUser } from "@/lib/auth/session";

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

  const links: HeaderLink[] = user
    ? [...publicLinks, { href: "/favoris", label: "Favoris" }]
    : [...publicLinks];

  return (
    <header className="border-b border-white/60 bg-white/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-8 sm:py-4 lg:px-12">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-stone-900"
        >
          Que répondre quand...
        </Link>
        <MobileMenu isAuthenticated={Boolean(user)} logoutAction={logout} />
        <nav aria-label="Navigation principale" className="hidden sm:block">
          <ul className="flex flex-wrap items-center gap-2 rounded-3xl border border-stone-200 bg-stone-50 p-1 text-sm font-medium text-stone-600">
            {links.map((link: HeaderLink) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block rounded-full px-4 py-2 transition hover:bg-white hover:text-stone-900"
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
                    className="block rounded-full px-4 py-2 transition hover:bg-white hover:text-stone-900"
                  >
                    Déconnexion
                  </button>
                </form>
              </li>
            ) : (
              <li>
                <Link
                  href="/login"
                  className="block rounded-full px-4 py-2 transition hover:bg-white hover:text-stone-900"
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
