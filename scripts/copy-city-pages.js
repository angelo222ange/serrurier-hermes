#!/usr/bin/env node

/*
 * Script pour créer des pages de redirection pour les villes.
 * 
 * Next.js avec output:export ne génère pas correctement les pages
 * dynamiques /serrurier-[city]/, donc on crée des redirections
 * vers la première page service (ouverture-de-porte).
 */

const fs = require('fs');
const path = require('path');

// Import des zones depuis la configuration
const configPath = path.join(__dirname, '..', 'config', 'site.ts');
const configContent = fs.readFileSync(configPath, 'utf8');

// Parser les zones
const extractZones = (content, constName) => {
  const regex = new RegExp(`export const ${constName} = \\[([\\s\\S]*?)\\] as const;`);
  const match = content.match(regex);
  if (!match) return [];
  
  const zonesBlock = match[1];
  const zones = [];
  const lineRegex = /\{ name: "([^"]+)", slug: "([^"]+)"/g;
  let lineMatch;
  
  while ((lineMatch = lineRegex.exec(zonesBlock)) !== null) {
    zones.push({
      name: lineMatch[1],
      slug: lineMatch[2]
    });
  }
  
  return zones;
};

const parisZones = extractZones(configContent, 'zonesParisArrondissements');
const idfZones = extractZones(configContent, 'zonesIDF');
const bordeauxZones = extractZones(configContent, 'zonesBordeaux');
const montpellierZones = extractZones(configContent, 'zonesMontpellier');

const allZones = [...parisZones, ...idfZones, ...bordeauxZones, ...montpellierZones];

console.log(`📋 Zones à traiter: ${allZones.length}\n`);

// Chemins
const outPath = path.join(__dirname, '..', 'out');

// Générer une page HTML de redirection
const generateRedirectHTML = (citySlug, cityName) => {
  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="refresh" content="0;url=/serrurier-${citySlug}/ouverture-de-porte/">
  <title>Serrurier ${cityName} - Chargement...</title>
  <link rel="canonical" href="/serrurier-${citySlug}/ouverture-de-porte/">
</head>
<body>
  <p>Redirection vers <a href="/serrurier-${citySlug}/ouverture-de-porte/">Serrurier ${cityName}</a>...</p>
  <script>
    window.location.href = '/serrurier-${citySlug}/ouverture-de-porte/';
  </script>
</body>
</html>`;
};

let successCount = 0;
let errorCount = 0;

// Créer pour chaque zone
allZones.forEach(zone => {
  const cityDir = path.join(outPath, `serrurier-${zone.slug}`);
  const indexPath = path.join(cityDir, 'index.html');
  
  try {
    // Créer le dossier s'il n'existe pas
    if (!fs.existsSync(cityDir)) {
      fs.mkdirSync(cityDir, { recursive: true });
    }
    
    // Générer la page HTML de redirection
    const html = generateRedirectHTML(zone.slug, zone.name);
    fs.writeFileSync(indexPath, html, 'utf8');
    console.log(`✅ ${zone.name.padEnd(30)} → Redirection vers ouverture-de-porte`);
    successCount++;
  } catch (error) {
    console.error(`❌ Erreur pour ${zone.name}:`, error.message);
    errorCount++;
  }
});

console.log(`\n🎉 Génération terminée !`);
console.log(`   ✅ Succès: ${successCount} pages de redirection`);
if (errorCount > 0) {
  console.log(`   ❌ Erreurs: ${errorCount} pages`);
  process.exit(1);
}
