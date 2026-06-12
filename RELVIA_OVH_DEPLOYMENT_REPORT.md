# RELVIA OVH DEPLOYMENT REPORT

## Résumé

Relvia a été déployé sur le serveur OVH suivant :

```bash
ssh ubuntu@51.255.82.201
```

Le déploiement a été réalisé :

- sans migration de base
- sans modification Prisma
- en conservant Supabase PostgreSQL
- en conservant Supabase Auth
- sans toucher aux applications existantes `quiz` et `quizhub`

## Dossier utilisé

Dossier de déploiement :

```text
/var/www/relvia
```

## Port interne choisi

Port interne retenu :

```text
3004
```

Raison :

- `3000` déjà utilisé
- `3002` déjà utilisé
- `3004` libre au moment du déploiement

## Process PM2

Nom du process PM2 :

```text
relvia
```

Statut observé :

- `online`

## Chemin Nginx

Fichier Nginx créé :

```text
/etc/nginx/sites-available/relvia.app
```

Lien activé :

```text
/etc/nginx/sites-enabled/relvia.app
```

Reverse proxy configuré vers :

```text
http://127.0.0.1:3004
```

Headers proxy inclus :

- `Host`
- `X-Real-IP`
- `X-Forwarded-For`
- `X-Forwarded-Proto`
- `Upgrade`
- `Connection`

## SSL

SSL Let's Encrypt configuré avec succès pour :

- `relvia.app`
- `www.relvia.app`

Résultat certbot :

- certificat émis avec succès
- déployé automatiquement dans Nginx
- renouvellement automatique configuré

Chemins annoncés par Certbot :

- certificat : `/etc/letsencrypt/live/relvia.app/fullchain.pem`
- clé : `/etc/letsencrypt/live/relvia.app/privkey.pem`

Expiration annoncée :

- `2026-09-09`

## Commandes exécutées

### Préparation dossier

```bash
sudo mkdir -p /var/www/relvia && sudo chown ubuntu:ubuntu /var/www/relvia && ls -ld /var/www/relvia
```

### Récupération du code

```bash
git clone https://github.com/TheJaffle/topreply.git /var/www/relvia
```

### Environnement

Création manuelle du fichier :

```bash
cd /var/www/relvia && nano .env
```

Variables injectées :

- `DATABASE_URL`
- `DIRECT_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

Valeurs non exposées dans ce rapport.

### Installation dépendances

```bash
cd /var/www/relvia && npm install
```

### Build

```bash
cd /var/www/relvia && npm run build
```

### Vérification ports existants

```bash
pm2 list && ss -tulpn | grep LISTEN
```

### Lancement application

```bash
cd /var/www/relvia && PORT=3004 pm2 start npm --name relvia -- run start
```

### Vérification PM2

```bash
pm2 list
```

### Sauvegarde PM2

```bash
pm2 save
```

### Configuration Nginx

Création manuelle :

```bash
sudo nano /etc/nginx/sites-available/relvia.app
```

Activation :

```bash
sudo ln -s /etc/nginx/sites-available/relvia.app /etc/nginx/sites-enabled/relvia.app
```

### Vérification config Nginx

```bash
sudo nginx -t
```

Résultat :

- syntaxe OK
- warning non bloquant sur un autre `server_name` lié à `51.255.82.201`

### Reload Nginx

```bash
sudo systemctl reload nginx
```

### Vérification Certbot

```bash
certbot --version
```

### Vérification DNS

```bash
dig +short relvia.app && echo "---" && dig +short www.relvia.app
```

Résultat :

- `relvia.app -> 51.255.82.201`
- `www.relvia.app -> 51.255.82.201`

### SSL Let's Encrypt

```bash
sudo certbot --nginx -d relvia.app -d www.relvia.app
```

## Tests effectués

### Test applicatif local sur port interne

```bash
curl -I http://127.0.0.1:3004
```

Résultat :

- `HTTP/1.1 200 OK`

### Test HTTPS domaine principal

```bash
curl -I https://relvia.app
```

Résultat :

- `HTTP/1.1 200 OK`

### Test HTTPS www

```bash
curl -I https://www.relvia.app
```

Résultat :

- `HTTP/1.1 200 OK`

### Test route login

```bash
curl -I https://relvia.app/login
```

Résultat :

- `HTTP/1.1 200 OK`

### Test route bibliothèque

```bash
curl -I https://relvia.app/bibliotheque
```

Résultat :

- `HTTP/1.1 200 OK`

### Test route favoris

```bash
curl -I https://relvia.app/favoris
```

Résultat :

- `HTTP/1.1 200 OK`

## Problèmes rencontrés

### 1. Port 3000 déjà utilisé

Constat :

- `3000` déjà occupé

Impact :

- impossible d’utiliser la configuration par défaut Next.js

Solution :

- utilisation du port `3004`

### 2. Port 3002 déjà utilisé

Constat :

- `3002` déjà occupé également

Impact :

- port alternatif initial non disponible

Solution :

- passage à `3004`

### 3. Warning Nginx sur `51.255.82.201`

Constat :

```text
conflicting server name "51.255.82.201" on 0.0.0.0:80, ignored
```

Impact :

- aucun blocage pour Relvia

Décision :

- ne pas toucher aux autres sites pour éviter de casser `quiz` / `quizhub`

## Actions restantes

### À faire manuellement dans le navigateur

Les tests suivants restent à valider fonctionnellement côté interface :

- page d'accueil
- signup
- login
- logout
- détail situation
- favoris avec vraie session utilisateur

### À vérifier ensuite

- que les cookies Supabase Auth fonctionnent bien en HTTPS réel
- que la création de compte fonctionne sur le domaine `relvia.app`
- que les actions rapides mobile (`Copier`, `WhatsApp`, `SMS`) se comportent bien en conditions réelles
- que `/utilisateurs` fonctionne si l’usage admin est souhaité en prod

## Verdict

Le déploiement applicatif de Relvia sur OVH est **effectué et opérationnel** :

- application lancée via PM2
- reverse proxy Nginx actif
- SSL Let's Encrypt actif
- routes principales joignables en HTTPS

L’étape suivante recommandée est une **recette fonctionnelle complète dans le navigateur** sur :

- `https://relvia.app`
- `https://www.relvia.app`
