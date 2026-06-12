import { redirect } from "next/navigation";
import { completeProfile } from "@/app/complete-profile/actions";
import { getCurrentUser } from "@/lib/auth/session";
import { isUserProfileComplete } from "@/lib/repositories/userProfiles";

export const dynamic = "force-dynamic";

type CompleteProfilePageProps = Readonly<{
  searchParams: Promise<{
    error?: string;
  }>;
}>;

function getErrorMessage(error?: string) {
  if (error === "missing-fields") {
    return "Veuillez renseigner tous les champs du formulaire.";
  }

  return null;
}

export default async function CompleteProfilePage({
  searchParams
}: CompleteProfilePageProps) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  if (isUserProfileComplete(user)) {
    redirect("/bibliotheque");
  }

  const { error } = await searchParams;
  const errorMessage = getErrorMessage(error);

  return (
    <section className="mx-auto w-full max-w-md px-5 py-12 sm:px-8 sm:py-16">
      <div className="rounded-[6px] border border-white/70 bg-white/90 p-6 shadow-panel sm:p-8">
        <div className="space-y-6">
          <div className="space-y-3">
            <h1 className="text-3xl font-semibold tracking-tight text-stone-900">
              Compléter le profil
            </h1>
          </div>
          {errorMessage ? (
            <p className="rounded-[6px] bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
              {errorMessage}
            </p>
          ) : null}
          <form action={completeProfile} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label
                  htmlFor="firstName"
                  className="text-sm font-semibold text-stone-700"
                >
                  Prénom
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  autoComplete="given-name"
                  required
                  defaultValue={user.firstName}
                  className="min-h-12 w-full rounded-[6px] border border-stone-200 bg-white px-4 py-3 text-base text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-blue-300 focus:ring-2 focus:ring-blue-100"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="lastName"
                  className="text-sm font-semibold text-stone-700"
                >
                  Nom
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  autoComplete="family-name"
                  required
                  defaultValue={user.lastName}
                  className="min-h-12 w-full rounded-[6px] border border-stone-200 bg-white px-4 py-3 text-base text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-blue-300 focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label
                htmlFor="metier"
                className="text-sm font-semibold text-stone-700"
              >
                Bibliothèque
              </label>
              <select
                id="metier"
                name="metier"
                required
                defaultValue={user.metier ?? ""}
                className="min-h-12 w-full rounded-[6px] border border-stone-200 bg-white px-4 py-3 text-base text-stone-900 outline-none transition focus:border-blue-300 focus:ring-2 focus:ring-blue-100"
              >
                <option value="" disabled>
                  Choisir une bibliothèque
                </option>
                <option value="Artisan">Artisan</option>
                <option value="Immobilier">Immobilier</option>
                <option value="Commercial B2B">Commercial B2B</option>
              </select>
            </div>
            <button
              type="submit"
              className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-offset-2"
            >
              Continuer
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
