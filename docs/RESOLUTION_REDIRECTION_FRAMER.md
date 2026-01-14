# 🔄 Résolution : Redirection vers l'ancien site Framer

## Problème

Après avoir changé les DNS, `https://www.serrurier-hermes.com` redirige encore vers l'ancien site Framer au lieu du nouveau serveur.

## Causes possibles

1. **Cache HSTS (HTTP Strict Transport Security)** - Le navigateur force HTTPS vers l'ancien serveur
2. **Cache DNS local** - Votre ordinateur utilise encore l'ancienne IP
3. **Propagation DNS incomplète** - Les DNS n'ont pas encore propagé partout
4. **Certificat SSL sur l'ancien serveur** - Le certificat pointe encore vers Framer

## Solutions (dans l'ordre)

### Solution 1 : Vider le cache HSTS dans Chrome

Le cache HSTS est la cause la plus fréquente de ce problème.

#### Étape 1 : Accéder aux paramètres HSTS

1. Ouvrez Chrome
2. Dans la barre d'adresse, tapez : `chrome://net-internals/#hsts`
3. Appuyez sur Entrée

#### Étape 2 : Supprimer le domaine du cache HSTS

1. Dans la section **"Delete domain security policies"**
2. Entrez : `serrurier-hermes.com`
3. Cliquez sur **"Delete"**
4. Répétez pour `www.serrurier-hermes.com` si nécessaire

#### Étape 3 : Vider le cache DNS de Chrome

1. Dans la même page, allez dans **"DNS"** (ou tapez `chrome://net-internals/#dns`)
2. Cliquez sur **"Clear host cache"**

#### Étape 4 : Redémarrer Chrome

Fermez complètement Chrome et rouvrez-le.

### Solution 2 : Vérifier la propagation DNS

Vérifiez que les DNS pointent bien vers votre nouveau serveur.

#### Vérification en ligne

Utilisez ces outils pour vérifier la propagation DNS :

- [What's My DNS](https://www.whatsmydns.net/#A/serrurier-hermes.com)
- [DNS Checker](https://dnschecker.org/#A/serrurier-hermes.com)
- [DNSPerf](https://www.dnsperf.com/)

Les DNS doivent pointer vers : **176.31.163.195**

#### Vérification en ligne de commande

```bash
# Vérifier les DNS depuis votre machine
dig serrurier-hermes.com +short
nslookup serrurier-hermes.com

# Doit retourner : 176.31.163.195
```

### Solution 3 : Vider le cache DNS local

#### Sur macOS

```bash
# Vider le cache DNS
sudo dscacheutil -flushcache
sudo killall -HUP mDNSResponder

# Vérifier après
dig serrurier-hermes.com
```

#### Sur Windows

```bash
# Ouvrir PowerShell en administrateur
ipconfig /flushdns
```

#### Sur Linux

```bash
# Si vous utilisez systemd-resolved
sudo systemd-resolve --flush-caches

# Ou redémarrer le service
sudo systemctl restart systemd-resolved
```

### Solution 4 : Utiliser un navigateur en mode navigation privée

1. Ouvrez Chrome/Firefox en mode navigation privée
2. Accédez à `https://www.serrurier-hermes.com`
3. Si ça fonctionne, c'est bien un problème de cache

### Solution 5 : Vérifier la configuration Nginx sur le serveur

Connectez-vous au VPS et vérifiez que Nginx est bien configuré :

```bash
# Se connecter au VPS
ssh deploy@vps-729c8b57

# Vérifier la configuration Nginx
sudo cat /etc/nginx/sites-available/serrurier-hermes.com.conf

# Vérifier que le serveur écoute bien sur le bon domaine
sudo nginx -t

# Vérifier les logs
sudo tail -f /var/log/nginx/serrurier-hermes.com.access.log
```

La configuration doit contenir :

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name serrurier-hermes.com www.serrurier-hermes.com;
    root /var/www/serrurier-hermes/out;
    # ...
}
```

### Solution 6 : Vérifier le certificat SSL

Assurez-vous que le certificat SSL est installé sur le nouveau serveur :

```bash
# Sur le VPS
sudo certbot certificates

# Vérifier que le certificat existe
sudo ls -la /etc/letsencrypt/live/serrurier-hermes.com/

# Si le certificat n'existe pas, l'installer
sudo certbot --nginx -d serrurier-hermes.com -d www.serrurier-hermes.com
```

### Solution 7 : Forcer la résolution DNS dans le navigateur

Si rien ne fonctionne, vous pouvez forcer Chrome à utiliser une IP spécifique :

1. Fermez Chrome complètement
2. Sur macOS/Linux, modifiez `/etc/hosts` :
   ```bash
   sudo nano /etc/hosts
   ```
3. Ajoutez cette ligne :
   ```
   176.31.163.195 serrurier-hermes.com www.serrurier-hermes.com
   ```
4. Sauvegardez et testez

⚠️ **Important** : Retirez cette ligne une fois que les DNS sont propagés.

## Vérification finale

Une fois les étapes effectuées :

1. **Testez en navigation privée** : `https://www.serrurier-hermes.com`
2. **Vérifiez le certificat SSL** : Cliquez sur le cadenas dans la barre d'adresse
3. **Vérifiez les logs Nginx** : Les requêtes doivent apparaître dans les logs du nouveau serveur

## Si le problème persiste

### Vérifier que Framer n'a plus le domaine

1. Connectez-vous à votre compte Framer
2. Vérifiez que le domaine `serrurier-hermes.com` n'est plus associé
3. Si c'est encore le cas, retirez-le de Framer

### Vérifier les enregistrements DNS chez Hostinger

Dans le panneau Hostinger, vérifiez que :

1. L'enregistrement **A** pour `@` pointe vers `176.31.163.195`
2. L'enregistrement **CNAME** pour `www` pointe vers `serrurier-hermes.com`
3. Il n'y a pas d'autres enregistrements qui pourraient causer des conflits

### Attendre la propagation complète

La propagation DNS peut prendre jusqu'à **48 heures** (TTL de 14400 = 4 heures, mais certains serveurs DNS mettent plus de temps).

Vous pouvez vérifier la propagation avec :
- [What's My DNS](https://www.whatsmydns.net/#A/serrurier-hermes.com)

## Checklist de résolution

- [ ] Cache HSTS vidé dans Chrome
- [ ] Cache DNS local vidé
- [ ] DNS vérifiés et pointent vers 176.31.163.195
- [ ] Nginx configuré correctement sur le serveur
- [ ] Certificat SSL installé sur le nouveau serveur
- [ ] Test en navigation privée réussi
- [ ] Domaine retiré de Framer
- [ ] Propagation DNS vérifiée avec des outils en ligne

## Support

Si le problème persiste après toutes ces étapes :
- Vérifiez les logs Nginx : `sudo tail -f /var/log/nginx/serrurier-hermes.com.error.log`
- Contactez le support Hostinger si les DNS ne se propagent pas
- Vérifiez que le port 80 et 443 sont ouverts sur le VPS
