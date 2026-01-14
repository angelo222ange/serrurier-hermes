const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

const IMAGES_DIR = path.join(__dirname, '../public/images');
const BACKUP_DIR = path.join(__dirname, '../public/images-backup');

// Configuration d'optimisation aggressive
const QUALITY = {
  hero: 85,      // Hero images - qualité moyenne-haute
  service: 80,   // Images de service - qualité moyenne
  thumbnail: 75, // Thumbnails/petites images
  logo: 90,      // Logos - haute qualité
};

// Tailles responsives pour différents contextes
const SIZES = {
  hero: [
    { width: 1920, suffix: '-xl' },
    { width: 1280, suffix: '-lg' },
    { width: 768, suffix: '-md' },
    { width: 640, suffix: '-sm' },
  ],
  service: [
    { width: 800, suffix: '-lg' },
    { width: 600, suffix: '-md' },
    { width: 400, suffix: '-sm' },
  ],
  thumbnail: [
    { width: 400, suffix: '-lg' },
    { width: 300, suffix: '-md' },
    { width: 200, suffix: '-sm' },
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
    await sharp(filePath)
      .resize(width, null, {
        withoutEnlargement: true,
        fit: 'inside',
      })
      .webp({
        quality,
        effort: 6, // Max compression effort
        smartSubsample: true,
      })
      .toFile(outputPath);
    
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
  
  // Optimize original (largest size)
  const originalOutput = path.join(dir, `${nameWithoutExt}${ext}`);
  const largestSize = sizes[0].width;
  const originalSize = await optimizeImage(filePath, originalOutput, largestSize, quality);
  results.push({
    name: filename,
    size: originalSize,
    saved: 0,
  });
  console.log(`  ✓ Original: ${(originalSize / 1024).toFixed(1)} KB`);
  
  // Generate responsive versions
  for (let i = 1; i < sizes.length; i++) {
    const { width, suffix } = sizes[i];
    const responsiveOutput = path.join(dir, `${nameWithoutExt}${suffix}${ext}`);
    const size = await optimizeImage(filePath, responsiveOutput, width, quality);
    results.push({
      name: `${nameWithoutExt}${suffix}${ext}`,
      size,
    });
    console.log(`  ✓ ${width}px: ${(size / 1024).toFixed(1)} KB`);
  }
  
  return results;
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
        const subResults = await processDirectory(fullPath);
        totalOriginal += subResults.totalOriginal;
        totalOptimized += subResults.totalOptimized;
        fileCount += subResults.fileCount;
      } else if (entry.isFile() && /\.(webp|jpg|jpeg|png)$/i.test(entry.name)) {
        // Skip already generated responsive versions
        if (entry.name.includes('-sm') || entry.name.includes('-md') || entry.name.includes('-lg') || entry.name.includes('-xl')) {
          continue;
        }
        
        // Get original size
        const stats = await fs.stat(fullPath);
        const originalSize = stats.size;
        totalOriginal += originalSize;
        
        // Backup original
        const backupPath = fullPath.replace(IMAGES_DIR, BACKUP_DIR);
        const backupDir = path.dirname(backupPath);
        await fs.mkdir(backupDir, { recursive: true });
        
        // Only backup if not already backed up
        try {
          await fs.access(backupPath);
        } catch {
          await fs.copyFile(fullPath, backupPath);
        }
        
        // Determine category
        const category = await getCategory(entry.name);
        
        // Process image
        const results = await processImage(fullPath, entry.name, category);
        
        // Sum optimized sizes
        const optimizedSize = results.reduce((sum, r) => sum + r.size, 0);
        totalOptimized += optimizedSize;
        fileCount++;
        
        const saved = originalSize - optimizedSize;
        const percent = ((saved / originalSize) * 100).toFixed(1);
        console.log(`  💾 Saved: ${(saved / 1024).toFixed(1)} KB (${percent}%)`);
      }
    }
  } catch (error) {
    console.error(`Error processing directory ${dirPath}:`, error.message);
  }
  
  return { totalOriginal, totalOptimized, fileCount };
}

async function main() {
  console.log('🚀 Starting advanced image optimization...\n');
  console.log('📦 This will:');
  console.log('   - Backup originals to public/images-backup/');
  console.log('   - Compress images aggressively');
  console.log('   - Generate responsive versions');
  console.log('   - Optimize for Core Web Vitals\n');
  
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
  console.log('\n✨ Now update your components to use responsive images!');
}

main().catch(console.error);
