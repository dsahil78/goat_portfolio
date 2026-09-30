import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import fs from 'node:fs/promises';
import assert from 'node:assert/strict';

const origin=process.env.TEST_URL || 'http://127.0.0.1:3000';
const routes=['/','/work','/projects','/about','/work/doc-intelligence-ps','/work/closphere-inventory-intelligence','/work/filo-us-product-launch','/work/scieden-sales-workflow'];
await fs.mkdir('validation/screenshots',{recursive:true});
const browser=await chromium.launch({headless:true});
const results=[];
const failures=[];
const localLinks=new Set();
function check(ok,message){if(!ok) failures.push(message);}
try {
  for(const width of [360,390,768,1024,1440]) {
    const context=await browser.newContext({viewport:{width,height:1000},reducedMotion:'reduce'});
    const page=await context.newPage();
    const errors=[];
    page.on('pageerror',e=>errors.push(String(e)));
    page.on('console',msg=>{if(msg.type()==='error') errors.push(msg.text());});
    for(const route of routes) {
      errors.length=0;
      const response=await page.goto(origin+route,{waitUntil:'networkidle'});
      check(response.status()===200,`${route}: HTTP ${response.status()}`);
      await page.evaluate(async()=>{
        await Promise.all([...document.images].map(async image=>{
          image.loading='eager';
          await image.decode();
        }));
      });
      const layout=await page.evaluate(()=>({
        overflow:document.documentElement.scrollWidth>innerWidth+1,
        h1:document.querySelectorAll('h1').length,
        title:document.title,
        description:document.querySelector('meta[name="description"]')?.content,
        canonical:document.querySelector('link[rel="canonical"]')?.href,
        noindex:document.querySelector('meta[name="robots"]')?.content.includes('noindex'),
        brokenImages:[...document.images].filter(i=>!i.complete||!i.naturalWidth).map(i=>i.src),
        brokenAnchors:[...document.querySelectorAll('a[href^="#"]')].filter(a=>!document.getElementById(a.hash.slice(1))).map(a=>a.hash),
        links:[...document.querySelectorAll('a')].map(a=>a.getAttribute('href')),
      }));
      layout.links.filter(href=>href?.startsWith('/')).forEach(href=>localLinks.add(href));
      delete layout.links;
      check(!layout.overflow,`${route} ${width}px: horizontal overflow`);
      check(layout.h1===1,`${route}: ${layout.h1} H1s`);
      check(Boolean(layout.title&&layout.description),`${route}: missing page metadata`);
      check(layout.canonical===`https://duasahil.com${route==='/'?'/':route}`,`${route}: unexpected canonical ${layout.canonical}`);
      check(layout.noindex,`${route}: preview is indexable`);
      check(!layout.brokenImages.length,`${route}: broken images`);
      check(!layout.brokenAnchors.length,`${route}: broken anchors`);
      check(!errors.length,`${route}: console errors ${errors.join('; ')}`);
      let violations=[];
      if(width===390||width===1440) {
        const axe=await new AxeBuilder({page}).options({runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa']},rules:{'label-content-name-mismatch':{enabled:true}}}).analyze();
        violations=axe.violations.map(v=>({id:v.id,impact:v.impact,description:v.description,nodes:v.nodes.map(n=>n.target)}));
        check(!violations.length,`${route} ${width}px: accessibility violations ${violations.map(v=>v.id).join(', ')}`);
        const name=route==='/'?'home':route.replaceAll('/','-').slice(1);
        await page.screenshot({path:`validation/screenshots/${name}-${width}.png`,fullPage:true});
      }
      results.push({route,width,...layout,errors:[...errors],violations});
      console.log(`${route} @ ${width}: overflow=${layout.overflow}, a11y=${violations.length}, errors=${errors.length}`);
    }
    await context.close();
  }
  const page=await browser.newPage({viewport:{width:390,height:900},reducedMotion:'reduce'});
  await page.goto(origin);
  await page.keyboard.press('Tab');
  check(await page.locator('.skip').evaluate(el=>el===document.activeElement),'Skip link is not first focus target');
  await page.keyboard.press('Enter');
  check(await page.locator('#main').evaluate(el=>el===document.activeElement),'Skip link did not focus main');
  await page.getByRole('navigation',{name:'Main navigation'}).getByRole('link',{name:'Experiments',exact:true}).click();
  await page.waitForURL('**/projects');
  await page.getByRole('navigation',{name:'Main navigation'}).getByRole('link',{name:'About',exact:true}).click();
  await page.waitForURL('**/about');
  await page.getByRole('navigation',{name:'Main navigation'}).getByRole('link',{name:'Work',exact:true}).click();
  await page.waitForURL('**/work');
  check(await page.getByRole('navigation',{name:'Main navigation'}).getByRole('link',{name:'Work',exact:true}).getAttribute('aria-current')==='page','Work directory is not marked active');
  check((await page.reload()).status()===200,'Work directory refresh failed');
  await page.getByRole('navigation',{name:'Browse case studies'}).getByRole('link',{name:'Filo',exact:false}).click();
  check(await page.locator('#filo-us-product-launch').evaluate(el=>el.getBoundingClientRect().top>=0),'Work directory jump link failed');
  await page.getByRole('link',{name:'Read case study: ProductSquads'}).click();
  await page.waitForURL('**/work/doc-intelligence-ps');
  const refreshed=await page.reload();
  check(refreshed.status()===200,'Case-study refresh failed');
  await page.getByRole('link',{name:'All work',exact:true}).click();
  await page.waitForURL('**/work');
  await page.getByRole('link',{name:'Read case study: ProductSquads'}).click();
  await page.waitForURL('**/work/doc-intelligence-ps');
  await page.getByRole('navigation',{name:'Case study contents'}).getByRole('link',{name:'What It Cost'}).click();
  check(await page.locator('#cost').evaluate(el=>el.getBoundingClientRect().top>=0),'Anchor target obscured');
  check(await page.evaluate(()=>getComputedStyle(document.documentElement).scrollBehavior==='auto'),'Reduced motion not honored');
  const resume=await page.request.get(origin+'/resume.pdf');
  check(resume.status()===200&&resume.headers()['content-type'].includes('application/pdf'),'Résumé PDF response invalid');
  check((await resume.body()).subarray(0,5).toString()==='%PDF-','Résumé file is not a PDF');
  const redirect=await page.request.get(origin+'/about-me',{maxRedirects:0});
  check(redirect.status()===308&&redirect.headers().location==='/about','About redirect is not permanent');
  const missing=await page.request.get(origin+'/work/not-a-real-case');
  check(missing.status()===404,'Unknown case should be 404');
  for(const route of ['/sitemap.xml','/robots.txt','/icon.svg','/opengraph-image']) {
    const r=await page.request.get(origin+route);
    check(r.status()===200,`${route} failed`);
    check(r.headers()['x-robots-tag']==='noindex, nofollow',`${route} missing preview noindex header`);
  }
  for(const href of localLinks) {
    const r=await page.request.get(origin+href.split('#')[0]);
    check(r.ok(),`Local link failed: ${href}`);
    if(href.includes('#')) {
      await page.goto(origin+href);
      check(await page.locator(`[id="${href.split('#')[1]}"]`).count()===1,`Missing link target ${href}`);
    }
  }
  for(const route of routes) {
    await page.goto(origin+route);
    await page.evaluate(()=>{
      const elements=[...document.querySelectorAll('body *')].map(el=>[el,parseFloat(getComputedStyle(el).fontSize)]);
      for(const [el,size] of elements)el.style.fontSize=`${size*2}px`;
    });
    const enlarged=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth+1,offenders:[...document.querySelectorAll('main *')].filter(el=>el.getBoundingClientRect().right>innerWidth+1).slice(0,12).map(el=>({tag:el.tagName,class:el.className,text:el.textContent.slice(0,60)}))}));
    check(!enlarged.overflow,`${route}: 200% text overflows: ${JSON.stringify(enlarged.offenders)}`);
    results.push({route,textEnlargement:'200%',...enlarged});
  }
  await page.setViewportSize({width:1440,height:1000});
  for(const [name,id] of [['Let’s talk','contact']]) {
    await page.goto(origin);
    await page.getByRole('navigation',{name:'Main navigation'}).getByRole('link',{name,exact:false}).click();
    const targetTop=await page.locator('#'+id).evaluate(el=>el.getBoundingClientRect().top);
    const headerBottom=await page.locator('.site-header').evaluate(el=>el.getBoundingClientRect().bottom);
    check(targetTop>=headerBottom,`Desktop anchor ${id} obscured by header`);
  }
  const nojs=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:900}});
  const plain=await nojs.newPage();
  await plain.goto(origin);
  check(await plain.getByRole('heading',{level:1}).innerText()==='Sahil Dua.','Content unavailable without JavaScript');
  await plain.getByRole('navigation',{name:'Main navigation'}).getByRole('link',{name:'Work',exact:true}).click();
  check(await plain.getByRole('heading',{level:1}).innerText()==='Selected work.','Work directory unavailable without JavaScript');
  await plain.getByRole('link',{name:'Read case study: ProductSquads'}).click();
  check((await plain.locator('#cost').innerText()).includes('evaluation framework in four layers'),'Case content unavailable without JavaScript');
  check(await plain.locator('[data-diagram="eval-stack"] svg').evaluate(el=>el.getBoundingClientRect().height>0),'Evaluation figure unavailable without JavaScript');
  check(await plain.locator('[data-diagram="eval-stack"]').innerText().then(text=>text.includes('golden sets')),'Evaluation labels unavailable without JavaScript');
  await nojs.close();
  await page.goto(origin+'/work/doc-intelligence-ps');
  await page.locator('.v2-toc a[href="#decision"]').focus();
  await page.keyboard.press('Enter');
  check(await page.locator('#decision').evaluate(el=>el.getBoundingClientRect().top>=0),'Decision navigation failed by keyboard');
} finally {
  await browser.close();
  await fs.writeFile('validation/browser-results.json',JSON.stringify({origin,results,failures},null,2));
}
if(failures.length) console.error(failures.join('\n'));
assert.equal(failures.length,0,`${failures.length} validation failures`);
console.log('All browser, accessibility, navigation, metadata, and text-enlargement checks passed.');
