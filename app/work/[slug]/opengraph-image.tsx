import { ImageResponse } from 'next/og';
import { findCase } from '@/content/case-studies';
import { SocialImage } from '@/components/social-image';
export const alt = 'Sahil Dua · Product case study';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export default async function Image({params}:{params:Promise<{slug:string}>}) {
  const study = findCase((await params).slug);
  return new ImageResponse(<SocialImage study={study}/>, size);
}
