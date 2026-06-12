import BibliothequeClient from "@/components/BibliothequeClient";
import { getCurrentUser } from "@/lib/auth/session";
import { appConfig } from "@/lib/config/appConfig";
import { isAvailableLibrary } from "@/lib/config/libraries";
import { getFavoriteSituationIds } from "@/lib/repositories/favorites";
import { getSituations } from "@/lib/repositories/situations";

export const dynamic = "force-dynamic";

type BibliothequePageProps = Readonly<{
  searchParams: Promise<{
    metier?: string;
  }>;
}>;

export default async function BibliothequePage({
  searchParams
}: BibliothequePageProps) {
  const situations = await getSituations();
  const currentUser = await getCurrentUser();
  const { metier } = await searchParams;
  const requestedMetier = metier ?? "";
  let activeMetier = currentUser?.metier || appConfig.currentMetier;
  let favoriteSituationIds: string[] = [];
  let isAuthenticated = false;

  if (isAvailableLibrary(requestedMetier)) {
    activeMetier = requestedMetier;
  }

  if (currentUser) {
    isAuthenticated = true;
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
