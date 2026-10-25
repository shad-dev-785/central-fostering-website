/**
 * Run before going live:   npm run prelaunch
 * Lists everything that is still a placeholder, because search engines and visitors would see it.
 * Blockers make the command fail (exit code 1); warnings are things to confirm.
 */
import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

// Load .env.local / .env.production the same simple way Next.js does, so the check sees your real settings.
for (const f of [".env.production", ".env.local"]) {
  if (!existsSync(f)) continue;
  for (const line of readFileSync(f, "utf8").split(/\r?\n/)) {
    const m = /^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/.exec(line);
    if (m && !(m[1] in process.env)) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}

const { site } = await import("../src/config/site");
const { stories } = await import("../src/content/stories");
const { boroughs } = await import("../src/content/areas");

const blockers: string[] = [];
const warnings: string[] = [];

// --- Address and contact details
if (/localhost|127\.0\.0\.1|\.example/i.test(site.url)) blockers.push(`NEXT_PUBLIC_SITE_URL is "${site.url}". Set the real https:// domain (search engines are told to stay away until you do).`);
if (!/^https:/.test(site.url) && !/localhost/.test(site.url)) blockers.push("The site URL should start with https://");
if (/\.example$/i.test(site.contact.email)) blockers.push(`Email is a placeholder (${site.contact.email}). Edit src/config/site.ts.`);
if (/^020 7946/.test(site.contact.phone)) blockers.push(`Phone is a reserved example number (${site.contact.phone}). Edit src/config/site.ts.`);
if (site.contact.address.some((l) => /example/i.test(l))) blockers.push("Office address is a placeholder. Edit src/config/site.ts.");

// --- Content
const sample = stories.filter((s) => s.sample).length;
if (sample) blockers.push(`${sample} carer stories are SAMPLES (src/content/stories.ts). Replace with real, consented stories or remove the section.`);

const walk = (dir: string): string[] =>
  readdirSync(dir).flatMap((n) => {
    const p = join(dir, n);
    return statSync(p).isDirectory() ? walk(p) : p.endsWith(".tsx") ? [p] : [];
  });
let slots = 0;
for (const file of walk("src")) {
  const src = readFileSync(file, "utf8");
  for (const m of src.matchAll(/<PhotoSlot\b[\s\S]*?\/>/g)) if (!/\bsrc=/.test(m[0])) slots++;
}
if (slots) blockers.push(`${slots} photo placeholders still show a "Photo placeholder" label. Add real images (PhotoSlot src="/photos/...").`);

// The hero photo: the stand-in image is detected by its fingerprint.
const placeholderHash = readFileSync("src/assets/.placeholder-hash", "utf8").trim();
if (createHash("sha256").update(readFileSync("src/assets/hero-family.jpg")).digest("hex") === placeholderHash) {
  blockers.push("The home page hero still uses the stand-in image. Save the real photo over src/assets/hero-family.jpg.");
}

if (!site.logo) blockers.push("No logo set (site.logo in src/config/site.ts). A placeholder mark is being shown.");

// --- Trust and regulation
if (!site.regulation.ofstedUrn) warnings.push("Ofsted URN not set. Add it (and the inspection report link) if the agency is registered; the site shows it automatically.");
if (!Object.values(site.social).some(Boolean)) warnings.push("No social media links set (site.social). Add the agency's real accounts.");
if (boroughs.every((b) => b.covered)) warnings.push("All London boroughs are marked as covered (src/content/areas.ts). Confirm this is true.");

// --- Forms and data
if (!process.env.SMTP_HOST || !process.env.NOTIFY_EMAIL_TO) blockers.push("Email notifications are off (SMTP_HOST / NOTIFY_EMAIL_TO). Staff would not be told about new enquiries.");
if (/^file:/.test(process.env.DATABASE_URL ?? "file:")) warnings.push("DATABASE_URL is a local file. Fine on a server with a persistent disk; on Vercel-style hosting use a hosted libSQL/Turso database.");

warnings.push("Privacy and cookie policies are drafts: have a data protection lead or solicitor review them, and confirm the 12 month retention period.");
warnings.push("Add the agency's real current weekly rates to the Finance page if you want to publish them.");

const print = (label: string, list: string[]) => {
  if (!list.length) return;
  console.log(`\n${label} (${list.length})`);
  for (const l of list) console.log(`  - ${l}`);
};
print("BLOCKERS: fix before launch", blockers);
print("WARNINGS: confirm before launch", warnings);
console.log(blockers.length ? `\nNot ready: ${blockers.length} blocker(s).` : "\nNo blockers found.");
process.exit(blockers.length ? 1 : 0);
