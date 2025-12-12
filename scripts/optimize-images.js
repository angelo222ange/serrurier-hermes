/**
 * Script d'optimisation des images
 * 
 * Usage: node scripts/optimize-images.js
 * 
 * Prérequis: npm install sharp --save-dev
 * 
 * Ce script :
 * - Convertit toutes les images en WebP
 * - Redimensionne selon le type d'image
 * - Applique une compression optimale
 * - Affiche les économies de taille
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Configuration de qualité par type d'image
const COMPRESSION_QUALITY = {
  hero: 70,      // Images hero (LCP) - qualité moyenne-haute
  service: 60,   // Images de services - qualité moyenne
  logo: 75,      // Logos - qualité haute
  gallery: 65,   // Galerie - qualité moyenne
  default: 65    // Par défaut
};

// Dimensions maximales par type d'image
const MAX_DIMENSIONS = {
  hero: { width: 1920, height: 1080 },
  service: { width: 1200, height: 800 },
  logo: { width: 500, height: 500 },
  gallery: { width: 1200, height: 900 },
  default: { width: 1600, height: 1600 }
};

// Dossier source des images
const IMAGES_DIR = path.join(__dirname, '..', 'public', 'images');

// Extensions supportées
const SUPPORTED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];

/**
 * Détermine le type d'image selon son chemin
 */
function getImageType(filePath) {
  const relativePath = filePath.toLowerCase();
  
  if (relativePath.includes('hero') || relativePath.includes('backgrounds')) {
    return 'hero';
  }
  if (relativePath.includes('service')) {
    return 'service';
  }
  if (relativePath.includes('logo')) {
    return 'logo';
  }
  if (relativePath.includes('gallery')) {
    return 'gallery';
  }
  
  return 'default';
}

/**
 * Traite une image
 */
async function processImage(inputPath) {
  const imageType = getImageType(inputPath);
  const quality = COMPRESSION_QUALITY[imageType];
  const { width: maxWidth, height: maxHeight } = MAX_DIMENSIONS[imageType];
  
  const ext = path.extname(inputPath).toLowerCase();
  const outputPath = inputPath.replace(ext, '.webp');
  
  try {
    const stats = fs.statSync(inputPath);
    const originalSize = stats.size / 1024; // KB

    await sharp(inputPath)
      .resize(maxWidth, maxHeight, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .webp({ quality })
      .toFile(outputPath);

    const newStats = fs.statSync(outputPath);
    const newSize = newStats.size / 1024; // KB
    const savings = ((originalSize - newSize) / originalSize * 100).toFixed(1);

    // Si le fichier original n'est pas WebP, on peut le supprimer
    if (ext !== '.webp' && outputPath !== inputPath) {
      console.log(`✅ ${path.basename(inputPath)} → ${path.basename(outputPath)}`);
      console.log(`   ${originalSize.toFixed(1)}KB → ${newSize.toFixed(1)}KB (-${savings}%)`);
    } else {
      console.log(`✅ ${path.basename(inputPath)} optimisé`);
      console.log(`   ${originalSize.toFixed(1)}KB → ${newSize.toFixed(1)}KB (-${savings}%)`);
    }

    return { originalSize, newSize, savings: parseFloat(savings) };
  } catch (error) {
    console.error(`❌ Erreur sur ${inputPath}:`, error.message);
    return null;
  }
}

/**
 * Parcourt récursivement un dossier
 */
function getAllImages(dir, files = []) {
  if (!fs.existsSync(dir)) {
    console.log(`⚠️ Dossier non trouvé: ${dir}`);
    return files;
  }

  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      getAllImages(fullPath, files);
    } else if (stat.isFile()) {
      const ext = path.extname(item).toLowerCase();
      if (SUPPORTED_EXTENSIONS.includes(ext)) {
        files.push(fullPath);
      }
    }
  }

  return files;
}

/**
 * Point d'entrée principal
 */
async function main() {
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('🖼️  Optimisation des images - Template Serrurerie');
  console.log('═══════════════════════════════════════════════════════════════\n');

  const images = getAllImages(IMAGES_DIR);

  if (images.length === 0) {
    console.log('⚠️ Aucune image trouvée dans', IMAGES_DIR);
    console.log('   Ajoutez des images dans public/images/ puis relancez le script.\n');
    return;
  }

  console.log(`📁 ${images.length} images trouvées dans ${IMAGES_DIR}\n`);

  let totalOriginal = 0;
  let totalNew = 0;
  let processedCount = 0;

  for (const image of images) {
    const result = await processImage(image);
    if (result) {
      totalOriginal += result.originalSize;
      totalNew += result.newSize;
      processedCount++;
    }
  }

  console.log('\n═══════════════════════════════════════════════════════════════');
  console.log('📊 RÉSUMÉ');
  console.log('═══════════════════════════════════════════════════════════════');
  console.log(`Images traitées: ${processedCount}/${images.length}`);
  console.log(`Taille originale: ${(totalOriginal / 1024).toFixed(2)} MB`);
  console.log(`Taille optimisée: ${(totalNew / 1024).toFixed(2)} MB`);
  console.log(`Économie totale: ${((totalOriginal - totalNew) / totalOriginal * 100).toFixed(1)}%`);
  console.log('═══════════════════════════════════════════════════════════════\n');
}

// Exécution
main().catch(console.error);

