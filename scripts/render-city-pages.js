#!/usr/bin/env node

/*
 * Script pour générer les pages HTML statiques des villes
 * 
 * Génère du HTML pur avec Tailwind CSS pour chaque ville
 * sans dépendance React côté client.
 */

const fs = require('fs');
const path = require('path');

// Import de la configuration
const configPath = path.join(__dirname, '..', 'config', 'site.ts');
const configContent = fs.readFileSync(configPath, 'utf8');

// Parser les zones
const extractZones = (content, constName) => {
  const regex = new RegExp(`export const ${constName} = \\[([\\s\\S]*?)\\] as const;`);
  const match = content.match(regex);
  if (!match) return [];
  
  const zonesBlock = match[1];
  const zones = [];
  // Regex simplifiée qui capture name, slug, postalCode et ignore le reste
  const lineRegex = /\{\s*name:\s*"([^"]+)",\s*slug:\s*"([^"]+)",\s*postalCode:\s*"([^"]+)"[^}]*time:\s*"([^"]+)"[^}]*\}/g;
  let lineMatch;
  
  while ((lineMatch = lineRegex.exec(zonesBlock)) !== null) {
    zones.push({
      name: lineMatch[1],
      slug: lineMatch[2],
      postalCode: lineMatch[3],
      time: lineMatch[4] || "20 min"
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

const outPath = path.join(__dirname, '..', 'out');

// Fonction pour déterminer la région d'une ville
const getRegion = (slug) => {
  if (parisZones.some(z => z.slug === slug) || idfZones.some(z => z.slug === slug)) {
    return { 
      key: 'paris', 
      phone: '01 85 09 97 74', 
      phoneLink: 'tel:+33185099774',
      colors: { primary: '#1E3A5F', secondary: '#C9A227', accent: '#F97316' }
    };
  }
  if (bordeauxZones.some(z => z.slug === slug)) {
    return { 
      key: 'bordeaux', 
      phone: '05 35 54 30 26', 
      phoneLink: 'tel:+33535543026',
      colors: { primary: '#722F37', secondary: '#D4A574', accent: '#F97316' }
    };
  }
  if (montpellierZones.some(z => z.slug === slug)) {
    return { 
      key: 'montpellier', 
      phone: '04 11 93 91 40', 
      phoneLink: 'tel:+33411939140',
      colors: { primary: '#0EA5E9', secondary: '#FBBF24', accent: '#F97316' }
    };
  }
  return { 
    key: 'paris', 
    phone: '01 85 09 97 74', 
    phoneLink: 'tel:+33185099774',
    colors: { primary: '#1E3A5F', secondary: '#C9A227', accent: '#F97316' }
  };
};

// Générer une page HTML statique complète avec Tailwind
const generateStaticHTML = (zone) => {
  const region = getRegion(zone.slug);
  
  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Serrurier ${zone.name} 24h/24 - 20 min | Hermès</title>
  <meta name="description" content="Serrurier ${zone.name} disponible 24h/24. Intervention 20 min. Ouverture porte dès 69€. Devis gratuit ☎️ ${region.phone}">
  <meta name="robots" content="index, follow">
  <meta name="format-detection" content="telephone=yes">
  <link rel="canonical" href="https://serrurier-hermes.com/serrurier-${zone.slug}/">
  <link rel="icon" href="/images/logo-favicon-serrurier-hermes.webp" type="image/webp">
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    :root {
      --color-primary: ${region.colors.primary};
      --color-secondary: ${region.colors.secondary};
      --color-accent: ${region.colors.accent};
    }
  </style>
</head>
<body class="antialiased">
  <!-- Header -->
  <header class="bg-white shadow-md sticky top-0 z-50">
    <div class="container mx-auto px-4 py-4 flex justify-between items-center">
      <div class="flex items-center">
        <img src="/images/logos/serrurier-hermes-logo.webp" alt="Serrurier Hermès" class="h-12 mr-3">
        <div>
          <h2 class="font-bold text-xl" style="color: var(--color-primary)">Serrurier Hermès</h2>
          <p class="text-sm text-gray-600">${zone.name}</p>
        </div>
      </div>
      <a href="${region.phoneLink}" class="px-6 py-3 rounded-lg font-bold text-white hover:opacity-90 transition" style="background-color: var(--color-accent)">
        ☎️ ${region.phone}
      </a>
    </div>
  </header>

  <!-- Hero Section -->
  <section class="py-20 text-white" style="background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%)">
    <div class="container mx-auto px-4 text-center">
      <h1 class="text-4xl md:text-5xl font-bold mb-6">
        Serrurier à ${zone.name} - Dépannage 24h/24
      </h1>
      <p class="text-xl mb-8 max-w-3xl mx-auto">
        Intervention rapide en ${zone.time} à ${zone.name} (${zone.postalCode}). Service 24h/24, 7j/7. Devis gratuit par téléphone.
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <a href="${region.phoneLink}" class="inline-block px-8 py-4 rounded-lg text-xl font-bold text-white hover:opacity-90 transition" style="background-color: var(--color-accent)">
          ☎️ Appelez maintenant
        </a>
        <a href="/serrurier-${zone.slug}/ouverture-de-porte/" class="inline-block bg-white hover:bg-gray-100 px-8 py-4 rounded-lg text-xl font-bold transition" style="color: var(--color-primary)">
          Nos Services
        </a>
      </div>
    </div>
  </section>

  <!-- Services Section -->
  <section class="py-16 bg-gray-50">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold text-center mb-12" style="color: var(--color-primary)">Nos Services de Serrurerie</h2>
      <div class="grid md:grid-cols-3 gap-8">
        <a href="/serrurier-${zone.slug}/ouverture-de-porte/" class="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition">
          <div class="text-4xl mb-4">🔓</div>
          <h3 class="text-xl font-bold mb-3" style="color: var(--color-primary)">Ouverture de Porte</h3>
          <p class="text-gray-600 mb-4">Porte claquée ou fermée à clé ? Intervention rapide sans casse si possible.</p>
          <p class="font-bold text-xl" style="color: var(--color-accent)">Dès 69€</p>
        </a>
        <a href="/serrurier-${zone.slug}/changement-serrure/" class="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition">
          <div class="text-4xl mb-4">🔐</div>
          <h3 class="text-xl font-bold mb-3" style="color: var(--color-primary)">Changement de Serrure</h3>
          <p class="text-gray-600 mb-4">Installation de serrures sécurisées, cylindres certifiés A2P.</p>
          <p class="font-bold text-xl" style="color: var(--color-accent)">Dès 89€</p>
        </a>
        <a href="/serrurier-${zone.slug}/depannage/" class="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition">
          <div class="text-4xl mb-4">🚨</div>
          <h3 class="text-xl font-bold mb-3" style="color: var(--color-primary)">Dépannage Urgent</h3>
          <p class="text-gray-600 mb-4">Problème de serrure ? Intervention d'urgence 24h/24, 7j/7.</p>
          <p class="font-bold text-xl" style="color: var(--color-accent)">Dès 59€</p>
        </a>
      </div>
      <div class="grid md:grid-cols-3 gap-8 mt-8">
        <a href="/serrurier-${zone.slug}/installation-serrure/" class="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition">
          <div class="text-4xl mb-4">🔧</div>
          <h3 class="text-xl font-bold mb-3" style="color: var(--color-primary)">Installation Serrure</h3>
          <p class="text-gray-600 mb-4">Pose de serrures neuves, multipoints, blindées.</p>
          <p class="font-bold text-xl" style="color: var(--color-accent)">Dès 119€</p>
        </a>
        <a href="/serrurier-${zone.slug}/blindage-porte/" class="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition">
          <div class="text-4xl mb-4">🛡️</div>
          <h3 class="text-xl font-bold mb-3" style="color: var(--color-primary)">Blindage de Porte</h3>
          <p class="text-gray-600 mb-4">Renforcement de porte, installation porte blindée.</p>
          <p class="font-bold text-xl" style="color: var(--color-accent)">Dès 890€</p>
        </a>
        <a href="/serrurier-${zone.slug}/remplacement-cylindre/" class="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition">
          <div class="text-4xl mb-4">🔑</div>
          <h3 class="text-xl font-bold mb-3" style="color: var(--color-primary)">Remplacement Cylindre</h3>
          <p class="text-gray-600 mb-4">Changement de cylindre, copie de clés sécurisées.</p>
          <p class="font-bold text-xl" style="color: var(--color-accent)">Dès 79€</p>
        </a>
      </div>
    </div>
  </section>

  <!-- Why Us Section -->
  <section class="py-16 bg-white">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold text-center mb-12" style="color: var(--color-primary)">Pourquoi Choisir Serrurier Hermès à ${zone.name} ?</h2>
      <div class="grid md:grid-cols-4 gap-8">
        <div class="text-center">
          <div class="text-5xl mb-4">⚡</div>
          <h3 class="font-bold text-lg mb-2" style="color: var(--color-primary)">Intervention Rapide</h3>
          <p class="text-gray-600">Sur place en ${zone.time}</p>
        </div>
        <div class="text-center">
          <div class="text-5xl mb-4">🕐</div>
          <h3 class="font-bold text-lg mb-2" style="color: var(--color-primary)">Disponible 24h/24</h3>
          <p class="text-gray-600">7 jours sur 7, même jours fériés</p>
        </div>
        <div class="text-center">
          <div class="text-5xl mb-4">💰</div>
          <h3 class="font-bold text-lg mb-2" style="color: var(--color-primary)">Prix Transparents</h3>
          <p class="text-gray-600">Devis gratuit par téléphone</p>
        </div>
        <div class="text-center">
          <div class="text-5xl mb-4">✅</div>
          <h3 class="font-bold text-lg mb-2" style="color: var(--color-primary)">Artisans Qualifiés</h3>
          <p class="text-gray-600">Professionnels assurés</p>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA Section -->
  <section class="py-16 text-white" style="background-color: var(--color-primary)">
    <div class="container mx-auto px-4 text-center">
      <h2 class="text-3xl font-bold mb-6">Besoin d'un Serrurier à ${zone.name} ?</h2>
      <p class="text-xl mb-8">Appelez-nous maintenant pour une intervention rapide</p>
      <a href="${region.phoneLink}" class="inline-block px-8 py-4 rounded-lg text-xl font-bold text-white hover:opacity-90 transition" style="background-color: var(--color-accent)">
        ☎️ ${region.phone}
      </a>
    </div>
  </section>

  <!-- Footer -->
  <footer class="bg-gray-900 text-white py-12">
    <div class="container mx-auto px-4">
      <div class="grid md:grid-cols-3 gap-8 mb-8">
        <div>
          <h3 class="font-bold text-lg mb-4">Serrurier Hermès</h3>
          <p class="text-gray-400">Votre serrurier de confiance à ${zone.name}</p>
        </div>
        <div>
          <h3 class="font-bold text-lg mb-4">Services</h3>
          <ul class="text-gray-400 space-y-2">
            <li><a href="/serrurier-${zone.slug}/ouverture-de-porte/" class="hover:text-white">Ouverture de porte</a></li>
            <li><a href="/serrurier-${zone.slug}/changement-serrure/" class="hover:text-white">Changement serrure</a></li>
            <li><a href="/serrurier-${zone.slug}/depannage/" class="hover:text-white">Dépannage</a></li>
          </ul>
        </div>
        <div>
          <h3 class="font-bold text-lg mb-4">Contact</h3>
          <p class="text-gray-400 mb-2">☎️ ${region.phone}</p>
          <p class="text-gray-400">Disponible 24h/24, 7j/7</p>
        </div>
      </div>
      <div class="border-t border-gray-800 pt-8 text-center text-gray-400">
        <p class="mb-4">&copy; 2026 Serrurier Hermès - Tous droits réservés</p>
        <div class="flex justify-center gap-6">
          <a href="/mentions-legales/" class="hover:text-white">Mentions légales</a>
          <a href="/confidentialite/" class="hover:text-white">Confidentialité</a>
          <a href="/cgu/" class="hover:text-white">CGU</a>
        </div>
      </div>
    </div>
  </footer>

  <!-- Floating Button -->
  <a href="${region.phoneLink}" class="fixed bottom-6 right-6 px-6 py-3 rounded-full font-bold text-white shadow-lg hover:shadow-xl hover:opacity-90 transition z-50" style="background-color: var(--color-accent)">
    📞 Appeler
  </a>
</body>
</html>`;
};

let successCount = 0;
let errorCount = 0;

// Générer pour chaque zone
allZones.forEach(zone => {
  const cityDir = path.join(outPath, `serrurier-${zone.slug}`);
  const indexPath = path.join(cityDir, 'index.html');
  
  try {
    // Créer le dossier s'il n'existe pas
    if (!fs.existsSync(cityDir)) {
      fs.mkdirSync(cityDir, { recursive: true });
    }
    
    // Générer le HTML
    const html = generateStaticHTML(zone);
    fs.writeFileSync(indexPath, html, 'utf8');
    console.log(`✅ ${zone.name.padEnd(30)} → HTML statique complet`);
    successCount++;
  } catch (error) {
    console.error(`❌ Erreur pour ${zone.name}:`, error.message);
    errorCount++;
  }
});

console.log(`\n🎉 Génération terminée !`);
console.log(`   ✅ Succès: ${successCount} pages HTML statiques complètes`);
console.log(`   📄 Contenu: Hero + Services + WhyUs + CTA + Footer`);
console.log(`   🎨 Couleurs régionales appliquées`);
console.log(`   ⚡ 100% statique, aucune dépendance React`);
if (errorCount > 0) {
  console.log(`   ❌ Erreurs: ${errorCount} pages`);
  process.exit(1);
}
