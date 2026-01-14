#!/bin/bash

# ═══════════════════════════════════════════════════════════════════════════
# FIX SSL PROTOCOL ERROR - SERRURIER-HERMES.COM
# ═══════════════════════════════════════════════════════════════════════════

set -e

echo "════════════════════════════════════════"
echo "🔧 FIX SSL PROTOCOL ERROR"
echo "════════════════════════════════════════"
echo ""

DOMAIN="serrurier-hermes.com"
CONFIG_FILE="/etc/nginx/sites-available/serrurier-hermes"

# Backup de la config actuelle
echo "📦 Sauvegarde de la configuration actuelle..."
sudo cp $CONFIG_FILE ${CONFIG_FILE}.backup.$(date +%Y%m%d_%H%M%S)

# Créer une nouvelle configuration propre
echo "📝 Création d'une nouvelle configuration..."
sudo tee $CONFIG_FILE > /dev/null << 'EOF'
# HTTP - Redirection vers HTTPS
server {
    listen 80;
    listen [::]:80;
    server_name serrurier-hermes.com www.serrurier-hermes.com;

    # Redirection vers HTTPS
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
    ssl_trusted_certificate /etc/letsencrypt/live/serrurier-hermes.com/chain.pem;

    # Configuration SSL moderne
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers 'ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384';
    ssl_prefer_server_ciphers off;
    ssl_session_timeout 1d;
    ssl_session_cache shared:MozSSL:10m;
    ssl_session_tickets off;
    
    # OCSP Stapling
    ssl_stapling on;
    ssl_stapling_verify on;

    # HSTS
    add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload" always;

    # Root et index
    root /var/www/serrurier-hermes;
    index index.html;

    # Logs
    access_log /var/log/nginx/serrurier-hermes.access.log;
    error_log /var/log/nginx/serrurier-hermes.error.log;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied expired no-cache no-store private auth;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/javascript application/json image/svg+xml;
    gzip_disable "msie6";

    # Cache statique
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|webp|woff|woff2|ttf|svg|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }

    # Pages HTML
    location / {
        try_files $uri $uri/ $uri.html $uri/index.html /index.html;
    }

    # Sécurité headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    
    # Bloquer l'accès aux fichiers cachés
    location ~ /\. {
        deny all;
        access_log off;
        log_not_found off;
    }
}
EOF

echo "✅ Configuration créée"
echo ""

# Vérifier la syntaxe
echo "🔍 Test de la configuration..."
sudo nginx -t

if [ $? -eq 0 ]; then
    echo "✅ Configuration valide"
    echo ""
    
    # Recharger Nginx
    echo "🔄 Rechargement de Nginx..."
    sudo systemctl reload nginx
    
    echo "✅ Nginx rechargé"
    echo ""
    
    # Test de la connexion SSL
    echo "🔐 Test de connexion SSL..."
    sleep 2
    echo | openssl s_client -connect serrurier-hermes.com:443 -servername serrurier-hermes.com 2>/dev/null | grep -E "(subject=|issuer=|Verify return code)"
    echo ""
    
    echo "════════════════════════════════════════"
    echo "✅ CORRECTION TERMINÉE !"
    echo ""
    echo "🔗 Testez: https://serrurier-hermes.com"
    echo "🔗 Testez: https://www.serrurier-hermes.com"
    echo ""
    echo "Si l'erreur persiste:"
    echo "1. Videz le cache de votre navigateur"
    echo "2. Testez en navigation privée"
    echo "3. Testez depuis un autre appareil"
    echo "════════════════════════════════════════"
else
    echo "❌ Erreur dans la configuration"
    echo "Restauration de l'ancienne configuration..."
    sudo cp ${CONFIG_FILE}.backup.$(date +%Y%m%d)* $CONFIG_FILE
    sudo systemctl reload nginx
fi
