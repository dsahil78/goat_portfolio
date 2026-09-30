import lighthouse from 'lighthouse';
import {launch} from 'chrome-launcher';
import {chromium} from 'playwright';
import fs from 'node:fs/promises';
const origin=process.env.TEST_URL || 'http://127.0.0.1:3000';
const outputDir=process.env.LIGHTHOUSE_OUTPUT_DIR || 'validation/lighthouse';
const routes=['/','/work','/work/doc-intelligence-ps','/projects','/about'];
await fs.mkdir(outputDir,{recursive:true});
const chrome=await launch({chromePath:chromium.executablePath(),chromeFlags:['--headless','--no-sandbox','--disable-dev-shm-usage']});
const results=[];
try {
  for(const route of routes) {
    const report=await lighthouse(origin+route,{port:chrome.port,output:['json','html'],logLevel:'error',onlyCategories:['performance','accessibility','best-practices','seo']});
    const name=route==='/'?'home':route.replaceAll('/','-').slice(1);
    await fs.writeFile(`${outputDir}/${name}.json`,report.report[0]);
    await fs.writeFile(`${outputDir}/${name}.html`,report.report[1]);
    const result={route,scores:Object.fromEntries(Object.entries(report.lhr.categories).map(([key,value])=>[key,Math.round(value.score*100)])),metrics:Object.fromEntries(['first-contentful-paint','largest-contentful-paint','total-blocking-time','cumulative-layout-shift'].map(key=>[key,report.lhr.audits[key].displayValue])),failedAudits:Object.values(report.lhr.audits).filter(a=>a.score!==null&&a.score<1&&a.scoreDisplayMode!=='informative').map(a=>({id:a.id,title:a.title,score:a.score,displayValue:a.displayValue}))};
    results.push(result);console.log(JSON.stringify(result));
  }
} finally {await chrome.kill();}
await fs.writeFile(`${outputDir}/summary.json`,JSON.stringify(results,null,2));
