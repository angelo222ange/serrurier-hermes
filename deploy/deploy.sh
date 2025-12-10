#!/bin/bash

# ═══════════════════════════════════════════════════════════════════════════
# SCRIPT DE DÉPLOIEMENT - SERRURIER TEMPLATE
# ═══════════════════════════════════════════════════════════════════════════
#
# Usage : ./deploy.sh
#
# Ce script :
# 1. Build le site Next.js (export statique)
# 2. Copie les fichiers sur le VPS via rsync
# 3. Configure Nginx si nécessaire
#
# ═══════════════════════════════════════════════════════════════════════════

set -e  # Arrêter en cas d'erreur

# ─────────────────────────────────────────────────────────────────────────────
# CONFIGURATION - À MODIFIER
# ─────────────────────────────────────────────────────────────────────────────

DOMAIN="serrurier-lille-59.fr"        # Votre domaine
VPS_USER="root"                        # Utilisateur SSH du VPS
VPS_HOST="123.456.789.0"              # IP ou hostname du VPS
VPS_PATH="/var/www/${DOMAIN}"         # Chemin sur le VPS

# ─────────────────────────────────────────────────────────────────────────────
# COULEURS
# ─────────────────────────────────────────────────────────────────────────────

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# ─────────────────────────────────────────────────────────────────────────────
# FONCTIONS
# ─────────────────────────────────────────────────────────────────────────────

log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# ─────────────────────────────────────────────────────────────────────────────
# VÉRIFICATIONS
# ─────────────────────────────────────────────────────────────────────────────

echo ""
echo "═══════════════════════════════════════════════════════════════════════════"
echo "  DÉPLOIEMENT - ${DOMAIN}"
echo "═══════════════════════════════════════════════════════════════════════════"
echo ""

# Vérifier qu'on est dans le bon dossier
if [ ! -f "package.json" ]; then
    log_error "Ce script doit être exécuté depuis la racine du projet"
    exit 1
fi

# Vérifier que les variables sont configurées
if [ "$VPS_HOST" == "123.456.789.0" ]; then
    log_error "Veuillez configurer VPS_HOST dans ce script"
    exit 1
fi

# ─────────────────────────────────────────────────────────────────────────────
# ÉTAPE 1 : BUILD
# ─────────────────────────────────────────────────────────────────────────────

log_info "Étape 1/3 : Build du site..."

npm run build

if [ ! -d "out" ]; then
    log_error "Le dossier 'out' n'existe pas. Le build a échoué."
    exit 1
fi

log_success "Build terminé"

# ─────────────────────────────────────────────────────────────────────────────
# ÉTAPE 2 : UPLOAD
# ─────────────────────────────────────────────────────────────────────────────

log_info "Étape 2/3 : Upload des fichiers vers ${VPS_HOST}..."

# Créer le dossier sur le VPS si nécessaire
ssh ${VPS_USER}@${VPS_HOST} "mkdir -p ${VPS_PATH}"

# Synchroniser les fichiers
rsync -avz --delete \
    --exclude '.git' \
    --exclude 'node_modules' \
    --exclude '.next' \
    out/ ${VPS_USER}@${VPS_HOST}:${VPS_PATH}/out/

log_success "Upload terminé"

# ─────────────────────────────────────────────────────────────────────────────
# ÉTAPE 3 : CONFIGURATION NGINX (optionnel)
# ─────────────────────────────────────────────────────────────────────────────

log_info "Étape 3/3 : Vérification de la configuration Nginx..."

# Vérifier si la config Nginx existe
NGINX_CONFIG="/etc/nginx/sites-available/${DOMAIN}.conf"
NGINX_EXISTS=$(ssh ${VPS_USER}@${VPS_HOST} "test -f ${NGINX_CONFIG} && echo 'yes' || echo 'no'")

if [ "$NGINX_EXISTS" == "no" ]; then
    log_warning "Configuration Nginx non trouvée"
    echo ""
    echo "Pour configurer Nginx :"
    echo "1. Copiez deploy/nginx.conf sur le VPS"
    echo "2. Remplacez DOMAIN par ${DOMAIN}"
    echo "3. Placez le fichier dans /etc/nginx/sites-available/${DOMAIN}.conf"
    echo "4. Créez le lien : ln -s /etc/nginx/sites-available/${DOMAIN}.conf /etc/nginx/sites-enabled/"
    echo "5. Rechargez Nginx : systemctl reload nginx"
    echo ""
else
    log_success "Configuration Nginx trouvée"
    
    # Recharger Nginx
    ssh ${VPS_USER}@${VPS_HOST} "nginx -t && systemctl reload nginx"
    log_success "Nginx rechargé"
fi

# ─────────────────────────────────────────────────────────────────────────────
# FIN
# ─────────────────────────────────────────────────────────────────────────────

echo ""
echo "═══════════════════════════════════════════════════════════════════════════"
echo -e "  ${GREEN}✓ DÉPLOIEMENT TERMINÉ${NC}"
echo "═══════════════════════════════════════════════════════════════════════════"
echo ""
echo "  URL : https://${DOMAIN}"
echo ""

