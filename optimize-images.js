const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

const IMAGES_DIR = './images';
const OUTPUT_DIR = './images/web';

// Configuration for different image types - balanced for quality and speed
const CONFIG = {
    // Hero and large banner images
    large: {
        width: 800,
        quality: 75,
        patterns: ['hero', 'about']
    },
    // Service and product images
    medium: {
        width: 400,
        quality: 75,
        patterns: ['service-', 'extinguisher', 'sprinkler', 'smoke-detector', 'heat-detector', 'alarm-panel', 'hose', 'emergency-light', 'exit-sign', 'fire-blanket']
    },
    // Logo and icons
    small: {
        width: 200,
        quality: 80,
        patterns: ['logo']
    }
};

async function optimizeImages() {
    try {
        // Create output directory if it doesn't exist
        await fs.mkdir(OUTPUT_DIR, { recursive: true });

        // Get all PNG/JPG files in images directory
        const files = await fs.readdir(IMAGES_DIR);
        const imageFiles = files.filter(f =>
            /\.(png|jpg|jpeg)$/i.test(f) && !f.includes('web')
        );

        console.log(`Found ${imageFiles.length} images to optimize...\n`);

        for (const file of imageFiles) {
            const inputPath = path.join(IMAGES_DIR, file);
            const baseName = path.parse(file).name;

            // Determine configuration based on filename
            let config = CONFIG.medium; // default
            for (const [key, value] of Object.entries(CONFIG)) {
                if (value.patterns.some(p => file.toLowerCase().includes(p))) {
                    config = value;
                    break;
                }
            }

            // Get original file size
            const originalStats = await fs.stat(inputPath);
            const originalSize = originalStats.size / 1024; // KB

            // Generate WebP version
            const webpOutput = path.join(OUTPUT_DIR, `${baseName}.webp`);
            await sharp(inputPath)
                .resize(config.width, null, {
                    withoutEnlargement: true,
                    fit: 'inside'
                })
                .webp({ quality: config.quality })
                .toFile(webpOutput);

            // Also generate a fallback PNG for browsers without WebP support
            const pngOutput = path.join(OUTPUT_DIR, `${baseName}.png`);
            await sharp(inputPath)
                .resize(config.width, null, {
                    withoutEnlargement: true,
                    fit: 'inside'
                })
                .png({ quality: config.quality, compressionLevel: 9 })
                .toFile(pngOutput);

            // Get new file sizes
            const webpStats = await fs.stat(webpOutput);
            const webpSize = webpStats.size / 1024;
            const pngStats = await fs.stat(pngOutput);
            const pngSize = pngStats.size / 1024;

            const savings = ((1 - webpSize / originalSize) * 100).toFixed(1);

            console.log(`✓ ${file}`);
            console.log(`  Original: ${originalSize.toFixed(1)}KB`);
            console.log(`  WebP: ${webpSize.toFixed(1)}KB (${savings}% smaller)`);
            console.log(`  PNG fallback: ${pngSize.toFixed(1)}KB\n`);
        }

        console.log('✅ Image optimization complete!');
        console.log(`\nOptimized images saved to: ${OUTPUT_DIR}`);

    } catch (error) {
        console.error('Error optimizing images:', error);
        process.exit(1);
    }
}

optimizeImages();
