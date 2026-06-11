# OVH SERVER CHECKLIST

Objectif :

Préparer l'audit du serveur OVH avant déploiement de ProReply, sans modifier le serveur et sans déployer l'application.

Serveur cible :

```bash
ssh ubuntu@51.255.82.201
```

Règle de cette phase :

- ne rien installer
- ne rien supprimer
- ne rien redémarrer
- ne modifier aucune configuration système
- uniquement observer et documenter

## 1. Vérification OS

### Distribution Linux

```bash
uname -a
cat /etc/os-release
hostnamectl
```

À vérifier :

- distribution exacte
- version
- nom du noyau
- hostname

### Version Ubuntu / Debian

```bash
lsb_release -a
cat /etc/debian_version
```

À vérifier :

- Ubuntu ou Debian
- version exacte
- cohérence avec `os-release`

### Architecture CPU

```bash
uname -m
lscpu
```

À vérifier :

- `x86_64` ou autre
- nombre de vCPU
- virtualisation / hyperviseur si utile

### Mémoire

```bash
free -h
vmstat -s
```

À vérifier :

- RAM totale
- RAM libre
- swap présente ou non

### Espace disque

```bash
df -h
lsblk
du -sh /var/www 2>/dev/null
```

À vérifier :

- espace libre global
- partition système
- point de montage principal
- capacité disponible pour `/var/www/proreply`

## 2. Vérification Node

### Node installé

```bash
node -v
which node
```

### NPM installé

```bash
npm -v
which npm
```

### Complément utile

```bash
npm config get prefix
```

À vérifier :

- Node présent
- version compatible avec ProReply
- cible recommandée : `Node 24.x`
- minimum acceptable : `Node 20.9+`

## 3. Vérification Nginx

### Présence de Nginx

```bash
nginx -v
which nginx
dpkg -l | grep nginx
```

### Statut du service

```bash
systemctl status nginx
systemctl is-enabled nginx
systemctl is-active nginx
```

À vérifier :

- nginx installé ou non
- service actif ou non
- service activé au boot ou non

## 4. Vérification PM2

### Installation PM2

```bash
pm2 -v
which pm2
npm list -g --depth=0 | grep pm2
```

### Processus existants

```bash
pm2 list
pm2 status
pm2 save
```

Important :

- `pm2 save` est à éviter si l'on veut rester en pure observation
- préférer `pm2 list` et `pm2 status`

Version audit-only recommandée :

```bash
pm2 list
pm2 status
```

À vérifier :

- PM2 installé ou non
- présence d'autres applications déjà tournantes
- conflits de port éventuels

## 5. Vérification ports

### Vérifier 80, 443 et 22

```bash
ss -tulpn | grep -E ':80|:443|:22'
```

Alternative :

```bash
netstat -tulpn | grep -E ':80|:443|:22'
```

À vérifier :

- port `22` ouvert pour SSH
- port `80` utilisé ou libre
- port `443` utilisé ou libre
- processus associés

## 6. Vérification firewall

### UFW

```bash
sudo ufw status verbose
```

À vérifier :

- UFW actif ou non
- règles sur `22`, `80`, `443`

### iptables

```bash
sudo iptables -L -n -v
sudo iptables -S
```

### nftables si présent

```bash
sudo nft list ruleset
```

À vérifier :

- si la machine utilise UFW, iptables ou nftables
- cohérence des règles entrantes

## 7. Vérification domaine

Objectif recommandé :

- commencer par un sous-domaine de test
- valider l'application en HTTPS
- basculer ensuite le domaine final

### Étapes recommandées pour un sous-domaine de test

Exemple :

```text
test.proreply.domaine.tld
```

À préparer :

1. créer le sous-domaine dans la zone DNS
2. le faire pointer vers l'IP publique du serveur OVH
3. attendre la propagation DNS
4. vérifier avec :

```bash
dig test.proreply.domaine.tld
nslookup test.proreply.domaine.tld
ping test.proreply.domaine.tld
```

### Étapes SSL Let's Encrypt

Préparer seulement la procédure :

1. nginx doit répondre sur le domaine
2. ports `80` et `443` doivent être ouverts
3. DNS doit pointer vers le serveur
4. ensuite seulement :

```bash
sudo certbot --nginx -d test.proreply.domaine.tld
```

À vérifier avant plus tard :

- domaine bien résolu
- nginx prêt
- pare-feu ouvert

## 8. Vérification Git

### Git installé

```bash
git --version
which git
```

### Accès GitHub si nécessaire

Vérification réseau simple :

```bash
ssh -T git@github.com
```

Ou en HTTPS :

```bash
git ls-remote https://github.com/TheJaffle/topreply.git
```

À vérifier :

- git présent
- accès sortant vers GitHub
- besoin ou non d'une clé SSH de déploiement

## 9. Vérification dossier de déploiement

Recommandation cible :

```text
/var/www/proreply
```

### Vérifications à faire

```bash
ls -la /var/www
ls -la /var/www/proreply
stat /var/www 2>/dev/null
stat /var/www/proreply 2>/dev/null
```

À vérifier :

- `/var/www` existe
- `/var/www/proreply` existe déjà ou non
- propriétaire
- groupe
- droits

### Recommandation

Prévoir à terme :

- code applicatif dans `/var/www/proreply`
- utilisateur non-root propriétaire du dossier

## 10. Vérification sécurité

### Utilisateur courant

```bash
whoami
id
groups
```

À vérifier :

- connexion en `ubuntu`
- présence éventuelle dans `sudo`

### Accès root

Vérification sans modification :

```bash
sudo -l
```

À vérifier :

- droits sudo disponibles
- niveau d'accès root effectif

### Utilisateur applicatif

Vérifier s'il existe déjà un utilisateur dédié :

```bash
getent passwd | grep -E 'proreply|deploy|www-data'
```

À vérifier :

- présence d'un utilisateur applicatif dédié ou non
- si futur besoin de créer un utilisateur de déploiement

### Permissions

```bash
namei -l /var/www/proreply 2>/dev/null
```

À vérifier :

- permissions de chaque niveau de dossier
- absence d'écriture trop large

## 11. Vérification réseau et DNS serveur

Commandes utiles :

```bash
ip a
ip route
curl ifconfig.me
hostname -I
```

À vérifier :

- IP privée
- IP publique
- interface réseau principale

## 12. Vérification santé système

Commandes utiles :

```bash
uptime
top -b -n 1 | head -20
ps aux --sort=-%mem | head
ps aux --sort=-%cpu | head
```

À vérifier :

- charge moyenne
- process lourds déjà présents
- mémoire disponible

## 13. Vérification journaux utiles

### Nginx

```bash
sudo ls -la /var/log/nginx
sudo tail -n 50 /var/log/nginx/access.log
sudo tail -n 50 /var/log/nginx/error.log
```

### Système

```bash
sudo journalctl -n 100
sudo journalctl -u nginx -n 100
```

### PM2

```bash
pm2 logs --lines 50
```

À vérifier :

- existence d'autres apps déjà en prod
- erreurs existantes
- saturation ou incidents

## 14. Checklist synthétique à cocher

### Système

- [ ] distribution Linux identifiée
- [ ] version Ubuntu/Debian identifiée
- [ ] architecture CPU confirmée
- [ ] RAM confirmée
- [ ] espace disque suffisant

### Runtime

- [ ] Node installé
- [ ] version Node compatible
- [ ] npm installé
- [ ] git installé

### Reverse proxy / process

- [ ] nginx installé
- [ ] nginx actif ou état connu
- [ ] PM2 installé ou absence confirmée
- [ ] processus PM2 existants identifiés

### Réseau

- [ ] port 22 vérifié
- [ ] port 80 vérifié
- [ ] port 443 vérifié
- [ ] firewall identifié
- [ ] règles UFW / iptables vérifiées

### Déploiement

- [ ] dossier `/var/www/proreply` vérifié
- [ ] permissions vérifiées
- [ ] stratégie de sous-domaine de test définie
- [ ] prérequis SSL Let's Encrypt vérifiés

### Sécurité

- [ ] utilisateur courant identifié
- [ ] droits sudo vérifiés
- [ ] utilisateur applicatif existant ou non identifié
- [ ] accès root compris

## 15. Ce qu'il ne faut pas faire pendant cet audit

Ne pas faire pendant cette phase :

- ne pas cloner le repo
- ne pas lancer `npm install`
- ne pas lancer `npm run build`
- ne pas lancer `npm run start`
- ne pas installer Node / nginx / PM2
- ne pas ouvrir ou fermer des ports
- ne pas lancer Certbot
- ne pas modifier Nginx
- ne pas créer le dossier de déploiement
- ne pas créer d'utilisateur système

Cette phase doit rester une **phase d'observation uniquement**.
