# Portfolio analytics

The site uses Next.js 16.3.6 (App Router) and `posthog-js` 1.434.17, the only new direct dependency. Analytics initialization lives in `instrumentation-client.ts`; the invisible `PortfolioAnalytics` client component handles named interactions and engagement while pages remain server-rendered.

## Activate on the free plan

1. Use a PostHog US Cloud project on the Free plan, with no payment method. Do not activate paid add-ons. The application cannot set or verify your account’s billing plan.
2. Add the public **project key**, not a personal API key, to `.env.local` as `NEXT_PUBLIC_POSTHOG_KEY=...`. This file is explicitly ignored; `.env.example` contains an empty documented variable. No real key is in the repository.
3. Restart the dev server. For Vercel, add the same variable to the appropriate environment and redeploy: `NEXT_PUBLIC_*` values are compiled into browser assets at build time. A local `.env.local` does not configure Vercel automatically.
4. In PostHog’s Session Replay settings, enable web recording. For the fullest coverage within the free quota, use 100% sampling, no URL/event/flag triggers, and no minimum-duration filter. The SDK respects project-side recording rules and quota limits; `disable_session_recording: false` alone does not enable the project-side switch.
5. Heatmap collection is explicitly enabled in code. Add the deployed origin to the PostHog toolbar’s authorized URLs, launch the toolbar, and open Heatmaps. Clickmaps need autocapture; scrollmaps need pageleave—both are enabled. The embedded heatmap view is allowed by a narrowly scoped `frame-ancestors` policy.
6. Visit `/?ref=qualtrics`, browse a case, open a diagram, and click a résumé/contact link. In DevTools Network, confirm `/ingest/...` requests return 200; then confirm named events, recordings, and heatmap activity inside your actual PostHog project.

As checked September 28, 2026, the [free allowance](https://posthog.com/pricing) includes **1 million analytics events, 5,000 recordings, and 100,000 exceptions per month**. Free recordings are retained for one month. Usage stops at the Free plan limits; extra events are dropped. Complete, unlimited capture cannot be promised on a capped free plan. No billing changes, payment method, upgrade flow, or extra analytics vendor are part of this implementation. If this is already a paid account, keep the relevant product billing limits at $0 in the dashboard; no client-side setting can enforce account billing.

Hosting uses normal Next.js rewrites on the existing host. No managed proxy, edge worker, database, or separate service was added; the host’s existing free-plan request/bandwidth limits still apply.

## Event coverage

Every named event has `page_path`. Shared analytics properties include `site`, `analytics_schema_version`, `environment` (`local` or `hosted`), SDK browser/device/session properties, and `ref` when a valid outreach slug was supplied. PostHog’s normal referrer and UTM attribution are retained. Filter out `environment = local` for recruiter analysis.

| Event | Trigger | Properties and coverage |
| --- | --- | --- |
| `case_study_opened` | A valid case page mounts | `slug`; all four cases, direct arrivals, client navigation, reloads and return visits. Not also emitted on clicks, so a normal click → mount is one visit. |
| `case_study_link_clicked` | Any case link is activated | `slug`, `location`; homepage evidence strip/cards, Work directory, About technical links, next-case CTA. Useful for intent even if a new tab fails to load. |
| `resume_downloaded` | Résumé view/download link | `location`: `hero`, `contact`, `about_profile`. Every existing résumé link is covered. This measures a click, not confirmed file download or reading. |
| `contact_clicked` | Contact action | `channel` (`email`, `linkedin`, `contact_section`; Calendly supported if a link is added), `location`. Header Let’s talk, all contact panels, About LinkedIn. Does not claim email delivery or a booking. |
| `external_link_clicked` | Non-contact external HTTP(S) link | `url`, `label`; GitHub and all four project sites. Destination query strings/fragments are excluded from this custom property. |
| `project_demo_opened` | Live demo outbound link | `project`; NXTai and Rotten Tom-AI-toes. Records outbound intent, not activity inside another app. |
| `project_website_opened` | Other project website link | `project`; Kindred’s public/waitlist site and TalentSphere’s account-gated site. Kept separate from working demo entry points. |
| `project_details_opened` | Homepage prototype link | `project` (stable section ID), `location`; opening the corresponding Projects section. |
| `navigation_clicked` | Internal link, including brand/CTAs | `destination`, `label`, `location`; header, homepage, Work/About links, back/next cases, skip link, footer back-to-top, in-page anchors. |
| `section_jump_clicked` | Internal anchor link | `section`, `location`; company jump links, case TOC, homepage work, project anchors, contact, back-to-top. |
| `diagram_viewed` | Case figure reaches 50% visibility | `case_study`, `diagram`; all 24 v2 figures, once per mounted figure. Reduced motion does not disable measurement. |
| `diagram_opened` | Open full diagram link | `diagram`; remaining full prototype/workflow diagrams outside v2 cases. V2 case figures are displayed in place. |
| `diagram_explanation_toggled` | Workflow explanation disclosure changes | `diagram`, `expanded`; open and close, including keyboard activation. |
| `interface_image_opened` | Full interface image or caption link | `asset`, `label`; Work, case-study artifacts, and all project screenshots. |
| `section_viewed` | Labeled content intersects the reading viewport for one second | `section`; hero, selected work, experiments, background, contact, each Work/project entry, technical background, experience, education, case narrative sections, diagrams and next-case panel. Once per route visit. |
| `scroll_depth_reached` | Page scroll crosses a milestone | `percent` 25/50/75/100, once each per route visit. Measured against the page’s scrollable extent. |
| `reading_time_reached` | Visible-tab dwell reaches a threshold | `seconds` 30/60/120, once each per route visit. Hidden-tab time is excluded; this is a reading-time proxy, not proof of attention. |
| `page_engagement` | Tab hides, route changes, or document leaves | Cumulative `visible_seconds`, `max_scroll_percent`, `reason`. Use the latest/max snapshot per page visit, not a sum of snapshots. Very short (<1s since last report) duplicates are suppressed. |
| `case_study_end_reached` | Final narrative section is visible for one second | `slug`; measures reaching the conclusion, not proof that the whole case was read. |
| `not_found_viewed` | Custom 404 is rendered | `page_path`; invalid routes are not counted as valid case-study visits. |

Clicks use a single delegated document listener that covers server-rendered anchors, Next links, nested icons, keyboard-generated clicks, and middle-clicks. It does not prevent navigation. Stable `data-analytics-*` attributes provide the location/project/section context. No full-page client conversion was required.

## Automatic stream, replays, and heatmaps

- SDK-owned `$pageview` on initial load and history changes, plus `$pageleave`. No duplicate manual pageview handler.
- `$autocapture` click events, rage/dead-click signals, browser exceptions, and Web Vitals.
- Heatmap coordinates and scroll data use the SDK’s built-in collection, not custom events for every mouse movement or scroll tick.
- Replay snapshots capture the portfolio UI, navigation, scrolling, clicks, and DOM changes, subject to project recording configuration and free limits. Recordings connect to named events through the session ID. Internal snapshot envelopes are not a replacement for the analytics event stream; use session/event filters to find outreach replays.
- Exceptions are browser-side only. No server SDK, server logs, source-map upload service, AI replay analysis, network-body recording, surveys, feature-flag evaluations, or paid add-ons were added.

## Attribution

A `?ref=<company>` slug is registered **before the first automatic pageview** using `register_for_session`. It persists across route changes and reloads in the PostHog session and clears with session rotation; a plain persistent `register` would incorrectly carry an old company into future sessions. A later valid ref-bearing page can replace the current session’s value. Use company/campaign slugs, never recruiter names or emails. Allowed values are 1–80 letters/numbers/underscores/hyphens/dots, starting with a letter or number.

No key means no initialized analytics client, custom tracking listeners, engagement timers, or PostHog requests. Visitors use anonymous IDs; the site never calls identify or creates person profiles. Browser settings, blocked storage, network loss, bots, disabled JavaScript, ad blockers, and quota limits can reduce coverage. A first-party proxy improves delivery but cannot guarantee every event arrives.

## Privacy controls

All form inputs are masked in replay. Contenteditable text and `[data-private]`/`.ph-mask` text are masked; `.ph-no-capture` blocks recording of its subtree. Autocapture ignores forms, inputs, selects, textareas, editable regions, and private elements, and masks element text/attributes. Custom tracking only reads curated public link/section metadata, never input values. No input/change/submit, clipboard, or keystroke events are recorded by custom code. Console recording, cross-origin iframe recording, network timing, and request/response headers and bodies are explicitly disabled. Public portfolio text remains visible in replays so the session is useful.

Do not place personal data in URLs: the SDK normally captures page URL/referrer/UTM context, and exception messages can contain application-generated text. There are currently no visitor forms on the portfolio. New private UI should use the existing privacy selectors and keep personal data out of URLs and errors.

## Configuration and regional hosts

`next.config.ts` preserves existing redirects, image options, security headers and noindex behavior, and adds ordered rewrites:

1. `/ingest/static/:path*` → `https://us-assets.i.posthog.com/static/:path*`
2. `/ingest/:path*` → `https://us.i.posthog.com/:path*`

`skipTrailingSlashRedirect: true` prevents redirecting ingestion POSTs. The CSP permits framing only by this site and `https://us.posthog.com` for heatmaps, replacing the incompatible `X-Frame-Options: DENY` header. SDK scripts are injected into the head to avoid a React hydration mismatch while retaining the requested `2025-05-24` defaults.

For an EU project, change **all four** regional hosts together: both rewrite destinations, `ui_host` in instrumentation, and the CSP `frame-ancestors` host. A project key does not reliably encode its region; check the project dashboard. Rebuild/redeploy after changing hosts or environment variables.

## Validation

`npm run build` verifies compilation and types. `npm run test:analytics` runs real browser interactions with **intercepted** PostHog requests and a dummy key; it does not send synthetic data to a real PostHog project. Run:

```sh
NEXT_PUBLIC_POSTHOG_KEY=phc_local_test_not_a_real_project npm run dev -- --port 3002
# In another terminal:
npm run test:analytics
```

Use this dummy server only with the intercepted test, then stop it. The test uses the installed SDK’s actual recorder bundle, a mock project configuration, decoded event/snapshot payloads, and synthetic private text to check masking. Automation filtering is disabled only in the test browser, not in the production SDK configuration. Machine-readable results are written to ignored `validation/analytics-results.json` and explicitly identify the intercepted mode.

Recorded verification status for this implementation:

- Optimized Next.js build and TypeScript checks succeeded.
- Dev server served the homepage successfully with the dummy key.
- The real `/ingest/static/recorder.js` reverse proxy returned HTTP 200 without a project key or event submission.
- The initial task left the comprehensive browser test unverified. During the explicitly requested v2 verification, the updated test passed: route visits, custom clicks, outreach attribution, engagement, masked replay snapshots, heatmap payloads, proxy paths, and 404 tracking. Browser automation overrides apply only inside the intercepted test.
- The v2 suite also passed all 24 case/theme/viewport combinations with the actual SDK and mocked transport, including exactly one `diagram_viewed` event per figure after repeated entry. Results are preserved in `validation/case-studies-v2-with-analytics.json`.
- A pre-hydration script insertion warning was addressed with `external_scripts_inject_target: 'head'`; it no longer appeared in the subsequent intercepted attempt.
- No `.env.local` or actual project key was available, so real event POST acceptance, dashboard events, project replay enablement, recordings, and heatmap rendering remain unverified.

Live ingestion/replay availability must be checked separately with the actual project key and enabled replay settings. A mocked 200 does not prove that a real PostHog project accepted an event.

Official references: [Next.js integration](https://posthog.com/docs/libraries/next-js), [replay privacy](https://posthog.com/docs/session-replay/privacy), [heatmaps](https://posthog.com/docs/toolbar/heatmaps), [free limits](https://posthog.com/pricing).

## Files created or changed

Created:

- `instrumentation-client.ts` — SDK configuration and first-event attribution.
- `lib/analytics.ts` — typed event contract, session attribution and capture helper.
- `components/portfolio-analytics.tsx` — delegated interaction handlers and route/engagement tracking.
- `scripts/validate-analytics.mjs` — intercepted analytics/replay browser checks.
- `docs/ANALYTICS.md` — setup, coverage, limitations and validation record.

Changed:

- `package.json`, `package-lock.json` — `posthog-js` and the analytics test command; no other new direct dependency.
- `.env.example`, `.gitignore` — empty key documentation and explicit `.env.local` exclusion.
- `next.config.ts` — ingestion rewrites, trailing-slash behavior and heatmap framing policy.
- `app/layout.tsx` — invisible client tracker and skip-link location.
- `app/page.tsx`, `app/work/page.tsx`, `app/projects/page.tsx`, `app/about/page.tsx` — stable section/link context.
- `components/ui.tsx`, `components/site-shell.tsx`, `components/main-navigation.tsx`, `components/project-previews.tsx`, `components/case-study.tsx`, `components/mermaid-diagram.tsx` — shared-link metadata, locations and diagram/case identifiers.
- `README.md`, `docs/VALIDATION.md` — integration instructions and measurement caveats.

Next.js also generated its standard `AGENTS.md` and `CLAUDE.md` guidance when the dev server started. No real `.env.local` was created, read into output, or committed, and the original user résumé was not modified.
