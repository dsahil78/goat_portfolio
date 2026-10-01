import Image from 'next/image';
import { profile } from '@/content/profile';
import { SelectedWork } from '@/components/project-previews';
import { Tag, ArrowLink } from '@/components/ui';
import { Contact } from '@/components/site-shell';
import { pageMetadata } from '@/lib/site';

export const metadata = pageMetadata('Sahil Dua · Technical Product Manager, AI Platforms', 'I build AI that enterprises trust in production. Product decisions across document AI, inventory intelligence, commercial workflows, and marketplaces.', '/');

export default function Home() {
  return <main id="main" tabIndex={-1}>
    <section className="hero" data-analytics-location="hero" data-analytics-section="hero" aria-labelledby="intro-title">
      <Tag>Technical Product Manager · AI Platforms</Tag>
      <h1 id="intro-title">Sahil Dua<span>.</span></h1>
      <p className="hero-positioning">I build AI that enterprises<br className="desktop-break"/> trust in production.</p>
      <p className="hero-description">Technical PM across AI platforms, enterprise SaaS, and marketplaces. I’ve shipped evaluation-led document AI at 100K+ documents a month, founded an inventory platform that exited through a technology/IP sale, and launched a tutoring marketplace in the US.</p>
      <div className="hero-actions"><ArrowLink href="#work" className="button button-primary" direction="↓">View work</ArrowLink><ArrowLink href={profile.resume} className="button button-secondary">Résumé</ArrowLink></div>
    </section>
    <div className="proof-strip" aria-label="Selected outcomes" data-analytics-location="leadership_highlights">
      <a href="/work/doc-intelligence-ps"><strong>100K+</strong><span className="proof-unit">documents/month</span><p>95%+ field-level exact match before human review</p><span className="tag">ProductSquads</span></a>
      <a href="/work/closphere-inventory-intelligence"><strong>63</strong><span className="proof-unit">paying customers</span><p>Founder, exited through a technology/IP sale</p><span className="tag">Closphere</span></a>
      <a href="/work/filo-us-product-launch"><strong>$1.5M</strong><span className="proof-unit">ARR in six months</span><p>US marketplace launch, 120K users</p><span className="tag">Filo</span></a>
    </div>
    <SelectedWork/>
    <section id="about" data-analytics-section="about" className="about-section section" aria-labelledby="about-title">
      <div><Tag>Background</Tag><h2 id="about-title">Engineer by training.<br/>Product builder by practice.</h2><p>My path spans enterprise document AI, an inventory platform I founded, and a US tutoring marketplace launch. The thread is the same: make complex systems dependable enough for people to act on.</p><ArrowLink href="/about">More about me</ArrowLink><p className="education-note">UW MS Information Management, Product &amp; AI, Sep 2025 to Aug 2026.<br/>Amity BTech CSE, 2016 to 2020.</p></div>
      <figure className="team-figure"><Image src="/images/kindred-team.webp" width={828} height={552} sizes="(max-width: 767px) calc(100vw - 48px), 496px" alt="Sahil Dua with the Kindred class-project team at UW’s Dempsey Startup Competition"/><figcaption>With the Kindred class-project team at UW’s Dempsey Startup Competition.</figcaption></figure>
    </section>
    <Contact/>
  </main>;
}
