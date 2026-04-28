// One-shot script to resize + EXIF-auto-rotate the gallery WebPs.
// Reads from src/assets/_gallery-original/ (which you should create first as
// a backup: `cp -r src/assets/gallery src/assets/_gallery-original`)
// and writes the optimized versions back over src/assets/gallery/.
//
// Run: npm install --no-save sharp && node scripts/optimize-gallery.mjs
// Once you've verified the optimized output looks right, delete the backup folder.

import sharp from 'sharp';
import { readdir, mkdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const galleryDir = path.join(root, 'src', 'assets', 'gallery');
const backupDir = path.join(root, 'src', 'assets', '_gallery-original');

const MAX_WIDTH = 1600;
const QUALITY = 80;

async function main() {
  try {
    await stat(backupDir);
  } catch {
    console.error(`Backup folder not found: ${backupDir}`);
    console.error(`Create it first:  cp -r src/assets/gallery src/assets/_gallery-original`);
    process.exit(1);
  }

  const years = (await readdir(backupDir, { withFileTypes: true }))
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  let totalBefore = 0;
  let totalAfter = 0;
  const rotatedFiles = [];

  for (const year of years) {
    const inDir = path.join(backupDir, year);
    const outDir = path.join(galleryDir, year);
    await mkdir(outDir, { recursive: true });

    const files = (await readdir(inDir)).filter((f) => /\.webp$/i.test(f));
    console.log(`\n${year}: ${files.length} files`);

    for (const file of files) {
      const inPath = path.join(inDir, file);
      const outPath = path.join(outDir, file);
      const inSize = (await stat(inPath)).size;
      totalBefore += inSize;

      const meta = await sharp(inPath).metadata();
      const willRotate = meta.orientation && meta.orientation !== 1;
      if (willRotate) rotatedFiles.push(`${year}/${file} (orientation=${meta.orientation})`);

      // Read fully into a buffer first so we can safely overwrite the destination,
      // even when the destination IS the same file path as the input on a re-run.
      const inputBuf = await sharp(inPath).toBuffer();
      await sharp(inputBuf)
        .rotate() // applies EXIF orientation, then strips it
        .resize({ width: MAX_WIDTH, withoutEnlargement: true })
        .webp({ quality: QUALITY, effort: 4 })
        .toFile(outPath);

      const outSize = (await stat(outPath)).size;
      totalAfter += outSize;
      const pct = ((1 - outSize / inSize) * 100).toFixed(0);
      console.log(`  ${file}  ${(inSize / 1024).toFixed(0)}KB -> ${(outSize / 1024).toFixed(0)}KB  (-${pct}%)${willRotate ? '  [rotated]' : ''}`);
    }
  }

  const mb = (n) => (n / 1024 / 1024).toFixed(2);
  console.log(`\n=== Done ===`);
  console.log(`Total: ${mb(totalBefore)} MB -> ${mb(totalAfter)} MB  (-${((1 - totalAfter / totalBefore) * 100).toFixed(0)}%)`);
  if (rotatedFiles.length) {
    console.log(`\nEXIF auto-rotated (${rotatedFiles.length} files):`);
    rotatedFiles.forEach((f) => console.log(`  ${f}`));
  } else {
    console.log('\nNo files had EXIF orientation tags — none were auto-rotated.');
    console.log('If any images still appear sideways, the rotation was baked into the WebP and');
    console.log('will need to be fixed manually. Tell me which filenames and I\'ll add a rotation map.');
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
