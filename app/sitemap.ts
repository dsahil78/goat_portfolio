import type { MetadataRoute } from 'next';
import {origin} from '@/lib/site';
import {cases,caseHref} from '@/content/case-studies';
export default function sitemap():MetadataRoute.Sitemap {
  return ['/', '/work', '/projects', '/about',...cases.map(caseHref)].map(path=>({url:`${origin}${path}`}));
}
