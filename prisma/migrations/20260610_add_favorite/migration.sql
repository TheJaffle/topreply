-- CreateTable
CREATE TABLE "Favorite" (
    "id" TEXT NOT NULL,
    "authUserId" TEXT NOT NULL,
    "situationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Favorite_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Favorite_authUserId_situationId_key" ON "Favorite"("authUserId", "situationId");

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_situationId_fkey" FOREIGN KEY ("situationId") REFERENCES "Situation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
