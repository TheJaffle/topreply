"use client";

import Link from "next/link";
import { useState } from "react";

type MobileMenuProps = Readonly<{
  isAuthenticated: boolean;
  logoutAction: () => Promise<void>;
}>;

export default function MobileMenu({
  isAuthenticated,
  logoutAction
}: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  function closeMenu() {
    setIsOpen(false);
  }

  return (
    <div className="sm:hidden">
      <button
        type="button"
        onClick={() => setIsOpen((currentValue) => !currentValue)}
        aria-expanded={isOpen}
        aria-label="Ouvrir le menu"
        className="flex h-11 w-11 items-center justify-center rounded-2xl border border-stone-200 bg-white text-stone-800 shadow-sm transition hover:bg-stone-50 focus:outline-none focus:ring-2 focus:ring-blue-100"
      >
        <span className="flex flex-col gap-1.5">
          <span className="block h-0.5 w-5 rounded-full bg-current" />
          <span className="block h-0.5 w-5 rounded-full bg-current" />
          <span className="block h-0.5 w-5 rounded-full bg-current" />
        </span>
      </button>
      {isOpen ? (
        <>
          <button
            type="button"
            aria-label="Fermer le menu"
            onClick={closeMenu}
            className="fixed inset-0 z-40 bg-stone-900/20"
          />
          <div className="fixed inset-x-4 top-20 z-50 rounded-[1.75rem] border border-stone-200 bg-white p-3 shadow-2xl">
            <nav aria-label="Navigation mobile">
              <ul className="space-y-1 text-sm font-medium text-stone-700">
                {isAuthenticated ? (
                  <>
                    <li>
                      <Link
                        href="/bibliotheque"
                        onClick={closeMenu}
                        className="block rounded-2xl px-4 py-3 transition hover:bg-stone-50"
                      >
                        Bibliothèque
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/favoris"
                        onClick={closeMenu}
                        className="block rounded-2xl px-4 py-3 transition hover:bg-stone-50"
                      >
                        Favoris
                      </Link>
                    </li>
                    <li>
                      <form
                        action={logoutAction}
                        onSubmit={() => {
                          closeMenu();
                        }}
                      >
                        <button
                          type="submit"
                          className="block w-full rounded-2xl px-4 py-3 text-left transition hover:bg-stone-50"
                        >
                          Déconnexion
                        </button>
                      </form>
                    </li>
                  </>
                ) : (
                  <li>
                    <Link
                      href="/login"
                      onClick={closeMenu}
                      className="block rounded-2xl px-4 py-3 transition hover:bg-stone-50"
                    >
                      Connexion
                    </Link>
                  </li>
                )}
              </ul>
            </nav>
          </div>
        </>
      ) : null}
    </div>
  );
}
