// Generates responsive, re-compressed WebP variants for the site's content
// images and writes the width manifest consumed by <Img> (src/components/Img.astro).
//
//   npm run images:optimize
//
// Source files live in public/ and are left untouched (they are still used for
// og:image and as the originals). Variants are written next to them as
// `<name>-w<width>.webp` (the `w` infix keeps variants from colliding with
// source names that happen to end in digits, e.g. "...-2026.webp"). The
// manifest records, per public path, which widths
// were actually produced so the component can build a matching `srcset`.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

process.chdir(path.join(path.dirname(fileURLToPath(import.meta.url)), ".."));

// public path -> widths to generate (ascending). Keep widths <= the source
// width so nothing is ever upscaled.
const IMAGES = {
  "/ilmantara.webp": [44, 88],
  "/images/tentang-ilmantara.webp": [480, 800, 1120],
  "/images/work/project-wellness.webp": [480, 800, 1184],
  "/images/work/project-vrm.webp": [480, 800, 1184],
  "/images/journal/biaya-pembuatan-website-jogja-2026.webp": [480, 800, 1184, 2048],
  "/images/journal/berapa-biaya-buat-toko-online-shopify.webp": [480, 800, 1184, 2048],
  "/images/journal/shopify-vs-woocommerce-untuk-umkm.webp": [480, 800, 1184, 2048],
  "/images/journal/landing-page-vs-website-company-profile.webp": [480, 800, 1184, 2048],
  "/images/journal/cara-memilih-software-house-di-yogyakarta.webp": [480, 800, 1184, 2048],
  "/images/jasa-pembuatan-aplikasi.webp": [480, 800, 1184, 1920],
  "/images/jasa-pembuatan-landing-page.webp": [480, 800, 1184, 1920],
  "/images/jasa-pembuatan-website-jogja.webp": [480, 800, 1184, 1920],
  "/images/jasa-shopify.webp": [480, 800, 1184, 1920],
  "/images/ai-automation-jogja.webp": [480, 800, 1184],
};

const QUALITY = 76;
const MANIFEST_PATH = "src/data/image-variants.json";

const manifest = {};
let before = 0;
let after = 0;

for (const [publicPath, requested] of Object.entries(IMAGES)) {
  const input = path.join("public", publicPath);
  const meta = await sharp(input).metadata();
  const dot = publicPath.lastIndexOf(".");
  const base = publicPath.slice(0, dot);
  const ext = publicPath.slice(dot);

  const widths = requested.filter((w) => w <= meta.width);
  if (widths.length === 0) widths.push(Math.min(480, meta.width));

  before += fs.statSync(input).size;
  for (const w of widths) {
    const outPath = path.join("public", `${base}-w${w}${ext}`);
    await sharp(input)
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: QUALITY, effort: 5 })
      .toFile(outPath);
    after += fs.statSync(outPath).size;
  }
  manifest[publicPath] = widths;
  console.log(
    `${publicPath}  ${meta.width}px -> [${widths.join(", ")}]  (${(fs.statSync(input).size / 1024).toFixed(0)} KiB source)`
  );
}

fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + "\n");
console.log(
  `\n${Object.keys(manifest).length} images, ${Object.values(manifest).reduce((n, w) => n + w.length, 0)} variants written.`
);
console.log(`Manifest -> ${MANIFEST_PATH}`);
