# AUTH_EXIT_GIT_REVIEW

## 1. Resume Git

Etat observe via `git status` sur `C:\Users\bruno\ProReply`.

### Fichiers modifies

- `app/auth/actions.ts`
- `app/bibliotheque/[id]/page.tsx`
- `app/bibliotheque/page.tsx`
- `app/complete-profile/actions.ts`
- `app/complete-profile/page.tsx`
- `app/favoris/page.tsx`
- `app/favorites/actions.ts`
- `app/login/page.tsx`
- `app/page.tsx`
- `app/signup/page.tsx`
- `app/utilisateurs/page.tsx`
- `components/Header.tsx`
- `lib/repositories/favorites.ts`
- `lib/repositories/userProfiles.ts`
- `package.json`
- `package-lock.json`
- `prisma/schema.prisma`

### Fichiers supprimes

- `app/utilisateurs/actions.ts`
- `lib/supabase/admin.ts`
- `lib/supabase/auth-state.ts`
- `lib/supabase/client.ts`
- `lib/supabase/server.ts`
- `lib/supabase/.vs/ProjectSettings.json`
- `lib/supabase/.vs/VSWorkspaceState.json`
- `lib/supabase/.vs/slnx.sqlite`
- `lib/supabase/.vs/supabase/FileContentIndex/d00e4576-d519-4e3a-b7be-a579521be7b8.vsidx`
- `lib/supabase/.vs/supabase/v17/.wsuo`
- `lib/supabase/.vs/supabase/v17/DocumentLayout.json`

### Fichiers ajoutes

- `eslint.config.mjs`
- `lib/auth/password.ts`
- `lib/auth/session.ts`
- `prisma/migrations/20260611_local_auth_exit/migration.sql`
- `RELVIA_SUPABASE_AUTH_EXIT_REPORT.md`

### Fichiers non suivis mais hors perimetre auth exit

Ces fichiers sont presents localement mais ne sont pas necessaires au commit de sortie de Supabase Auth :

- `POSTGRESQL_RELVIA_DATA_IMPORT_REPORT.md`
- `POSTGRESQL_RELVIA_SETUP.md`
- `RELVIA_LOCAL_DB_MIGRATION_PLAN.md`
- `RELVIA_LOCAL_DB_SWITCH_REPORT.md`
- `RELVIA_OVH_DEPLOYMENT_REPORT.md`

### Bilan Git

- 17 fichiers modifies
- 11 fichiers supprimes
- 5 fichiers ajoutes directement lies a l'auth exit
- plusieurs documents de rapport non suivis sans lien direct avec le commit d'auth

## 2. Diff detaille

### `prisma/schema.prisma`

Role : schema Prisma central.

Type de modification : refonte du modele d'auth.

Impact fonctionnel :

- `UserProfile` ne depend plus de `authUserId`
- `email` devient unique
- ajout de `passwordHash`
- ajout des relations `favorites` et `sessions`
- `Favorite` remplace `authUserId` par `userId`
- ajout du modele `Session`

### `prisma/migrations/20260611_local_auth_exit/migration.sql`

Role : migration SQL de sortie Supabase Auth.

Type de modification : nouvelle migration.

Impact fonctionnel :

- vide `Favorite`
- supprime les anciens `UserProfile`
- supprime `authUserId`
- ajoute `passwordHash`
- ajoute la table `Session`
- rattache les favoris a `UserProfile.id`

Observation importante : cette migration est destructive pour les profils et favoris existants, ce qui est coherent avec la decision produit.

### `lib/auth/password.ts`

Role : hash et verification des mots de passe.

Type de modification : nouveau fichier.

Impact fonctionnel :

- hash local avec `scrypt`
- verification via `timingSafeEqual`
- suppression du besoin de mot de passe Supabase

### `lib/auth/session.ts`

Role : gestion de session locale.

Type de modification : nouveau fichier.

Impact fonctionnel :

- creation de session locale en base
- cookie `relvia_session` `httpOnly`
- recuperation de l'utilisateur courant
- suppression de session au logout
- redirection login si session absente sur les flux proteges

### `app/auth/actions.ts`

Role : server actions `signup`, `login`, `logout`.

Type de modification : reimplementation complete.

Impact fonctionnel :

- `login` verifie maintenant email + hash local
- `signup` cree directement un `UserProfile` local
- `logout` detruit la session locale au lieu d'appeler Supabase
- validation metier conservee sur le choix de bibliotheque

### `lib/repositories/userProfiles.ts`

Role : acces base pour les profils.

Type de modification : refonte du repository.

Impact fonctionnel :

- suppression des acces par `authUserId`
- ajout des acces par `id` et par `email`
- ajout de `createUserProfile`, `updateUserProfile`, `listUserProfiles`
- conservation de `isUserProfileComplete`

### `lib/repositories/favorites.ts`

Role : acces base pour les favoris.

Type de modification : adaptation des cles de rattachement.

Impact fonctionnel :

- les favoris sont maintenant lies a `userId`
- toutes les operations favorites utilisent `UserProfile.id`
- la contrainte unique devient `userId + situationId`

### `app/favorites/actions.ts`

Role : server actions d'ajout et suppression de favoris.

Type de modification : rebranchement auth.

Impact fonctionnel :

- remplacement de la lecture de session Supabase par `getCurrentUserId()`
- revalidation de `/favoris` ajoutee

### `app/bibliotheque/page.tsx`

Role : page serveur de bibliotheque.

Type de modification : changement de source auth.

Impact fonctionnel :

- lecture du compte via la session locale
- metier actif derive du profil local
- favoris derives du `UserProfile.id`
- comportement public conserve pour les non connectes

### `app/bibliotheque/[id]/page.tsx`

Role : detail d'une situation.

Type de modification : changement de source auth.

Impact fonctionnel :

- etat favori calcule depuis la session locale
- detail continue a fonctionner en public

### `app/favoris/page.tsx`

Role : page favoris.

Type de modification : changement de source auth.

Impact fonctionnel :

- non connecte : message + lien login
- connecte : charge les favoris via `UserProfile.id`

### `app/complete-profile/actions.ts` et `app/complete-profile/page.tsx`

Role : completion du profil apres connexion.

Type de modification : rebranchement auth.

Impact fonctionnel :

- la page utilise l'utilisateur local courant
- la mise a jour se fait via `updateUserProfile`
- plus aucun appel Supabase

### `app/login/page.tsx` et `app/signup/page.tsx`

Role : formulaires publics d'auth.

Type de modification : adaptation mineure UI + redirections.

Impact fonctionnel :

- redirection vers `/bibliotheque` si deja connecte
- nouveaux messages d'erreur locaux (`email-exists`, `invalid-metier`)

### `app/page.tsx`

Role : accueil.

Type de modification : remplacement de la detection session mobile.

Impact fonctionnel :

- sur mobile, redirige desormais selon la session locale

### `components/Header.tsx`

Role : navigation globale.

Type de modification : remplacement de la lecture session.

Impact fonctionnel :

- le header determine l'etat connecte via l'auth locale
- lien `Favoris` et bouton `Deconnexion` relies a la session locale

Observation UX : plusieurs libelles francais ont perdu leurs accents dans ce fichier et dans d'autres pages modifiees.

### `app/utilisateurs/page.tsx` et suppression de `app/utilisateurs/actions.ts`

Role : ancienne maintenance utilisateurs Supabase.

Type de modification : neutralisation fonctionnelle.

Impact fonctionnel :

- la suppression d'utilisateurs Supabase n'existe plus
- la page reste accessible mais informative uniquement

### `lib/supabase/*` et `package*.json`

Role : ancienne couche Supabase.

Type de modification : suppression et nettoyage dependances.

Impact fonctionnel :

- plus aucun helper runtime Supabase dans l'app
- `@supabase/ssr` et `@supabase/supabase-js` retires des dependances
- script `lint` adapte a Next 16 / ESLint 9
- ajout de `eslint.config.mjs`

## 3. Prisma

### Modifications `UserProfile`

Avant :

- `id`
- `authUserId`
- `email`
- `displayName`
- `metier`
- `createdAt`
- `updatedAt`

Apres :

- `id`
- `email @unique`
- `passwordHash`
- `displayName`
- `metier`
- `favorites[]`
- `sessions[]`
- `createdAt`
- `updatedAt`

### Modifications `Favorite`

Avant :

- `authUserId`
- `situationId`
- contrainte unique `authUserId + situationId`

Apres :

- `userId`
- `situationId`
- relation reelle vers `UserProfile`
- contrainte unique `userId + situationId`

### Nouveau modele `Session`

- `id`
- `tokenHash @unique`
- `userId`
- `expiresAt`
- `createdAt`
- index sur `userId`

### Migration creee

- `prisma/migrations/20260611_local_auth_exit/migration.sql`

Effets principaux :

- purge `Favorite`
- purge `UserProfile`
- suppression de l'ancien rattachement Supabase
- ajout du support session locale

## 4. Auth

### Signup

Nouveau fonctionnement :

1. lecture des champs formulaire
2. verification email / password / displayName / metier
3. verification de l'unicite email
4. hash du mot de passe avec `scrypt`
5. creation directe du `UserProfile`
6. redirection vers `/login?message=signup-success`

### Login

Nouveau fonctionnement :

1. lecture email / password
2. recherche du profil par email
3. verification du hash de mot de passe
4. creation d'une session en base
5. ecriture du cookie `relvia_session`
6. redirection vers `/bibliotheque` ou `/complete-profile`

### Logout

Nouveau fonctionnement :

1. lecture du cookie de session
2. suppression de la session correspondante en base
3. expiration du cookie
4. redirection vers `/login`

### Session

Nouveau fonctionnement :

- token aleatoire stocke en cookie
- hash SHA-256 du token stocke en base
- session lue via cookie + lookup base
- expiration fixe a 30 jours
- aucune rotation automatique du token a chaque requete

## 5. Risques

### Risques de regression

- plusieurs textes FR ont ete reecrits en ASCII sans accents dans des composants visibles
- la page `/utilisateurs` perd sa fonction historique de purge Supabase, ce qui est volontaire mais a valider produit
- des fichiers modifies contiennent un BOM UTF-8 visible dans les diffs (`﻿` en tete), surtout sur les fichiers reecrits via PowerShell

### Risques sur les favoris

- tous les anciens favoris sont perdus par migration, ce qui est coherent avec la decision produit
- le nouveau rattachement `Favorite -> UserProfile.id` est plus propre, mais suppose une migration SQL appliquee sans erreur

### Risques sur les profils

- tous les anciens `UserProfile` seront effaces par la migration
- la recreation des comptes devra se faire depuis `/signup`
- aucun mecanisme d'import ou de recuperation des anciens comptes n'est prevu

### Risques sur les sessions

- pas de nettoyage automatique des sessions expirees en base
- pas de rotation de session apres login prolongé ou changement de mot de passe
- pas de protection supplementaire type CSRF dediee sur les formulaires, on reste sur le niveau standard App Router + cookie `httpOnly`

### Risques de deploiement

- la migration Prisma est destructive pour profils/favoris et doit etre executee en connaissance de cause
- aucun test end-to-end reel OVH n'a encore valide `signup -> login -> favoris -> relogin`

## 6. Deploiement

### Coherence du code

Oui, le code est globalement coherent.

Indices favorables :

- `npx prisma generate` : OK
- `npm run build` : OK
- `npm run lint` : OK
- plus aucun import runtime Supabase actif dans `app/`, `components/`, `lib/`, `package.json`

### Build

Le build local est propre.

### Surete de deploiement

Le deploiement est raisonnablement sur techniquement, mais pas encore totalement serein fonctionnellement, car :

- la migration est destructive sur les comptes
- aucun test serveur reel du nouveau flux complet n'a encore ete mene
- des regressions de contenu UI FR sont visibles

## 7. Recommandation

### Verdict

**B) necessite encore des corrections**

### Pourquoi

Les points a corriger avant commit sont limités mais reels :

1. nettoyer les libelles FR qui ont perdu leurs accents
2. supprimer les BOM introduits dans certains fichiers reecrits
3. decider si les rapports non suivis doivent rester hors commit
4. idealement tester en reel le flux local :
   - signup
   - login
   - logout
   - ajout favori
   - suppression favori
   - persistance apres reconnexion

### Lecture finale

- architecture auth locale : **bonne direction**
- schema Prisma : **coherent**
- build/lint : **propres**
- etat Git : **pas encore pret a commiter tel quel sans petit nettoyage final**