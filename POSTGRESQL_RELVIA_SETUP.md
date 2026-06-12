# POSTGRESQL_RELVIA_SETUP

## Resume

Une instance PostgreSQL locale a ete installee et preparee sur le serveur OVH pour Relvia, sans impact sur l'application actuellement en production.

Contraintes respectees :

- aucun changement du `.env` applicatif en production
- aucun changement de `DATABASE_URL`
- aucun changement Prisma
- aucune coupure de Supabase
- aucun changement PM2
- aucun changement Nginx

Supabase reste donc la base active de l'application.

## Version PostgreSQL installee

- PostgreSQL client : `16.14`
- Distribution package : `Ubuntu 16.14-0ubuntu0.24.04.1`

Commande verifiee :

```bash
psql --version
```

## Statut du service

- Service : `postgresql.service`
- Statut : `active (exited)`
- Activation : `enabled`

Commande verifiee :

```bash
systemctl status postgresql --no-pager
```

## Base creee

- Nom de la base : `relvia`

## Utilisateur cree

- Utilisateur PostgreSQL : `relvia_user`

Le mot de passe n'est pas expose dans ce rapport.

## Configuration reseau retenue

Configuration observee :

- `listen_addresses = 'localhost'`
- port PostgreSQL : `5432`
- acces local uniquement

Fichiers detectes :

- `/etc/postgresql/16/main/postgresql.conf`
- `/etc/postgresql/16/main/pg_hba.conf`

Regles `pg_hba.conf` observees :

```text
local   all             postgres                                peer
local   all             all                                     peer
host    all             all             127.0.0.1/32            scram-sha-256
host    all             all             ::1/128                 scram-sha-256
local   replication     all                                     peer
host    replication     all             127.0.0.1/32            scram-sha-256
host    replication     all             ::1/128                 scram-sha-256
```

Conclusion :

- aucune ouverture reseau publique PostgreSQL
- configuration compatible avec une base locale d'application
- aucune modification supplementaire necessaire a ce stade

## Tests effectues

### 1. Verification de l'absence initiale

Constats initiaux :

- `psql` absent avant installation
- `pg_dump` absent avant installation
- `postgresql.service` absent avant installation

### 2. Verification du port

- `5432` libre avant installation

### 3. Verification du service apres installation

- PostgreSQL installe
- service present et actif

### 4. Test de connexion utilisateur applicatif

Connexion testee avec succes :

- utilisateur : `relvia_user`
- base : `relvia`
- host : `127.0.0.1`
- port : `5432`

Resultat constate :

```text
You are connected to database "relvia" as user "relvia_user" on host "127.0.0.1" at port "5432".
```

### 5. Verification etat de la base avant schema

Resultat :

```text
Did not find any relations.
```

La base locale etait donc bien vide avant application du schema.

### 6. Application du schema Prisma

Premier essai :

- echec `P1000 Authentication failed`
- cause : mot de passe absent dans `DIRECT_URL`

Deuxieme essai :

```text
Your database is now in sync with your Prisma schema. Done in 709ms
```

Le schema Prisma actuel a donc bien ete applique a la base locale `relvia`.

## Commandes executees

### Installation PostgreSQL

```bash
sudo apt update
sudo apt install -y postgresql postgresql-contrib postgresql-client
```

### Verification version

```bash
psql --version
```

### Verification service

```bash
systemctl status postgresql --no-pager
```

### Creation utilisateur

```sql
CREATE USER relvia_user WITH PASSWORD '***';
```

### Creation base

```sql
CREATE DATABASE relvia OWNER relvia_user;
```

### Verification configuration PostgreSQL

```bash
sudo -u postgres psql -t -P format=unaligned -c "SHOW config_file; SHOW hba_file; SHOW listen_addresses;"
sudo grep -v '^#' /etc/postgresql/16/main/pg_hba.conf | grep -v '^$'
```

### Test connexion applicative locale

```bash
psql -h 127.0.0.1 -U relvia_user -d relvia -c "\conninfo"
```

### Verification base vide

```bash
psql -h 127.0.0.1 -U relvia_user -d relvia -c "\dt"
```

### Application du schema Prisma

```bash
cd /var/www/relvia && DIRECT_URL="postgresql://relvia_user:***@127.0.0.1:5432/relvia" npx prisma db push
```

## Problemes rencontres

### 1. Authentification Prisma au premier essai

Premier essai en `db push` sans mot de passe dans l'URL :

- echec `P1000 Authentication failed`

Cause :

- le mot de passe PostgreSQL n'etait pas fourni a Prisma dans `DIRECT_URL`

Resolution :

- relancer avec une `DIRECT_URL` complete contenant l'utilisateur, le mot de passe, l'hote, le port et la base

### 2. Aucun autre incident bloquant

Pas d'erreur systeme ou de conflit observe avec :

- Relvia en production
- Supabase
- PM2
- Nginx

## Etat final

A la fin de cette etape :

- PostgreSQL est installe
- `relvia_user` existe
- la base `relvia` existe
- PostgreSQL ecoute localement uniquement
- la base locale est joignable
- le schema Prisma est applique
- l'application en production continue d'utiliser Supabase

## Ce qui reste a faire plus tard

Etapes futures, non realisees ici :

- exporter les donnees metier depuis Supabase
- importer ces donnees dans PostgreSQL local
- verifier l'integrite des relations
- tester les volumes et les contraintes
- preparer ensuite une bascule controlee de `DATABASE_URL`

## Impact production

Impact sur la production actuelle :

- **aucun**

Relvia continue de fonctionner avec :

- Supabase PostgreSQL
- Supabase Auth

La base PostgreSQL locale est prete pour la suite de la migration, mais n'est pas encore utilisee par l'application.
