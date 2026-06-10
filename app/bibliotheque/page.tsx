import BibliothequeClient from "@/components/BibliothequeClient";
import { getSituations } from "@/lib/repositories/situations";

export default async function BibliothequePage() {
  const situations = await getSituations();

  return <BibliothequeClient situations={situations} />;
}
