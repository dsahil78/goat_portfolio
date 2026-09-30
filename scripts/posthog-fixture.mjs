import fs from 'node:fs/promises';
import path from 'node:path';
import { gunzipSync } from 'node:zlib';

// Actual SDK, mocked transport. No data is sent to a real PostHog project.
export async function interceptPostHog(context, origin) {
  const events = [], failures = [], requests = [];
  const token = 'phc_local_test_not_a_real_project';
  const config = { hasFeatureFlags:false, autocapture_opt_out:false, supportedCompression:[], sessionRecording:{endpoint:'/s/', sampleRate:1, minimumDurationMilliseconds:0}, heatmaps:true };
  await context.addInitScript(() => {
    Object.defineProperty(navigator, 'webdriver', {get:()=>false});
    Object.defineProperty(navigator, 'userAgentData', {get:()=>undefined});
  });
  await context.route('**/*', async route => {
    const request = route.request(), url = new URL(request.url());
    if (url.hostname.endsWith('posthog.com')) { failures.push('Bypassed proxy: '+url.pathname); return route.abort(); }
    if (url.origin !== origin || !url.pathname.startsWith('/ingest/')) return route.continue();
    requests.push(url.pathname);
    if(url.pathname.endsWith('/config.js')) return route.fulfill({contentType:'application/javascript',body:`window._POSTHOG_REMOTE_CONFIG={${JSON.stringify(token)}:{config:${JSON.stringify(config)}}};`});
    if(url.pathname.endsWith('/config') || url.pathname.includes('/flags/')) return route.fulfill({json:config});
    if(url.pathname.endsWith('.js')) {
      try { return route.fulfill({contentType:'application/javascript',body:await fs.readFile(path.join('node_modules/posthog-js/dist',path.basename(url.pathname)))}); }
      catch { failures.push('Missing SDK fixture: '+url.pathname); return route.abort(); }
    }
    const buffer = request.postDataBuffer();
    if(buffer) {
      try {
        let text=buffer.toString();
        if(buffer[0]===31 && buffer[1]===139) text=gunzipSync(buffer).toString();
        else if(!text.startsWith('{') && !text.startsWith('[')) {
          const params=new URLSearchParams(text), bytes=Buffer.from(params.get('data') || '', 'base64');
          text=(params.get('compression')==='gzip-js'?gunzipSync(bytes):bytes).toString();
        }
        const payload=JSON.parse(text); events.push(...(Array.isArray(payload)?payload:payload.batch||[payload]));
      } catch(error) { failures.push('Cannot decode '+url.pathname+': '+error.message); }
    }
    return route.fulfill({status:200,json:{status:1}});
  });
  return {events,failures,requests};
}
export const humanUserAgent='Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/153.0.0.0 Safari/537.36';
