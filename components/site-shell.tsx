import Link from 'next/link';
import { profile } from '@/content/profile';
import { ArrowLink, Tag } from './ui';
import { MainNavigation } from './main-navigation';

export function Header() {
  return (
    <header className="site-header" data-analytics-location="nav">
      <Link href="/" prefetch={false} className="name" aria-label="Sahil Dua: home"><span className="name-mark" aria-hidden="true"><svg viewBox="0 0 34 32" fill="none" focusable="false"><path d="M13 13c-2-3-8-2-8 1 0 4 8 2 8 6 0 4-7 5-9 1M25 7v16M25 15c-2-4-9-3-9 2s7 8 9 2" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/><circle cx="30" cy="23" r="1.5" fill="currentColor"/></svg></span><span>Sahil Dua</span></Link>
      <MainNavigation/>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="site-footer" data-analytics-location="footer">
      <span>Sahil Dua <span className="footer-role">/ Technical Product Manager &amp; Founder</span></span>
      <div><a href={profile.github}>GitHub <span aria-hidden="true">↗</span></a><a href="#main">Back to top <span aria-hidden="true">↑</span></a></div>
    </footer>
  );
}

export function Contact() {
  return (
    <section id="contact" data-analytics-location="contact" data-analytics-section="contact" className="contact-section" aria-labelledby="contact-title">
      <div><Tag>Let’s connect</Tag><h2 id="contact-title">Let’s talk product.</h2><p>For senior PM and AI product opportunities, or a complex problem worth working on.</p></div>
      <div className="contact-actions">
        <ArrowLink href={`mailto:${profile.email}`} className="contact-email">{profile.email}</ArrowLink>
        <div className="contact-links"><ArrowLink href={profile.linkedin}>LinkedIn</ArrowLink><ArrowLink href={profile.resume}>Résumé</ArrowLink></div>
      </div>
    </section>
  );
}
