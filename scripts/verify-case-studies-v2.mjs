import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import { interceptPostHog, humanUserAgent } from './posthog-fixture.mjs';

const origin=process.env.TEST_URL || 'http://127.0.0.1:3002';
const analytics=process.env.TEST_ANALYTICS==='1';
const slugs=['doc-intelligence-ps','closphere-inventory-intelligence','scieden-sales-workflow','filo-us-product-launch'];
const banned=/—|acquisition|acquired|multi-agent|agentic|RLHF|ML ops|Product Strategist|Bosch|Sherwin-Williams|DuPont|Avery Dennison|\b3M\b/i;
const results=[], errors=[];
await fs.mkdir('screenshots/case-studies-v2',{recursive:true});
await fs.mkdir('validation',{recursive:true});
await fs.mkdir('screenshots/case-studies-v2/review',{recursive:true});
const browser=await chromium.launch({headless:true});
try {
 for(const width of [375,768,1440]) for(const theme of ['light','dark']) for(const [index,slug] of slugs.entries()) {
  const context=await browser.newContext({viewport:{width,height:1000},colorScheme:theme,reducedMotion:'reduce',userAgent:humanUserAgent});
  const fixture=await interceptPostHog(context,origin);
  const page=await context.newPage();
  const pageErrors=[]; page.on('pageerror',e=>pageErrors.push(e.message));
  const result={slug,width,theme,figures:[],failures:[]};
  try {
   await page.goto(`${origin}/work/${slug}?ref=case-v2-test`);
   await page.locator('.v2-toc').waitFor();
   await page.evaluate(()=>document.fonts.ready);
   await page.waitForTimeout(400);
   const copy=await page.evaluate(()=>document.body.innerText+' '+document.title+' '+[...document.querySelectorAll('[aria-label],img,meta[name="description"],meta[property^="og:"]')].map(e=>e.getAttribute('aria-label')||e.getAttribute('alt')||e.getAttribute('content')||'').join(' '));
   assert.ok(!banned.test(copy),'Banned copy: '+copy.match(banned)?.[0]);
   assert.equal(await page.locator('h1').count(),1);
   assert.equal(await page.locator('.decision-moment').count(),1);
   assert.ok(await page.locator('.system-details dl>div').count()>=5);
   assert.equal(await page.locator('.case-next a').getAttribute('href'),'/work/'+slugs[(index+1)%4]);
   const figures=page.locator('figure');
   assert.ok(await figures.count()>=4);
   for(let i=0;i<await figures.count();i++) {
    const figure=figures.nth(i);
    await figure.evaluate(e=>e.scrollIntoView({block:'center',behavior:'instant'}));
    await page.waitForTimeout(100);
    const info=await figure.evaluate(e=>({id:e.dataset.diagram,height:e.getBoundingClientRect().height,caption:!!e.querySelector('figcaption')?.textContent.trim(),visual:[...e.querySelectorAll('svg,img')].some(v=>v.getBoundingClientRect().height>0&&v.getBoundingClientRect().width>0),unlabeled:[...e.querySelectorAll('svg')].some(v=>v.getAttribute('role')!=='img'||!v.getAttribute('aria-label')),entered:e.dataset.entered==='true'}));
    result.figures.push(info);
    assert.ok(info.visual,'Empty figure: '+info.id);
    assert.ok(info.caption,'Missing caption: '+info.id);
    assert.ok(!info.unlabeled,'Inaccessible SVG: '+info.id);
    assert.ok(info.entered,'Figure did not reach 50% visibility: '+info.id+' height '+info.height);
   }
   await page.locator('#decision').evaluate(e=>e.scrollIntoView({block:'start',behavior:'instant'}));
   await page.waitForTimeout(100);
   assert.equal(await page.locator('.v2-toc [aria-current]').getAttribute('href'),'#decision','TOC did not follow scroll');
   if(width!==768 && theme==='light') await page.screenshot({path:`screenshots/case-studies-v2/review/${slug}-${width}-decision.png`});
   const axe=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
   assert.deepEqual(axe.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))})),[],'Accessibility violations');
   const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth);
   assert.ok(!overflow,'Horizontal overflow');
   // Repeat entry: the observer must not emit again for the same mounted figure.
   for(let i=0;i<await figures.count();i++) { await figures.nth(i).evaluate(e=>e.scrollIntoView({block:'center',behavior:'instant'})); await page.waitForTimeout(70); }
   await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));
   await page.screenshot({path:`screenshots/case-studies-v2/${slug}-${width}-${theme}.png`,fullPage:true});
   if(width!==768) await page.screenshot({path:`screenshots/case-studies-v2/review/${slug}-${width}-${theme}-hero.png`});
   if(analytics) {
    for(let i=0;i<60;i++) { if(fixture.events.filter(e=>e.event==='diagram_viewed').length>=result.figures.length) break; await page.waitForTimeout(200); }
    const viewed=fixture.events.filter(e=>e.event==='diagram_viewed');
    assert.equal(viewed.length,result.figures.length,'Missing or duplicate diagram_viewed events');
    for(const figure of result.figures) assert.equal(viewed.filter(e=>e.properties.diagram===figure.id&&e.properties.case_study===slug).length,1,'Expected exactly one event: '+figure.id);
    result.analytics={diagrams:viewed.length,proxyRequests:fixture.requests.length};
   }
   assert.deepEqual(pageErrors,[],'Browser exceptions');
   assert.deepEqual(fixture.failures,[],'Analytics transport errors');
  } catch(error) { result.failures.push(error.message); errors.push(`${slug} ${width} ${theme}: ${error.message}`); await page.screenshot({path:`screenshots/case-studies-v2/${slug}-${width}-${theme}-failure.png`,fullPage:true}).catch(()=>{}); }
  results.push(result); console.log(`${result.failures.length?'FAIL':'PASS'} ${slug} ${width} ${theme}: ${result.figures.length} figures`);
  await context.close();
 }
 // Check the rest of the served pages, including metadata and accessible labels.
 const context=await browser.newContext({userAgent:humanUserAgent});
 await interceptPostHog(context,origin);
 const page=await context.newPage();
 for(const route of ['/','/work','/about','/projects']) {
  await page.goto(origin+route);
  const copy=await page.evaluate(()=>document.body.innerText+' '+document.title+' '+[...document.querySelectorAll('[aria-label],img,meta[name="description"]')].map(e=>e.getAttribute('aria-label')||e.getAttribute('alt')||e.getAttribute('content')||'').join(' '));
  if(banned.test(copy)) errors.push(route+': banned copy '+copy.match(banned)?.[0]);
 }
 await context.close();
} finally {
 await fs.writeFile('validation/case-studies-v2.json',JSON.stringify({analyticsMode:analytics?'Actual SDK with intercepted proxy requests; no live ingestion':'visual only',results,errors},null,2));
 await browser.close();
}
assert.deepEqual(errors,[],errors.join('\n'));
console.log(`PASS: ${results.length} case/theme/viewport combinations, non-empty accessible figures, active contents, copy guardrails, and next-case loop${analytics?', diagram events exactly once':''}.`);
