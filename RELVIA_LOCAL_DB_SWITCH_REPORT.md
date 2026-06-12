# RELVIA_LOCAL_DB_SWITCH_REPORT

## Resume

Relvia a ete bascule de Supabase PostgreSQL vers PostgreSQL local OVH pour la base applicative.

Contrainte respectee :

- Supabase Auth est reste actif
- aucune modification Prisma
- aucun changement Nginx
- aucun changement de domaine
- aucun changement de schema
- aucune suppression de Supabase

La base applicative utilise maintenant PostgreSQL local OVH. Supabase reste utilise pour l'authentification.

## Sauvegarde du `.env`

- Sauvegarde effectuee : **oui**
- Fichier source : `/var/www/relvia/.env`
- Fichier backup : `/var/www/relvia/.env.backup-before-local-db`

Commande executee :

```bash
cp /var/www/relvia/.env /var/www/relvia/.env.backup-before-local-db
```

## Variables modifiees

Variables modifiees :

- `DATABASE_URL`
- `DIRECT_URL`

Variables verifiees comme conservees pour Supabase Auth :

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

Valeurs non exposees dans ce rapport.

Etat retenu :

- `DATABASE_URL=***MASKED***`
- `DIRECT_URL=***MASKED***`

## Build

- Build effectue : **oui**

Commande executee :

```bash
cd /var/www/relvia && npm run build
```

Le build a ete relance apres la modification du `.env`.

## PM2

- Restart PM2 effectue : **oui**
- Process concerne : `relvia`

Commande executee :

```bash
pm2 restart relvia
```

Statut constate apres restart :

- `relvia` : `online`

## Incident rencontre pendant la bascule

### Probleme initial

Lors du premier test sur `/bibliotheque`, l'application a retourne :

- `HTTP/1.1 500 Internal Server Error`

Les logs PM2 ont montre :

```text
Authentication failed against the database server, the provided database credentials for `relvia_user` are not valid
```

Cause :

- mot de passe incorrect dans `DATABASE_URL` et `DIRECT_URL` apres la bascule initiale

Verification faite :

```bash
cd /var/www/relvia
set -a
source .env
set +a
psql "$DATABASE_URL" -c '\conninfo'
```

Resultat :

```text
password authentication failed for user "relvia_user"
```

### Resolution

- correction du mot de passe PostgreSQL local dans `.env`
- nouveau `pm2 restart relvia`

Apres correction, la bibliotheque a repondu correctement.

## Tests HTTP

Tests effectues via le domaine public :

### Accueil

```bash
curl -I https://relvia.app
```

Resultat :

- `HTTP/1.1 200 OK`

### Login

```bash
curl -I https://relvia.app/login
```

Resultat :

- `HTTP/1.1 200 OK`

### Bibliotheque

Premier test :

- `HTTP/1.1 500 Internal Server Error`

Apres correction du mot de passe :

```bash
curl -I https://relvia.app/bibliotheque
```

Resultat final :

- `HTTP/1.1 200 OK`

### Favoris

```bash
curl -I https://relvia.app/favoris
```

Resultat :

- `HTTP/1.1 200 OK`

## Tests fonctionnels observes

Observations confirmees :

- l'application demarre bien via PM2
- la page d'accueil repond
- la page login repond
- la page bibliotheque repond apres correction du mot de passe
- la page favoris repond
- Supabase Auth n'a pas ete retire

Limite de verification :

- les tests effectues ici sont des tests HTTP et de logs
- les parcours UI complets `signup`, `login`, `logout`, detail situation et favoris cliquables n'ont pas ete verifies pas a pas dans ce rapport

## Verification SQL locale finale

Verification effectuee sur PostgreSQL local apres bascule :

```bash
PGPASSWORD='***' psql -h 127.0.0.1 -U relvia_user -d relvia -c "SELECT 'Situation' AS table_name, COUNT(*) AS total FROM \"Situation\" UNION ALL SELECT 'Variante', COUNT(*) FROM \"Variante\" UNION ALL SELECT 'UserProfile', COUNT(*) FROM \"UserProfile\" UNION ALL SELECT 'Favorite', COUNT(*) FROM \"Favorite\";"
```

Resultats :

- `Situation` : `70`
- `Variante` : `210`
- `UserProfile` : `4`
- `Favorite` : `0`

Conclusion :

- les donnees sont toujours presentes en base locale apres la bascule applicative

## Logs PM2

Lecture des logs effectuee :

```bash
pm2 logs relvia --lines 100 --nostream
```

Constats :

- application `next start` bien lancee sur le port interne `3004`
- erreur Prisma observee uniquement pendant la phase de mauvais mot de passe
- messages `Failed to find Server Action` probablement lies a d'anciennes pages ouvertes avant redemarrage
- warnings Supabase sur `getSession()` deja presents, non bloques par la bascule base

## Statut final

Statut final :

- **bascule vers PostgreSQL local reussie**

Etat courant :

- base applicative : PostgreSQL local OVH
- auth : Supabase Auth
- process PM2 `relvia` : online
- routes testees : OK

## Rollback

Procedure rollback confirmee :

1. restaurer le backup :

```bash
cp /var/www/relvia/.env.backup-before-local-db /var/www/relvia/.env
```

2. redemarrer Relvia :

```bash
pm2 restart relvia
```

3. verifier que l'application revient sur l'ancienne base

Rollback non execute pendant cette intervention, mais le fichier de sauvegarde est bien en place.

## Commandes principales executees

```bash
cp /var/www/relvia/.env /var/www/relvia/.env.backup-before-local-db
grep -E '^(DATABASE_URL|DIRECT_URL|NEXT_PUBLIC_SUPABASE_URL|NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY|SUPABASE_SERVICE_ROLE_KEY)=' /var/www/relvia/.env | sed 's/=.*/=***MASKED***/'
cd /var/www/relvia && npm run build
pm2 restart relvia
pm2 logs relvia --lines 100 --nostream
curl -I https://relvia.app
curl -I https://relvia.app/login
curl -I https://relvia.app/bibliotheque
curl -I https://relvia.app/favoris
PGPASSWORD='***' psql -h 127.0.0.1 -U relvia_user -d relvia -c "SELECT 'Situation' AS table_name, COUNT(*) AS total FROM \"Situation\" UNION ALL SELECT 'Variante', COUNT(*) FROM \"Variante\" UNION ALL SELECT 'UserProfile', COUNT(*) FROM \"UserProfile\" UNION ALL SELECT 'Favorite', COUNT(*) FROM \"Favorite\";"
```
