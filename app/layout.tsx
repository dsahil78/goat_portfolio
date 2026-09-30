import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import { Header, Footer } from '@/components/site-shell';
import { profile, education } from '@/content/profile';
import { origin, indexable } from '@/lib/site';
import { PortfolioAnalytics } from '@/components/portfolio-analytics';
import './globals.css';
import './case-studies.css';

const inter = localFont({ src: '../public/fonts/inter-latin-variable.woff2', variable: '--font-body', weight: '400 700', display: 'swap' });
const interTight = localFont({ src: '../public/fonts/inter-tight-latin-variable.woff2', variable: '--font-heading', weight: '400 700', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(origin),
  title: { default: 'Sahil Dua: Technical Product Manager & Founder', template: '%s | Sahil Dua' },
  description: 'Sahil Dua builds AI platforms, enterprise software, and marketplaces. Explore product decisions, founder experience, and measured business outcomes.',
  robots: { index:indexable, follow:indexable },
};
export const viewport: Viewport = { themeColor:'#FAFAF7',width:'device-width',initialScale:1 };

export default function RootLayout({children}:Readonly<{children:React.ReactNode}>) {
  const person = { '@context':'https://schema.org','@type':'Person',name:profile.name,url:origin,jobTitle:'Technical Product Manager',email:profile.email,image:`${origin}/images/sahil-portrait.jpg`,sameAs:[profile.linkedin,profile.github],alumniOf:education.map(item=>({'@type':'CollegeOrUniversity',name:item.institution})) };
  return <html lang="en" className={`${inter.variable} ${interTight.variable}`}><body><a className="skip" href="#main" data-analytics-location="skip_link">Skip to content</a><div className="shell"><Header/>{children}<Footer/></div><PortfolioAnalytics/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(person).replace(/</g,'\\u003c')}}/></body></html>;
}
