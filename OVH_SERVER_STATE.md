# OVH SERVER STATE

Audit réalisé sur :

```bash
ssh ubuntu@51.255.82.201
```

Date de l'audit :

- `2026-06-11`

Règle respectée :

- aucune installation
- aucune modification système
- aucun redémarrage
- audit en lecture seule uniquement

## 1. Informations système réelles

### OS

- Distribution : **Ubuntu**
- Version : **24.04.4 LTS**
- Codename : **noble**
- ID : `ubuntu`

Source :

```text
PRETTY_NAME="Ubuntu 24.04.4 LTS"
VERSION_ID="24.04"
VERSION="24.04.4 LTS (Noble Numbat)"
```

### Machine / noyau

- Hostname : `qifree-server`
- Kernel : `Linux 6.8.0-111-generic`
- Architecture : `x86-64`
- Hardware vendor : `Supermicro`
- Hardware model : `Super Server`

### CPU

- CPU total : **8 vCPU**
- Modèle : **Intel Xeon CPU D-1521 @ 2.40GHz**
- Socket : `1`
- Cœurs par socket : `4`
- Threads par cœur : `2`

### RAM

- RAM totale : **31 GiB**
- RAM utilisée : **1.3 GiB**
- RAM libre : **24 GiB**
- Disponible : **29 GiB**
- Swap : **1.0 GiB**
- Swap utilisée : **0 B**

### Disque

- Partition principale `/` : **1.8T**
- Utilisé sur `/` : **7.7G**
- Disponible sur `/` : **1.7T**
- Usage : **1%**

### Stockage / structure disque

- 2 disques physiques de `1.8T`
- RAID1 détecté sur :
  - `/boot` via `md2`
  - `/` via `md3`

Conclusion système :

- serveur très largement dimensionné pour héberger ProReply
- bonne réserve disque
- bonne réserve RAM
- charge très faible

## 2. Runtime

### Node

- Node installé : **oui**
- Version : **v22.22.2**
- Chemin : `/usr/bin/node`

### npm

- npm installé : **oui**
- Version : **10.9.7**
- Chemin : `/usr/bin/npm`

Conclusion runtime :

- Node est déjà installé
- version compatible avec ProReply
- pas de blocage côté runtime Node

## 3. Nginx

- Nginx installé : **oui**
- Version : **nginx/1.24.0 (Ubuntu)**
- Binaire : `/usr/sbin/nginx`
- Statut : **active**
- Activation au boot : **enabled**

Conclusion Nginx :

- Nginx est prêt et déjà utilisé en production

## 4. PM2

- PM2 installé : **oui**
- Version : **7.0.1**
- Binaire : `/usr/bin/pm2`

### Processus présents

Deux applications sont déjà présentes :

- `quiz`
- `quizhub`

État :

- les deux sont `online`

Observations :

- `quiz` a eu `62` redémarrages
- `quizhub` a eu `105` redémarrages

Conclusion PM2 :

- PM2 est fonctionnel
- le serveur héberge déjà d'autres applications Node
- il faudra éviter tout conflit de process ou de port avec ProReply

## 5. Réseau

### Ports utilisés

Ports en écoute détectés :

- `22` : SSH
- `80` : HTTP
- `443` : HTTPS

Conclusion :

- serveur déjà exposé en web
- nginx écoute déjà sur `80` et `443`
- ProReply devra donc passer derrière nginx, probablement via un nouveau vhost / reverse proxy

### Firewall

#### UFW

- Statut : **inactive**

#### iptables

- politique `ACCEPT` sur :
  - `INPUT`
  - `FORWARD`
  - `OUTPUT`

#### nftables

- tables présentes mais vides :
  - `table ip filter`
  - `table ip6 filter`

Conclusion firewall :

- pas de firewall actif réellement configuré au niveau UFW/iptables/nftables
- la machine est actuellement plutôt ouverte

## 6. Dossier de déploiement

### `/var/www`

Contenu actuel :

- `html`
- `quiz`
- `quizhub`
- `videos`

Permissions :

- `/var/www` existe
- propriétaire : `root:root`
- permissions : `0755`

### `/var/www/proreply`

- n'existe pas actuellement

Conclusion dossier :

- le chemin recommandé `/var/www/proreply` est disponible conceptuellement
- il faudra le créer plus tard
- il faudra aussi définir clairement le propriétaire et le groupe

## 7. Sécurité

### Utilisateur courant

- utilisateur connecté : `ubuntu`

### Groupes

- `ubuntu`
- `adm`
- `cdrom`
- `sudo`
- `dip`
- `lxd`

### Droits sudo

L'utilisateur `ubuntu` peut exécuter :

- `(ALL : ALL) ALL`
- `(ALL) NOPASSWD: ALL`

Conclusion sécurité :

- l'utilisateur `ubuntu` a des privilèges sudo complets sans mot de passe
- c'est pratique pour l'administration
- mais il faudra être discipliné sur les opérations futures

### Réseau / IP

- IPv4 publique : `51.255.82.201`
- IPv6 : `2001:41d0:1004:22c9::1`

### Uptime

- uptime : **25 jours 21 heures**
- load average :
  - `0.03`
  - `0.06`
  - `0.02`

Conclusion stabilité :

- serveur stable
- charge très faible

## 8. Risques détectés

### Risque 1 : serveur déjà mutualisé entre plusieurs apps

Le serveur héberge déjà :

- `quiz`
- `quizhub`

Conséquences :

- vigilance sur la configuration Nginx
- vigilance sur PM2
- vigilance sur les ports internes
- vigilance sur les certificats et domaines

### Risque 2 : pas de firewall actif

Constat :

- UFW inactif
- iptables en ACCEPT
- nftables vide

Conséquence :

- surface d'exposition plus large que nécessaire

### Risque 3 : `/var/www/proreply` n'existe pas encore

Ce n'est pas bloquant, mais cela confirme que :

- rien n'est préparé pour ProReply
- il faudra créer proprement la structure plus tard

### Risque 4 : droits sudo très larges

L'utilisateur `ubuntu` a un accès très permissif :

- utile pour déployer
- mais risque d'erreur humaine si manipulation trop rapide

### Risque 5 : nginx déjà en production

Comme `80/443` sont déjà occupés par Nginx :

- on ne pourra pas lancer ProReply directement sur ces ports
- il faudra obligatoirement utiliser un reverse proxy

## 9. Recommandation

### Le serveur est-il prêt pour héberger ProReply ?

**Oui, techniquement il est prêt pour accueillir ProReply**, avec quelques réserves d'organisation.

### Points déjà OK

- OS moderne et propre
- Node installé et compatible
- npm installé
- Nginx installé et actif
- PM2 installé
- ressources CPU / RAM / disque très confortables
- accès sudo complet

### Points à prévoir avant déploiement

- créer `/var/www/proreply`
- choisir la stratégie de propriétaire / groupe
- ajouter un vhost Nginx dédié
- configurer un sous-domaine de test
- brancher SSL Let's Encrypt
- choisir un nom PM2 distinct
- vérifier qu'aucun conflit Nginx / PM2 n'apparaît avec `quiz` et `quizhub`

## 10. Verdict final

### État global

- **Serveur exploitable pour ProReply : OUI**
- **Prêt pour déploiement immédiat sans préparation : NON**

### Formulation recommandée

Le serveur est **suffisamment sain et dimensionné** pour héberger ProReply.
En revanche, il nécessite encore une **préparation de structure de déploiement** :

- dossier applicatif
- reverse proxy Nginx dédié
- domaine / sous-domaine
- SSL
- cadrage sécurité minimal

### Priorité suivante recommandée

Prochaine étape logique :

1. préparer le dossier `/var/www/proreply`
2. définir la stratégie Nginx
3. définir le sous-domaine de test
4. seulement ensuite déployer ProReply
