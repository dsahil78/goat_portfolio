import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import { interceptPostHog, humanUserAgent } from './posthog-fixture.mjs';

const origin = process.env.TEST_URL || 'http://127.0.0.1:3004';
const slugs = ['doc-intelligence-ps', 'closphere-inventory-intelligence', 'supreme-rfq-quoting', 'filo-us-product-launch'];
const routes = ['/', '/work', ...slugs.map(slug => `/work/${slug}`), '/projects', '/about'];
const screenshotRoutes = ['/', '/work', '/work/doc-intelligence-ps', '/projects', '/about'];
const banned = /\[CONFIRM|\[SAHIL|\bTODO\b|sample|lorem|vercel\.app|scieden|RLHF|multi-agent|acquisition|acquired|\bCPO\b|Product Strategist|Fortune 500 client|—/i;
const results = [], failures = [], copy = {};
await fs.mkdir('screenshots/rebuild', { recursive: true });
await fs.mkdir('validation/rebuild', { recursive: true });
const browser = await chromium.launch({ headless: true });
try {
  for (const width of [375, 768, 1280, 1440]) {
    const context = await browser.newContext({ viewport: { width, height: 1000 }, reducedMotion: 'reduce', userAgent: humanUserAgent });
    const fixture = await interceptPostHog(context, origin);
    const page = await context.newPage();
    const browserErrors = [];
    page.on('pageerror', error => browserErrors.push(error.message));
    for (const route of routes) {
      const result = { route, width, failures: [] };
      try {
        const response = await page.goto(origin + route);
        assert.equal(response.status(), 200);
        await page.evaluate(() => document.fonts.ready);
        await page.waitForTimeout(150);
        const text = await page.locator('body').innerText();
        const metadata = await page.locator('meta[content]').evaluateAll(nodes => nodes.map(node => node.content).join(' '));
        assert.ok(!banned.test(text + metadata), `Banned copy: ${(text + metadata).match(banned)?.[0]}`);
        assert.equal(await page.locator('h1').count(), 1);
        assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'), 'https://duasahil.com' + (route === '/' ? '' : route));
        assert.equal(await page.locator('.reason-chip, .margin-marker, .animated-value, s, mark').count(), 0);
        const absoluteInternal = await page.locator('a[href]').evaluateAll(nodes => nodes.filter(node => /^https?:/.test(node.getAttribute('href')) && new URL(node.href).hostname === 'duasahil.com').map(node => node.href));
        assert.deepEqual(absoluteInternal, []);
        const readingSizes = await page.locator('main p:not(.review-footnote), .case-section p, .project-description dd').evaluateAll(nodes => nodes.filter(node => !node.closest('.case-preview, .case-graphic')).map(node => ({ text: node.textContent.slice(0, 60), size: parseFloat(getComputedStyle(node).fontSize) })));
        assert.deepEqual(readingSizes.filter(item => item.size < 17), [], 'Reading text under 17px');
        const overflow = await page.evaluate(() => ({ page: document.documentElement.scrollWidth, viewport: innerWidth }));
        assert.ok(overflow.page <= overflow.viewport, `Overflow: ${JSON.stringify(overflow)}`);
        if (route === '/' || route === '/work') {
          assert.equal(await page.locator('.case-card').count(), 4);
          assert.deepEqual(await page.locator('.case-card>.jump').evaluateAll(nodes => nodes.map(node => node.getAttribute('href'))), slugs.map(slug => `/work/${slug}`));
        }
        if (route.startsWith('/work/')) {
          const slug = route.split('/').at(-1);
          assert.equal(await page.locator('figure').count(), slug === 'filo-us-product-launch' ? 1 : 2);
          assert.equal(await page.locator('.decision-callout').count(), 1);
          assert.equal(await page.locator('.decision-callout dl>div').count(), 5);
          assert.equal(await page.locator('.case-next a').getAttribute('href'), `/work/${slugs[(slugs.indexOf(slug) + 1) % slugs.length]}`);
          await page.locator('.v2-toc a[href="#decision"]').click();
          await page.waitForTimeout(200);
          assert.equal(await page.locator('.v2-toc a[aria-current]').getAttribute('href'), '#decision');
        }
        for (const element of await page.locator('figure').all()) {
          await element.scrollIntoViewIfNeeded();
          await page.waitForTimeout(100);
        }
        await page.evaluate(async () => { await Promise.all([...document.images].map(img => img.decode().catch(() => {}))); });
        assert.deepEqual(await page.locator('img').evaluateAll(nodes => nodes.filter(node => !node.alt || !node.naturalWidth).map(node => node.src)), []);
        if (width === 375 || width === 1440) {
          const axe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
          result.accessibility = axe.violations.map(v => ({ id: v.id, nodes: v.nodes.map(n => ({ target: n.target, summary: n.failureSummary })) }));
          assert.deepEqual(result.accessibility, [], 'Accessibility violations');
        }
        await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
        if ([375, 1440].includes(width) && screenshotRoutes.includes(route)) {
          const name = route === '/' ? 'home' : route.slice(1).replaceAll('/', '-');
          await page.screenshot({ path: `screenshots/rebuild/${name}-${width}.png`, fullPage: true });
        }
        if (width === 1440) copy[route] = text;
        result.figures = await page.locator('figure').count();
      } catch (error) {
        result.failures.push(error.message);
        failures.push(`${route} at ${width}: ${error.message}`);
        await page.screenshot({ path: `validation/rebuild/failure-${route.replaceAll('/', '_') || 'home'}-${width}.png`, fullPage: true }).catch(() => {});
      }
      results.push(result);
      console.log(`${result.failures.length ? 'FAIL' : 'PASS'} ${width} ${route}${result.failures.length ? ': ' + result.failures.join('; ') : ''}`);
    }
    assert.deepEqual(browserErrors, [], 'Browser exceptions');
    assert.deepEqual(fixture.failures, [], 'Analytics fixture failures');
    if (width === 1440) {
      await page.goto(origin + '/');
      await page.getByRole('link', { name: 'Read case study: ProductSquads', exact: true }).click();
      await page.locator('.case-hero').waitFor();
      for (const figure of await page.locator('figure').all()) {
        await figure.scrollIntoViewIfNeeded();
        await page.waitForTimeout(150);
      }
      await page.waitForTimeout(3500);
      const names = fixture.events.map(e => e.event);
      for (const event of ['$pageview', 'case_study_opened', 'case_study_link_clicked', 'diagram_viewed']) assert.ok(names.includes(event), `Missing analytics event: ${event}`);
      await fs.writeFile('validation/rebuild/analytics.json', JSON.stringify({ mode: 'Real SDK, dummy key, intercepted requests. No live events sent.', eventTypes: [...new Set(names)], requests: fixture.requests.length }, null, 2));
    }
    await context.close();
  }
  const request = await browser.newContext();
  for (const [path, host, target] of [
    ['/work/scieden-sales-workflow', null, '/work/supreme-rfq-quoting'],
    ['/about?ref=test', 'goat-portfolio-kvi7.vercel.app', 'https://duasahil.com/about?ref=test'],
    ['/work?ref=test', 'goat-portfolio-preview-team.vercel.app', 'https://duasahil.com/work?ref=test'],
  ]) {
    const response = await request.request.get(origin + path, { maxRedirects: 0, headers: host ? { host } : {} });
    assert.equal(response.status(), 301);
    assert.equal(response.headers().location, target);
  }
  for (const path of ['/resume.pdf', '/robots.txt', '/sitemap.xml', '/favicon.ico', '/apple-icon', '/opengraph-image', ...slugs.map(slug => `/work/${slug}/opengraph-image`)]) {
    const response = await request.request.get(origin + path);
    assert.equal(response.status(), 200, path);
    if (path.includes('opengraph-image')) assert.ok(response.headers()['content-type'].includes('image/png'));
  }
  const noJs = await browser.newContext({ javaScriptEnabled: false });
  const page = await noJs.newPage();
  await page.goto(origin + '/work/doc-intelligence-ps');
  assert.equal(await page.locator('.metric-value').count(), 4);
  assert.deepEqual(await page.locator('.metric-value').allTextContents(), ['100K+', '95%+', '70%', '<1¢']);
  await page.close();
} catch (error) { failures.push(error.stack); }
finally {
  await fs.writeFile('validation/rebuild/results.json', JSON.stringify({ results, failures }, null, 2));
  await fs.writeFile('validation/rebuild/rendered-copy.json', JSON.stringify(copy, null, 2));
  await browser.close();
}
assert.deepEqual(failures, [], failures.join('\n'));
console.log('PASS: responsive layouts, accessibility, copy, metadata, redirects, social images, PDF, and analytics.');
