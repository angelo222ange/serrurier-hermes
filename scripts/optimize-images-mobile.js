const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

const IMAGES_DIR = path.join(__dirname, '../public/images');
const BACKUP_DIR = path.join(__dirname, '../public/images-backup');

// Configuration d'optimisation AGGRESSIVE pour mobile
const QUALITY = {
  hero: 75,      // Hero images - qualité réduite
  service: 70,   // Images de service - qualité moyenne
  thumbnail: 65, // Thumbnails/petites images
  logo: 85,      // Logos - haute qualité
};

// Tailles responsives optimisées pour mobile
const SIZES = {
  hero: [
    { width: 1280, suffix: '-lg' }, // Desktop
    { width: 768, suffix: '-md' },  // Tablet
    { width: 640, suffix: '-sm' },  // Mobile
  ],
  service: [
    { width: 800, suffix: '-lg' },  // Desktop
    { width: 600, suffix: '-md' },  // Tablet
    { width: 400, suffix: '-sm' },  // Mobile
  ],
  thumbnail: [
    { width: 400, suffix: '-lg' },
    { width: 300, suffix: '-md' },
    { width: 200, suffix: '-sm' },
  ],
  logo: [
    { width: 128, suffix: '' }, // Logo en une seule taille
  ],
};

// Catégorisation des images
const IMAGE_CATEGORIES = {
  hero: ['depannage-serrurier-urgence-nuit-hermes.webp'],
  service: [
    'porte-bloquer-serrurier.webp',
    'apres-effraction-serrurier.webp',
    'changement-de-barillet-serrurier-hermes.webp',
    'serrurier-hermes-ouverture-porte-blind.webp',
    'changement-serrure-serrurier-hermes.webp',
    'reparation-serrure-serrurier-hermes.webp',
    'changement-de-serrure-serrurier-hermes.webp',
    'serrurier-porte-claquer-serrurier-hermes.webp',
  ],
  thumbnail: [
    'Serrurie-hermes-cle-casser.webp',
  ],
};

async function getCategory(filename) {
  if (IMAGE_CATEGORIES.hero.includes(filename)) return 'hero';
  if (IMAGE_CATEGORIES.service.includes(filename)) return 'service';
  if (IMAGE_CATEGORIES.thumbnail.includes(filename)) return 'thumbnail';
  if (filename.includes('logo')) return 'logo';
  return 'service'; // default
}

async function optimizeImage(filePath, outputPath, width, quality) {
  try {
    // Si output === input pour les logos, créer un fichier temporaire
    const isSameFile = filePath === outputPath;
    const tempOutput = isSameFile ? `${outputPath}.tmp` : outputPath;
    
    const image = sharp(filePath);
    const metadata = await image.metadata();
    
    // Ne pas agrandir les images
    const actualWidth = width && metadata.width < width ? metadata.width : width;
    
    await image
      .resize(actualWidth, null, {
        withoutEnlargement: true,
        fit: 'inside',
      })
      .webp({
        quality,
        effort: 6, // Max compression effort
        smartSubsample: true,
        // Compression plus aggressive
        nearLossless: false,
        alphaQuality: quality - 10,
      })
      .toFile(tempOutput);
    
    // Si c'était un fichier temporaire, le renommer
    if (isSameFile) {
      await fs.rename(tempOutput, outputPath);
    }
    
    const stats = await fs.stat(outputPath);
    return stats.size;
  } catch (error) {
    console.error(`Error optimizing ${filePath}:`, error.message);
    return 0;
  }
}

async function processImage(filePath, filename, category) {
  const ext = path.extname(filename);
  const nameWithoutExt = path.basename(filename, ext);
  const dir = path.dirname(filePath);
  
  const quality = QUALITY[category] || QUALITY.service;
  const sizes = SIZES[category] || SIZES.service;
  
  console.log(`\n📸 Processing: ${filename} (${category})`);
  
  const results = [];
  const originalStats = await fs.stat(filePath);
  const originalSize = originalStats.size;
  
  // Generate responsive versions
  for (let i = 0; i < sizes.length; i++) {
    const { width, suffix } = sizes[i];
    const outputName = suffix ? `${nameWithoutExt}${suffix}${ext}` : `${nameWithoutExt}${ext}`;
    const responsiveOutput = path.join(dir, outputName);
    
    // Pour l'original (sans suffix ou dernier de la liste), utiliser l'input original
    const inputFile = (i === 0 && !suffix) ? filePath : filePath;
    
    const size = await optimizeImage(inputFile, responsiveOutput, width, quality);
    results.push({
      name: outputName,
      size,
      width,
    });
    console.log(`  ✓ ${width}px: ${(size / 1024).toFixed(1)} KB`);
  }
  
  // Optimiser aussi l'original pour qu'il soit plus léger
  if (category !== 'logo') {
    const largestWidth = sizes[0].width;
    const originalOptimized = path.join(dir, `${nameWithoutExt}${ext}`);
    const originalSize = await optimizeImage(filePath, originalOptimized, largestWidth, quality);
    console.log(`  ✓ Original optimized: ${(originalSize / 1024).toFixed(1)} KB`);
  }
  
  const totalOptimized = results.reduce((sum, r) => sum + r.size, 0);
  const saved = originalSize - totalOptimized;
  const percent = originalSize > 0 ? ((saved / originalSize) * 100).toFixed(1) : 0;
  
  console.log(`  💾 Original: ${(originalSize / 1024).toFixed(1)} KB`);
  console.log(`  📊 Total optimized: ${(totalOptimized / 1024).toFixed(1)} KB`);
  console.log(`  💰 Saved: ${(saved / 1024).toFixed(1)} KB (${percent}%)`);
  
  return { originalSize, optimizedSize: totalOptimized, saved };
}

async function processDirectory(dirPath) {
  let totalOriginal = 0;
  let totalOptimized = 0;
  let fileCount = 0;
  
  try {
    const entries = await fs.readdir(dirPath, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name);
      
      if (entry.isDirectory()) {
        // Skip backup directory
        if (entry.name === 'images-backup') continue;
        
        const subResults = await processDirectory(fullPath);
        totalOriginal += subResults.totalOriginal;
        totalOptimized += subResults.totalOptimized;
        fileCount += subResults.fileCount;
      } else if (entry.isFile() && /\.(webp|jpg|jpeg|png)$/i.test(entry.name)) {
        // Skip already generated responsive versions
        if (entry.name.match(/-(sm|md|lg)\.(webp|jpg|jpeg|png)$/i)) {
          console.log(`⏭️  Skipping responsive version: ${entry.name}`);
          continue;
        }
        
        // Backup original if not already backed up
        const backupPath = fullPath.replace(IMAGES_DIR, BACKUP_DIR);
        const backupDir = path.dirname(backupPath);
        await fs.mkdir(backupDir, { recursive: true });
        
        try {
          await fs.access(backupPath);
        } catch {
          await fs.copyFile(fullPath, backupPath);
          console.log(`💾 Backed up: ${entry.name}`);
        }
        
        // Determine category
        const category = await getCategory(entry.name);
        
        // Process image
        const { originalSize, optimizedSize, saved } = await processImage(fullPath, entry.name, category);
        
        totalOriginal += originalSize;
        totalOptimized += optimizedSize;
        fileCount++;
      }
    }
  } catch (error) {
    console.error(`Error processing directory ${dirPath}:`, error.message);
  }
  
  return { totalOriginal, totalOptimized, fileCount };
}

async function main() {
  console.log('🚀 Starting MOBILE-OPTIMIZED image optimization...\n');
  console.log('📦 This will:');
  console.log('   - Backup originals to public/images-backup/');
  console.log('   - Compress images AGGRESSIVELY for mobile');
  console.log('   - Generate responsive versions (sm/md/lg)');
  console.log('   - Target: Reduce 29MB to < 5MB\n');
  
  const startTime = Date.now();
  
  // Create backup directory
  await fs.mkdir(BACKUP_DIR, { recursive: true });
  
  // Process all images
  const { totalOriginal, totalOptimized, fileCount } = await processDirectory(IMAGES_DIR);
  
  const duration = ((Date.now() - startTime) / 1000).toFixed(1);
  const totalSaved = totalOriginal - totalOptimized;
  const percentSaved = totalOriginal > 0 ? ((totalSaved / totalOriginal) * 100).toFixed(1) : 0;
  
  console.log('\n' + '='.repeat(60));
  console.log('✅ Optimization Complete!');
  console.log('='.repeat(60));
  console.log(`📁 Files processed: ${fileCount}`);
  console.log(`📊 Original size: ${(totalOriginal / 1024 / 1024).toFixed(2)} MB`);
  console.log(`📊 Optimized size: ${(totalOptimized / 1024 / 1024).toFixed(2)} MB`);
  console.log(`💾 Total saved: ${(totalSaved / 1024 / 1024).toFixed(2)} MB (${percentSaved}%)`);
  console.log(`⏱️  Duration: ${duration}s`);
  console.log('='.repeat(60));
  console.log('\n✨ Next steps:');
  console.log('   1. Run: npm run build');
  console.log('   2. Test mobile performance');
  console.log('   3. Check Lighthouse score\n');
}

main().catch(console.error);
