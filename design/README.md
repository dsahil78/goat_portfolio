# Design review

Open `index.html` directly in your browser, or run `python3 -m http.server 4173 --bind 127.0.0.1` from the project root and visit http://127.0.0.1:4173/design/.

Concept 03 is the selected modern product studio direction: bold sans-serif typography, large product visuals, a deep-blue ProductSquads feature, and tighter copy. This is a static, no-JavaScript design concept. The production Next.js implementation awaits design feedback.

- `index.html`: homepage concept with in-page Projects and About previews.
- `case-study.html`: sample ProductSquads case-study design and edited narrative.
- `concept.css`: shared visual system and responsive layouts.
- `screenshots/`: desktop (1440px) and mobile (390px) captures of both pages.
- `assets/`: inspected photographs and product images from the existing portfolio.
- `validation.json`: automated layout and anchor checks at 360, 390, 768, 1024, and 1440px.
- `../PORTFOLIO_PLAN.md`: strategy, content audit, and phased implementation plan.

Both pages passed the checked widths without document overflow, missing in-page targets, or page JavaScript errors, and each has one H1. Desktop and mobile screenshots were visually inspected. These are limited concept checks, not a completed accessibility audit or production validation. No Lighthouse scores or deployment results are claimed.

To repeat the concept checks, make `playwright` available to Node and install its Chromium browser, then run `node design/check-concept.cjs`. Optional page paths can be passed without `.html`, relative to `design/`. The review used the existing local Playwright installation via Node module resolution. Browser launch may require permission outside the sandbox. Checks decode every image before capturing full-page and opening-viewport screenshots.

Remaining review limitations: three case-study links lead to the existing portfolio; résumé navigation leads to a source-verification note; demo destinations were checked for HTTP reachability only. Full routes, final assets, résumé selection, 200% text enlargement, and comprehensive accessibility checks belong to production work.
