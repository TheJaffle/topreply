# RELVIA LOCAL DB MIGRATION PLAN

## Objectif

Préparer la sortie progressive de Supabase PostgreSQL pour Relvia en mettant en place une base **PostgreSQL locale sur OVH**, puis en important les données métier existantes.

Important à ce stade :

- ne pas modifier l'application
- ne pas changer `DATABASE_URL` de production
- ne pas couper Supabase
- ne pas migrer Supabase Auth
- ne pas supprimer de données Supabase

## 1. État PostgreSQL actuel sur OVH

Audit réalisé sur le serveur :

```bash
ssh ubuntu@51.255.82.201
```

Constats :

- `psql` : absent
- `pg_dump` : absent
- `postgresql.service` : absent
- port `5432` : libre

Conclusion :

- PostgreSQL n'est **pas installé** actuellement sur le serveur OVH
- aucune base PostgreSQL locale n'existe encore pour Relvia

## 2. Pourquoi PostgreSQL et pas MariaDB

Le serveur héberge déjà MariaDB/MySQL pour d'autres applications, mais pour Relvia il est préférable de rester sur PostgreSQL.

### Raisons

- Prisma est déjà configuré pour `provider = "postgresql"`
- le schéma Prisma existant est pensé pour PostgreSQL
- `tags` est stocké en `String[]`
- cette structure est naturelle en PostgreSQL
- passer Relvia sur MariaDB demanderait un refactoring inutile

### Décision recommandée

- `quiz` / `quizhub` restent en MariaDB
- `Relvia` utilise sa propre base **PostgreSQL**

## 3. Schéma actuel concerné

Tables métier Relvia :

- `UserProfile`
- `Situation`
- `Variante`
- `Favorite`

Contraintes importantes :

- `Situation 1 -> n Variante`
- `Situation 1 -> n Favorite`
- `Favorite @@unique([authUserId, situationId])`
- `UserProfile.authUserId` unique
- `Favorite.authUserId` reste une référence logique vers Supabase Auth

Supabase Auth n'est **pas migré** à cette étape.

## 4. Stratégie recommandée

### Stratégie générale

1. installer PostgreSQL local sur OVH
2. créer un utilisateur dédié `relvia_user`
3. créer une base `relvia`
4. restreindre l'accès à un usage local serveur
5. appliquer le schéma Prisma sur la base locale
6. exporter les données métier depuis Supabase
7. importer les données dans PostgreSQL local
8. tester la cohérence des données
9. seulement ensuite préparer la bascule applicative

### Outil recommandé pour appliquer le schéma

Recommandation :

- utiliser **`prisma migrate deploy`** si l'on veut s'appuyer strictement sur les migrations existantes
- utiliser **`prisma db push`** si l'on veut une application rapide et pragmatique du schéma actuel

### Recommandation finale dans ce contexte

Pour cette migration locale initiale :

- **`prisma db push` est le plus simple et le plus sûr**

Pourquoi :

- on veut reconstruire proprement une base vierge locale
- on ne change pas le schéma
- on ne cherche pas encore une chaîne de migration historique parfaite
- on veut surtout une base locale compatible avec l'état actuel du code

## 5. Commandes exactes prévues

## Étape A — Installer PostgreSQL

À exécuter plus tard, après confirmation :

```bash
sudo apt update
sudo apt install -y postgresql postgresql-contrib postgresql-client
```

### Vérifications attendues après installation

```bash
psql --version
pg_dump --version
systemctl status postgresql
ss -tulpn | grep 5432
```

## Étape B — Créer utilisateur et base

```bash
sudo -u postgres psql
```

Puis dans `psql` :

```sql
CREATE USER relvia_user WITH PASSWORD 'MOT_DE_PASSE_FORT';
CREATE DATABASE relvia OWNER relvia_user;
GRANT ALL PRIVILEGES ON DATABASE relvia TO relvia_user;
\q
```

## Étape C — Sécuriser l'accès local uniquement

Vérifier `postgresql.conf` et `pg_hba.conf`.

Objectif :

- écoute locale uniquement
- accès applicatif local

Paramètres attendus :

### `postgresql.conf`

```conf
listen_addresses = 'localhost'
```

### `pg_hba.conf`

Exemple logique attendu :

```conf
local   all             postgres                                peer
local   all             relvia_user                             scram-sha-256
host    all             relvia_user     127.0.0.1/32           scram-sha-256
host    all             relvia_user     ::1/128                scram-sha-256
```

Puis :

```bash
sudo systemctl restart postgresql
```

## Étape D — Construire la DATABASE_URL locale

Exemple :

```text
postgresql://relvia_user:MOT_DE_PASSE_FORT@127.0.0.1:5432/relvia
```

Important :

- ne pas remplacer immédiatement la `DATABASE_URL` de production
- utiliser d'abord une variable temporaire de test

Exemple de variable temporaire :

```text
LOCAL_DATABASE_URL=postgresql://relvia_user:***@127.0.0.1:5432/relvia
```

## Étape E — Appliquer le schéma Prisma

Depuis :

```text
/var/www/relvia
```

Option recommandée :

```bash
DIRECT_URL="postgresql://relvia_user:***@127.0.0.1:5432/relvia" npx prisma db push
```

Alternative plus stricte :

```bash
DIRECT_URL="postgresql://relvia_user:***@127.0.0.1:5432/relvia" npx prisma migrate deploy
```

## Étape F — Vérifier la structure créée

```bash
psql "postgresql://relvia_user:***@127.0.0.1:5432/relvia" -c "\dt"
```

Puis :

```bash
psql "postgresql://relvia_user:***@127.0.0.1:5432/relvia" -c "\d \"UserProfile\""
psql "postgresql://relvia_user:***@127.0.0.1:5432/relvia" -c "\d \"Situation\""
psql "postgresql://relvia_user:***@127.0.0.1:5432/relvia" -c "\d \"Variante\""
psql "postgresql://relvia_user:***@127.0.0.1:5432/relvia" -c "\d \"Favorite\""
```

## 6. Préparation export des données Supabase

Il faut exporter les tables :

- `Situation`
- `Variante`
- `UserProfile`
- `Favorite`

### Stratégie recommandée

Deux options réalistes :

### Option 1 — export SQL / dump PostgreSQL

Si l'accès direct PostgreSQL Supabase et `pg_dump` sont disponibles :

```bash
pg_dump "DIRECT_URL_SUPABASE" --data-only --table=\"Situation\" --table=\"Variante\" --table=\"UserProfile\" --table=\"Favorite\" > relvia-data.sql
```

Avantage :

- préserve bien le format PostgreSQL

### Option 2 — export JSON / CSV contrôlé

Exporter les données métier depuis Supabase via scripts applicatifs ou SQL, puis les réinjecter.

Avantage :

- plus contrôlable
- plus simple si l'accès dump est limité

### Recommandation

Si possible :

- **préférer `pg_dump` partiel data-only**

Sinon :

- export table par table vers JSON/CSV puis import SQL

## 7. Préparation import dans PostgreSQL local

### Si dump SQL PostgreSQL

```bash
psql "postgresql://relvia_user:***@127.0.0.1:5432/relvia" < relvia-data.sql
```

### Si import table par table

Ordre recommandé :

1. `Situation`
2. `UserProfile`
3. `Variante`
4. `Favorite`

Pourquoi :

- `Variante` dépend de `Situation`
- `Favorite` dépend de `Situation`
- `UserProfile` est autonome

## 8. Ordre d’exécution recommandé

1. confirmer l’installation PostgreSQL
2. installer PostgreSQL
3. vérifier le service
4. créer `relvia_user`
5. créer la base `relvia`
6. verrouiller l’accès local
7. tester la connexion locale
8. appliquer le schéma Prisma
9. vérifier les tables et contraintes
10. exporter les données Supabase
11. importer dans PostgreSQL local
12. contrôler le nombre de lignes par table
13. tester les relations
14. préparer ensuite la future bascule applicative

## 9. Risques identifiés

### Risque 1 — mauvais choix de moteur

Évité en restant sur PostgreSQL.

### Risque 2 — divergence Prisma / base locale

Faible si on applique directement le schéma actuel avec `db push`.

### Risque 3 — contraintes d’ordre d’import

Si l’ordre est mauvais :

- `Variante` ou `Favorite` peuvent échouer à cause des FK

### Risque 4 — identifiants utilisateur

`authUserId` dans `UserProfile` et `Favorite` dépend toujours de Supabase Auth.

Ce n’est pas un problème tant que :

- Supabase Auth reste utilisé

### Risque 5 — exposition réseau inutile

Si PostgreSQL écoute publiquement sur `0.0.0.0`, ce n’est pas souhaitable.

La recommandation reste :

- `localhost` uniquement

### Risque 6 — écrasement accidentel de l’app actuelle

À éviter absolument :

- ne pas remplacer la `DATABASE_URL` de l’app en prod tant que l’import n’est pas validé

## 10. Rollback

Rollback simple car Supabase reste la source active.

En cas de problème :

- on arrête la migration locale
- on garde l’application inchangée
- on conserve les variables actuelles
- on peut supprimer ou reconstruire la base locale sans impact prod

Le rollback est donc :

- **immédiat et sans interruption de service**

## 11. Ce qu’il faudra tester après import

### Vérifications SQL

- nombre de `Situation`
- nombre de `Variante`
- nombre de `UserProfile`
- nombre de `Favorite`
- absence d’erreurs FK
- contrainte unique `Favorite(authUserId, situationId)`
- intégrité `Situation -> Variante`
- intégrité `Situation -> Favorite`

### Vérifications applicatives futures

Après bascule future seulement :

- page bibliothèque
- détail situation
- favoris
- affichage du métier utilisateur
- profils incomplets
- signup/login avec Supabase Auth

## 12. Ce qu’il ne faut surtout pas toucher maintenant

- ne pas modifier `.env` de production
- ne pas remplacer `DATABASE_URL`
- ne pas couper Supabase
- ne pas modifier Prisma
- ne pas changer les seed
- ne pas toucher à Supabase Auth
- ne pas supprimer les données distantes

## 13. Recommandation finale

La meilleure stratégie est :

1. installer PostgreSQL local sur OVH
2. recréer une base locale propre `relvia`
3. appliquer le schéma Prisma actuel
4. faire un import test des données Supabase
5. valider l’intégrité
6. seulement après, préparer une bascule applicative contrôlée

Conclusion :

- **oui, il faut aller sur PostgreSQL local**
- **non, MariaDB n’apporte pas d’avantage pour Relvia**
- **la migration peut être faite de manière progressive, sûre et réversible**
