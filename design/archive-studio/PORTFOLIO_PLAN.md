# Sahil Dua — portfolio strategy & development plan

Approved direction · Implemented in Next.js · September 27, 2026

## Recommendation

Build a portfolio around consequential product decisions. Your strongest evidence is the connection between technical judgment, customer adoption, and commercial outcomes: changing the architecture at ProductSquads, changing the business proposition at Closphere, and changing the matching model for Filo’s US launch.

The selected direction is **modern product studio**: bold sans-serif typography, large product visuals, confident deep blue, and tighter copy. Your name anchors a compact introduction. Product evidence takes over quickly: a dominant ProductSquads feature, a large Closphere dashboard image, and the Filo marketplace launch. The public identity stays **Product Manager & Founder**. Leadership is demonstrated through scope, decisions, collaboration, and results.

The full Next.js implementation now lives in `app/`, `components/`, and `content/`. See [README.md](README.md) for setup, content editing, and Vercel deployment. The original design studies remain in `design/` as reference artifacts; they are not the production site.

## The hiring experience

| Reading window | Question the site should answer | Design response |
| --- | --- | --- |
| First 10 seconds | Who is Sahil, and is his experience relevant? | Name, clear identity, concise positioning, three experience signals, and visible selected work |
| About 30 seconds | Has he delivered outcomes and made meaningful decisions? | Project preview with problem, key decision, two contextual metrics, and a purposeful diagram |
| Several minutes | How does he lead through ambiguity and trade-offs? | Evidence, alternatives, individual ownership, collaborators, costs, outcomes, and learning |
| Ready to connect | How do I contact or evaluate him further? | One résumé PDF, direct email, LinkedIn, and next-case navigation |

Do not make a visitor interpret an unlabeled wall of numbers. Tie every metric to its company and context. Keep the first work heading visible in the initial desktop viewport; on mobile, prioritize readable identity and a direct jump to work.

## Selected visual direction: modern product studio

The site should feel like a product professional’s studio: direct, visual, and specific. Use generous type and image scale while keeping the first work section visible early.

- **Palette:** white `#FFFFFF`, ink `#16191C`, deep blue `#153CAC`, secondary text `#626873`, thin rules `#D8DCE3`, and pale supporting surfaces `#EDF1FA`.
- **Typography:** bold sans-serif display type and readable sans-serif body text. The concept uses Arial for portability, with careful scale and spacing. No italic serif headlines. Assess a licensed, self-hosted sans-serif during production if it improves the result; use at most two families.
- **Layout:** a 1,320px desktop content width; compact name-led introduction and authentic portrait; a full-width blue ProductSquads feature; a large Closphere product image with an adjacent decision and results; an alternating Filo visual/story composition; a small Supreme Components row. Projects are simple rows, and the personal section pairs a team photo with a short narrative.
- **Signature:** a deep-blue left rule and a small “Key decision” label. The decision is a specific action, not a generic principle. In longer stories it expands into alternatives, evidence, and what the decision cost.
- **Visuals:** annotated original product material where suitable, explanatory HTML/CSS diagrams where clearer. Label reconstruction as illustrative. Never invent a production UI.
- **Mobile:** stack the problem, decision, results, and visual in reading order. Keep navigation visible and simple. Recompose dense diagrams vertically. Convert the desktop contents rail to a compact in-flow section index.
- **Motion:** restrained link and focus feedback only; respect reduced motion. Reading never waits for an entrance animation.

Reference principles reviewed: the direct identity and accessible projects on [Brian Lovin’s site](https://brianlovin.com/), work-centered leadership on [Kenny Chen’s site](https://www.kennychen.net/), selectivity on [Julie Zhuo’s site](https://juliezhuo.com/), and workflow communication on [Linear](https://linear.app/). These inform the direction without supplying a copied composition.

## Proposed homepage

**Introduction.** A large “Sahil Dua.” headline with the Product Manager & Founder identity and a source portrait. Proposed headline:

> Sahil Dua.

Supporting copy:

> I build AI and enterprise products. Previously, I founded an inventory SaaS and helped take Filo into the US.

Actions: Explore my work and a persistent contact link. The blue feature immediately below the introduction carries the first outcome evidence. A closing email invitation supports hiring-manager contact.

**Selected work.** Three main stories in deliberate order:

| Story | What it demonstrates | Decision to feature | Outcome emphasis |
| --- | --- | --- | --- |
| ProductSquads | Technical product judgment and AI reliability | Replace six planned format parsers with schema-driven retrieval, evaluation, and review | 100K+ documents/month; 95%+ field-level accuracy; 70% lower turnaround in the full case |
| Closphere | Founder judgment, discovery, adoption, and commercial ownership | Move from ERP replacement to an ERP-agnostic intelligence layer | 63 paying companies; onboarding from 6+ weeks to under 7 days; technology sale |
| Filo | Market expansion and marketplace execution | Adapt matching to US liquidity, pricing, and session intent | 120K US users and $1.5M ARR within six months; 98% matched under 45 seconds |
| Supreme Components, smaller entry | Enterprise automation and operational controls | Define guardrails and account context for AI-assisted quoting | 8K+ RFQs/month; in-stock quotes from 18 hours to under 1 hour |

The ProductSquads visual explains formats → schema-driven retrieval → validation → output or review. Closphere uses the dashboard image from the current portfolio, with a note about detecting stale inventory data. Confirm whether this image depicts production or a demo before final publication; do not call it a production screenshot without that confirmation. Filo uses the existing landing-page image alongside the matching decision and launch results. The deeper case study can explain request → matching considerations → tutor connection.

**Selected builds.** Feature NXTai and Rotten Tom-AI-toes, whose public demo entry points were verified in the browser. Kindred now opens a public waitlist site and TalentSphere requires sign-in, so their Projects-page actions say “Visit project website.” All four retain clear prototype/graduate/hackathon status. Avoid presenting prototype timing claims as production outcomes.

**Close.** A short human introduction, what you want to build next, email, LinkedIn, and résumé. The revised concept includes the Kindred team photo from the existing About page, captioned with the competition context visible in the photograph.

## Case-study design

Each case study has two reading speeds. Its opening contains role, problem, delivery scope, key decision, and measured outcomes. The deeper narrative follows context → evidence → alternatives and decision → trade-offs → shipped system → outcomes → learning.

Preserve “What It Cost.” This is some of your most credible material: the initially lower accuracy of the general retrieval approach, the custom-work pressure at Closphere, the discovery time spent before the Filo launch, and the missing account context in Supreme Components’ first workflow.

Strengthen the leadership evidence with already-supported scope: ProductSquads’ cross-team delivery, Closphere’s strategy and go-to-market responsibility, Filo’s work across engineering/data/design/operations, and Supreme Components’ coordination with sales and leadership. Distinguish “I owned” from what the team shipped. Do not infer direct reports or people-management responsibility from delivery scope.

Where supporting evidence exists, include one artifact showing how a decision was made or aligned: an annotated comparison, an evaluation excerpt, a prioritization change, or a system diagram. Additional evidence would help, but absent artifacts must never become invented meetings, quotes, or experiments.

Long pages get a desktop contents rail, an accessible mobile index, generous reading width, an outcome recap, and a next-case link. Keep the sample ProductSquads page as the visual and editorial standard for the remaining stories.

## Content audit

Reviewed the current [homepage](https://calm-squircle-560170.framer.app/), all four linked professional case studies, [Projects](https://calm-squircle-560170.framer.app/projects), and [About](https://calm-squircle-560170.framer.app/about-me). The web reading tool could not access Framer, but direct HTML retrieval succeeded. Repeated responsive text was deduplicated for the audit; different versions were treated as potential conflicts.

| Finding | Editorial action |
| --- | --- |
| Strong decision narratives are already present | Preserve specificity and candid trade-offs; remove repetition and rhetorical excess |
| Closphere shows “$1.5M+ Paying Customers” and an unrelated sustainability subtitle | Use 63 paying companies; remove stale subtitle and metadata |
| Closphere About variants say 4+ weeks / 3–7 days / 100+ organizations | Use the supplied correction: 6+ weeks to under 7 days; 63 paying companies and 1K+ users |
| Closphere says a 12-person team and later “eleven people” | Omit exact headcount pending clarification; it may include/exclude the founder, but do not assume |
| Filo has both 30% and 35% activation improvement | Use 35% consistently |
| Filo mentions a 60-second target and an under-45-second measured outcome | Keep target distinct from outcome; use 98% under 45 seconds as the approved outcome |
| Filo describes three weeks as a fifth of a six-month window | Remove the inconsistent fraction; retain the sourced three-week discovery cost |
| ProductSquads labels turnaround time “Lifted” | Use 70% reduction in turnaround time; qualify accuracy as field-level |
| Education is presented as ongoing | Use MSIM completed at University of Washington, August 2026 |
| Old contact links use university email | Use sahildua033@gmail.com throughout |
| Two résumé PDF assets exist | Compare content, select one current version, and centralize all résumé actions |
| Original screenshot and portrait URLs are available | Visually inspect, check context and confidentiality, then reuse selectively |
| Project outcomes and demo status need care | Clearly identify prototypes; verify real interactions before enabling demo actions |

Both résumé PDFs were compared, and the selected version was corrected and visually checked. Public prototype entry points were verified in the browser; authenticated workflows were not tested. See `docs/CONTENT_NOTES.md` for the source record and exact limits.

Sources do not establish every metric’s denominator or measurement window. Preserve supplied wording, do not add causal percentages or invented baselines, and omit unresolved details. Do not infer missing case-study dates or reporting lines from the visual design.

## Implementation phases

| Phase | Work | Reviewable output / completion condition |
| --- | --- | --- |
| 1. Content and assets | Normalize facts; edit four stories; write 250–400 word About; inventory project contribution/status; review assets and résumé PDFs | Typed content draft with source notes and an explicit discrepancy log; one canonical résumé selected |
| 2. Foundation | Check current stable Next.js and compatible versions against official docs; use App Router, TypeScript, a CSS token system, and a committed lockfile | Shared shell and reusable preview, metrics, decision, diagram, and case-section components; working dev/build/typecheck scripts |
| 3. Full site | Build home, all four case studies, Projects, and About; preserve case-study paths; add /about-me → /about permanent redirect | Every route loads directly and on refresh; all copy is separate from presentation; no placeholder routes or fake links |
| 4. Quality | Responsive, keyboard, accessibility, image, external-link, and content checks; production build and typecheck; representative Lighthouse runs | Inspected desktop/mobile screenshots, documented measured results, and fixes for visible defects |
| 5. Vercel preview and handoff | Add metadata, sitemap, robots, Person data, favicon, production-origin configuration, preview noindex, README | Working Vercel preview if access is available; otherwise exact remaining deployment step; no domain or DNS changes |

Implemented source structure:

```text
app/
  page.tsx
  work/[slug]/page.tsx
  projects/page.tsx
  about/page.tsx
  layout.tsx
  sitemap.ts
  robots.ts
components/
  project-previews.tsx
  ui.tsx
  case-study.tsx
  site-shell.tsx
content/
  case-studies.ts
  projects.ts
  profile.ts
public/
  images/
  resume.pdf
```

Prefer typed local content for this small, structured site. Pre-render professional stories and use minimal client JavaScript. Keep diagrams semantic and readable without scripts. Use supported Next.js image/font optimization where applicable. No database, authentication, CMS, analytics integration, or form backend is needed for this scope.

Preserve `/work/doc-intelligence-ps`, `/work/closphere-inventory-intelligence`, `/work/filo-us-product-launch`, and `/work/scieden-sales-workflow`. Use the intended production origin `https://duasahil.com` for canonical URLs. Configure preview noindex through metadata and hosting headers; a robots disallow alone is insufficient to guarantee deindexing.

## Definition of done for the production site

- Seven primary pages: home, four case studies, Projects, and About, with functioning navigation and redirects.
- Responsive checks at 360, 390, 768, 1024, and 1440px; no accidental horizontal overflow; body text at least 16px; diagrams remain readable.
- Semantic landmarks, skip link, visible focus, generally 44px touch targets, AA contrast, useful image alt text, reduced-motion support, 200% text enlargement, and unobscured anchor targets.
- Contact, résumé, project demo/repository, and external links verified. Inaccessible or broken demo actions omitted.
- Production build and TypeScript pass. Direct case-route loading, refresh, images, browser console, and keyboard navigation checked.
- Mobile Lighthouse targets: 90+ performance and 95+ accessibility, best practices, and SEO. Report actual results and limitations; do not promise scores in advance. Preview noindex may affect an SEO audit, so explain the tested configuration.
- Unique metadata, canonical URLs, sitemap, robots, verified Person structured data, favicon, stable image dimensions, and restrained asset sizes.
- Source, lockfile, README, screenshots, content issues, and deployment instructions delivered. Environment example only if configuration needs one.

## Implementation status

The user approved the modern product studio direction and authorized the full implementation. All seven pages, the canonical résumé, metadata, redirects, and editing/deployment documentation are implemented. Build, TypeScript, browser, accessibility, keyboard, and text-enlargement checks pass. See `docs/VALIDATION.md` for final measurements and limitations. Vercel authentication is the remaining deployment step.

## Selected concept and assets

Concept 03 replaces the rejected serif direction with modern product studio styling. Both canonical design pages now use this direction: `design/index.html` and `design/case-study.html`. The production Next.js site implements this approved direction.

The quality rule: prominent copy should say something specific about your work. Keep real trade-offs and individual responsibility. Avoid repeated slogans, decorative diagrams, generic leadership language, and making every project use the same composition.

Source assets used:

- `design/assets/sahil-portrait.jpg`: the individual photograph from the existing About page, visually inspected and shown with CSS framing.
- `design/assets/closphere-dashboard.png`: the existing case-study image; production/demo provenance remains unconfirmed.
- `design/assets/filo-product.png`: the Filo landing-page image from the existing portfolio.
- `design/assets/kindred-team.webp`: the team photograph from About; the certificate and event signage support the competition caption.

The ProductSquads workflow remains explicitly illustrative. No image contents were generated or altered. The production site has all four local case studies and one corrected canonical résumé PDF. Historical static studies retain their original review links.
