#!/usr/bin/env node

/**
 * Script pour générer les pages index.html des villes principales
 * en utilisant le composant CityPageTemplate.
 * 
 * Next.js avec output:export ne génère pas automatiquement les index.html
 * pour les pages dynamiques, donc on doit créer une page HTML statique
 * qui charge la page React côté client.
 */

const fs = require('fs');
const path = require('path');

// Import des données de configuration
const siteConfigPath = path.join(__dirname, '..', 'config', 'site.ts');
const configContent = fs.readFileSync(siteConfigPath, 'utf8');

// Parser manuellement les zones depuis le fichier config
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

// Extraire toutes les zones
const parisZones = extractZones(configContent, 'zonesParisArrondissements');
const idfZones = extractZones(configContent, 'zonesIDF');
const bordeauxZones = extractZones(configContent, 'zonesBordeaux');
const montpellierZones = extractZones(configContent, 'zonesMontpellier');

const allZones = [...parisZones, ...idfZones, ...bordeauxZones, ...montpellierZones];

console.log(`📋 Zones à traiter: ${allZones.length}\n`);

// Répertoires
const outDir = path.join(__dirname, '..', 'out');

// Utiliser une vraie page zone comme template (par exemple Paris 1er)
const zoneTemplatePath = path.join(outDir, 'zones', 'paris-1', 'index.html');

// Vérifier que le template de zone existe
if (!fs.existsSync(zoneTemplatePath)) {
  console.error('❌ Template zone non trouvé:', zoneTemplatePath);
  console.error('   Essayons de construire un template HTML minimal...');
  
  // Template HTML minimal qui redirige vers la première page de service
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
  
  // Générer des redirections
  let successCount = 0;
  allZones.forEach(zone => {
    const cityDir = path.join(outDir, `serrurier-${zone.slug}`);
    const cityIndexPath = path.join(cityDir, 'index.html');
    
    if (!fs.existsSync(cityDir)) {
      fs.mkdirSync(cityDir, { recursive: true });
    }
    
    const html = generateRedirectHTML(zone.slug, zone.name);
    fs.writeFileSync(cityIndexPath, html, 'utf8');
    console.log(`✅ ${zone.name.padEnd(30)} → Redirection créée`);
    successCount++;
  });
  
  console.log(`\n🎉 ${successCount} pages de redirection générées`);
  process.exit(0);
}

console.log(`✅ Template trouvé: ${zoneTemplatePath}\n`);

// Lire le contenu du template
const templateContent = fs.readFileSync(zoneTemplatePath, 'utf8');

// Copier et personnaliser pour chaque zone
let successCount = 0;
let errorCount = 0;

allZones.forEach(zone => {
  const cityDir = path.join(outDir, `serrurier-${zone.slug}`);
  const cityIndexPath = path.join(cityDir, 'index.html');
  
  // NE PAS écraser les pages générées par Next.js !
  // Si la page existe déjà, on la garde telle quelle
  if (fs.existsSync(cityIndexPath)) {
    console.log(`✅ ${zone.name.padEnd(30)} → ${cityIndexPath} (déjà généré par Next.js)`);
    successCount++;
    return;
  }
  
  // Créer le dossier s'il n'existe pas
  if (!fs.existsSync(cityDir)) {
    fs.mkdirSync(cityDir, { recursive: true });
  }
  
  try {
    // Seulement créer si la page n'existe pas encore
    fs.writeFileSync(cityIndexPath, templateContent, 'utf8');
    console.log(`✅ ${zone.name.padEnd(30)} → ${cityIndexPath} (créé depuis template)`);
    successCount++;
  } catch (error) {
    console.error(`❌ Erreur pour ${zone.name}:`, error.message);
    errorCount++;
  }
});

console.log(`\n🎉 Génération terminée !`);
console.log(`   ✅ Succès: ${successCount} pages`);
if (errorCount > 0) {
  console.log(`   ❌ Erreurs: ${errorCount} pages`);
  process.exit(1);
}
