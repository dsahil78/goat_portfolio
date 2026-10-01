import type { Metadata } from 'next';
export const origin = 'https://duasahil.com';
export const indexable = process.env.VERCEL_ENV === 'production' || (!process.env.VERCEL && process.env.SITE_INDEXABLE === 'true');
export function pageMetadata(title: string, description: string, path: string): Metadata {
  const image = path.startsWith('/work/') ? `${path}/opengraph-image` : '/opengraph-image';
  const displayTitle = path === '/' ? title : `${title} | Sahil Dua`;
  return {
    title: { absolute: displayTitle }, description, alternates: { canonical: path },
    openGraph: { title: displayTitle, description, url: `${origin}${path}`, type: 'website', images: [{url:image,width:1200,height:630,alt:displayTitle}] },
    twitter: { card: 'summary_large_image', title: displayTitle, description, images:[image] },
  };
}
