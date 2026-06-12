TRUNCATE TABLE "Favorite" RESTART IDENTITY CASCADE;
DELETE FROM "UserProfile";

DROP INDEX IF EXISTS "Favorite_authUserId_situationId_key";
DROP INDEX IF EXISTS "UserProfile_authUserId_key";

ALTER TABLE "UserProfile" DROP COLUMN IF EXISTS "authUserId";
ALTER TABLE "UserProfile" ADD COLUMN IF NOT EXISTS "passwordHash" TEXT NOT NULL DEFAULT '';
ALTER TABLE "UserProfile" ALTER COLUMN "passwordHash" DROP DEFAULT;
CREATE UNIQUE INDEX IF NOT EXISTS "UserProfile_email_key" ON "UserProfile"("email");

ALTER TABLE "Favorite" DROP COLUMN IF EXISTS "authUserId";
ALTER TABLE "Favorite" ADD COLUMN IF NOT EXISTS "userId" TEXT;
UPDATE "Favorite" SET "userId" = '' WHERE "userId" IS NULL;
ALTER TABLE "Favorite" ALTER COLUMN "userId" SET NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS "Favorite_userId_situationId_key" ON "Favorite"("userId", "situationId");
ALTER TABLE "Favorite" DROP CONSTRAINT IF EXISTS "Favorite_userId_fkey";
ALTER TABLE "Favorite"
  ADD CONSTRAINT "Favorite_userId_fkey"
  FOREIGN KEY ("userId") REFERENCES "UserProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

CREATE TABLE IF NOT EXISTS "Session" (
  "id" TEXT NOT NULL,
  "tokenHash" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "expiresAt" TIMESTAMP(3) NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "Session_tokenHash_key" ON "Session"("tokenHash");
CREATE INDEX IF NOT EXISTS "Session_userId_idx" ON "Session"("userId");
ALTER TABLE "Session" DROP CONSTRAINT IF EXISTS "Session_userId_fkey";
ALTER TABLE "Session"
  ADD CONSTRAINT "Session_userId_fkey"
  FOREIGN KEY ("userId") REFERENCES "UserProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
