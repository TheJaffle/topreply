import { redirect } from "next/navigation";
import { deleteSelectedUsers } from "@/app/utilisateurs/actions";
import { requireCurrentUser } from "@/lib/auth/session";
import { getUserSignature } from "@/lib/users/getUserSignature";
import { listUserProfiles } from "@/lib/repositories/userProfiles";

export const dynamic = "force-dynamic";

type UtilisateursPageProps = Readonly<{
  searchParams: Promise<{
    status?: string;
    count?: string;
  }>;
}>;

function getStatusMessage(status?: string, count?: string) {
  if (status === "empty") {
    return "Sélectionnez au moins un utilisateur.";
  }

  if (status === "deleted") {
    const total = Number(count ?? "0");

    if (Number.isFinite(total) && total > 0) {
      return total === 1
        ? "1 utilisateur supprimé."
        : `${total} utilisateurs supprimés.`;
    }

    return "Utilisateurs supprimés.";
  }

  return null;
}

export default async function UtilisateursPage({
  searchParams
}: UtilisateursPageProps) {
  const currentUser = await requireCurrentUser();
  const users = await listUserProfiles();
  const { status, count } = await searchParams;
  const statusMessage = getStatusMessage(status, count);

  if (!currentUser) {
    redirect("/login");
  }

  return (
    <section className="mx-auto w-full max-w-4xl px-4 py-6 sm:px-8 sm:py-12">
      <div className="rounded-[6px] border border-stone-200 bg-white/90 p-4 shadow-panel sm:p-8">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight text-stone-900 sm:text-3xl">
            Utilisateurs
          </h1>
          <p className="text-sm leading-6 text-stone-600 sm:text-base">
            Cette page agit sur la base PostgreSQL actuellement connectée par Prisma.
          </p>
        </div>

        {statusMessage ? (
          <p className="mt-4 rounded-[6px] bg-blue-50 px-4 py-3 text-sm font-medium text-blue-700">
            {statusMessage}
          </p>
        ) : null}

        <form action={deleteSelectedUsers} className="mt-6 space-y-4">
          <div className="space-y-3">
            {users.length > 0 ? (
              users.map((user) => {
                const signature = getUserSignature(user);
                const label = signature || user.displayName || user.email;
                const isCurrentUser = user.id === currentUser.id;

                return (
                  <label
                    key={user.id}
                    className="flex items-start gap-3 rounded-[6px] border border-stone-200 bg-white px-4 py-3"
                  >
                    <input
                      type="checkbox"
                      name="userIds"
                      value={user.id}
                      className="mt-1 h-4 w-4 rounded border-stone-300 text-blue-600 focus:ring-blue-500"
                    />
                    <div className="min-w-0 flex-1 space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-sm font-semibold text-stone-900 sm:text-base">
                          {label}
                        </p>
                        {isCurrentUser ? (
                          <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[11px] font-semibold text-blue-700">
                            Vous
                          </span>
                        ) : null}
                      </div>
                      <p className="break-all text-sm text-stone-600">{user.email}</p>
                      <p className="text-xs font-medium uppercase tracking-[0.14em] text-stone-500">
                        {user.metier}
                      </p>
                    </div>
                  </label>
                );
              })
            ) : (
              <div className="rounded-[6px] border border-dashed border-stone-300 bg-stone-50 px-4 py-6 text-sm text-stone-600">
                Aucun utilisateur trouvé dans la base connectée.
              </div>
            )}
          </div>

          {users.length > 0 ? (
            <button
              type="submit"
              className="inline-flex min-h-11 items-center justify-center rounded-[6px] bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-200"
            >
              Supprimer les utilisateurs cochés
            </button>
          ) : null}
        </form>
      </div>
    </section>
  );
}
