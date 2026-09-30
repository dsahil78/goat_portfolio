import type { MetadataRoute } from 'next';
import {origin,indexable} from '@/lib/site';
export default function robots():MetadataRoute.Robots {
  return {rules:{userAgent:'*',allow:'/'},...(indexable?{sitemap:`${origin}/sitemap.xml`}:{})};
}
