/**
 * Shrinks a photo so it is light enough for the web, without visible quality loss.
 *   npm run photo:optimise -- src/assets/photos/hero-sunset.jpg
 *   npm run photo:optimise -- --width=1600 <input.jpg> <output.jpg>     (in-page photos do not need 2400px)
 * Resizes to at most 2400px wide by default (sharp on large monitors; override with --width=), re-encodes as a progressive JPEG (quality 80) and overwrites the file.
 * Pass a second argument to write somewhere else instead. Next.js also serves smaller versions to phones automatically.
 */
import { readFileSync, statSync, writeFileSync } from "node:fs";
import sharp from "sharp";

const args = process.argv.slice(2);
const widthArg = args.find((a) => a.startsWith("--width="));
const maxWidth = widthArg ? Number(widthArg.split("=")[1]) : 2400;
const [input, output = input] = args.filter((a) => !a.startsWith("--"));
if (!input) {
  console.error("Usage: npm run photo:optimise -- <photo.jpg> [output.jpg]");
  process.exit(1);
}

const before = statSync(input).size;
const meta = await sharp(input).metadata();
const buf = await sharp(readFileSync(input))
  .rotate() // respect the camera's orientation
  .resize({ width: maxWidth, withoutEnlargement: true })
  .jpeg({ quality: 80, progressive: true, mozjpeg: true })
  .toBuffer();
writeFileSync(output, buf);
const after = await sharp(buf).metadata();
console.log(`${input}: ${meta.width}x${meta.height}, ${(before / 1024).toFixed(0)} KB  ->  ${after.width}x${after.height}, ${(buf.length / 1024).toFixed(0)} KB  (${output})`);
