# RELVIA_SUPABASE_EXIT_DEPLOYMENT_REPORT

## Resume

La sortie complete de Supabase est terminee pour Relvia.

Etat final confirme :

- application deployee sur OVH
- base applicative : PostgreSQL local OVH
- authentification : locale PostgreSQL
- Supabase PostgreSQL : non utilise
- Supabase Auth : non utilise par l'application en production

## Contexte final

Infrastructure cible :

- serveur : `ubuntu@51.255.82.201`
- dossier projet : `/var/www/relvia`
- process PM2 : `relvia`
- reverse proxy : Nginx
- domaine : `https://relvia.app`

## Code deploye

Commit de reference :

- `e01ff1f`
- `feat(auth): replace Supabase Auth with local PostgreSQL authentication`

## Travaux realises

### 1. Sortie de Supabase PostgreSQL

- la base applicative utilise desormais PostgreSQL local OVH
- `DATABASE_URL` et `DIRECT_URL` pointent vers la base locale `relvia`
- les donnees metier avaient deja ete copiees et verifiees avant cette bascule

### 2. Sortie de Supabase Auth

- retrait des helpers `lib/supabase/*`
- retrait des dependances `@supabase/ssr` et `@supabase/supabase-js`
- mise en place d'une auth locale simple :
  - email
  - mot de passe hashé
  - cookie de session `httpOnly`
  - table `Session`

### 3. Adaptation Prisma

- `UserProfile` converti pour utiliser `email` et `passwordHash`
- `Favorite` converti pour utiliser `userId`
- ajout du modele `Session`
- migration appliquee : `20260611_local_auth_exit`

## Commandes executees sur OVH

Sequence de deploiement appliquee :

```bash
cd /var/www/relvia
git pull origin main
npm install
npx prisma generate
npx prisma migrate resolve --applied 20260610_add_user_profile_baseline
npx prisma migrate resolve --applied 20260610_add_favorite
sed -i '1s/^\xEF\xBB\xBF//' prisma/migrations/20260611_local_auth_exit/migration.sql
npx prisma migrate resolve --rolled-back 20260611_local_auth_exit
npx prisma migrate deploy
npm run build
pm2 restart relvia
pm2 logs relvia --lines 100 --nostream
```

## Incident rencontre

### Migration Prisma

Probleme rencontre :

- la base locale OVH avait ete initialisee auparavant via `db push`
- Prisma a donc remonte `P3005` car le schema existait deja sans historique complet `_prisma_migrations`

Resolution :

- les anciennes migrations ont ete marquees comme deja appliquees via `prisma migrate resolve`
- la migration `20260611_local_auth_exit` a ensuite ete appliquee

### BOM dans la migration SQL

Probleme rencontre :

- la migration `20260611_local_auth_exit` contenait un BOM UTF-8 au debut du fichier
- PostgreSQL echouait sur `TRUNCATE` avec une erreur de syntaxe

Resolution :

- suppression du BOM sur le serveur
- marquage de la migration comme rollbackee
- relance de `prisma migrate deploy`

## Verifications effectuees

### Build

- `npm run build` : OK

### Runtime

- `pm2 restart relvia` : OK
- process `relvia` : `online`

### Tests HTTP

- `https://relvia.app/login` : `200 OK`
- `https://relvia.app/signup` : OK valide pendant le test utilisateur reel
- `https://relvia.app/bibliotheque` : `200 OK`
- `https://relvia.app/favoris` : `200 OK`

### Tests fonctionnels reels valides

- signup : OK
- login : OK
- logout : OK
- bibliotheque : OK
- favoris : OK
- reconnexion : OK

## Statut final

Statut final :

- **migration complete terminee**

Relvia fonctionne maintenant sans dependance active a Supabase.

Architecture active :

- frontend/app : Next.js 16
- base applicative : PostgreSQL local OVH
- authentification : locale PostgreSQL
- sessions : table `Session` + cookie `relvia_session`

## Ce qui peut encore etre nettoye plus tard

Actions optionnelles restantes :

- retirer de `.env` les anciennes variables Supabase devenues inutiles
- supprimer ou archiver eventuellement le projet Supabase si plus aucun usage externe n'en depend
- prevoir un nettoyage periodique des sessions expirees en base

## Rollback

Rollback possible cote code :

1. revenir au commit precedent
2. redeployer le code precedent
3. rebuild
4. restart PM2

Attention :

- le rollback complet n'est pas purement applicatif
- la migration Prisma a modifie le modele d'auth
- un vrai rollback de donnees demanderait une restauration base ou une migration inverse ciblee

## Conclusion

La sortie complete de Supabase est reussie.

Relvia est maintenant autonome sur OVH pour :

- sa base de donnees
- son authentification
- ses sessions
- ses favoris