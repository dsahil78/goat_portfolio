# Sahil Dua — portfolio

A Next.js App Router portfolio rebuilt from the latest premium product-leader brief. It includes the homepage, a dedicated Work directory, four professional case studies, Projects, About, and a custom 404. Content is pre-rendered. The header navigation marks the current page or Work location; an invisible analytics component tracks interactions when a PostHog key is configured. Content and navigation remain available without JavaScript. There is no database, authentication, or contact-form backend.

## Local development

Use Node.js 22.12 or newer and npm. Exact resolved dependency versions are committed in `package-lock.json`.

```sh
npm ci
npm run dev
```

Open http://127.0.0.1:3000. If that port is occupied, add `-- --port 3001` to the dev or start command. The rebuild review server uses http://127.0.0.1:3001. For the production server:

```sh
npm run build
npm run start
```

The earlier static design studies and archived studio implementation remain in `design/`; they are not part of the production application or Vercel upload.

## Editing

| Content | Location |
| --- | --- |
| Professional stories, metrics, decisions, and comparisons | `content/cases/*.json` and `content/case-studies.ts` |
| Legacy overview/prototype diagram sources and mobile variants | `content/diagrams/*.mmd` |
| Diagram descriptions, case focus, interface references | `content/visual-studies.ts` |
| Generated diagram assets and dimensions | `public/diagrams/` and `content/diagram-assets.ts` |
| Prototype descriptions, status, images, links, and homepage selection | `content/projects.ts` |
| Contact, biography, education, résumé path, and experience timeline | `content/profile.ts` |
| Layout, responsive behavior, color, and type | `app/globals.css` and `app/case-studies.css` |
| Homepage presentation | `app/page.tsx` and `components/project-previews.tsx` |
| Work directory and navigation | `app/work/page.tsx` and `components/main-navigation.tsx` |
| Reusable case-study presentation and SVG diagrams | `components/case-study.tsx`, `components/diagrams/`, `components/case-v2/` |
| Images and canonical résumé | `public/images/` and `public/resume.pdf` |

When adding a professional case, add a typed entry to `cases` and its visual configuration in `caseVisuals`; its static route, sitemap entry, and next-case navigation follow automatically. Keep the existing slugs when editing. Add a permanent redirect in `next.config.ts` before renaming a published URL. The v2 brief and `docs/CASE_STUDIES_V2.md` supersede the older case-study factual baseline in `docs/CONTENT_NOTES.md`. Keep unresolved confirmation notices visible.

The résumé uses one canonical path. Replace the PDF in place to update every résumé link. Product images have declared dimensions and use `next/image`; Inter Tight headings and Inter body text are hosted locally through `next/font/local`. The two variable Latin WOFF2 files total about 91 KB, with OFL licenses in `public/fonts/`. No browser requests to Google Fonts are required.

## Analytics

PostHog is the only analytics SDK. Set `NEXT_PUBLIC_POSTHOG_KEY` in `.env.local` for local use and in the hosting environment before rebuilding for deployment. With no key, capture is disabled. The integration uses a same-origin `/ingest` proxy, anonymous events, masked session replay, heatmaps, and browser exceptions. No payment method or paid add-on was added.

See [docs/ANALYTICS.md](docs/ANALYTICS.md) for the full event dictionary, free limits, project-side replay activation, privacy settings, and verification steps. Real project ingestion cannot be verified without its key. Previous Lighthouse measurements predate the analytics SDK and should not be treated as measurements of an enabled analytics build.

## System diagrams

Eight Mermaid diagrams are generated as SVGs ahead of deployment. Mermaid 11.17.2 is a development dependency; no Mermaid renderer is sent to visitors. Every reconstruction is labeled illustrative, with descriptions grounded in existing case studies and the résumé. NXTai is explicitly a prototype.

Edit `content/diagrams/*.mmd`, then run:

```sh
npm run diagrams:build
```

Generation uses the local Playwright Chromium installation. Commit the generated `public/diagrams/` SVGs and `content/diagram-assets.ts` together with their sources. Ordinary Next.js builds and Vercel deployment do not need Chromium. Mobile overrides live beside the source as `*.mobile.mmd`; other diagrams switch from horizontal to vertical automatically. The renderer creates native SVG text with accessible titles/descriptions and rejects scripts or HTML foreign objects.

Full diagrams use the vertical variant through tablet widths, with an always-vertical evaluation loop inside the narrower narrative column. Each has an expandable text explanation and an original-size SVG link. All remain usable without JavaScript. Original product screenshots also link to full-size assets.

## Validation

```sh
npm run typecheck
npm run build
npx playwright install chromium
# Start the production server in another terminal first.
npm run test:browser
npm run test:lighthouse
```

The browser check covers all eight pages at 360, 390, 768, 1024, and 1440px, axe accessibility checks, keyboard navigation, reduced motion, image loading, routes and refresh, the PDF, internal links, metadata, preview noindex, 200% text enlargement, and reading without JavaScript. Screenshots and machine-readable reports are written to the ignored `validation/` directory. `TEST_URL` can point checks to another running instance. The browser suite expects preview noindex behavior.

The header links directly to `/work`, `/projects`, and `/about`; Contact links to the homepage contact section. The homepage’s View work action still scrolls to selected work. Case-study back links return to the Work directory. Full case studies, the experiment directory, and the background page retain separate routes.

Lighthouse runs mobile audits for Home, Work, ProductSquads, Projects, and About. Do not run other browser tests at the same time; contention affects performance scores. The current report and limitations are recorded in `docs/VALIDATION.md`.

`scripts/audit-demos.mjs` optionally rechecks the external projects' public entry points. It does not create accounts or submit forms. It is separate from the local test suite because third-party availability can change.

## Vercel preview deployment

The site targets Vercel's Next.js runtime. Deployment authentication was not present in the implementation environment, so no cloud deployment is claimed.

From this project directory, authenticate and create a **preview**:

```sh
npx vercel@latest login
npx vercel@latest
```

Select the intended Vercel account/team, create or select the portfolio project, and use `./` as the root. Accept Next.js detection and the default build settings (`npm run build`). The CLI returns the preview URL. Do not use `--prod` for the initial preview. No domain or DNS changes are needed.

Alternatively, import the repository in the Vercel dashboard, select Next.js, and use the project root. No secrets or environment variables are required. `.vercelignore` excludes design studies and local audit artifacts from CLI deployments.

## SEO and environment behavior

`SITE_URL` optionally overrides the production origin; it defaults to `https://duasahil.com`. Do not set it to the preview hostname. All pages have unique titles/descriptions, canonical URLs, social metadata, a generated Open Graph image, a custom icon, Person structured data, a sitemap, and robots configuration.

Only `VERCEL_ENV=production` enables indexing on Vercel. Previews carry both robots metadata and the `X-Robots-Tag: noindex, nofollow` response header. Robots crawling is allowed so crawlers can see noindex. This intentionally lowers preview Lighthouse SEO scores. Vercel's preview protection can also require authentication when sharing a cloud preview.

For a local production-SEO audit only, build and start with `SITE_INDEXABLE=true`. Vercel preview deployments ignore this override. Restore the default build afterward. `.env.example` documents optional configuration; do not commit local secrets.

After reviewing the preview, a production deployment is a separate step. Domain or DNS changes were not made as part of this implementation.

Framework references: [Next.js installation](https://nextjs.org/docs/app/getting-started/installation), [metadata and robots](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots), and [Vercel environments](https://vercel.com/docs/deployments/environments).

## Case studies v2 review

See [the review checklist and screenshots](docs/CASE_STUDIES_V2.md). `npm run test:case-studies` checks the four cases at three widths in both themes and saves 24 full-page screenshots. Use `TEST_URL` to select the local server; enable `TEST_ANALYTICS=1` only against the documented dummy-key server with intercepted transport.
