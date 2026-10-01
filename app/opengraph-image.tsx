import { ImageResponse } from 'next/og';
import { SocialImage } from '@/components/social-image';
export const alt = 'Sahil Dua · Technical Product Manager, AI Platforms';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export default function Image() { return new ImageResponse(<SocialImage/>,size); }
