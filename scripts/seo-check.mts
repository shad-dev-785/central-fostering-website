/**
 * Crawls a running copy of the site and checks the technical SEO of every page in the sitemap.
 *   npm run build && npm start        (in another terminal)
 *   npm run seo:check                 (defaults to http://localhost:3000; pass a URL to check another)
 * It only reads pages. Exit code 1 if any check fails.
 */
const base = (process.argv[2] ?? "http://localhost:3000").replace(/\/$/, "");

type Result = { url: string; fails: string[]; warns: string[] };

const get = async (url: string) => {
  const res = await fetch(url, { redirect: "manual" });
  return { status: res.status, headers: res.headers, text: await res.text() };
};
const attr = (html: string, re: RegExp) => re.exec(html)?.[1]?.replace(/&amp;/g, "&").replace(/&#x27;/g, "'").replace(/&quot;/g, '"');
const meta = (html: string, key: string) =>
  attr(html, new RegExp(`<meta[^>]+(?:name|property)="${key}"[^>]+content="([^"]*)"`, "i")) ??
  attr(html, new RegExp(`<meta[^>]+content="([^"]*)"[^>]+(?:name|property)="${key}"`, "i"));

const sitemapRes = await get(`${base}/sitemap.xml`);
if (sitemapRes.status !== 200) {
  console.error(`Could not read ${base}/sitemap.xml (status ${sitemapRes.status}). Is the server running?`);
  process.exit(1);
}
const urls = [...sitemapRes.text.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

const results: Result[] = [];
const titles = new Map<string, string>();
const descriptions = new Map<string, string>();
const internal = new Set<string>();

for (const loc of urls) {
  // The sitemap lists the public domain; fetch the same path from the server we are checking.
  const path = new URL(loc).pathname;
  const url = `${base}${path === "/" ? "" : path}` || base;
  const r: Result = { url: path, fails: [], warns: [] };
  const page = await get(path === "/" ? `${base}/` : url);
  if (page.status !== 200) r.fails.push(`HTTP ${page.status}`);
  const html = page.text;

  const title = attr(html, /<title[^>]*>([^<]*)<\/title>/i);
  if (!title) r.fails.push("missing <title>");
  else {
    if (title.length > 65) r.warns.push(`title is ${title.length} characters (aim for 60 or fewer)`);
    if (title.length < 15) r.warns.push(`title is short (${title.length})`);
    if (titles.has(title)) r.fails.push(`duplicate title with ${titles.get(title)}`);
    titles.set(title, path);
  }

  const desc = meta(html, "description");
  if (!desc) r.fails.push("missing meta description");
  else {
    if (desc.length < 70) r.warns.push(`description is short (${desc.length})`);
    if (desc.length > 165) r.warns.push(`description is ${desc.length} characters (aim for 160 or fewer)`);
    if (descriptions.has(desc)) r.fails.push(`duplicate description with ${descriptions.get(desc)}`);
    descriptions.set(desc, path);
  }

  const canonical = attr(html, /<link[^>]+rel="canonical"[^>]+href="([^"]*)"/i) ?? attr(html, /<link[^>]+href="([^"]*)"[^>]+rel="canonical"/i);
  if (!canonical) r.fails.push("missing canonical link");
  else if (canonical.replace(/\/$/, "") !== loc.replace(/\/$/, "")) r.fails.push(`canonical ${canonical} does not match sitemap URL ${loc}`);

  const h1s = (html.match(/<h1[\s>]/g) ?? []).length;
  if (h1s !== 1) r.fails.push(`${h1s} <h1> elements (needs exactly 1)`);

  if (!/<html[^>]+lang="en-GB"/i.test(html)) r.fails.push('missing lang="en-GB"');
  if (!meta(html, "viewport")) r.fails.push("missing viewport meta");
  for (const k of ["og:title", "og:description", "og:image", "og:url", "twitter:card"]) if (!meta(html, k)) r.fails.push(`missing ${k}`);
  const robots = meta(html, "robots");
  if (robots && /noindex/i.test(robots)) r.fails.push(`robots meta says "${robots}" (page will not be indexed)`);

  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  if (blocks.length === 0) r.fails.push("no JSON-LD structured data");
  const types: string[] = [];
  for (const b of blocks) {
    try {
      const j = JSON.parse(b[1].replace(/\\u003c/g, "<"));
      types.push(String(j["@type"]));
    } catch {
      r.fails.push("JSON-LD does not parse");
    }
  }

  for (const m of html.matchAll(/<img\b[^>]*>/g)) if (!/\balt=/.test(m[0])) r.fails.push("an <img> has no alt attribute");
  for (const m of html.matchAll(/<a\b[^>]*href="(\/[^"#?]*)[^"]*"[^>]*>/g)) internal.add(m[1]);
  if (!blocks.length || !types.length) continue;
  results.push(r);
}

// Every internal link must resolve.
const broken: string[] = [];
for (const href of internal) {
  if (/^\/(_next|api)\//.test(href) || href === "/feed.xml") continue;
  const res = await fetch(`${base}${href}`, { redirect: "manual" });
  if (res.status >= 400) broken.push(`${href} (${res.status})`);
}

// Site-wide files
const siteFails: string[] = [];
const robotsTxt = await get(`${base}/robots.txt`);
if (robotsTxt.status !== 200) siteFails.push("robots.txt missing");
else if (/Disallow:\s*\/\s*$/m.test(robotsTxt.text)) siteFails.push("robots.txt blocks the whole site (expected until NEXT_PUBLIC_SITE_URL is a real domain)");
else if (!/Sitemap:/i.test(robotsTxt.text)) siteFails.push("robots.txt does not list the sitemap");
for (const p of ["/manifest.webmanifest", "/icon.png", "/apple-icon.png", "/favicon.ico", "/logo.png", "/logo-light.png", "/opengraph-image", "/feed.xml"]) {
  const res = await get(`${base}${p}`);
  if (res.status !== 200) siteFails.push(`${p} returned ${res.status}`);
}
const notFound = await get(`${base}/this-page-should-not-exist`);
if (notFound.status !== 404) siteFails.push(`unknown URLs return ${notFound.status}, not 404`);
if (!/noindex/i.test(notFound.text)) siteFails.push("the 404 page is not marked noindex");

let failCount = siteFails.length + broken.length;
for (const r of results) {
  failCount += r.fails.length;
  const flag = r.fails.length ? "FAIL" : r.warns.length ? "warn" : " ok ";
  console.log(`[${flag}] ${r.url}`);
  for (const f of r.fails) console.log(`        x ${f}`);
  for (const w of r.warns) console.log(`        ! ${w}`);
}
if (broken.length) console.log(`\nBroken internal links:\n${broken.map((b) => `  x ${b}`).join("\n")}`);
if (siteFails.length) console.log(`\nSite-wide problems:\n${siteFails.map((b) => `  x ${b}`).join("\n")}`);
console.log(`\n${results.length} pages checked, ${internal.size} internal links followed, ${failCount} failure(s).`);
process.exit(failCount ? 1 : 0);
