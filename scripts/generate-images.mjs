// One-shot image-generation script.
//
// `sharp` is intentionally NOT a permanent devDep — install it on demand:
//   npm install --no-save sharp
//   node scripts/generate-images.mjs
//
// Source images expected at:
//   src/assets/<original-figma-hash>.png   — hero + theme PNGs (raw Figma export)
//   brand-assets/final_ICON/...            — for favicons + apple-touch-icon
//   brand-assets/final_LOGO/...            — for og-image
// If you've already removed the originals, restore them from git history before re-running.
//
// Outputs:
//   src/assets/hero-bg-{800,1280,1920}.webp + hero-bg.webp
//   src/assets/theme-{mad-scientist,halloween,carnival}.webp, camp-scene.webp
//   public/favicon.ico, favicon-32.png, favicon-192.png
//   public/apple-touch-icon.png, og-image.png

import sharp from 'sharp';
import { mkdir, copyFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const srcAssets = path.join(root, 'src', 'assets');
const publicDir = path.join(root, 'public');
const brandIconSvg = path.join(root, 'brand-assets', 'final_ICON', 'SVG', 'ICON-Gradient.svg');
const brandIconNavyPng = path.join(root, 'brand-assets', 'final_ICON', 'PNG', 'ICON-Gradient-on-navy_PNG.png');
const brandLogoNavyPng = path.join(root, 'brand-assets', 'final_LOGO', 'PNG', 'FULL-Gradient-Logo-on-navy_PNG.png');

const heroSource = path.join(srcAssets, '7042fd03f7b1a02e1469127a4843099c8beaff3d.png');
const themeSources = [
  { from: 'f9bf965ee45667669f30614b0276683fe7c1eae1.png', to: 'theme-mad-scientist' },
  { from: '25ebb1b3a564633d614e292993b58a0dcbddebde.png', to: 'theme-halloween' },
  { from: '73048affa8516d89dadac751833aa594224ac308.png', to: 'theme-carnival' },
  { from: '6e570523bf435abbf91547fd200585c3a60e0b0a.png', to: 'camp-scene' },
];

async function ensure(dir) {
  await mkdir(dir, { recursive: true });
}

async function buildHero() {
  console.log('Hero: generating responsive WebP variants (800/1280/1920w)...');
  const widths = [800, 1280, 1920];
  for (const w of widths) {
    const out = path.join(srcAssets, `hero-bg-${w}.webp`);
    await sharp(heroSource)
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: 78 })
      .toFile(out);
    console.log(`  -> ${path.basename(out)}`);
  }
  // Also write a default `hero-bg.webp` (1280w) for the simple fallback case
  await sharp(heroSource)
    .resize({ width: 1280, withoutEnlargement: true })
    .webp({ quality: 78 })
    .toFile(path.join(srcAssets, 'hero-bg.webp'));
  console.log('  -> hero-bg.webp (default 1280w)');
}

async function buildThemes() {
  console.log('Themes/camp scene: converting to WebP...');
  for (const t of themeSources) {
    const inFile = path.join(srcAssets, t.from);
    const outFile = path.join(srcAssets, `${t.to}.webp`);
    await sharp(inFile)
      .resize({ width: 1280, withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(outFile);
    console.log(`  -> ${path.basename(outFile)}`);
  }
}

async function buildFavicons() {
  console.log('Favicons: rendering from icon-gradient.svg...');
  // 192px PNG (Android home screen)
  await sharp(brandIconSvg, { density: 384 })
    .resize(192, 192, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(publicDir, 'favicon-192.png'));
  console.log('  -> favicon-192.png');

  // 32px PNG
  await sharp(brandIconSvg, { density: 256 })
    .resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(publicDir, 'favicon-32.png'));
  console.log('  -> favicon-32.png');

  // favicon.ico — Windows .ico is multi-size. sharp can't write .ico directly,
  // but a single 48x48 PNG renamed to .ico is widely supported by browsers.
  // For a true multi-size ico, prefer to-ico or png-to-ico, but those need an
  // extra dep. A 48x48 PNG-as-ICO works in every modern browser.
  await sharp(brandIconSvg, { density: 256 })
    .resize(48, 48, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(publicDir, 'favicon.ico'));
  console.log('  -> favicon.ico (48x48 PNG with .ico extension)');
}

async function buildAppleTouchIcon() {
  console.log('Apple touch icon: 180x180 from ICON-Gradient-on-navy_PNG.png...');
  await sharp(brandIconNavyPng)
    .resize(180, 180, { fit: 'cover' })
    .png()
    .toFile(path.join(publicDir, 'apple-touch-icon.png'));
  console.log('  -> apple-touch-icon.png');
}

async function buildOgImage() {
  console.log('OG image: 1200x630 from FULL-Gradient-Logo-on-navy_PNG.png...');
  // The source is a logo-on-navy. Pad to 1200x630 with the same navy.
  const navy = { r: 5, g: 11, b: 47, alpha: 1 };
  const logoBuf = await sharp(brandLogoNavyPng)
    .resize({ width: 600, height: 600, fit: 'inside', withoutEnlargement: false })
    .toBuffer();
  await sharp({
    create: { width: 1200, height: 630, channels: 3, background: navy },
  })
    .composite([{ input: logoBuf, gravity: 'center' }])
    .png({ compressionLevel: 9 })
    .toFile(path.join(publicDir, 'og-image.png'));
  console.log('  -> og-image.png (1200x630)');
}

async function main() {
  await ensure(srcAssets);
  await ensure(publicDir);
  await buildHero();
  await buildThemes();
  await buildFavicons();
  await buildAppleTouchIcon();
  await buildOgImage();
  console.log('\nAll image generation complete.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
