# RELVIA_SUPABASE_AUTH_EXIT_REPORT

## Resume

Relvia a ete prepare pour sortir completement de Supabase Auth au niveau du code applicatif.

La nouvelle auth retenue est une auth locale basee sur PostgreSQL OVH avec :

- email
- mot de passe hashé via `scrypt`
- session persistée en base
- cookie de session `httpOnly`
- logout local

Les donnees metier `Situation` et `Variante` ne sont pas touchees.

## Modele d'auth choisi

Le modele retenu est le plus simple et le plus autonome possible :

- `UserProfile` devient le compte local principal
- le mot de passe est stocke sous forme de hash dans `UserProfile.passwordHash`
- une table `Session` stocke les sessions actives
- le cookie navigateur contient un token aleatoire
- seul le hash du token est stocke en base
- les favoris sont rattaches au compte local via `Favorite.userId`

Ce choix permet de supprimer toute dependance Supabase Auth sans ajouter de service externe.

## Modifications Prisma

### `UserProfile`

Changements :

- suppression de la dependance `authUserId`
- ajout de `passwordHash`
- `email` devient unique et sert d'identifiant de connexion
- conservation de `displayName`, `metier`, `createdAt`, `updatedAt`

### `Favorite`

Changements :

- remplacement de `authUserId` par `userId`
- ajout d'une vraie relation vers `UserProfile`
- contrainte unique : `userId + situationId`

### `Session`

Nouveau modele :

- `id`
- `tokenHash`
- `userId`
- `expiresAt`
- `createdAt`

### Migration ajoutee

Nouveau dossier :

- `prisma/migrations/20260611_local_auth_exit/`

Cette migration :

- vide `Favorite`
- vide `UserProfile`
- retire `authUserId`
- ajoute `passwordHash`
- ajoute `Session`
- rattache `Favorite` a `UserProfile`

## Fichiers modifies

### Auth et session

- `app/auth/actions.ts`
- `app/complete-profile/actions.ts`
- `app/complete-profile/page.tsx`
- `app/login/page.tsx`
- `app/signup/page.tsx`
- `lib/auth/password.ts`
- `lib/auth/session.ts`

### Bibliotheque et favoris

- `app/bibliotheque/page.tsx`
- `app/bibliotheque/[id]/page.tsx`
- `app/favorites/actions.ts`
- `app/favoris/page.tsx`
- `lib/repositories/favorites.ts`
- `lib/repositories/userProfiles.ts`

### Navigation et experience connectee

- `app/page.tsx`
- `components/Header.tsx`

### Prisma et tooling

- `prisma/schema.prisma`
- `prisma/migrations/20260611_local_auth_exit/migration.sql`
- `package.json`
- `package-lock.json`
- `eslint.config.mjs`

### Fichiers retires

- `lib/supabase/admin.ts`
- `lib/supabase/auth-state.ts`
- `lib/supabase/client.ts`
- `lib/supabase/server.ts`
- `app/utilisateurs/actions.ts`
- dossier interne parasite `lib/supabase/.vs/`

### Route utilisateurs

- `app/utilisateurs/page.tsx` a ete neutralisee

## Anciennes dependances Supabase

Supprimees du projet :

- `@supabase/ssr`
- `@supabase/supabase-js`

Etat du code :

- aucun import actif Supabase dans `app/`, `components/`, `lib/` ou `package.json`
- les variables `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` et `SUPABASE_SERVICE_ROLE_KEY` ne sont plus utilisees par le code

## Commandes executees localement

```bash
npm uninstall @supabase/ssr @supabase/supabase-js
npx prisma generate
npm run build
npm run lint
```

## Tests effectues

### Verification technique locale

- `npx prisma generate` : OK
- `npm run build` : OK
- `npm run lint` : OK

### Ce qui a ete verifie par le build

- pages `login`, `signup`, `complete-profile`
- pages `bibliotheque`, `bibliotheque/[id]`, `favoris`
- actions serveur d'auth et de favoris
- nouveau schema Prisma compile avec le client genere

## Statut final

Statut actuel du code :

- **sortie de Supabase Auth implementee dans le code**
- **build local OK**
- **lint local OK**
- **Prisma genere OK**

Le projet est pret pour une application sur le serveur OVH.

## Etapes serveur a faire ensuite

Pour activer cette nouvelle auth sur OVH, il faudra appliquer le code et le schema a la base locale PostgreSQL deja en place.

Ordre recommande :

1. deployer le code sur `/var/www/relvia`
2. sauvegarder le `.env`
3. retirer ensuite les variables Supabase devenues inutiles si souhaite
4. appliquer le schema Prisma sur la base locale OVH
5. recreer un premier compte local via `/signup`
6. rebuild
7. redemarrer `pm2 restart relvia`
8. tester `signup`, `login`, `logout`, `bibliotheque`, `favoris`

## Comptes existants

Decision respectee :

- les anciens comptes Supabase ne sont pas conserves
- les anciens `UserProfile` peuvent etre supprimes
- les `Favorite` peuvent etre vides

La migration a ete pensee pour repartir proprement avec de nouveaux comptes locaux.

## Risques restants

- la migration Prisma doit etre appliquee sur OVH avant d'utiliser la nouvelle auth
- tant que le serveur tourne encore sur l'ancien code, Supabase Auth reste le mecanisme actif en production
- les anciens cookies Supabase cote navigateur n'auront plus d'utilite apres bascule
- la route `/utilisateurs` est desactivee fonctionnellement mais reste presente comme page informative

## Verdict

Verdict final :

- **objectif code atteint**
- **Relvia peut sortir de Supabase Auth**
- **la prochaine etape est l'application serveur OVH et le test reel du nouveau flux local**