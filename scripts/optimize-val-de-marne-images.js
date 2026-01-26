/**
 * Script d'optimisation des images Val-de-Marne
 * Crée des versions responsives pour une meilleure performance Google Ads
 * 
 * Usage: node scripts/optimize-val-de-marne-images.js
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Configuration des tailles responsives
const SIZES = {
  sm: { width: 480, quality: 75 },
  md: { width: 768, quality: 80 },
  lg: { width: 1280, quality: 85 },
};

// Dossier source
const SOURCE_DIR = path.join(__dirname, '../public/images/zones/val de marne');

async function optimizeImages() {
  console.log('🖼️  Optimisation des images Val-de-Marne...\n');

  // Vérifier si le dossier existe
  if (!fs.existsSync(SOURCE_DIR)) {
    console.error('❌ Dossier non trouvé:', SOURCE_DIR);
    return;
  }

  // Lire tous les fichiers webp
  const files = fs.readdirSync(SOURCE_DIR).filter(f => 
    f.endsWith('.webp') && 
    !f.includes('-sm') && 
    !f.includes('-md') && 
    !f.includes('-lg')
  );

  console.log(`📁 ${files.length} images à optimiser\n`);

  let processed = 0;
  let skipped = 0;

  for (const file of files) {
    const filePath = path.join(SOURCE_DIR, file);
    const baseName = file.replace('.webp', '');

    try {
      const image = sharp(filePath);
      const metadata = await image.metadata();

      console.log(`📷 ${file} (${metadata.width}x${metadata.height})`);

      for (const [suffix, config] of Object.entries(SIZES)) {
        const outputName = `${baseName}-${suffix}.webp`;
        const outputPath = path.join(SOURCE_DIR, outputName);

        // Vérifier si la version existe déjà
        if (fs.existsSync(outputPath)) {
          console.log(`   ⏭️  ${suffix}: existe déjà`);
          skipped++;
          continue;
        }

        // Ne pas upscaler les images
        if (metadata.width <= config.width) {
          console.log(`   ⏭️  ${suffix}: image source trop petite`);
          skipped++;
          continue;
        }

        await sharp(filePath)
          .resize(config.width, null, {
            withoutEnlargement: true,
            fit: 'inside',
          })
          .webp({ quality: config.quality })
          .toFile(outputPath);

        const stats = fs.statSync(outputPath);
        const sizeKB = (stats.size / 1024).toFixed(1);
        console.log(`   ✅ ${suffix}: ${config.width}px (${sizeKB} KB)`);
        processed++;
      }

      console.log('');
    } catch (error) {
      console.error(`   ❌ Erreur: ${error.message}\n`);
    }
  }

  console.log('━'.repeat(50));
  console.log(`\n✨ Terminé!`);
  console.log(`   📊 ${processed} images créées`);
  console.log(`   ⏭️  ${skipped} images ignorées\n`);
}

// Lancer l'optimisation
optimizeImages().catch(console.error);
