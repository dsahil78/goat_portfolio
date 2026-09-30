import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { gunzipSync } from 'node:zlib';

// Run against a dev server started with the dummy key in docs/ANALYTICS.md.
// Every PostHog request is intercepted; this is not a live ingestion test.
const origin = process.env.TEST_URL || 'http://127.0.0.1:3002';
const token = 'phc_local_test_not_a_real_project';
const events = [];
const requests = [];
const failures = [];
const remoteConfig = {
  hasFeatureFlags: false, autocapture_opt_out: false, supportedCompression: [],
  sessionRecording: { endpoint: '/s/', sampleRate: 1, minimumDurationMilliseconds: 0 },
  heatmaps: true,
};
const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce', userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/153.0.0.0 Safari/537.36' });
function decode(buffer) {
  const text = buffer.toString();
  if (buffer[0] === 31 && buffer[1] === 139) return JSON.parse(gunzipSync(buffer).toString());
  if (text.startsWith('{') || text.startsWith('[')) return JSON.parse(text);
  const params = new URLSearchParams(text);
  const data = params.get('data');
  assert.ok(data, 'Unrecognized event payload');
  const bytes = Buffer.from(data, 'base64');
  return JSON.parse((params.get('compression') === 'gzip-js' ? gunzipSync(bytes) : bytes).toString());
}
await context.route('**/*', async route => {
  const request = route.request();
  const url = new URL(request.url());
  if (url.hostname.endsWith('posthog.com')) {
    failures.push('Analytics escaped the local proxy: '+url.pathname);
    return route.abort();
  }
  if (url.origin !== origin || !url.pathname.startsWith('/ingest/')) return route.continue();
  requests.push({ path: url.pathname, method: request.method(), mocked: true });
  if (url.pathname.endsWith('/config.js')) return route.fulfill({ contentType: 'application/javascript', body: `window._POSTHOG_REMOTE_CONFIG={${JSON.stringify(token)}:{config:${JSON.stringify(remoteConfig)}}};` });
  if (url.pathname.endsWith('/config') || url.pathname.includes('/flags/')) return route.fulfill({ json: remoteConfig });
  if (url.pathname.endsWith('.js')) {
    const filename = path.basename(url.pathname);
    try { return await route.fulfill({ contentType: 'application/javascript', body: await fs.readFile(path.join('node_modules/posthog-js/dist', filename)) }); }
    catch { failures.push('Missing SDK fixture: '+filename); return route.abort(); }
  }
  const buffer = request.postDataBuffer();
  if (buffer) {
    try {
      const payload = decode(buffer);
      events.push(...(Array.isArray(payload) ? payload : payload.batch || [payload]));
    } catch (error) { failures.push('Cannot decode '+url.pathname+': '+error.message); }
  }
  return route.fulfill({ status: 200, json: { status: 1 } });
});
const page = await context.newPage();
page.on('pageerror', error => failures.push(error.message));
page.on('console', message => { if (message.type() === 'error' && !message.text().includes('404')) failures.push(message.text()); });
// Test real clicks without opening email, downloading files, or navigating to external sites.
await page.addInitScript(() => {
  // The SDK deliberately excludes automation; simulate a human browser only in this intercepted test.
  Object.defineProperty(navigator, 'webdriver', { get: () => false });
  Object.defineProperty(navigator, 'userAgentData', { get: () => undefined });
  document.addEventListener('click', event => {
    const link = event.target instanceof Element ? event.target.closest('a') : null;
    if (!link) return;
    const url = new URL(link.href);
    if (url.origin !== location.origin || /\.(pdf|svg|png|webp|jpg)$/.test(url.pathname)) event.preventDefault();
  });
});
const eventList = name => events.filter(event => event.event === name);
const awaitEvent = async (name, predicate = () => true) => {
  await page.waitForFunction(() => true);
  for (let i = 0; i < 60; i++) {
    const found = eventList(name).find(event => predicate(event.properties));
    if (found) return found;
    await page.waitForTimeout(250);
  }
  throw new Error('Missing event: '+name);
};
try {
  const response = await page.goto(origin+'/?ref=qualtrics');
  assert.match(response.headers()['content-security-policy'], /frame-ancestors 'self' https:\/\/us.posthog.com/);
  await awaitEvent('$pageview');
  assert.equal(eventList('$pageview').length, 1, 'Duplicate initial pageview');
  assert.equal(eventList('$pageview')[0].properties.ref, 'qualtrics', 'Initial pageview lost attribution');
  await page.locator('.hero-actions a[href="/resume.pdf"]').click();
  await awaitEvent('resume_downloaded', p => p.location === 'hero');
  await page.locator('.nav-contact').click();
  await awaitEvent('contact_clicked', p => p.channel === 'contact_section' && p.location === 'nav');
  await page.locator('.contact-email').click();
  await page.locator('.contact-links a').filter({ hasText: 'LinkedIn' }).click();
  await page.locator('.contact-links a[href="/resume.pdf"]').click();
  await page.locator('.site-footer a').filter({ hasText: 'GitHub' }).click();
  await awaitEvent('external_link_clicked', p => p.url === 'https://github.com/dsahil78');
  await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Work', exact: true }).click();
  await page.waitForURL('**/work');
  await page.getByRole('link', { name: 'Read case study: ProductSquads' }).click();
  await page.waitForURL('**/work/doc-intelligence-ps');
  await awaitEvent('case_study_opened', p => p.slug === 'doc-intelligence-ps');
  assert.equal(eventList('case_study_opened').length, 1, 'Mount/click or StrictMode duplicated the case visit');
  await page.locator('[data-diagram="eval-stack"]').scrollIntoViewIfNeeded();
  await awaitEvent('diagram_viewed', p => p.diagram === 'eval-stack');
  await page.getByRole('navigation', { name: 'Case study contents' }).getByRole('link', { name: 'What I Learned' }).click();
  await awaitEvent('case_study_end_reached');
  await page.evaluate(() => scrollTo(0, document.documentElement.scrollHeight));
  await awaitEvent('scroll_depth_reached', p => p.percent === 100);
  await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Experiments' }).click();
  await page.waitForURL('**/projects');
  await page.locator('[data-diagram="product-memory"] summary').click();
  await page.locator('[data-diagram="product-memory"] .diagram-open').click();
  await page.locator('[data-diagram="product-memory"] summary').click();
  await page.getByRole('link', { name: 'Try the prototype: NXTai', exact: true }).click();
  await page.getByRole('link', { name: 'Visit project website: Kindred', exact: true }).click();
  await page.getByRole('link', { name: 'View full interface: NXTai (new tab)' }).first().click();
  await awaitEvent('project_demo_opened', p => p.project === 'NXTai');
  await awaitEvent('project_website_opened', p => p.project === 'Kindred');
  assert.equal(eventList('project_demo_opened').length, 1, 'Waitlist was incorrectly counted as a live demo');
  // Use a test-only input to verify input changes and replay snapshots are masked.
  await page.evaluate(() => {
    const form = document.createElement('form');
    form.innerHTML = '<input aria-label="Privacy test"><div contenteditable="true" aria-label="Editable privacy test"></div>';
    document.querySelector('main').prepend(form);
  });
  const privateValue = 'PRIVATE_FORM_VALUE_never_capture@example.test';
  await page.getByRole('textbox', { name: 'Privacy test', exact: true }).fill(privateValue);
  await page.getByLabel('Editable privacy test').fill(privateValue);
  await page.locator('h1').click();
  await awaitEvent('$snapshot');
  await page.waitForTimeout(31000);
  await awaitEvent('reading_time_reached', p => p.seconds === 30);
  await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'About', exact: true }).click();
  await page.waitForURL('**/about');
  await page.locator('.about-links a[href="/resume.pdf"]').click();
  await awaitEvent('resume_downloaded', p => p.location === 'about_profile');
  await page.goto(origin+'/work/closphere-inventory-intelligence');
  await awaitEvent('case_study_opened', p => p.slug === 'closphere-inventory-intelligence');
  await page.reload();
  for (let i = 0; i < 60 && eventList('case_study_opened').filter(e => e.properties.slug === 'closphere-inventory-intelligence').length < 2; i++) await page.waitForTimeout(250);
  assert.equal(eventList('case_study_opened').filter(e => e.properties.slug === 'closphere-inventory-intelligence').length, 2, 'Refresh did not record a new visit exactly once');
  await page.goto(origin+'/not-a-real-page');
  await awaitEvent('not_found_viewed');
  await page.waitForTimeout(4000);
  for (const event of events.filter(e => e.event && e.event !== '$snapshot')) assert.equal(event.properties.ref, 'qualtrics', 'Attribution lost: '+event.event);
  assert.ok(!JSON.stringify(events).includes(privateValue), 'Typed personal data leaked into analytics or replay');
  assert.ok(eventList('$autocapture').length, 'Autocapture missing');
  assert.ok(events.some(e => e.event === '$heatmaps' || e.properties?.$heatmap_data), 'Heatmap data missing');
  assert.ok(eventList('page_engagement').length, 'Engagement summary missing');
  assert.equal(failures.length, 0, failures.join('\n'));
  console.log('PASS: route visits, click events, attribution, engagement, masked replay, heatmaps, proxy paths, and 404 tracking.');
} catch (error) {
  failures.push(error.message);
  console.error('Browser diagnostics:', await page.evaluate(() => ({ visibility: document.visibilityState, ua: navigator.userAgent, webdriver: navigator.webdriver, brands: navigator.userAgentData?.brands, storageKeys: Object.keys(localStorage), sdk: Object.keys(window).filter(k=>k.toLowerCase().includes('posthog')) })));
  throw error;
} finally {
  await fs.mkdir('validation', { recursive: true });
  await fs.writeFile('validation/analytics-results.json', JSON.stringify({ mode: 'intercepted, not live PostHog ingestion', origin, requests, eventCounts: Object.fromEntries([...new Set(events.map(e => e.event))].map(name => [name, eventList(name).length])), failures, events }, null, 2));
  console.log('Observed events:', [...new Set(events.map(e => e.event))].join(', '));
  await browser.close();
}
