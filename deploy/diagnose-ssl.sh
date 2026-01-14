#!/bin/bash

# ═══════════════════════════════════════════════════════════════════════════
# DIAGNOSTIC SSL - SERRURIER-HERMES.COM
# ═══════════════════════════════════════════════════════════════════════════

echo "════════════════════════════════════════"
echo "🔍 DIAGNOSTIC SSL COMPLET"
echo "════════════════════════════════════════"
echo ""

# 1. Vérifier que le port 443 écoute
echo "1️⃣  Vérification du port 443..."
sudo netstat -tlnp | grep :443 || ss -tlnp | grep :443
echo ""

# 2. Vérifier la configuration Nginx
echo "2️⃣  Vérification configuration Nginx..."
sudo nginx -t
echo ""

# 3. Voir la configuration complète du site
echo "3️⃣  Configuration serrurier-hermes..."
cat /etc/nginx/sites-enabled/serrurier-hermes
echo ""

# 4. Vérifier le certificat SSL
echo "4️⃣  Vérification certificat SSL..."
sudo ls -la /etc/letsencrypt/live/serrurier-hermes.com/
echo ""

# 5. Vérifier les détails du certificat
echo "5️⃣  Détails du certificat..."
sudo openssl x509 -in /etc/letsencrypt/live/serrurier-hermes.com/fullchain.pem -text -noout | grep -E "(Subject:|Issuer:|Not After)"
echo ""

# 6. Tester la connexion SSL
echo "6️⃣  Test connexion SSL..."
echo | openssl s_client -connect serrurier-hermes.com:443 -servername serrurier-hermes.com 2>/dev/null | grep -E "(subject=|issuer=|Verify return code)"
echo ""

# 7. Vérifier les logs d'erreurs récents
echo "7️⃣  Dernières erreurs Nginx..."
sudo tail -20 /var/log/nginx/serrurier-hermes.error.log 2>/dev/null || echo "Pas de fichier d'erreur trouvé"
echo ""

# 8. Vérifier le status Nginx
echo "8️⃣  Status Nginx..."
sudo systemctl status nginx --no-pager | head -20
echo ""

# 9. Compter les configurations SSL sur le même port
echo "9️⃣  Conflits potentiels sur le port 443..."
sudo grep -r "listen.*443" /etc/nginx/sites-enabled/ | wc -l
echo "Nombre de configurations écoutant sur le port 443"
echo ""

# 10. Vérifier les directives SSL conflictuelles
echo "🔟 Vérification des ssl_protocols dans toutes les configs..."
sudo grep -r "ssl_protocols" /etc/nginx/sites-enabled/ | head -10
echo ""

echo "════════════════════════════════════════"
echo "✅ DIAGNOSTIC TERMINÉ"
echo "════════════════════════════════════════"
