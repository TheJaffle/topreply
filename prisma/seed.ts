import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { situations } from "./seed-data.ts";

const adapter = new PrismaPg(process.env.DATABASE_URL!);
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.variante.deleteMany();
  await prisma.situation.deleteMany();

  for (const situation of situations) {
    await prisma.situation.create({
      data: {
        metier: situation.metier,
        categorie: situation.categorie,
        titre: situation.titre,
        description: situation.description,
        tags: situation.tags,
        variantes: {
          create: situation.variantes.map((variante) => ({
            label: variante.label,
            contenu: variante.contenu
          }))
        }
      }
    });
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
