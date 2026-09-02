import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const IMAGES_DIR = path.join(__dirname, '../src/assets/images');

const targetFiles = [
    path.join(IMAGES_DIR, 'backgrounds/bg-1.svg'),
];

async function optimizeSvgFile(filePath) {
    if (!fs.existsSync(filePath)) return;
    const statBefore = fs.statSync(filePath);
    const filename = path.basename(filePath);

    let svgText = fs.readFileSync(filePath, 'utf8');

    const base64Regex = /data:image\/(png|jpeg|jpg|webp);base64,([A-Za-z0-9+/=]+)/g;
    let match;
    let replacements = [];

    while ((match = base64Regex.exec(svgText)) !== null) {
        const full = match[0];
        const b64 = match[2];
        const imgBuf = Buffer.from(b64, 'base64');

        try {
            let sharpPipeline = sharp(imgBuf);
            const meta = await sharpPipeline.metadata();

            const maxDim = 1440;
            if ((meta.width && meta.width > maxDim) || (meta.height && meta.height > maxDim)) {
                sharpPipeline = sharpPipeline.resize({
                    width: meta.width > meta.height ? maxDim : undefined,
                    height: meta.height >= meta.width ? maxDim : undefined,
                    fit: 'inside',
                    withoutEnlargement: true
                });
            }

            const webpBuf = await sharpPipeline.webp({ quality: 72, effort: 6 }).toBuffer();
            const webpB64 = `data:image/webp;base64,${webpBuf.toString('base64')}`;
            replacements.push({ full, webpB64 });
        } catch (err) {
            console.error(`  Error processing base64 image in ${filename}:`, err);
        }
    }

    for (const r of replacements) {
        svgText = svgText.replace(r.full, r.webpB64);
    }

    svgText = svgText
        .replace(/<!--[\s\S]*?-->/g, '')
        .replace(/>\s+</g, '><')
        .trim();

    fs.writeFileSync(filePath, svgText, 'utf8');

    const statAfter = fs.statSync(filePath);
    const reduction = ((1 - statAfter.size / statBefore.size) * 100).toFixed(1);
    console.log(`  Done ${filename}: ${(statBefore.size / 1024 / 1024).toFixed(2)} MB -> ${(statAfter.size / 1024 / 1024).toFixed(2)} MB (${reduction}% reduction)`);
}

async function run() {
    console.log('Optimizing background SVG...');
    for (const file of targetFiles) {
        await optimizeSvgFile(file);
    }
}

run();
