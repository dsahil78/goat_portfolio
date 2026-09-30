# Sahil Dua — product-leader portfolio

## Current direction

The latest supplied brief replaces the earlier studio design. The new site uses a warm off-white background, Inter Tight headings, Inter body text, and restrained blue accents. Its first screen establishes Sahil’s identity, focus on AI and enterprise workflows, and three linked hiring signals: AI in production, founder to exit, and US market launch, each backed by verified outcomes.

## Page composition

1. **Introduction:** large name, precise positioning, authentic portrait, work/résumé actions, and company-specific evidence.
2. **Selected work:** a light ProductSquads feature with an illustrative extraction workflow; Closphere and Filo in two editorial columns; a View all work link. Supreme Components is available in the Work directory and its full case study. Every preview connects a problem, a decision, and an outcome.
3. **Experiments:** smaller prototype rows that link to contribution details and the verified external entry points.
4. **Background:** engineering → product → founding a business, an authentic team photo, and completed UW education.
5. **Contact:** direct email, LinkedIn, and one canonical résumé.

The Work directory, four long-form cases, Projects, and About use the same typography, spacing, surfaces, and navigation. Professional case-study slugs and the permanent `/about-me` redirect remain stable.

## Design system

- Content width `min(1120px, calc(100% - 48px))`, within a 1200px maximum.
- Twelve-column desktop grids, independently composed mobile layouts.
- Main section spacing: 96px desktop / 64px mobile.
- White and pale panels; 24px card radius, 28px panel radius, pill actions.
- Colors follow the supplied brief. Blue emphasizes decisions, links, and selected outcomes.
- Inter and Inter Tight are locally hosted variable WOFF2 fonts, with their licenses included.
- Motion uses 220ms transitions and `cubic-bezier(.2,.8,.2,1)`, with reduced-motion support.
- Photographs and interface references come from the verified original portfolio. Reconstructed diagrams are labeled illustrative.

## Technical implementation

Next.js App Router and TypeScript, pre-rendered local content, optimized images, semantic headings, canonical URLs, social metadata, Person structured data, sitemap, and preview noindex. A small client navigation component indicates the active Work location; the page content stays server rendered. No animation library is used.

See [README.md](README.md) for setup and deployment, [content notes](docs/CONTENT_NOTES.md) for the factual baseline, and [validation](docs/VALIDATION.md) for the latest tested state. Earlier design artifacts remain in `design/`, with the immediately preceding implementation archived in `design/archive-studio/`.

## Deployment

Prepared for Vercel. No credentials, domain changes, or hosted deployment are part of this local rebuild. Use a preview deployment first; production indexing is enabled only in the production environment.

## Work navigation update

The header opens `/work`, an editorial directory with company jump links, decision summaries, and comparable outcomes for all four cases. Case-study back links return there. Homepage selected work remains in place. The shared contact panel now uses a heading block above a single aligned contact row.

## Résumé and education alignment

The September 28 supplied résumé is the current download, with the user-confirmed under-seven-day onboarding correction. Both UW and Amity education are shared from `content/profile.ts`. The homepage keeps three lead case studies; Supreme Components stays in the Work directory.
