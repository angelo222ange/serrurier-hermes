# 🚀 Guide de Déploiement OVH - Serrurier Hermès

## Vue d'ensemble

Ce guide vous accompagne pour déployer le site Serrurier Hermès sur un hébergement OVH.

## Options de déploiement

### Option 1 : Hébergement Web OVH (Recommandé pour débutants)

#### Étape 1 : Commander l'hébergement

1. Rendez-vous sur [OVH](https://www.ovh.com/fr/hebergement-web/)
2. Choisissez l'offre **Performance** ou **Pro** (recommandé pour les performances)
3. Associez votre domaine `serrurier-hermes.com`

#### Étape 2 : Générer le site statique

```bash
# Dans le dossier du projet
npm run build
```

Cela génère un dossier `out/` contenant tous les fichiers statiques.

#### Étape 3 : Configurer le FTP

1. Connectez-vous à l'[Espace Client OVH](https://www.ovh.com/manager/)
2. Allez dans **Web Cloud** > **Hébergements** > votre hébergement
3. Récupérez les identifiants FTP dans l'onglet **FTP - SSH**

#### Étape 4 : Transférer les fichiers

Utilisez **FileZilla** ou un client FTP similaire :

```
Hôte : ftp.cluster0XX.hosting.ovh.net
Utilisateur : votre-identifiant-ftp
Mot de passe : votre-mot-de-passe-ftp
Port : 21
```

1. Connectez-vous au FTP
2. Naviguez vers le dossier `www/`
3. Supprimez le contenu existant (sauf `.htaccess` si présent)
4. Uploadez tout le contenu du dossier `out/`

#### Étape 5 : Configurer le .htaccess

Créez un fichier `.htaccess` à la racine de `www/` :

```apache
# Redirection HTTPS
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Redirection www vers non-www
RewriteCond %{HTTP_HOST} ^www\.(.*)$ [NC]
RewriteRule ^(.*)$ https://%1/$1 [L,R=301]

# Gestion des trailing slashes (cohérent avec Next.js)
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_URI} !(.*)/$
RewriteRule ^(.*)$ /$1/ [L,R=301]

# Compression Gzip
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/css application/json
  AddOutputFilterByType DEFLATE application/javascript text/javascript
  AddOutputFilterByType DEFLATE text/xml application/xml image/svg+xml
</IfModule>

# Cache navigateur
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
  ExpiresByType text/html "access plus 1 hour"
</IfModule>

# Headers de sécurité
<IfModule mod_headers.c>
  Header set X-Content-Type-Options "nosniff"
  Header set X-Frame-Options "SAMEORIGIN"
  Header set X-XSS-Protection "1; mode=block"
</IfModule>

# Pages d'erreur personnalisées
ErrorDocument 404 /404.html
```

---

### Option 2 : VPS OVH (Recommandé pour performances maximales)

#### Étape 1 : Commander un VPS

1. Rendez-vous sur [VPS OVH](https://www.ovh.com/fr/vps/)
2. Choisissez **VPS Starter** ou **VPS Value** (suffisant pour un site statique)
3. Sélectionnez **Ubuntu 22.04** comme système

#### Étape 2 : Se connecter au VPS

```bash
ssh root@VOTRE_IP_VPS
```

#### Étape 3 : Installer Nginx

```bash
apt update && apt upgrade -y
apt install nginx -y
systemctl enable nginx
```

#### Étape 4 : Créer le dossier du site

```bash
mkdir -p /var/www/serrurier-hermes.com
chown -R www-data:www-data /var/www/serrurier-hermes.com
```

#### Étape 5 : Configurer Nginx

Créez `/etc/nginx/sites-available/serrurier-hermes.com` :

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name serrurier-hermes.com www.serrurier-hermes.com;
    root /var/www/serrurier-hermes.com;
    index index.html;

    # Compression Gzip
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml image/svg+xml;

    # Cache statique
    location ~* \.(js|css|png|jpg|jpeg|webp|gif|ico|svg|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Gestion des routes Next.js (trailing slash)
    location / {
        try_files $uri $uri/ $uri.html =404;
    }

    # Headers de sécurité
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Erreur 404
    error_page 404 /404.html;
}
```

#### Étape 6 : Activer le site

```bash
ln -s /etc/nginx/sites-available/serrurier-hermes.com /etc/nginx/sites-enabled/
nginx -t
systemctl reload nginx
```

#### Étape 7 : Transférer les fichiers

Depuis votre machine locale :

```bash
npm run build
rsync -avz --delete out/ root@VOTRE_IP_VPS:/var/www/serrurier-hermes.com/
```

#### Étape 8 : SSL avec Let's Encrypt

```bash
# Sur le VPS
apt install certbot python3-certbot-nginx -y
certbot --nginx -d serrurier-hermes.com -d www.serrurier-hermes.com
```

---

## Vérification post-déploiement

### Checklist

- [ ] Le site s'affiche correctement sur `https://serrurier-hermes.com`
- [ ] Le certificat SSL est valide (cadenas vert)
- [ ] La redirection HTTP → HTTPS fonctionne
- [ ] La redirection www → non-www fonctionne
- [ ] Les pages de villes s'affichent (`/serrurier-paris-1/`)
- [ ] Les images se chargent correctement
- [ ] Le bouton d'appel fonctionne sur mobile

### Test de performance

1. [PageSpeed Insights](https://pagespeed.web.dev/) - Objectif > 90
2. [GTmetrix](https://gtmetrix.com/) - Vérifier le cache et la compression

---

## Mises à jour du site

Pour mettre à jour le site après modifications :

```bash
# 1. Build local
npm run build

# 2. Générer le sitemap
node scripts/generate-sitemap.js

# 3. Déployer
# Pour hébergement web OVH : FTP
# Pour VPS : rsync -avz --delete out/ root@IP:/var/www/serrurier-hermes.com/
```

---

## Support OVH

- Documentation : https://docs.ovh.com/fr/
- Assistance : https://www.ovh.com/fr/support/
