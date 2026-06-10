import BibliothequeClient from "@/components/BibliothequeClient";
import { appConfig } from "@/lib/config/appConfig";
import { getFavoriteSituationIds } from "@/lib/repositories/favorites";
import { getSituations } from "@/lib/repositories/situations";
import { getUserProfileByAuthUserId } from "@/lib/repositories/userProfiles";
import { hasSupabaseAuthCookies } from "@/lib/supabase/auth-state";
import { createClient } from "@/lib/supabase/server";

export default async function BibliothequePage() {
  const situations = await getSituations();
  let activeMetier = appConfig.currentMetier;
  let favoriteSituationIds: string[] = [];
  let isAuthenticated = false;

  if (await hasSupabaseAuthCookies()) {
    try {
      const supabase = await createClient();
      const {
        data: { session }
      } = await supabase.auth.getSession();

      const authUserId = session?.user?.id;

      if (authUserId) {
        isAuthenticated = true;

        const profile = await getUserProfileByAuthUserId(authUserId);

        favoriteSituationIds = await getFavoriteSituationIds(
          authUserId,
          situations.map((situation) => situation.id)
        );

        if (profile?.metier) {
          activeMetier = profile.metier;
        }
      }
    } catch {}
  }

  return (
    <BibliothequeClient
      situations={situations}
      activeMetier={activeMetier}
      favoriteSituationIds={favoriteSituationIds}
      isAuthenticated={isAuthenticated}
    />
  );
}
