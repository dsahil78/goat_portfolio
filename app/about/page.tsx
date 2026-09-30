import Image from 'next/image';
import { profile, experience, education, technicalStrengths, certifications } from '@/content/profile';
import { Tag, ArrowLink } from '@/components/ui';
import { Contact } from '@/components/site-shell';
import { pageMetadata } from '@/lib/site';

export const metadata = pageMetadata('About', 'Sahil Dua’s path from engineering to product management and founding Closphere, with a focus on trustworthy AI and complex enterprise workflows.', '/about');

export default function About() {
  return (
    <main id="main" tabIndex={-1}>
      <div className="page-hero"><Tag>Background</Tag><h1>An engineer’s foundation.<br/>A founder’s perspective.</h1><p>Engineering taught me how systems work. Product management and founding a company taught me what makes them useful.</p></div>
      <div className="about-layout" data-analytics-section="biography">
        <aside className="about-photo"><Image src="/images/sahil-portrait.jpg" width={4284} height={5712} sizes="(max-width: 700px) 90vw, 420px" preload alt="Sahil Dua by the beach at sunset"/><div className="about-links" data-analytics-location="about_profile"><ArrowLink href={profile.resume}>View résumé</ArrowLink><ArrowLink href={profile.linkedin}>LinkedIn</ArrowLink></div></aside>
        <div className="about-narrative">{profile.about.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div>
      </div>
      <section className="technical-section" data-analytics-location="technical_foundations" data-analytics-section="technical_foundations" aria-labelledby="technical-title">
        <div className="section-heading"><div><Tag>Technical foundations</Tag><h2 id="technical-title">Close enough to the system<br/>to make the trade-offs.</h2></div></div>
        <div className="technical-grid">{technicalStrengths.map(item => <article key={item.title}><h3>{item.title}</h3><p>{item.detail}</p><ArrowLink href={item.href}>{item.link}</ArrowLink></article>)}</div>
        <div className="certifications"><span>Certifications</span><ul>{certifications.map(item => <li key={item}>{item}</li>)}</ul></div>
      </section>
      <section className="experience-section" data-analytics-section="experience" aria-labelledby="experience-title">
        <div><Tag>Experience</Tag><h2 id="experience-title">Where I’ve built.</h2><p>Product, engineering, and building a business.</p></div>
        <ol>{experience.map(item => <li key={item.company}><div><h3>{item.company}</h3><p>{item.role}</p>{item.summary && <p className="experience-summary">{item.summary}</p>}</div><span>{item.period}</span></li>)}</ol>
      </section>
      <section className="education-section" data-analytics-section="education" aria-labelledby="education-title">
        <div><Tag>Education</Tag><h2 id="education-title">From computer science<br/>to product &amp; AI.</h2></div>
        <ol className="education-list">{education.map(item => (
          <li key={item.institution}>
            <div className="education-entry-heading"><h3>{item.institution}</h3><span>{item.period}</span></div>
            <p>{item.degree}</p><p>{item.specialization}</p><span className="education-location">{item.location}</span>
          </li>
        ))}</ol>
      </section>
      <Contact/>
    </main>
  );
}
