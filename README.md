# Central Fostering website

A website for a Birmingham-based fostering agency recruiting across the East and West Midlands: Next.js 16 (App Router), TypeScript, Tailwind CSS 4.
The public pages are static. Three forms (enquiry, call back, apply) post to small API routes that validate,
store the submission in a database and email the agency.

## Run it

```bash
npm install
npm run dev          # http://localhost:3000
```

Copy `.env.example` to `.env.local` for email and database settings. Without them the forms still work
(submissions are saved to a local file in `data/`), but nobody is emailed.

## Where to change things

| What | Where |
| --- | --- |
| Name, phone, email, address, social links, Ofsted details, **logo** | `src/config/site.ts` |
| Menu and footer links | `src/config/site.ts` |
| Fostering types, FAQs, process steps, support list | `src/content/fostering.ts` |
| Team profiles and photos | `src/content/team.ts`, `src/assets/team/` |
| Blog posts | `src/content/posts.ts` |
| Areas covered (East and West Midlands) | `src/content/areas.ts` |
| Colours and fonts | `src/app/globals.css` (tokens) and `src/app/layout.tsx` (fonts) |
| Photos | Put the file in `src/assets/photos/`, shrink it with `npm run photo:optimise -- --width=1600 <in> <out>`, then `<PhotoSlot src={photo} alt="what the photo shows" />` (import the file at the top of the page). White-background studio photos: add `cutout` so the white blends into the page. |
| Home page hero photo | `src/assets/photos/hero-sunset.jpg` (see `src/components/HeroPhoto.tsx`) |

## Backend and database

* **Backend:** Next.js route handlers in `src/app/api/*`, sharing one pipeline in `src/lib/submit.ts`
  (origin check, size limit, rate limit, honeypot, zod validation, save, email via nodemailer).
* **Database:** libSQL (SQLite-compatible) through `@libsql/client`, in `src/lib/db.ts`. One table, `submissions`,
  created on first use. Locally it is a file (`data/`, git-ignored); in production use a hosted libSQL/Turso database
  or keep the file on a server with a persistent disk.

## Checks

```bash
npm test               # validation + form pipeline tests (Node's built-in runner)
npm run typecheck
npm run lint
npm run build
npm run seo:check      # crawl a running copy: titles, descriptions, canonicals, structured data, links
npm run prelaunch      # lists every placeholder still in the site (fails until they are all replaced)
```

`seo:check` and `prelaunch` are separate on purpose: the first proves the technical SEO, the second proves the content is real.

## SEO in short

* Every page has its own title, description, canonical URL and social card (`src/lib/seo.ts`).
* Structured data: Organization, WebSite, BreadcrumbList on every page, BlogPosting on articles, FAQPage on the FAQ page.
* `sitemap.xml`, `robots.txt`, an RSS feed (`/feed.xml`), a manifest, icons and a generated share image.
* **Indexing is off until a real domain is set.** While `NEXT_PUBLIC_SITE_URL` is `localhost` (or unset),
  `robots.txt` blocks everything and every page is `noindex`. Setting a real `https://` domain turns indexing on.

## Form data (personal data)

Submissions live in the `submissions` table. Only fields the forms collect are stored; consent is recorded.
Nothing is logged, and the API never echoes data back. Export for staff: `npm run export:submissions > file.csv`
(the file holds personal data, so keep it private and delete it when finished).

## Hosting

* **Easiest:** Vercel for the site plus a hosted libSQL/Turso database (`DATABASE_URL`, `DATABASE_AUTH_TOKEN`), and an SMTP provider for email.
  Choose UK (London) or EU regions for UK GDPR.
* **Or** a UK server/VPS running `npm run build && npm start` with the database file on a persistent disk.

Before launch: run `npm run prelaunch`, set the real domain, get the privacy and cookie policies reviewed, and run `npm run seo:check` against the live URL.
