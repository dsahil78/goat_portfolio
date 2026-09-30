// Requires Playwright and its Chromium browser; used only for the design review.
const { chromium } = require('playwright');
const path = require('node:path');
const fs = require('node:fs');
(async () => {
  const browser = await chromium.launch({headless:true});
  const root = __dirname;
  const pages = process.argv.slice(2);
  if (!pages.length) pages.push('index', 'case-study');
  fs.mkdirSync(path.join(root,'screenshots'), {recursive:true});
  const checks=[];
  for (const width of [360,390,768,1024,1440]) {
    const page = await browser.newPage({viewport:{width,height:1000}, reducedMotion:'reduce'});
    const errors=[];
    page.on('pageerror', e=>errors.push(e.message));
    for (const name of pages) {
      await page.goto('file://'+path.join(root,name+'.html'));
      await page.evaluate(async () => {
        await Promise.all([...document.images].map(async img => {
          img.loading = 'eager';
          await img.decode();
        }));
      });
      const result=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth,h1:document.querySelectorAll('h1').length,brokenAnchors:[...document.querySelectorAll('a[href^="#"]')].filter(a=>!document.getElementById(a.hash.slice(1))).map(a=>a.hash)}));
      checks.push({page:name,width,...result,errors:[...errors]});
      if(width===390||width===1440) {
        const base = path.basename(name);
        await page.screenshot({path:path.join(root,'screenshots',base+'-'+width+'.png'),fullPage:true});
        await page.screenshot({path:path.join(root,'screenshots',base+'-'+width+'-opening.png'),fullPage:false});
      }
    }
    await page.close();
  }
  await browser.close();
  fs.writeFileSync(path.join(root,pages[0].includes('studio') ? 'studio-validation.json' : 'validation.json'),JSON.stringify(checks,null,2));
  console.log(JSON.stringify(checks,null,2));
  if(checks.some(c=>c.overflow||c.h1!==1||c.brokenAnchors.length||c.errors.length)) process.exitCode=1;
})();
