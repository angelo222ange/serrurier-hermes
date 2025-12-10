# 🚀 Guide de Déploiement

## Prérequis sur le VPS

- Ubuntu 20.04+ ou Debian 11+
- Nginx installé : `sudo apt install nginx`
- Accès SSH avec clé

## Déploiement rapide

### 1. Configurer le script

Éditer `deploy/deploy.sh` et modifier :

```bash
DOMAIN="serrurier-votre-ville.fr"     # Votre domaine
VPS_USER="root"                        # Utilisateur SSH
VPS_HOST="123.456.789.0"              # IP de votre VPS
```

### 2. Rendre le script exécutable

```bash
chmod +x deploy/deploy.sh
```

### 3. Déployer

```bash
./deploy/deploy.sh
```

## Configuration Nginx manuelle

Si c'est le premier déploiement :

### 1. Copier la config Nginx sur le VPS

```bash
scp deploy/nginx.conf root@VOTRE_IP:/etc/nginx/sites-available/VOTRE_DOMAINE.conf
```

### 2. Modifier la config sur le VPS

```bash
ssh root@VOTRE_IP
nano /etc/nginx/sites-available/VOTRE_DOMAINE.conf
# Remplacer tous les "DOMAIN" par votre domaine
```

### 3. Activer le site

```bash
ln -s /etc/nginx/sites-available/VOTRE_DOMAINE.conf /etc/nginx/sites-enabled/
nginx -t
systemctl reload nginx
```

## Installation SSL (Let's Encrypt)

```bash
# Sur le VPS
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d votre-domaine.fr -d www.votre-domaine.fr
```

Certbot modifiera automatiquement la config Nginx pour HTTPS.

## Vérification

```bash
# Tester la config Nginx
nginx -t

# Voir les logs
tail -f /var/log/nginx/VOTRE_DOMAINE.access.log
tail -f /var/log/nginx/VOTRE_DOMAINE.error.log
```

## Structure sur le VPS

```
/var/www/votre-domaine.fr/
└── out/                    # Fichiers statiques du site
    ├── index.html
    ├── depannage/
    ├── installation/
    ├── tarifs/
    ├── zones/
    ├── contact/
    └── _next/              # Assets Next.js
```

## Renouvellement SSL automatique

Certbot configure automatiquement un cron pour renouveler les certificats.
Vérifier avec :

```bash
sudo certbot renew --dry-run
```

