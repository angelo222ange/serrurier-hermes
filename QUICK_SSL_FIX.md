# 🚨 FIX RAPIDE - ERR_SSL_PROTOCOL_ERROR

## Situation

Votre site `serrurier-hermes.com` renvoie une erreur **ERR_SSL_PROTOCOL_ERROR**.

Le déploiement a réussi, les certificats SSL sont installés, mais le navigateur ne peut pas établir de connexion SSL.

---

## 🎯 Solution en 3 Étapes

### Étape 1: Connectez-vous à votre serveur

```bash
ssh ubuntu@176.31.163.195
```

### Étape 2: Transférez les scripts de correction

Depuis votre machine locale (nouvel onglet terminal):

```bash
cd /Users/angeloameur-cam/serrurier-template-1/deploy

# Transférer les scripts
scp diagnose-ssl.sh fix-ssl.sh ubuntu@176.31.163.195:/var/www/serrurier-hermes/
```

### Étape 3: Exécutez le fix automatique

Retournez dans votre SSH et:

```bash
cd /var/www/serrurier-hermes
chmod +x diagnose-ssl.sh fix-ssl.sh

# D'abord, diagnostic
./diagnose-ssl.sh

# Puis, correction automatique
sudo ./fix-ssl.sh
```

Le script va:
1. ✅ Sauvegarder votre config actuelle
2. ✅ Créer une configuration SSL propre
3. ✅ Tester la configuration
4. ✅ Recharger Nginx
5. ✅ Vérifier que HTTPS fonctionne

---

## 🔍 Que fait le script ?

Le script `fix-ssl.sh` résout les problèmes courants:

- **Conflits de protocoles SSL** entre plusieurs sites
- **Configuration Nginx incomplète** après Certbot
- **Directives SSL manquantes** ou mal configurées
- **Chemins incorrects** vers les certificats

---

## ✅ Vérification

Après l'exécution du script, testez:

1. **En ligne de commande** (sur le serveur):
   ```bash
   curl -I https://serrurier-hermes.com
   # Doit retourner: HTTP/2 200
   ```

2. **Dans votre navigateur** (navigation privée):
   - https://serrurier-hermes.com
   - https://www.serrurier-hermes.com

3. **Vider le cache navigateur**:
   - Chrome: `Cmd/Ctrl + Shift + R`
   - Ou allez dans: `chrome://net-internals/#hsts` et supprimez le domaine

---

## 🚨 Si l'erreur persiste

### Option 1: Vérifier les logs

```bash
sudo tail -50 /var/log/nginx/serrurier-hermes.error.log
```

### Option 2: Vérifier que le port 443 est ouvert

```bash
sudo netstat -tlnp | grep :443
```

Doit montrer que Nginx écoute sur le port 443.

### Option 3: Regénérer le certificat SSL

```bash
sudo certbot --nginx -d serrurier-hermes.com -d www.serrurier-hermes.com --force-renewal
```

### Option 4: Vérifier les DNS

```bash
dig serrurier-hermes.com +short
```

Doit retourner: `176.31.163.195`

---

## 📋 Problèmes Courants

### Problème: "Protocol options redefined"

**Cause**: Plusieurs sites Nginx ont des configurations SSL conflictuelles.

**Solution**: Le script `fix-ssl.sh` utilise des paramètres SSL standards qui ne créent pas de conflits.

### Problème: Certificat non trouvé

**Cause**: Les chemins vers les certificats sont incorrects.

**Solution**: Le script utilise les chemins Let's Encrypt standards:
- `/etc/letsencrypt/live/serrurier-hermes.com/fullchain.pem`
- `/etc/letsencrypt/live/serrurier-hermes.com/privkey.pem`

### Problème: Cache navigateur

**Cause**: Le navigateur a mis en cache l'ancienne erreur SSL.

**Solution**:
1. Testez en **navigation privée**
2. Videz le cache HSTS:
   - Chrome: `chrome://net-internals/#hsts`
   - Entrez: `serrurier-hermes.com`
   - Cliquez "Delete"

---

## 🆘 Besoin d'aide ?

Consultez le guide complet: `docs/FIX_ERR_SSL_PROTOCOL_ERROR.md`

Ou exécutez le diagnostic et partagez la sortie:

```bash
./diagnose-ssl.sh > diagnostic.txt
cat diagnostic.txt
```

---

## 📞 Commandes Utiles

```bash
# Recharger Nginx
sudo systemctl reload nginx

# Redémarrer Nginx complètement
sudo systemctl restart nginx

# Tester la config Nginx
sudo nginx -t

# Voir le statut Nginx
sudo systemctl status nginx

# Logs en temps réel
sudo tail -f /var/log/nginx/serrurier-hermes.error.log
```

---

**Serveur**: ubuntu@176.31.163.195  
**Domaine**: serrurier-hermes.com  
**Date**: 14 janvier 2026
