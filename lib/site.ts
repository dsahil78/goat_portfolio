import type { Metadata } from 'next';
export const origin = (process.env.SITE_URL || 'https://duasahil.com').replace(/\/$/, '');
export const indexable = process.env.VERCEL_ENV === 'production' || (!process.env.VERCEL && process.env.SITE_INDEXABLE === 'true');
export function pageMetadata(title: string, description: string, path: string): Metadata {
  return {
    title, description, alternates: { canonical: path },
    openGraph: { title: `${title} | Sahil Dua`, description, url: `${origin}${path}`, type: 'website', images: [{url:'/opengraph-image',width:1200,height:630,alt:'Sahil Dua: Technical Product Manager & Founder'}] },
    twitter: { card: 'summary_large_image', title: `${title} | Sahil Dua`, description, images:['/opengraph-image'] },
  };
}
