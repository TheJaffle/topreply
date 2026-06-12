"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";
import { availableLibraries, isAvailableLibrary } from "@/lib/config/libraries";

type MobileMenuProps = Readonly<{
  isAuthenticated: boolean;
  logoutAction: () => Promise<void>;
  currentMetier: string;
}>;

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="h-4 w-4 text-blue-300"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m4.5 10 3.5 3.5 7.5-7.5" />
    </svg>
  );
}

export default function MobileMenu({
  isAuthenticated,
  logoutAction,
  currentMetier
}: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const menuRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const metierParam = searchParams.get("metier");
  const selectedMetier = isAvailableLibrary(metierParam ?? "")
    ? metierParam
    : currentMetier;

  function closeMenu() {
    setIsOpen(false);
    setIsLibraryOpen(false);
  }

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handlePointerDown(event: PointerEvent) {
      const target = event.target;

      if (!(target instanceof Node)) {
        return;
      }

      if (menuRef.current?.contains(target) || buttonRef.current?.contains(target)) {
        return;
      }

      closeMenu();
    }

    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [isOpen]);

  function toggleMenu() {
    setIsOpen((currentValue) => {
      const nextValue = !currentValue;

      if (!nextValue) {
        setIsLibraryOpen(false);
      }

      return nextValue;
    });
  }

  function toggleLibraryPopup() {
    setIsLibraryOpen((currentValue) => !currentValue);
  }

  function selectLibrary(library: string) {
    if (library === selectedMetier && pathname === "/bibliotheque") {
      closeMenu();
      return;
    }

    startTransition(() => {
      closeMenu();
      router.push(`/bibliotheque?metier=${encodeURIComponent(library)}`);
    });
  }

  return (
    <div className="relative z-[220] sm:hidden">
      <button
        ref={buttonRef}
        type="button"
        onClick={toggleMenu}
        aria-expanded={isOpen}
        aria-label="Ouvrir le menu"
        className="flex h-11 w-11 items-center justify-center rounded-[6px] border border-white/14 bg-white/10 text-white shadow-[0_18px_30px_-24px_rgba(15,23,42,1)] transition hover:bg-white/16 focus:outline-none focus:ring-2 focus:ring-blue-200"
      >
        <span className="flex flex-col gap-1.5">
          <span className="block h-0.5 w-5 rounded-full bg-current" />
          <span className="block h-0.5 w-5 rounded-full bg-current" />
          <span className="block h-0.5 w-5 rounded-full bg-current" />
        </span>
      </button>
      {isOpen ? (
        <div className="fixed inset-0 z-[230]" aria-hidden="true">
          <div className="absolute inset-0 bg-slate-950/55" />
          <div
            ref={menuRef}
            className="absolute inset-x-4 top-20 z-[240] rounded-[6px] border border-slate-700 bg-[#050816] p-3 shadow-[0_28px_70px_-30px_rgba(2,6,23,0.95)]"
          >
            <nav aria-label="Navigation mobile">
              <ul className="space-y-1 text-sm font-medium text-white">
                <li className="space-y-2">
                  <button
                    type="button"
                    onClick={toggleLibraryPopup}
                    aria-expanded={isLibraryOpen}
                    className="flex w-full items-center justify-between rounded-[6px] px-4 py-3 text-left text-white transition hover:bg-white/10"
                  >
                    <span>Bibliothèque</span>
                    <span className="text-white/70">{isLibraryOpen ? "-" : "+"}</span>
                  </button>
                  {isLibraryOpen ? (
                    <div className="rounded-[6px] border border-slate-700 bg-slate-900 px-2 py-2">
                      <ul className="space-y-1">
                        {availableLibraries.map((library) => {
                          const isSelected = library === selectedMetier;

                          return (
                            <li key={library}>
                              <button
                                type="button"
                                onClick={() => selectLibrary(library)}
                                disabled={isPending}
                                className="flex w-full items-center justify-between rounded-[6px] px-3 py-2 text-left text-white transition hover:bg-white/8 disabled:opacity-70"
                              >
                                <span>{library}</span>
                                {isSelected ? <CheckIcon /> : <span className="h-4 w-4" />}
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ) : null}
                </li>

                <li>
                  <button
                    type="button"
                    className="block w-full rounded-[6px] px-4 py-3 text-left text-white/72 transition hover:bg-white/10"
                  >
                    Compte
                  </button>
                </li>

                <li>
                  <button
                    type="button"
                    className="block w-full rounded-[6px] px-4 py-3 text-left text-white/72 transition hover:bg-white/10"
                  >
                    Mentions légales
                  </button>
                </li>

                {isAuthenticated ? (
                  <li>
                    <form
                      action={logoutAction}
                      onSubmit={() => {
                        closeMenu();
                      }}
                    >
                      <button
                        type="submit"
                        className="block w-full rounded-[6px] bg-[linear-gradient(135deg,#60a5fa_0%,#2563eb_100%)] px-4 py-3 text-left text-white transition hover:brightness-105"
                      >
                        Déconnexion
                      </button>
                    </form>
                  </li>
                ) : (
                  <li>
                    <Link
                      href="/login"
                      onClick={closeMenu}
                      className="block rounded-[6px] bg-[linear-gradient(135deg,#60a5fa_0%,#2563eb_100%)] px-4 py-3 text-white transition hover:brightness-105"
                    >
                      Connexion
                    </Link>
                  </li>
                )}
              </ul>
            </nav>
          </div>
        </div>
      ) : null}
    </div>
  );
}
