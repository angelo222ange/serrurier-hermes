#!/bin/bash

# Script de test des URLs Bordeaux après déploiement
# Usage: ./scripts/test-bordeaux-urls.sh [domain]

DOMAIN="${1:-https://www.serrurier-hermes.com}"

echo "╔══════════════════════════════════════════════════════════════════════════════╗"
echo "║                    TEST DES URLS BORDEAUX - Serrurier Hermès                ║"
echo "╚══════════════════════════════════════════════════════════════════════════════╝"
echo ""
echo "🌐 Domaine : $DOMAIN"
echo ""

# Fonction pour tester une URL
test_url() {
    local url="$1"
    local full_url="${DOMAIN}${url}"
    
    # Utiliser curl pour obtenir le code HTTP
    http_code=$(curl -s -o /dev/null -w "%{http_code}" "$full_url" 2>/dev/null)
    
    if [ "$http_code" = "200" ]; then
        echo "✅ $url → HTTP $http_code"
        return 0
    elif [ "$http_code" = "000" ]; then
        echo "❌ $url → Connexion impossible"
        return 1
    else
        echo "❌ $url → HTTP $http_code"
        return 1
    fi
}

# Compteurs
total=0
success=0
failed=0

echo "───────────────────────────────────────────────────────────────────────────────"
echo "📍 PAGES PRINCIPALES BORDEAUX"
echo "───────────────────────────────────────────────────────────────────────────────"

urls_main=(
    "/serrurier-bordeaux/"
    "/serrurier-bordeaux/contact/"
)

for url in "${urls_main[@]}"; do
    ((total++))
    if test_url "$url"; then
        ((success++))
    else
        ((failed++))
    fi
done

echo ""
echo "───────────────────────────────────────────────────────────────────────────────"
echo "🔧 PAGES SERVICES BORDEAUX"
echo "───────────────────────────────────────────────────────────────────────────────"

urls_services=(
    "/serrurier-bordeaux/depannage/"
    "/serrurier-bordeaux/ouverture-de-porte/"
    "/serrurier-bordeaux/changement-serrure/"
    "/serrurier-bordeaux/installation-serrure/"
    "/serrurier-bordeaux/blindage-porte/"
    "/serrurier-bordeaux/remplacement-cylindre/"
)

for url in "${urls_services[@]}"; do
    ((total++))
    if test_url "$url"; then
        ((success++))
    else
        ((failed++))
    fi
done

echo ""
echo "───────────────────────────────────────────────────────────────────────────────"
echo "🏙️  AUTRES ZONES BORDEAUX"
echo "───────────────────────────────────────────────────────────────────────────────"

urls_zones=(
    "/serrurier-merignac/"
    "/serrurier-merignac/contact/"
    "/serrurier-pessac/depannage/"
    "/serrurier-talence/ouverture-de-porte/"
    "/serrurier-begles/contact/"
)

for url in "${urls_zones[@]}"; do
    ((total++))
    if test_url "$url"; then
        ((success++))
    else
        ((failed++))
    fi
done

echo ""
echo "───────────────────────────────────────────────────────────────────────────────"
echo "🌍 PARIS & MONTPELLIER"
echo "───────────────────────────────────────────────────────────────────────────────"

urls_other=(
    "/serrurier-paris/contact/"
    "/serrurier-montpellier/contact/"
    "/serrurier-paris-1/contact/"
    "/serrurier-lattes/depannage/"
)

for url in "${urls_other[@]}"; do
    ((total++))
    if test_url "$url"; then
        ((success++))
    else
        ((failed++))
    fi
done

echo ""
echo "╔══════════════════════════════════════════════════════════════════════════════╗"
echo "║                              RÉSULTATS FINAUX                                ║"
echo "╚══════════════════════════════════════════════════════════════════════════════╝"
echo ""
echo "📊 Total testé    : $total URLs"
echo "✅ Succès         : $success URLs"
echo "❌ Échecs         : $failed URLs"

if [ $failed -eq 0 ]; then
    echo ""
    echo "🎉 Tous les tests sont passés ! Le site est opérationnel."
    exit 0
else
    echo ""
    echo "⚠️  $failed URL(s) retournent des erreurs."
    echo "   Veuillez vérifier le build et le déploiement."
    exit 1
fi
