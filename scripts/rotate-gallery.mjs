// Manual rotation fix-up for gallery images whose orientation was baked in wrong
// during a prior conversion (so sharp's EXIF auto-rotate can't fix them).
//
// Usage: edit the ROTATIONS map below, then:
//   npm install --no-save sharp
//   node scripts/rotate-gallery.mjs
//
// Each entry rotates the named file by the given number of degrees CLOCKWISE.
// Re-encodes at the same quality settings as optimize-gallery.mjs.

import sharp from 'sharp';
import { stat, mkdir } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const galleryDir = path.join(root, 'src', 'assets', 'gallery');

// Edit this map. Path is relative to src/assets/gallery/. Degrees: 90, 180, or 270.
// (Negative values rotate anti-clockwise, e.g. -90 = 90° anti-clockwise = 270° clockwise.)
const ROTATIONS = {
  '2025/IMG_3237.webp': -90,
  '2025/IMG_3412.webp': -90,
  '2025/IMG_3419.webp': -90,
};

async function main() {
  const entries = Object.entries(ROTATIONS);
  if (entries.length === 0) {
    console.log('No rotations defined. Edit the ROTATIONS map at the top of this file.');
    return;
  }
  // Write to OS temp dir to dodge OneDrive lock, then swap into place via Bash:
  //   for f in <tmp>/*.webp; do mv -f "$f" "src/assets/gallery/<year>/$(basename $f)"; done
  // The script prints the swap commands at the end so you can copy/paste them.
  const outDir = path.join(tmpdir(), 'afterhours-rotate');
  await mkdir(outDir, { recursive: true });

  const swaps = [];
  for (const [rel, deg] of entries) {
    const filePath = path.join(galleryDir, rel);
    const outName = rel.replace(/[\\/]/g, '__'); // flatten path for tmp
    const outPath = path.join(outDir, outName);
    await stat(filePath); // throws if missing
    const buf = await sharp(filePath).toBuffer();
    await sharp(buf)
      .rotate(deg)
      .webp({ quality: 80, effort: 4 })
      .toFile(outPath);
    swaps.push({ from: outPath, to: filePath, rel, deg });
    console.log(`  prepared ${rel} (${deg}°)`);
  }

  console.log('\nRotated files written to:', outDir);
  console.log('\nNow run these commands to swap them into place:');
  for (const s of swaps) {
    console.log(`  mv -f "${s.from}" "${s.to}"`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
