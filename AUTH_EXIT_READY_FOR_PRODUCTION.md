# AUTH_EXIT_READY_FOR_PRODUCTION

## Commit SHA

- commit : `e01ff1f`
- message : `feat(auth): replace Supabase Auth with local PostgreSQL authentication`

## Resume des changements

Ce commit remplace completement Supabase Auth par une authentification locale basee sur PostgreSQL OVH.

Principaux changements :

- suppression des helpers runtime Supabase (`lib/supabase/*`)
- suppression des dependances `@supabase/ssr` et `@supabase/supabase-js`
- ajout d'un hash mot de passe local via `scrypt`
- ajout d'une gestion de session locale via cookie `httpOnly` + table `Session`
- conversion de `UserProfile` pour utiliser `email` + `passwordHash`
- conversion de `Favorite` pour utiliser `userId` au lieu de `authUserId`
- adaptation de `signup`, `login`, `logout`, `complete-profile`, `bibliotheque`, `favoris`
- neutralisation de l'ancienne page de maintenance utilisateurs Supabase
- ajout d'une migration Prisma : `prisma/migrations/20260611_local_auth_exit/migration.sql`

## Verification locale avant deploiement

Valide localement avant push :

- `npm run build` : OK
- `npm run lint` : OK
- tests fonctionnels reels valides :
  - signup OK
  - login OK
  - logout OK
  - bibliotheque OK
  - favoris OK
  - reconnexion OK

## Procedure de deploiement OVH

Depuis le serveur OVH, ordre recommande :

1. Se placer dans le projet :

```bash
cd /var/www/relvia
```

2. Sauvegarder les variables d'environnement actuelles :

```bash
cp .env .env.backup-before-auth-exit
```

3. Recuperer le dernier code :

```bash
git pull origin main
```

4. Installer / mettre a jour les dependances :

```bash
npm install
```

5. Generer Prisma :

```bash
npx prisma generate
```

6. Appliquer la migration sur la base PostgreSQL locale OVH :

Option recommandee si l'historique de migrations est coherent :

```bash
npx prisma migrate deploy
```

Si besoin exceptionnel et uniquement si le contexte de migration l'impose :

```bash
npx prisma db push
```

7. Rebuild application :

```bash
npm run build
```

8. Redemarrer uniquement Relvia :

```bash
pm2 restart relvia
```

9. Verifier les logs :

```bash
pm2 logs relvia --lines 100 --nostream
```

10. Tester les parcours critiques :

- `/signup`
- `/login`
- `/logout`
- `/bibliotheque`
- `/bibliotheque/[id]`
- ajout favori
- suppression favori
- persistance apres reconnexion

## Points d'attention deployment

- la migration supprime les anciens `UserProfile`
- la migration vide `Favorite`
- `Situation` et `Variante` ne doivent pas etre touches
- Supabase Auth n'est plus necessaire apres bascule du code
- les variables Supabase peuvent rester temporairement dans `.env` tant que rien ne les consomme, puis etre nettoyees ensuite

## Rollback

Si un probleme apparait apres deploiement :

1. Revenir au commit precedent :

```bash
git log --oneline -n 2
git checkout <commit_precedent>
```

ou, si vous preferez rester sur `main`, reset vers le commit precedent avec prudence uniquement si le workflow le permet.

2. Restaurer le `.env` si necessaire :

```bash
cp .env.backup-before-auth-exit .env
```

3. Reinstaller si besoin :

```bash
npm install
npx prisma generate
```

4. Si la base a deja recu la migration auth locale, le rollback applicatif n'est pas suffisant a lui seul.
   Il faudra alors soit :

- restaurer la base depuis un backup
- soit preparer une migration inverse ciblee

## Statut

- commit cree : **oui**
- push GitHub : **oui**
- deploiement OVH : **non**, pas encore execute

Le lot est pret pour une mise en production controlee sur OVH.