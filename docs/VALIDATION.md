# Portfolio validation — September 28, 2026

The visual and content audit targets Senior / Lead AI Product Manager roles. Measurements use the local optimized Next.js build at `http://127.0.0.1:3001`. This report supersedes the earlier studio and September 27 rebuild reports.

## Build and browser coverage

- `npm run diagrams:build`: eight source diagrams generated successfully into sixteen desktop/mobile SVGs and a dimension manifest.
- `npm run typecheck` and `npm run build`: passed; all eight content pages pre-rendered.
- Eight routes at 360, 390, 768, 1024, and 1440px: 40 layout combinations.
- Sixteen axe scans cover WCAG 2 A/AA and WCAG 2.1 A/AA tags, including the visible-label consistency rule.
- Zero horizontal overflow, broken images, missing local anchors, browser errors, or automated accessibility violations in the browser pass.
- All eight pages checked at 200% text enlargement on a 390px viewport.
- Keyboard skip links, dedicated navigation destinations, active-page indicators, company jump links, case study contents, refresh, direct loads, and reduced motion checked.
- SVG image loading, desktop/mobile source selection, keyboard disclosure, and diagram text explanations checked. Diagram and case reading remain available without JavaScript.
- Internal image and diagram links return successful responses. Original interface images and full diagrams open in new tabs with explicit accessible labels.
- The 404 skip target receives focus; unknown cases return 404. `/about-me` returns 308 to `/about`.
- Page metadata, canonicals, preview noindex, sitemap, robots, icon, social image, and canonical résumé PDF checked.
- Desktop/mobile screenshots were captured and visually reviewed. Diagram labels were shortened and tablet layouts switched to vertical to improve readability.

The canonical résumé was separately text-compared and visually inspected during the earlier résumé reconciliation: one page, UW GPA 3.76/4.0, Amity CGPA 8.48/10.0, intact links, and the user-confirmed under-seven-day onboarding correction. This audit did not change the PDF.

Machine-readable results: `validation/browser-results.json`. Screenshots: `validation/screenshots/`. Generated validation artifacts are local and ignored by version control.

## Mobile Lighthouse

Lighthouse 13.5.0, headless Chrome 153, simulated mobile network throttling, 4× CPU slowdown, 412×823 viewport. Five routes audited serially, without simultaneous browser tests.

| Page | Performance | Accessibility | Best practices | SEO | LCP | CLS |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Home | 99 | 100 | 100 | 100 | 2.1 s | 0 |
| Work | 99 | 100 | 100 | 100 | 2.0 s | 0 |
| ProductSquads case | 97 | 100 | 100 | 100 | 2.6 s | 0 |
| Projects | 96 | 100 | 100 | 100 | 2.7 s | 0 |
| About | 99 | 100 | 100 | 100 | 2.0 s | 0 |

Total blocking time: Home 40 ms, Work 30 ms, ProductSquads 10 ms, Projects 20 ms, About 20 ms. These are local laboratory measurements, not field data or a guarantee of hosted scores. Production SEO was tested with `SITE_INDEXABLE=true` at build and start. The normal noindex preview build was restored afterward.

HTML, JSON, and summary reports: `validation/visual-audit-lighthouse/`. Earlier report directories are historical. Reproduce with:

```sh
SITE_INDEXABLE=true npm run build
SITE_INDEXABLE=true npm run start -- --port 3001
# In another terminal:
TEST_URL=http://127.0.0.1:3001 LIGHTHOUSE_OUTPUT_DIR=validation/visual-audit-lighthouse npm run test:lighthouse
```

Stop the audit server, run `npm run build`, and restart normally to restore preview noindex. The browser suite expects preview settings.

Mermaid is a development dependency; diagrams ship as SVG images with no Mermaid runtime. Lighthouse still flags opportunities in framework JavaScript, font/CSS request chains, and portrait image delivery. Work also records main-thread/JavaScript execution diagnostics despite low measured blocking time. No claim is made that every performance diagnostic is resolved.

## Scope and limits

Automated accessibility checks are supplemented by keyboard, text enlargement, reduced motion, no-JavaScript, and visual checks. They do not establish complete accessibility conformance. Safari, Firefox, physical devices, and a full screen-reader audit were not run.

External demo entry points retain the September 27 check recorded in [CONTENT_NOTES.md](CONTENT_NOTES.md). Authenticated third-party workflows were not tested; LinkedIn blocked automated access. The local audit validates the portfolio’s destinations and labels without submitting external forms.

No Vercel deployment, hosted performance, custom domain, DNS, or production indexing was verified. The local preview is running on port 3001. Deployment steps are in [README.md](../README.md).

## PostHog integration follow-up

The analytics integration was added after the visual-audit measurements above. Its build/type checks, live proxy asset check, intercepted browser verification, and remaining live-ingestion limitations are documented in [ANALYTICS.md](ANALYTICS.md). The earlier 40-layout and Lighthouse results do not establish performance or end-to-end event delivery with analytics enabled.

## Case studies v2

The Next.js 16.3.6 production build passes. All four cases were checked at 375px, 768px, and 1440px in both light and dark themes. The 24 production screenshots and review checklist are linked in [CASE_STUDIES_V2.md](CASE_STUDIES_V2.md). All figures render labeled SVGs; the four-tier evaluation figure replaces the old blank diagram.

The intercepted analytics run passed all 24 combinations with exactly one `diagram_viewed` per figure. The separate analytics regression passed for route visits, custom clicks, attribution, engagement, masked replay snapshots, heatmaps, and 404 events. These use the actual SDK with mocked project configuration and locally intercepted transport, and do not establish live project ingestion.

Machine-readable records: `validation/case-studies-v2.json` (production layouts), `validation/case-studies-v2-with-analytics.json` (diagram events), `validation/analytics-results.json` (broader analytics/replay), and `validation/browser-results.json` (site-wide regression). No real key or paid service was added.

The final site-wide regression also passed 40 page/width combinations, WCAG scans, keyboard navigation, local links, résumé delivery, redirects, metadata, 200% text enlargement, and content without JavaScript.
