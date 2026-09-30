import { chromium } from 'playwright';
import fs from 'node:fs/promises';
const browser = await chromium.launch({ headless: true });
await fs.mkdir('validation/demos', { recursive: true });
const records = [];
for (const [name, url] of [['nxtai','https://nxt.duasahil.com/'],['talentsphere','https://uh.duasahil.com/'],['rotten','https://rt.duasahil.com/'],['kindred','https://www.findmykindred.app/']]) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  try {
    const response = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(1500);
    if(name==='nxtai') await page.getByRole('button',{name:'Continue with Demo Account'}).click();
    if(name==='talentsphere') await page.getByRole('button',{name:'Sign In',exact:true}).click();
    if(name==='rotten') await page.getByRole('button',{name:'Start Evaluation',exact:true}).click();
    await page.waitForTimeout(2000);
    if(name==='nxtai' && await page.getByRole('button',{name:'Skip setup and explore with demo data'}).count()) {
      await page.getByRole('button',{name:'Skip setup and explore with demo data'}).click();
      await page.waitForTimeout(2000);
    }
    const record = { name, url, status: response?.status(), title: await page.title(), text: (await page.locator('body').innerText()).slice(0,6000), links: await page.locator('a').evaluateAll(xs => xs.map(x => ({text:x.innerText,href:x.href}))), buttons: await page.locator('button').allTextContents() };
    records.push(record);
    await page.screenshot({ path: `validation/demos/${name}.png` });
    console.log(JSON.stringify(record));
  } catch(error) { records.push({name,url,error:String(error)}); console.log(name,String(error)); }
  await page.close();
}
await fs.writeFile('validation/demos/results.json', JSON.stringify(records,null,2));
await browser.close();
