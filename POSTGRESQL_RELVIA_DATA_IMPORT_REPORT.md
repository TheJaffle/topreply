# POSTGRESQL_RELVIA_DATA_IMPORT_REPORT

## Resume

Les donnees metier Relvia ont ete copiees depuis Supabase vers PostgreSQL local OVH pour validation, sans modification de l'application en production.

Contraintes respectees :

- `DATABASE_URL` non modifiee
- application toujours connectee a Supabase
- aucun redemarrage PM2
- aucun changement Nginx

PostgreSQL local sert uniquement de copie de verification a ce stade.

## Source Supabase

Comptages constates dans Supabase :

- `Situation` : `70`
- `Variante` : `210`
- `UserProfile` : `4`
- `Favorite` : `0`

Commande utilisee :

```bash
psql "$DIRECT_URL" -c "SELECT 'Situation' AS table_name, COUNT(*) AS total FROM \"Situation\" UNION ALL SELECT 'Variante', COUNT(*) FROM \"Variante\" UNION ALL SELECT 'UserProfile', COUNT(*) FROM \"UserProfile\" UNION ALL SELECT 'Favorite', COUNT(*) FROM \"Favorite\";"
```

## Export source

Le `pg_dump` direct n'a pas pu etre utilise en raison d'un mismatch de version :

- serveur Supabase : PostgreSQL `17.6`
- client OVH : `pg_dump 16.14`

Erreur constatee :

```text
pg_dump: error: aborting because of server version mismatch
pg_dump: detail: server version: 17.6; pg_dump version: 16.14
```

Strategie retenue :

- export CSV par table via `psql \copy`

Exports realises :

```bash
psql "$DIRECT_URL" -c "\copy (SELECT * FROM \"Situation\" ORDER BY id) TO '/tmp/relvia_Situation.csv' CSV HEADER"
psql "$DIRECT_URL" -c "\copy (SELECT * FROM \"Variante\" ORDER BY id) TO '/tmp/relvia_Variante.csv' CSV HEADER"
psql "$DIRECT_URL" -c "\copy (SELECT * FROM \"UserProfile\" ORDER BY id) TO '/tmp/relvia_UserProfile.csv' CSV HEADER"
psql "$DIRECT_URL" -c "\copy (SELECT * FROM \"Favorite\" ORDER BY id) TO '/tmp/relvia_Favorite.csv' CSV HEADER"
```

Resultats :

- `Situation` : `COPY 70`
- `Variante` : `COPY 210`
- `UserProfile` : `COPY 4`
- `Favorite` : `COPY 0`

## Preparation base locale

Avant import, la base locale de validation a ete videe proprement :

```bash
PGPASSWORD='***' psql -h 127.0.0.1 -U relvia_user -d relvia -c "TRUNCATE TABLE \"Favorite\", \"Variante\", \"Situation\", \"UserProfile\" RESTART IDENTITY CASCADE;"
```

## Import PostgreSQL local

Imports realises dans l'ordre compatible avec les relations :

```bash
PGPASSWORD='***' psql -h 127.0.0.1 -U relvia_user -d relvia -c "\copy \"Situation\" FROM '/tmp/relvia_Situation.csv' CSV HEADER"
PGPASSWORD='***' psql -h 127.0.0.1 -U relvia_user -d relvia -c "\copy \"UserProfile\" FROM '/tmp/relvia_UserProfile.csv' CSV HEADER"
PGPASSWORD='***' psql -h 127.0.0.1 -U relvia_user -d relvia -c "\copy \"Variante\" FROM '/tmp/relvia_Variante.csv' CSV HEADER"
PGPASSWORD='***' psql -h 127.0.0.1 -U relvia_user -d relvia -c "\copy \"Favorite\" FROM '/tmp/relvia_Favorite.csv' CSV HEADER"
```

Resultats :

- `Situation` : `COPY 70`
- `UserProfile` : `COPY 4`
- `Variante` : `COPY 210`
- `Favorite` : `COPY 0`

## Destination PostgreSQL local

Comptages constates dans PostgreSQL local :

- `Situation` : `70`
- `Variante` : `210`
- `UserProfile` : `4`
- `Favorite` : `0`

Commande utilisee :

```bash
PGPASSWORD='***' psql -h 127.0.0.1 -U relvia_user -d relvia -c "SELECT 'Situation' AS table_name, COUNT(*) AS total FROM \"Situation\" UNION ALL SELECT 'Variante', COUNT(*) FROM \"Variante\" UNION ALL SELECT 'UserProfile', COUNT(*) FROM \"UserProfile\" UNION ALL SELECT 'Favorite', COUNT(*) FROM \"Favorite\";"
```

## Comparaison source vs destination

Comparaison finale :

| Table | Supabase | PostgreSQL local | Ecart |
| --- | ---: | ---: | ---: |
| Situation | 70 | 70 | 0 |
| Variante | 210 | 210 | 0 |
| UserProfile | 4 | 4 | 0 |
| Favorite | 0 | 0 | 0 |

Conclusion :

- les nombres sont identiques sur les quatre tables

## Verification integrite FK

### Situation -> Variante

Verification effectuee :

```bash
PGPASSWORD='***' psql -h 127.0.0.1 -U relvia_user -d relvia -c "SELECT COUNT(*) AS orphan_variantes FROM \"Variante\" v LEFT JOIN \"Situation\" s ON s.id = v.\"situationId\" WHERE s.id IS NULL;"
```

Resultat :

- `orphan_variantes = 0`

Conclusion :

- aucune `Variante` orpheline

### Situation -> Favorite

Verification effectuee :

```bash
PGPASSWORD='***' psql -h 127.0.0.1 -U relvia_user -d relvia -c "SELECT COUNT(*) AS orphan_favorites FROM \"Favorite\" f LEFT JOIN \"Situation\" s ON s.id = f.\"situationId\" WHERE s.id IS NULL;"
```

Resultat :

- `orphan_favorites = 0`

Conclusion :

- aucun `Favorite` orphelin

## Verification contraintes uniques

Controle de la contrainte logique `authUserId + situationId` sur `Favorite` :

```bash
PGPASSWORD='***' psql -h 127.0.0.1 -U relvia_user -d relvia -c "SELECT COUNT(*) AS duplicate_favorite_pairs FROM (SELECT \"authUserId\", \"situationId\", COUNT(*) FROM \"Favorite\" GROUP BY \"authUserId\", \"situationId\" HAVING COUNT(*) > 1) duplicates;"
```

Resultat :

- `duplicate_favorite_pairs = 0`

Conclusion :

- aucun doublon de favoris detecte

## Erreurs rencontrees

Une seule erreur notable :

- echec initial de `pg_dump` a cause d'une difference de version entre Supabase PostgreSQL 17.6 et le client OVH PostgreSQL 16.14

Resolution :

- export par `psql \copy` table par table

Aucune autre erreur bloquante constatee pendant l'import ou les verifications.

## Verdict

Verdict final :

- **import de validation reussi**
- **comptages source et destination identiques**
- **integrite des relations verifiee**
- **aucun doublon favori detecte**

La base PostgreSQL locale OVH contient maintenant une copie coherente des donnees metier Relvia.

## Impact production

Impact sur l'application en production :

- **aucun**

Etat conserve :

- l'application continue d'utiliser Supabase
- `DATABASE_URL` n'a pas ete modifiee
- PostgreSQL local reste une copie de validation uniquement

## Suite recommandee

Etapes suivantes possibles, non realisees ici :

- verifier quelques enregistrements metier a la main
- tester Prisma contre la base locale dans un environnement de test dedie
- preparer ensuite une bascule applicative controlee si la validation est complete
