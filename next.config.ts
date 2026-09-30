import type { NextConfig } from 'next';

const indexable = process.env.VERCEL_ENV === 'production' || (!process.env.VERCEL && process.env.SITE_INDEXABLE === 'true');
const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: { formats: ['image/avif', 'image/webp'] },
  skipTrailingSlashRedirect: true,
  async rewrites() {
    return [
      { source: '/ingest/static/:path*', destination: 'https://us-assets.i.posthog.com/static/:path*' },
      { source: '/ingest/:path*', destination: 'https://us.i.posthog.com/:path*' },
    ];
  },
  async redirects() {
    return [{ source: '/about-me', destination: '/about', permanent: true }];
  },
  async headers() {
    return [{ source: '/:path*', headers: [
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      { key: 'Content-Security-Policy', value: "frame-ancestors 'self' https://us.posthog.com;" },
      ...(!indexable ? [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }] : []),
    ] }];
  },
};
export default nextConfig;
