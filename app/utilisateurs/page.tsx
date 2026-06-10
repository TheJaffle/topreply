import type { User } from "@supabase/supabase-js";
import { deleteSelectedUsers } from "@/app/utilisateurs/actions";
import {
  getUserProfilesByAuthUserIds,
  type UserProfileRecord
} from "@/lib/repositories/userProfiles";
import { createAdminClient, hasSupabaseAdminEnv } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

export default async function UtilisateursPage() {
  if (!hasSupabaseAdminEnv()) {
    return (
      <section className="mx-auto w-full max-w-4xl px-4 py-6 sm:px-8 sm:py-12">
        <div className="rounded-[1.75rem] border border-stone-200 bg-white/90 p-4 shadow-panel sm:p-8">
          <h1 className="text-2xl font-semibold tracking-tight text-stone-900 sm:text-3xl">
            Utilisateurs
          </h1>
          <p className="mt-2 text-sm leading-6 text-stone-600 sm:text-base">
            Gestion indisponible sans configuration admin Supabase.
          </p>
        </div>
      </section>
    );
  }

  const supabase = createAdminClient();
  const {
    data: { users },
    error
  } = await supabase.auth.admin.listUsers();

  if (error) {
    throw new Error(error.message);
  }

  const authUserIds = users.map((user: User) => user.id);
  const profiles = await getUserProfilesByAuthUserIds(authUserIds);
  const profilesByAuthUserId = new Map(
    profiles.map((profile: UserProfileRecord) => [profile.authUserId, profile] as const)
  );

  return (
    <section className="mx-auto w-full max-w-4xl px-4 py-6 sm:px-8 sm:py-12">
      <div className="space-y-6 rounded-[1.75rem] border border-stone-200 bg-white/90 p-4 shadow-panel sm:p-8">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight text-stone-900 sm:text-3xl">
            Utilisateurs
          </h1>
          <p className="text-sm leading-6 text-stone-600 sm:text-base">
            Coche les utilisateurs à supprimer, puis valide l&apos;action.
          </p>
        </div>

        {users.length > 0 ? (
          <form action={deleteSelectedUsers} className="space-y-4">
            <div className="space-y-3">
              {users.map((user: User) => {
                const profile = profilesByAuthUserId.get(user.id);

                return (
                  <label
                    key={user.id}
                    className="flex items-start gap-3 rounded-[1.25rem] border border-stone-200 bg-stone-50 p-3 sm:p-4"
                  >
                    <input
                      type="checkbox"
                      name="authUserIds"
                      value={user.id}
                      className="mt-1 h-4 w-4 rounded border-stone-300 text-accent focus:ring-blue-200"
                    />
                    <div className="min-w-0 space-y-1">
                      <p className="break-all text-sm font-semibold text-stone-900 sm:text-base">
                        {user.email ?? "Email indisponible"}
                      </p>
                      <p className="text-xs text-stone-500 sm:text-sm">
                        Auth ID: {user.id}
                      </p>
                      {profile ? (
                        <p className="text-xs text-stone-600 sm:text-sm">
                          Métier: {profile.metier}
                        </p>
                      ) : null}
                    </div>
                  </label>
                );
              })}
            </div>

            <button
              type="submit"
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-red-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-200 focus:ring-offset-2"
            >
              Supprimer les utilisateurs cochés
            </button>
          </form>
        ) : (
          <p className="text-sm text-stone-600">Aucun utilisateur trouvé.</p>
        )}
      </div>
    </section>
  );
}
