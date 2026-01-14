# 🔒 Résolution de l'erreur SSL : NET::ERR_CERT_COMMON_NAME_INVALID

## Problème

L'erreur `NET::ERR_CERT_COMMON_NAME_INVALID` apparaît lorsque vous accédez à `https://serrurier-hermes.com`. Cela signifie que le certificat SSL installé sur le serveur ne correspond pas au nom de domaine.

## Causes possibles

1. **Certificat SSL non installé** - Le serveur utilise un certificat par défaut
2. **Certificat pour un autre domaine** - Le certificat est configuré pour un autre nom
3. **Certificat expiré** - Le certificat a expiré et n'a pas été renouvelé
4. **Configuration DNS incorrecte** - Le domaine pointe vers un mauvais serveur
5. **Configuration serveur incorrecte** - Le serveur web n'utilise pas le bon certificat

## Solutions

### Solution 1 : Vérifier le certificat SSL actuel

Utilisez un outil en ligne pour vérifier le certificat :
- [SSL Labs SSL Test](https://www.ssllabs.com/ssltest/analyze.html?d=serrurier-hermes.com)
- [SSL Checker](https://www.sslshopper.com/ssl-checker.html#hostname=serrurier-hermes.com)

### Solution 2 : Si vous utilisez un VPS (Nginx)

#### Étape 1 : Vérifier la configuration Nginx

```bash
# Se connecter au VPS
ssh root@VOTRE_IP_VPS

# Vérifier la configuration SSL
cat /etc/nginx/sites-available/serrurier-hermes.com | grep ssl_certificate
```

#### Étape 2 : Installer ou renouveler le certificat Let's Encrypt

```bash
# Installer Certbot si ce n'est pas déjà fait
sudo apt update
sudo apt install certbot python3-certbot-nginx -y

# Générer un nouveau certificat (avec sudo pour les permissions)
sudo certbot --nginx -d serrurier-hermes.com -d www.serrurier-hermes.com

# Ou renouveler un certificat existant
sudo certbot renew --force-renewal
```

#### Étape 3 : Vérifier que Nginx utilise le bon certificat

```bash
# Tester la configuration
sudo nginx -t

# Recharger Nginx
sudo systemctl reload nginx
```

#### Étape 4 : Vérifier les certificats installés

```bash
# Lister les certificats Let's Encrypt
sudo ls -la /etc/letsencrypt/live/

# Vérifier le certificat pour serrurier-hermes.com
sudo openssl x509 -in /etc/letsencrypt/live/serrurier-hermes.com/fullchain.pem -text -noout | grep "Subject:"
```

### Solution 3 : Si vous utilisez un hébergement web OVH

#### Option A : SSL gratuit OVH

1. Connectez-vous à l'[Espace Client OVH](https://www.ovh.com/manager/)
2. Allez dans **Web Cloud** > **Hébergements** > votre hébergement
3. Cliquez sur l'onglet **SSL**
4. Activez le **SSL gratuit** pour `serrurier-hermes.com`
5. Attendez quelques minutes que le certificat soit généré

#### Option B : Let's Encrypt via SSH

Si vous avez accès SSH :

```bash
# Installer Certbot
sudo apt install certbot python3-certbot-apache -y

# Générer le certificat
sudo certbot --apache -d serrurier-hermes.com -d www.serrurier-hermes.com
```

### Solution 4 : Vérifier la configuration DNS

Assurez-vous que votre domaine pointe vers le bon serveur :

```bash
# Vérifier les enregistrements DNS
dig serrurier-hermes.com
nslookup serrurier-hermes.com

# Vérifier que le domaine pointe vers votre IP
host serrurier-hermes.com
```

Les enregistrements DNS doivent pointer vers :
- **A** : L'IP de votre serveur
- **CNAME** (www) : `serrurier-hermes.com`

### Solution 5 : Vérifier la configuration du serveur web

#### Pour Nginx

Vérifiez que le fichier de configuration contient :

```nginx
server {
    listen 443 ssl http2;
    server_name serrurier-hermes.com www.serrurier-hermes.com;
    
    ssl_certificate /etc/letsencrypt/live/serrurier-hermes.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/serrurier-hermes.com/privkey.pem;
    
    # ... reste de la configuration
}
```

#### Pour Apache

Vérifiez que le fichier de configuration contient :

```apache
<VirtualHost *:443>
    ServerName serrurier-hermes.com
    ServerAlias www.serrurier-hermes.com
    
    SSLEngine on
    SSLCertificateFile /etc/letsencrypt/live/serrurier-hermes.com/fullchain.pem
    SSLCertificateKeyFile /etc/letsencrypt/live/serrurier-hermes.com/privkey.pem
    
    # ... reste de la configuration
</VirtualHost>
```

## Vérification après correction

1. **Vider le cache du navigateur** :
   - Chrome : `Ctrl+Shift+Delete` (Windows) ou `Cmd+Shift+Delete` (Mac)
   - Ou utiliser le mode navigation privée

2. **Tester le certificat** :
   - Accédez à `https://serrurier-hermes.com`
   - Vérifiez que le cadenas vert apparaît
   - Cliquez sur le cadenas pour voir les détails du certificat

3. **Vérifier avec des outils en ligne** :
   - [SSL Labs](https://www.ssllabs.com/ssltest/)
   - [Why No Padlock](https://www.whynopadlock.com/)

## Problèmes courants

### Le certificat est installé mais l'erreur persiste

1. **Vider le cache HSTS** :
   - Chrome : `chrome://net-internals/#hsts`
   - Supprimez `serrurier-hermes.com` de la liste HSTS

2. **Vérifier le redémarrage du serveur web** :
   ```bash
   # Nginx
   sudo systemctl restart nginx
   
   # Apache
   sudo systemctl restart apache2
   ```

### Le certificat expire bientôt

Let's Encrypt renouvelle automatiquement les certificats, mais vous pouvez forcer le renouvellement :

```bash
sudo certbot renew --force-renewal
```

### Erreur lors de l'installation du certificat

Si Certbot échoue, vérifiez :
- Que le domaine pointe bien vers votre serveur
- Que les ports 80 et 443 sont ouverts
- Que le serveur web est démarré
- Les logs : `journalctl -u certbot.timer`

## Support

Si le problème persiste :
- **OVH** : [Support OVH](https://www.ovh.com/fr/support/)
- **Let's Encrypt** : [Documentation](https://letsencrypt.org/docs/)
