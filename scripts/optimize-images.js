import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const IMAGES_DIR = path.join(__dirname, '../src/assets/images');
const BACKUP_DIR = path.join(__dirname, '../src/assets/images-backup');
const MANIFEST_PATH = path.join(BACKUP_DIR, '.manifest.json');

function getFileHash(filePath) {
    if (!fs.existsSync(filePath)) return null;
    const buffer = fs.readFileSync(filePath);
    return crypto.createHash('md5').update(buffer).digest('hex');
}

function getAllFilesRecursively(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    for (const item of list) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            results = results.concat(getAllFilesRecursively(fullPath));
        } else {
            results.push(fullPath);
        }
    }
    return results;
}

async function optimize() {
    if (!fs.existsSync(IMAGES_DIR)) {
        console.error(`Images directory does not exist: ${IMAGES_DIR}`);
        return;
    }

    if (!fs.existsSync(BACKUP_DIR)) {
        fs.mkdirSync(BACKUP_DIR, { recursive: true });
        console.log(`Created backup directory at: ${BACKUP_DIR}`);
    }

    let manifest = {};
    if (fs.existsSync(MANIFEST_PATH)) {
        try {
            manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
        } catch (e) {
            manifest = {};
        }
    }

    const allFilePaths = getAllFilesRecursively(IMAGES_DIR);
    console.log(`Found ${allFilePaths.length} items across all subdirectories in images directory.`);

    let updatedManifest = { ...manifest };
    let hasChanges = false;

    for (const filePath of allFilePaths) {
        const file = path.basename(filePath);
        const ext = path.extname(file).toLowerCase();
        if (!['.jpg', '.jpeg', '.png', '.svg'].includes(ext)) {
            console.log(`Skipping non-image file: ${file}`);
            continue;
        }

        const relPath = path.relative(IMAGES_DIR, filePath);
        const relKey = relPath.replace(/\\/g, '/');
        const backupPath = path.join(BACKUP_DIR, relPath);

        const currentHash = getFileHash(filePath);

        const isNewOriginal = !manifest[relKey] || manifest[relKey] !== currentHash;

        if (isNewOriginal) {
            fs.mkdirSync(path.dirname(backupPath), { recursive: true });
            fs.copyFileSync(filePath, backupPath);
            console.log(`\nNew or updated original detected: ${relKey}. Updating backup...`);
        } else {
            console.log(`Skipping already optimized image: ${relKey}`);
            continue;
        }

        const backupStat = fs.statSync(backupPath);
        console.log(`Optimizing ${relKey} (Original: ${(backupStat.size / (1024 * 1024)).toFixed(2)} MB)...`);

        const tempOutPath = path.join(path.dirname(filePath), `temp-${file}`);

        try {
            if (ext === '.svg') {
                let svgText = fs.readFileSync(backupPath, 'utf8');

                // Regex for base64 images inside SVG
                const base64Regex = /data:image\/(png|jpeg|jpg);base64,([A-Za-z0-9+/=]+)/g;
                let match;
                let matches = [];

                while ((match = base64Regex.exec(svgText)) !== null) {
                    matches.push({ full: match[0], format: match[1], b64: match[2], index: match.index });
                }

                if (matches.length > 0) {
                    console.log(`  Found ${matches.length} embedded base64 image(s) in ${file}. Optimizing...`);
                    for (const m of matches) {
                        const imgBuf = Buffer.from(m.b64, 'base64');
                        let sharpPipeline = sharp(imgBuf);

                        if (m.format === 'png') {
                            sharpPipeline = sharpPipeline.png({ quality: 75, palette: true, compressionLevel: 9 });
                        } else {
                            sharpPipeline = sharpPipeline.jpeg({ quality: 75, mozjpeg: true });
                        }

                        const optBuf = await sharpPipeline.toBuffer();
                        const optB64 = `data:image/${m.format};base64,${optBuf.toString('base64')}`;
                        svgText = svgText.replace(m.full, optB64);
                    }
                }

                // Minify SVG XML whitespace
                svgText = svgText
                    .replace(/<!--[\s\S]*?-->/g, '')
                    .replace(/>\s+</g, '><')
                    .trim();

                fs.writeFileSync(filePath, svgText, 'utf8');
            } else {
                let pipeline = sharp(backupPath);

                const metadata = await pipeline.metadata();

                const MAX_DIMENSION = 1920;
                if ((metadata.width && metadata.width > MAX_DIMENSION) || (metadata.height && metadata.height > MAX_DIMENSION)) {
                    console.log(`  Resizing image down to max dimension ${MAX_DIMENSION}px (original: ${metadata.width}x${metadata.height})`);
                    pipeline = pipeline.resize({
                        width: metadata.width > metadata.height ? MAX_DIMENSION : undefined,
                        height: metadata.height >= metadata.width ? MAX_DIMENSION : undefined,
                        fit: 'inside',
                        withoutEnlargement: true
                    });
                }

                if (ext === '.png') {
                    pipeline = pipeline.png({
                        quality: 80,
                        palette: true,
                        compressionLevel: 9
                    });
                } else if (['.jpg', '.jpeg'].includes(ext)) {
                    pipeline = pipeline.jpeg({
                        quality: 80,
                        mozjpeg: true
                    });
                }

                await pipeline.toFile(tempOutPath);

                fs.unlinkSync(filePath);
                fs.renameSync(tempOutPath, filePath);
            }

            const newStat = fs.statSync(filePath);
            const savings = ((1 - (newStat.size / backupStat.size)) * 100).toFixed(1);
            console.log(`  Optimized: ${relKey} -> New size: ${(newStat.size / (1024 * 1024)).toFixed(2)} MB (${savings}% total reduction)`);

            updatedManifest[relKey] = getFileHash(filePath);
            hasChanges = true;

        } catch (error) {
            console.error(`  Error optimizing ${relKey}:`, error);
            if (fs.existsSync(tempOutPath)) {
                fs.unlinkSync(tempOutPath);
            }
        }
    }

    if (hasChanges) {
        fs.writeFileSync(MANIFEST_PATH, JSON.stringify(updatedManifest, null, 2), 'utf8');
    }

    console.log('\nOptimization complete! Original high-resolution backups can be found in src/assets/images-backup');
}

optimize();
