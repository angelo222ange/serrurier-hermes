#!/usr/bin/env node
/**
 * ═══════════════════════════════════════════════════════════════════════════
 * GÉNÉRATEUR DE SITEMAP - Serrurier Hermès
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Génère automatiquement le sitemap.xml à partir des zones configurées.
 * Usage: node scripts/generate-sitemap.js
 */

const fs = require('fs');
const path = require('path');

const DOMAIN = 'https://serrurier-hermes.com';
const TODAY = new Date().toISOString().split('T')[0];

// Zones Paris (20 arrondissements)
const zonesParisArrondissements = [
  { slug: 'paris-1' }, { slug: 'paris-2' }, { slug: 'paris-3' }, { slug: 'paris-4' },
  { slug: 'paris-5' }, { slug: 'paris-6' }, { slug: 'paris-7' }, { slug: 'paris-8' },
  { slug: 'paris-9' }, { slug: 'paris-10' }, { slug: 'paris-11' }, { slug: 'paris-12' },
  { slug: 'paris-13' }, { slug: 'paris-14' }, { slug: 'paris-15' }, { slug: 'paris-16' },
  { slug: 'paris-17' }, { slug: 'paris-18' }, { slug: 'paris-19' }, { slug: 'paris-20' },
];

// Zones IDF
const zonesIDF = [
  { slug: 'boulogne-billancourt' }, { slug: 'montreuil' }, { slug: 'saint-denis' },
  { slug: 'argenteuil' }, { slug: 'versailles' }, { slug: 'nanterre' },
  { slug: 'creteil' }, { slug: 'vitry-sur-seine' }, { slug: 'colombes' },
  { slug: 'asnieres-sur-seine' },
];

// Zones Bordeaux
const zonesBordeaux = [
  { slug: 'bordeaux' }, { slug: 'merignac' }, { slug: 'pessac' },
  { slug: 'talence' }, { slug: 'begles' }, { slug: 'villenave-d-ornon' },
  { slug: 'le-bouscat' }, { slug: 'gradignan' }, { slug: 'cenon' },
  { slug: 'lormont' }, { slug: 'floirac' }, { slug: 'blanquefort' },
];

// Zones Montpellier
const zonesMontpellier = [
  { slug: 'montpellier' }, { slug: 'lattes' }, { slug: 'castelnau-le-lez' },
  { slug: 'juvignac' }, { slug: 'le-cres' }, { slug: 'perols' },
  { slug: 'mauguio' }, { slug: 'grabels' }, { slug: 'saint-jean-de-vedas' },
  { slug: 'villeneuve-les-maguelone' },
];

// Services
const services = [
  'ouverture-de-porte',
  'changement-serrure',
  'depannage',
  'blindage-porte',
  'remplacement-cylindre',
  'installation-serrure',
];

// Toutes les zones
const allZones = [
  ...zonesParisArrondissements,
  ...zonesIDF,
  ...zonesBordeaux,
  ...zonesMontpellier,
];

function generateUrl(loc, priority = '0.8', changefreq = 'weekly') {
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

function generateSitemap() {
  const urls = [];

  // Page d'accueil - homepage générique (priorité maximale)
  urls.push(generateUrl(`${DOMAIN}/`, '1.0', 'daily'));
  
  // Pages principales des régions (haute priorité)
  urls.push(generateUrl(`${DOMAIN}/serrurier-paris/`, '0.95', 'daily'));
  urls.push(generateUrl(`${DOMAIN}/serrurier-bordeaux/`, '0.95', 'daily'));
  urls.push(generateUrl(`${DOMAIN}/serrurier-montpellier/`, '0.95', 'daily'));
  
  // Pages statiques
  urls.push(generateUrl(`${DOMAIN}/contact/`, '0.6'));
  urls.push(generateUrl(`${DOMAIN}/tarifs/`, '0.7'));
  urls.push(generateUrl(`${DOMAIN}/zones/`, '0.7'));
  urls.push(generateUrl(`${DOMAIN}/depannage/`, '0.8'));
  urls.push(generateUrl(`${DOMAIN}/installation/`, '0.8'));

  // Pages services principales
  services.forEach(service => {
    urls.push(generateUrl(`${DOMAIN}/${service}/`, '0.9'));
  });

  // Pages villes (serrurier-[city])
  allZones.forEach(zone => {
    // Éviter les doublons pour les pages principales des régions (déjà ajoutées)
    if (zone.slug !== 'paris' && zone.slug !== 'bordeaux' && zone.slug !== 'montpellier') {
      urls.push(generateUrl(`${DOMAIN}/serrurier-${zone.slug}/`, '0.9'));
    }
  });

  // Pages services par ville (serrurier-[city]/[service])
  allZones.forEach(zone => {
    services.forEach(service => {
      urls.push(generateUrl(`${DOMAIN}/serrurier-${zone.slug}/${service}/`, '0.8'));
    });
  });

  // Pages zones secondaires
  allZones.forEach(zone => {
    urls.push(generateUrl(`${DOMAIN}/zones/${zone.slug}/`, '0.7'));
  });

  // Pages services par zone (/[service]/[zone])
  allZones.forEach(zone => {
    services.forEach(service => {
      urls.push(generateUrl(`${DOMAIN}/${service}/${zone.slug}/`, '0.7'));
    });
  });

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;

  return sitemap;
}

// Générer et écrire le fichier
const sitemap = generateSitemap();
const outputPath = path.join(__dirname, '../public/sitemap.xml');
fs.writeFileSync(outputPath, sitemap, 'utf8');

console.log('✅ Sitemap généré avec succès !');
console.log(`📄 ${outputPath}`);
console.log(`📊 Nombre d'URLs: ${(sitemap.match(/<url>/g) || []).length}`);
