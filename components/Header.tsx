import Link from "next/link";

const links = [
  { href: "/", label: "Accueil" },
  { href: "/bibliotheque", label: "Bibliothèque" }
];

export default function Header() {
  return (
    <header className="border-b border-white/60 bg-white/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-stone-900"
        >
          Que répondre quand...
        </Link>
        <nav aria-label="Navigation principale">
          <ul className="flex flex-wrap items-center gap-2 rounded-3xl border border-stone-200 bg-stone-50 p-1 text-sm font-medium text-stone-600">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block rounded-full px-4 py-2 transition hover:bg-white hover:text-stone-900"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
