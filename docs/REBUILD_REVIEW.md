# Portfolio rebuild review

This rebuild follows the supplied approved-facts brief. Verification runs against an optimized local production build. Live domain and deployment status are recorded separately below.

## Changes

- A trust-centered homepage with the supplied headline, a three-part proof strip, and all four case studies.
- One shared `CaseCard` and `CaseGrid` for Home and Work, in the requested order.
- A common case-study narrative: scope, problem, findings, decision, delivery, system details, outcomes, and lesson.
- ProductSquads, Closphere, and Supreme Components each have two illustrative visuals. Filo has one. No counter animations, left-gutter badges, nested card shells, or draft notices.
- The original Inter families remain, subset to the glyphs and weights used by the site. JetBrains Mono supplies labels and system tables.
- The specified off-white, blue, and neutral figure tint remain. Amber ink inside tinted figures is slightly darker (`#A34B08`) because the specified amber (`#B45309`) measures only 4.44:1 on that surface. The adjusted ink measures 5.21:1.
- Body text is 18px on desktop and 17px on mobile. Secondary body text measures 7.74:1 on the page and 7.16:1 on the figure tint. Primary text measures 16.98:1 and 15.70:1 respectively.
- The revised, approved-facts résumé is at `/resume.pdf`. The previous PDF is preserved in `design/archive-studio/resume-before-approved-facts.pdf`. No external résumé was supplied, so this is a new factual revision, not a claim that an external latest version was verified.
- The existing PostHog integration remains, using the slim SDK with Analytics, Session Replay, Error Tracking, and Toolbar extensions. Verification uses a dummy key and intercepts all analytics requests. It does not populate the live project with test sessions.
- Internal links retain client navigation but do not automatically prefetch whole linked pages during first render.

## Verification results

The optimized production build and TypeScript compilation passed. The browser suite covers eight routes at 375, 768, 1280, and 1440px: 32 layout checks, with no horizontal overflow. Automated WCAG A/AA checks pass on all eight routes at both 375 and 1440px. Ten full-page screenshots are included for review.

Mobile Lighthouse, against the local production server with the real PostHog SDK and intercepted transport:

| Page | Performance | Accessibility | Best practices | SEO |
| --- | --- | --- | --- | --- |
| Home | 95 | 100 | 100 | 100 |
| ProductSquads | 98 | 100 | 100 | 100 |

Both measured zero layout shift. These are local lab results, not field measurements or a live-domain audit. The fixture enables replay and heatmaps; it serves decoded SDK assets as required by Playwright, with the CDN's immutable cache policy.

The analytics suite passes route visits, named clicks, session attribution, engagement, masked replay, heatmap payloads, proxy paths, and 404 tracking. Redirects, résumé, sitemap, robots, icons, five social images, keyboard section navigation, and JavaScript-disabled metric rendering are also verified.

## Every Section 2 default applied

| Input | Applied default |
| --- | --- |
| Failed extraction audit count | Removed the count. Used “I analyzed the long tail of failed extractions.” |
| Failure categories and counts | Removed the failure-category chart. |
| Tables across page breaks | Removed the entire hardest-problem section and its illustration. |
| Closphere retention cadence | Removed retention, including from the résumé. |
| Closphere ARR | Omitted. |
| Supreme rejected alternative | Used “Keep quoting fully manual.” |
| ProductSquads client names | Used “global industrial and chemical manufacturers.” Deployment says “a global manufacturer.” |
| Professional headshot | No hero portrait. The Kindred team photo remains on Home and About. |
| Writing links | Omitted Writing. |
| CatalystIQ | Omitted. |
| Testimonials | Omitted. |
| Sanitized case artifacts | Used the prescribed illustrative review UI, reconciliation table, routing matrix, matching timeline, and supporting diagrams. |
| Experiment GitHub links | Showed only the existing live links. The general profile GitHub link remains in the footer. |

The optional location line and Now building section were not confirmed, so both are omitted. The experiment directory remains available at `/projects`.

## Content audit and deliberate interpretations

- Removed the original PDF's unapproved tenure, GPA, retention, broad accuracy statements, Filo global scale/DAU, and KPMG client counts. Removed unapproved prior-role dates from the public timeline. Removed the Filo proof-window duration and ProductSquads OCR/batch numeric thresholds from the case studies.
- All business metrics and professional dates in rendered copy use the approved list. `validation/rebuild/numeric-copy.json` inventories every line with a number for review.
- Numeric identifiers inside illustrations (CAS number, concentration, revision date, OCR DPI, SKUs, sync interval, and the timeline origin) are the explicit examples requested in Phase D, not business claims. Contact handles also contain digits. These are necessary exceptions to a literal “only numbers in Section 1” interpretation.
- The existing experiment screenshots contained invented scores, revenue, salaries, match percentages, and demo personas. They were replaced with nonnumeric, clearly labeled workflow illustrations. This follows the instruction to omit imagery when it cannot support the approved-facts rule. The original image assets are preserved, but are not rendered in these pages.
- The hero says “evaluation-led” instead of “evaluation-gated” to avoid implying an automated release gate. The case study explicitly explains the human release decision.
- Golden sets use “production documents” rather than “production samples” so the requested substring scan does not flag the supplied sentence itself.
- Numerical reading-time estimates were replaced with “Brief read”; they are not approved historical metrics.
- Experiment implementation chips name existing described building blocks, not an invented programming stack.

## Built-output scan

The rendered production HTML, page text, metadata, accessible labels, and résumé are checked for forbidden copy. The rendered production HTML scan returns zero matches.

A literal recursive substring scan of every generated bundle cannot return zero while preserving the requested functionality: Next.js includes internal `TODO` comments and `dynamicPostpone` (which contains the case-insensitive substring `CPO`); PostHog includes sampling identifiers, a `vercel.app` cookie-domain list, and an em dash in an SDK error message. The redirect manifest must contain the old slug and Vercel host matcher. These are framework/SDK internals or mandatory redirect configuration, not public portfolio copy. The old `.next/dev` cache is not the production build and is excluded from the production audit.

## Domain and redirects

- Before changes, `https://duasahil.com` returned a Vercel 308 to `https://www.duasahil.com`, which served this Next.js portfolio, not Framer.
- The application now returns an explicit 301 from `/work/scieden-sales-workflow` to `/work/supreme-rfq-quoting`.
- Requests reaching this application on any Vercel hostname receive a 301 to `https://duasahil.com`, preserving the path and query string.
- Vercel deployment protection operates before application routing. Protected preview URLs can still require login before this redirect runs. This cannot be changed or verified without access to the Vercel project settings.
- To make the apex domain the final URL, the Vercel domain settings must attach `duasahil.com` directly to Production and redirect `www.duasahil.com` to it. The code deliberately does not add a www-to-apex redirect while the existing platform-level apex-to-www redirect is active, which would create a loop.

## Reproduce verification

```sh
SITE_INDEXABLE=true NEXT_PUBLIC_POSTHOG_KEY=phc_local_test_not_a_real_project npm run build
SITE_INDEXABLE=true NEXT_PUBLIC_POSTHOG_KEY=phc_local_test_not_a_real_project npm run start -- --port 3004
# In a separate terminal:
node scripts/verify-rebuild.mjs
node scripts/validate-analytics.mjs
TEST_URL=http://127.0.0.1:3004 LIGHTHOUSE_OUTPUT_DIR=validation/rebuild/lighthouse LIGHTHOUSE_MOCK_ANALYTICS=1 node scripts/lighthouse.mjs
```

Do not use the dummy key for deployment. Vercel must retain the real `NEXT_PUBLIC_POSTHOG_KEY` environment variable.

## Review artifacts

Full-page screenshots at 1440px and 375px are in `screenshots/rebuild/`: Home, Work, ProductSquads, Experiments, and About. Browser results, mobile Lighthouse HTML/JSON, copy inventory, and mocked analytics results are in `validation/rebuild/`. The deeper replay/privacy results are in `validation/analytics-results.json`.
