# MIGRATION OVH AUDIT

## 1. Résumé de l'architecture actuelle

ProReply est une application **Next.js 16** avec **App Router**, **React 19**, **TypeScript strict** et **Tailwind CSS**.

Le projet tourne aujourd'hui comme une application Node classique :

- rendu serveur Next.js
- server actions Next.js
- Prisma 7 comme couche ORM
- base PostgreSQL hébergée sur Supabase
- authentification Supabase Auth
- aucune dépendance obligatoire à une base locale sur le serveur applicatif

Le code applicatif principal est dans :

- `app/`
- `components/`
- `lib/`
- `prisma/`

Le projet **n'est pas un projet Vite**.
Le projet **n'utilise pas d'API routes Next classiques** dans `app/api`.
Le projet utilise surtout :

- pages App Router
- server components
- client components
- server actions avec `"use server"`

## 2. Framework utilisé

### Stack détectée

- **Next.js** : `^16.2.9`
- **React** : `19.0.0`
- **React DOM** : `19.0.0`
- **TypeScript** : `5.8.3`
- **Tailwind CSS** : `3.4.17`
- **Prisma** : `^7.8.0`
- **Supabase JS** : `^2.108.1`
- **@supabase/ssr** : `^0.12.0`

### Conclusion

La cible OVH recommandée est :

- **Node.js** pour exécuter `next start`
- **Nginx** en reverse proxy
- **PM2** pour garder le process vivant

## 3. Commandes disponibles

D'après `package.json`, les scripts actuels sont :

```json
{
  "dev": "next dev",
  "postinstall": "prisma generate",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
  "db:seed": "node --env-file=.env --experimental-strip-types prisma/seed.ts"
}
```

### Commandes utiles en production OVH

- installation : `npm install`
- génération Prisma : automatique via `postinstall`
- build : `npm run build`
- démarrage production : `npm run start`

### Port par défaut attendu

`next start` écoute par défaut sur le port `3000`, sauf si `PORT` est injecté.

## 4. Variables d'environnement nécessaires

Variables détectées dans le projet :

- `DATABASE_URL`
- `DIRECT_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NODE_ENV` utilisée implicitement

### Rôle de chaque variable

#### `DATABASE_URL`

Utilisée par :

- `lib/prisma.ts`
- `prisma/seed.ts`

Usage :

- connexion Prisma runtime côté application

#### `DIRECT_URL`

Utilisée par :

- `prisma.config.ts`

Usage :

- commandes Prisma CLI
- migrations
- `prisma generate`
- `prisma db push`

#### `NEXT_PUBLIC_SUPABASE_URL`

Utilisée par :

- `lib/supabase/client.ts`
- `lib/supabase/server.ts`
- `lib/supabase/admin.ts`

Usage :

- URL du projet Supabase
- utilisée côté navigateur et côté serveur

#### `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`

Utilisée par :

- `lib/supabase/client.ts`
- `lib/supabase/server.ts`

Usage :

- clé publique Supabase pour Auth et SSR

#### `SUPABASE_SERVICE_ROLE_KEY`

Utilisée par :

- `lib/supabase/admin.ts`
- page admin `/utilisateurs`

Usage :

- opérations admin Supabase
- suppression d'utilisateurs via l'interface admin interne

### Variables minimales nécessaires sur OVH

Pour faire tourner l'application hors Vercel :

- `DATABASE_URL`
- `DIRECT_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`

### Variable optionnelle selon usage

- `SUPABASE_SERVICE_ROLE_KEY`

Elle n'est nécessaire que si tu veux conserver la page `/utilisateurs` pleinement opérationnelle sur OVH.

## 5. Base de données

### ORM et moteur de données

Le projet utilise :

- **Prisma 7**
- **PostgreSQL**
- **Supabase PostgreSQL**

### Fichiers de structure

- `prisma/schema.prisma`
- `prisma.config.ts`
- `lib/prisma.ts`

### Modèles actuels

- `UserProfile`
- `Situation`
- `Favorite`
- `Variante`

### Migrations présentes

Le dossier `prisma/migrations` existe avec :

- `20260610_add_user_profile_baseline`
- `20260610_add_favorite`

Donc le projet est déjà structuré pour une base persistante propre.

### Seed présent

Le projet possède :

- `prisma/seed.ts`
- `prisma/seed-data.ts`

Commande de remplissage :

```bash
npm run db:seed
```

### Dépendance à Supabase

Pour l'instant :

- la base reste chez Supabase
- l'auth reste chez Supabase
- l'app Next/Node peut être déplacée sur OVH sans déplacer la base

### Dépendance à Vercel pour la base

Aucune dépendance Vercel spécifique n'a été détectée pour Prisma ou PostgreSQL.

## 6. Dépendances au déploiement Vercel

### Dépendances observées

#### Pas de `vercel.json`

Aucun fichier `vercel.json` détecté.

#### Pas d'API routes Vercel spécifiques

Pas de `app/api/*/route.ts`.

#### Pas de middleware détecté

Aucun `middleware.ts` détecté.

#### Utilisation de server actions

Le projet utilise des server actions Next.js dans :

- `app/auth/actions.ts`
- `app/complete-profile/actions.ts`
- `app/favorites/actions.ts`
- `app/utilisateurs/actions.ts`

Ces server actions fonctionnent aussi sur un serveur Node hors Vercel, tant que l'application Next tourne correctement.

#### Dépendance Vercel indirecte

La seule vraie dépendance actuelle à l'environnement Vercel était surtout :

- la gestion des variables d'environnement
- le build automatisé
- le reverse proxy / SSL
- le processus d'hébergement

### Conclusion

Le projet est **migrable vers OVH sans réécriture applicative majeure**.

## 7. Structure de production recommandée sur OVH

### Stack serveur recommandée

- **Ubuntu / Debian** sur serveur dédié OVH
- **Node.js 24.x** ou au minimum `20.9+`
- **NPM**
- **PM2**
- **Nginx**
- **Certbot / Let's Encrypt** si domaine personnalisé

### Structure recommandée

#### Application

Exemple :

```text
/var/www/proreply
```

Contenu :

- code source git
- `.env.production` ou `.env`
- `node_modules`
- `.next`

#### Process manager

PM2 pour :

- lancer `npm run start`
- restart auto
- démarrage au boot

#### Reverse proxy

Nginx pour :

- exposer le domaine
- pointer vers `127.0.0.1:3000`
- gérer HTTPS
- compresser et journaliser

#### SSL

Si domaine personnalisé :

- Let's Encrypt via Certbot

#### Logs

À prévoir :

- logs PM2
- logs Nginx access/error
- logs applicatifs Node

## 8. Routes et exécution en production

Pages détectées :

- `/`
- `/login`
- `/signup`
- `/complete-profile`
- `/bibliotheque`
- `/bibliotheque/[id]`
- `/favoris`
- `/utilisateurs`

### Points sensibles

#### `/utilisateurs`

Cette page dépend de :

- `SUPABASE_SERVICE_ROLE_KEY`

Elle a été rendue tolérante à l'absence de cette variable, mais si tu veux l'utiliser vraiment sur OVH, il faudra fournir cette clé côté serveur.

#### Auth Supabase SSR

Le projet utilise :

- `@supabase/ssr`
- `cookies()` de Next

Donc le serveur OVH devra :

- être servi en HTTPS en production
- avoir un domaine cohérent
- conserver correctement les cookies de session

## 9. Risques identifiés

### Risque 1 : variables d'environnement incomplètes

Le principal risque de migration est l'oubli de variables :

- `DATABASE_URL`
- `DIRECT_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- éventuellement `SUPABASE_SERVICE_ROLE_KEY`

### Risque 2 : port / reverse proxy mal configuré

Si Nginx n'est pas bien configuré vers `localhost:3000`, l'app semblera “down” alors que Node tourne.

### Risque 3 : cookies et HTTPS

Supabase Auth côté SSR dépend d'un environnement HTTPS propre en production.

Si :

- le domaine n'est pas stable
- le certificat SSL n'est pas bon
- le proxy réécrit mal les en-têtes

alors la session peut mal se comporter.

### Risque 4 : oubli de `prisma generate`

Ce point est en partie couvert par :

- `postinstall: prisma generate`

Mais il faut quand même garder une procédure d'installation propre sur OVH.

### Risque 5 : page `/utilisateurs`

Elle utilise une clé admin sensible Supabase.

Si elle n'est pas indispensable en prod :

- mieux vaut éviter de l'exposer publiquement

### Risque 6 : sécurité système

Sur OVH, contrairement à Vercel, tu devras gérer :

- firewall
- fail2ban si besoin
- mises à jour serveur
- rotation des logs
- surveillance du disque et mémoire

## 10. Stratégie recommandée

### Stratégie recommandée de migration

**Étape 1 recommandée :**
migrer uniquement l'application Next.js vers OVH en gardant :

- Supabase PostgreSQL
- Supabase Auth

Cela limite énormément les risques.

### Pourquoi cette stratégie est la bonne

- aucune migration de données critique immédiate
- aucune réécriture auth
- application déjà compatible avec un serveur Node classique
- rollback plus simple vers Vercel si besoin

## 11. Plan de migration étape par étape

### Étape 1 — Préparer le serveur OVH

À faire :

1. Installer le serveur OVH avec Ubuntu/Debian
2. Créer un utilisateur applicatif non-root
3. Installer :
   - git
   - curl
   - nginx
   - nodejs
   - npm
   - pm2
4. Ouvrir les bons ports :
   - `80`
   - `443`
   - éventuellement `22`

### Étape 2 — Installer Node

Recommandation :

- Node `24.x` ou `22.x`
- minimum `20.9+`

### Étape 3 — Déployer le code

À faire :

1. cloner le repo dans `/var/www/proreply`
2. se placer dans le dossier
3. lancer :

```bash
npm install
```

### Étape 4 — Créer les variables d'environnement

Créer un fichier `.env` ou `.env.production` avec :

- `DATABASE_URL`
- `DIRECT_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- optionnellement `SUPABASE_SERVICE_ROLE_KEY`

### Étape 5 — Construire l'application

Commande :

```bash
npm run build
```

### Étape 6 — Tester le démarrage local serveur

Commande :

```bash
npm run start
```

Puis vérifier que l'application répond sur :

```text
http://127.0.0.1:3000
```

### Étape 7 — Mettre PM2 en place

Exemple :

```bash
pm2 start npm --name proreply -- run start
pm2 save
pm2 startup
```

### Étape 8 — Configurer Nginx

Reverse proxy vers :

```text
127.0.0.1:3000
```

Prévoir :

- `proxy_set_header Host $host`
- `proxy_set_header X-Real-IP $remote_addr`
- `proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for`
- `proxy_set_header X-Forwarded-Proto $scheme`

### Étape 9 — Configurer SSL

Si domaine personnalisé :

```bash
certbot --nginx
```

### Étape 10 — Vérifier l'auth et les cookies

Tester en prod OVH :

- login
- signup
- logout
- complete-profile
- favoris
- bibliothèque

### Étape 11 — Vérifier la partie admin

Si tu veux utiliser `/utilisateurs` :

- ajouter `SUPABASE_SERVICE_ROLE_KEY`
- sinon la page restera en mode indisponible / safe

## 12. Ce qu'il faudra faire sur le serveur OVH

Checklist serveur :

- installer Node
- installer Nginx
- installer PM2
- cloner le repo
- créer les variables d'environnement
- lancer `npm install`
- lancer `npm run build`
- lancer `pm2 start npm --name proreply -- run start`
- configurer Nginx
- configurer SSL
- tester les cookies Supabase Auth
- surveiller logs et redémarrage

## 13. Ce qu'il ne faut surtout pas toucher pour l'instant

Ne pas toucher pour cette première migration :

- schéma Prisma
- structure de la base Supabase
- tables existantes
- Supabase Auth
- logique métier applicative
- seed
- profils utilisateurs
- système de favoris

Et surtout :

- **ne pas migrer encore PostgreSQL hors Supabase**
- **ne pas migrer encore Auth hors Supabase**

## 14. Points bloquants éventuels

Aucun blocage technique majeur n'a été détecté pour une migration vers OVH avec conservation de Supabase.

Les seuls vrais prérequis sont :

- Node compatible
- variables d'environnement complètes
- Nginx correctement configuré
- HTTPS propre

## 15. Recommandation finale

La migration recommandée est :

1. déplacer **uniquement l'app Next.js** sur OVH
2. garder **Supabase DB + Auth**
3. exécuter l'app via **PM2**
4. exposer via **Nginx + SSL**
5. tester d'abord avec un sous-domaine temporaire
6. basculer le domaine final seulement après validation fonctionnelle

Cette stratégie est la plus sûre, la plus rapide et la moins risquée pour ProReply à ce stade.
