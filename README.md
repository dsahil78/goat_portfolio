# Sahil Dua portfolio

A Next.js portfolio for technical product management across AI platforms, enterprise SaaS, and marketplaces. The site uses an approved-facts content model and a common case-study template built around how each product earned trust.

## Development

Requires Node.js 22.12 or newer.

```sh
npm ci
npm run dev
```

For production:

```sh
npm run build
npm run start
```

The canonical domain is `https://duasahil.com`. Vercel Production builds are indexable; previews remain noindex. For local SEO checks, set `SITE_INDEXABLE=true` before building and starting the server.

## Content and design

- `content/cases/`: approved case-study facts and narrative.
- `content/profile.ts`: biography, experience, education, and certifications.
- `content/projects.ts`: experiment descriptions and existing live links.
- `components/project-previews.tsx`: shared Home and Work cards.
- `components/case-study.tsx`: common case-study layout.
- `components/case-visuals.tsx`: code-native illustrative artifacts.
- `components/experiment-visual.tsx`: nonnumeric experiment illustrations.
- `app/globals.css` and `app/case-studies.css`: responsive design system.
- `public/resume.pdf`: latest supplied résumé, copied from `public/Resume-Sahil_Dua.pdf`. All résumé links use `/resume.pdf`; replace this file when updating the résumé.

The fonts are self-hosted Inter, Inter Tight, and JetBrains Mono. Font licenses are included under `public/fonts/`. The Inter files retain the weights and characters currently used by the site; expand their character coverage before adding another language.

## Analytics

The existing PostHog browser SDK handles page views, interaction events, engagement, session replay, heatmaps, and browser exceptions. It is inactive without `NEXT_PUBLIC_POSTHOG_KEY`.

Set your US PostHog project key in `.env.local` locally and in Vercel's Production environment for the live site. Rebuild after changing the key. Session Replay must also be enabled in the PostHog project. The site uses an `/ingest` reverse proxy; server logging is not installed.

Tests use a dummy key and intercepted requests. They never validate account billing or live dashboard ingestion. See [analytics details](docs/ANALYTICS.md).

## Validation and handoff

See [the rebuild review](docs/REBUILD_REVIEW.md) for all applied defaults, numeric audit boundaries, domain setup, and exact verification commands.

- `npm run typecheck`: Next.js route types and TypeScript.
- `npm run test:browser`: all public pages at 375, 768, 1280, and 1440px; accessibility; forbidden copy; relative links; redirects; SEO assets; screenshots; core analytics.
- `npm run test:analytics`: real SDK with mocked ingestion, replay privacy, attribution, and interaction coverage.
- `npm run test:lighthouse`: mobile Home and ProductSquads audits. Set `TEST_URL` to the running production build.

Full-page review images are in `screenshots/rebuild/`. Machine-readable test output is in ignored `validation/`.
