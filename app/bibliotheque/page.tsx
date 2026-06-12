import BibliothequeClient from "@/components/BibliothequeClient";
import { getCurrentUser } from "@/lib/auth/session";
import { appConfig } from "@/lib/config/appConfig";
import { getFavoriteSituationIds } from "@/lib/repositories/favorites";
import { getSituations } from "@/lib/repositories/situations";

export const dynamic = "force-dynamic";

export default async function BibliothequePage() {
  const situations = await getSituations();
  const currentUser = await getCurrentUser();
  let activeMetier = appConfig.currentMetier;
  let favoriteSituationIds: string[] = [];
  let isAuthenticated = false;

  if (currentUser) {
    isAuthenticated = true;
    activeMetier = currentUser.metier || appConfig.currentMetier;
    favoriteSituationIds = await getFavoriteSituationIds(
      currentUser.id,
      situations.map((situation) => situation.id)
    );
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