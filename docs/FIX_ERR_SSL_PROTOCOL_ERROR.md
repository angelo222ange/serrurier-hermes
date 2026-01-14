# 🔐 Résolution ERR_SSL_PROTOCOL_ERROR - serrurier-hermes.com

## 🔴 Problème

Le site `serrurier-hermes.com` renvoie l'erreur **ERR_SSL_PROTOCOL_ERROR** lors de l'accès en HTTPS.

Cette erreur signifie que le navigateur ne peut pas établir une connexion SSL/TLS sécurisée avec le serveur.

---

## 🔍 Diagnostic

### Étape 1 : Exécuter le diagnostic

Sur votre serveur SSH (`ubuntu@176.31.163.195`):

```bash
cd /var/www/serrurier-hermes
chmod +x diagnose-ssl.sh
./diagnose-ssl.sh
```

Le script va vérifier:
- ✅ Le port 443 est bien ouvert
- ✅ La configuration Nginx
- ✅ Les certificats SSL
- ✅ Les conflits potentiels

### Étape 2 : Analyser les résultats

Cherchez ces problèmes courants:

#### ❌ Problème 1: Conflit de protocoles SSL

```
[warn] protocol options redefined for [::]:443
```

**Cause**: Plusieurs configurations Nginx définissent `ssl_protocols` différemment sur le même port.

#### ❌ Problème 2: Certificat non trouvé

```
SSL: error:02001002:system library:fopen:No such file or directory
```

**Cause**: Les fichiers de certificat n'existent pas ou sont mal référencés.

#### ❌ Problème 3: Port 443 non écouté

```
(aucune sortie pour netstat | grep :443)
```

**Cause**: Nginx n'écoute pas sur le port 443.

---

## 🔧 Solution Rapide

### Option A: Script Automatique (Recommandé)

```bash
cd /var/www/serrurier-hermes
chmod +x fix-ssl.sh
sudo ./fix-ssl.sh
```

Ce script va:
1. Sauvegarder la config actuelle
2. Créer une configuration propre et fonctionnelle
3. Tester la configuration
4. Recharger Nginx
5. Vérifier que HTTPS fonctionne

### Option B: Correction Manuelle

#### 1. Vérifier la configuration actuelle

```bash
sudo cat /etc/nginx/sites-available/serrurier-hermes
```

#### 2. Vérifier que les certificats existent

```bash
sudo ls -la /etc/letsencrypt/live/serrurier-hermes.com/
```

Vous devriez voir:
- `fullchain.pem`
- `privkey.pem`
- `chain.pem`

#### 3. Éditer la configuration Nginx

```bash
sudo nano /etc/nginx/sites-available/serrurier-hermes
```

Remplacez le contenu par:

```nginx
# HTTP - Redirection vers HTTPS
server {
    listen 80;
    listen [::]:80;
    server_name serrurier-hermes.com www.serrurier-hermes.com;
    
    return 301 https://$host$request_uri;
}

# HTTPS
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name serrurier-hermes.com www.serrurier-hermes.com;

    # Certificats SSL
    ssl_certificate /etc/letsencrypt/live/serrurier-hermes.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/serrurier-hermes.com/privkey.pem;

    # Configuration SSL moderne
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers off;

    # Root
    root /var/www/serrurier-hermes;
    index index.html;

    # Logs
    access_log /var/log/nginx/serrurier-hermes.access.log;
    error_log /var/log/nginx/serrurier-hermes.error.log;

    # Pages HTML
    location / {
        try_files $uri $uri/ $uri.html $uri/index.html /index.html;
    }

    # Cache statique
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|webp|woff|woff2|ttf|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

#### 4. Tester et recharger

```bash
sudo nginx -t
sudo systemctl reload nginx
```

---

## 🔍 Causes Courantes et Solutions

### 1. Conflit de `ssl_protocols` entre plusieurs sites

**Symptôme**: 
```
[warn] protocol options redefined for [::]:443
```

**Solution**: Standardiser les directives SSL dans toutes les configs

```bash
# Trouver tous les fichiers avec des conflits
sudo grep -r "ssl_protocols" /etc/nginx/sites-enabled/

# S'assurer que tous utilisent:
ssl_protocols TLSv1.2 TLSv1.3;
```

### 2. Certificat SSL mal configuré

**Symptôme**: ERR_SSL_PROTOCOL_ERROR ou ERR_CERT_AUTHORITY_INVALID

**Solution**: Regénérer le certificat

```bash
sudo certbot --nginx -d serrurier-hermes.com -d www.serrurier-hermes.com --force-renewal
```

### 3. Nginx n'écoute pas sur le port 443

**Symptôme**: Le port 443 n'apparaît pas dans `netstat`

**Solution**:

```bash
# Vérifier qu'une directive listen 443 existe
sudo grep -r "listen.*443" /etc/nginx/sites-enabled/serrurier-hermes

# Si absent, ajouter:
# listen 443 ssl http2;
# listen [::]:443 ssl http2;
```

### 4. Pare-feu bloque le port 443

**Symptôme**: Timeout ou connexion refusée

**Solution**:

```bash
# UFW
sudo ufw allow 443/tcp
sudo ufw reload

# iptables
sudo iptables -A INPUT -p tcp --dport 443 -j ACCEPT
sudo iptables-save
```

### 5. Les fichiers dans `/var/www/serrurier-hermes` sont manquants

**Symptôme**: 404 après connexion HTTPS

**Solution**:

```bash
# Vérifier que les fichiers existent
ls -la /var/www/serrurier-hermes/

# Si manquants, redéployer
cd /path/to/local/serrurier-template-1
./deploy/deploy.sh serrurier-hermes.com
```

---

## ✅ Vérification Post-Fix

### 1. Test en ligne de commande

```bash
# Test connexion SSL
curl -I https://serrurier-hermes.com

# Doit retourner: HTTP/2 200
```

### 2. Test avec OpenSSL

```bash
echo | openssl s_client -connect serrurier-hermes.com:443 -servername serrurier-hermes.com
```

Vous devriez voir:
```
Verify return code: 0 (ok)
```

### 3. Test dans le navigateur

1. **Videz le cache** (Cmd/Ctrl + Shift + R)
2. Testez en **navigation privée**
3. Accédez à: `https://serrurier-hermes.com`

### 4. Test SSL externe

- **SSL Labs**: https://www.ssllabs.com/ssltest/analyze.html?d=serrurier-hermes.com
- **SSL Checker**: https://www.sslshopper.com/ssl-checker.html

---

## 🚨 Si l'erreur persiste

### Cas 1: Le navigateur met en cache l'erreur SSL

**Solution**:

#### Chrome/Edge
1. Ouvrir: `chrome://net-internals/#hsts`
2. Dans "Delete domain security policies"
3. Entrer: `serrurier-hermes.com`
4. Cliquer "Delete"

#### Firefox
1. Fermer complètement Firefox
2. Supprimer: `~/Library/Application Support/Firefox/Profiles/*/cert9.db` (Mac)
3. Redémarrer Firefox

#### Safari
```bash
# Vider complètement le cache Safari
rm -rf ~/Library/Caches/com.apple.Safari
rm -rf ~/Library/Safari/LocalStorage/*
```

### Cas 2: DNS pointe vers l'ancien serveur Framer

**Solution**:

```bash
# Vérifier l'IP actuelle
dig serrurier-hermes.com +short

# Doit retourner: 176.31.163.195
```

Si ce n'est pas le cas, mettez à jour vos DNS chez votre registrar:
- **A Record** : `serrurier-hermes.com` → `176.31.163.195`
- **CNAME** : `www` → `serrurier-hermes.com`

Attendez 5-10 minutes pour la propagation.

### Cas 3: Certbot n'a pas correctement configuré Nginx

**Solution**: Reconfigurer manuellement

```bash
# 1. Supprimer les includes Certbot
sudo nano /etc/nginx/sites-available/serrurier-hermes
# Supprimer toutes les lignes "# managed by Certbot"

# 2. Utiliser la config propre fournie plus haut

# 3. Tester
sudo nginx -t
sudo systemctl reload nginx
```

---

## 📋 Checklist de Débogage

- [ ] Le port 443 est ouvert sur le serveur
- [ ] Les certificats SSL existent dans `/etc/letsencrypt/live/serrurier-hermes.com/`
- [ ] La configuration Nginx écoute sur le port 443
- [ ] `nginx -t` passe sans erreur
- [ ] Nginx est rechargé après les modifications
- [ ] Le DNS pointe vers `176.31.163.195`
- [ ] Le pare-feu autorise le port 443
- [ ] Les fichiers du site existent dans `/var/www/serrurier-hermes/`
- [ ] Le cache du navigateur est vidé
- [ ] Test en navigation privée réussi

---

## 🛠️ Commandes Utiles

```bash
# Voir les logs en temps réel
sudo tail -f /var/log/nginx/serrurier-hermes.error.log

# Redémarrer Nginx complètement
sudo systemctl restart nginx

# Vérifier le statut Nginx
sudo systemctl status nginx

# Tester la config sans recharger
sudo nginx -t

# Voir toutes les configs actives
ls -la /etc/nginx/sites-enabled/

# Vérifier tous les ports écoutés
sudo netstat -tlnp | grep nginx

# Renouveler tous les certificats
sudo certbot renew --force-renewal
```

---

## 📞 Support

Si le problème persiste après avoir suivi ce guide:

1. **Exécutez le diagnostic complet**:
   ```bash
   ./diagnose-ssl.sh > diagnostic-output.txt
   ```

2. **Récupérez les logs**:
   ```bash
   sudo tail -100 /var/log/nginx/serrurier-hermes.error.log > error-logs.txt
   sudo nginx -T > nginx-config-full.txt
   ```

3. Partagez ces fichiers pour analyse.

---

## ✅ Configuration Finale Attendue

Après correction, vous devriez avoir:

- ✅ `https://serrurier-hermes.com` → Site accessible
- ✅ `https://www.serrurier-hermes.com` → Site accessible
- ✅ `http://serrurier-hermes.com` → Redirige vers HTTPS
- ✅ Certificat SSL valide (Let's Encrypt)
- ✅ Note A+ sur SSL Labs
- ✅ Aucun avertissement dans la console navigateur

---

**Date**: 14 janvier 2026  
**Serveur**: ubuntu@176.31.163.195  
**Domaine**: serrurier-hermes.com
