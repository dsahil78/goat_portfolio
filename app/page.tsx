import Image from 'next/image';
import { profile, education } from '@/content/profile';
import { projects } from '@/content/projects';
import { SelectedWork } from '@/components/project-previews';
import { Tag, ArrowLink } from '@/components/ui';
import { Contact } from '@/components/site-shell';
import { pageMetadata } from '@/lib/site';

export const metadata = pageMetadata('Technical Product Manager & Founder', 'Sahil Dua builds AI platforms, enterprise software, and marketplaces. Explore the product decisions behind document intelligence, Closphere, and Filo’s US launch.', '/');

export default function Home() {
  return (
    <main id="main" tabIndex={-1}>
      <section data-analytics-location="hero" data-analytics-section="hero" className="hero" aria-labelledby="intro-title">
        <div className="hero-copy">
          <h1 id="intro-title">Sahil Dua<span>.</span></h1>
          <p className="hero-positioning">I build AI products for complex,<br className="desktop-break"/> real-world workflows.</p>
          <p className="hero-description">From scaling document intelligence to founding an inventory SaaS and taking a tutoring marketplace into the US.</p>
          <div className="hero-actions"><ArrowLink href="#work" className="button button-primary" direction="↓">View work</ArrowLink><ArrowLink href={profile.resume} className="button button-secondary">View résumé</ArrowLink></div>
        </div>
        <figure className="hero-portrait">
          <div className="portrait-frame"><Image src="/images/sahil-portrait.jpg" width={4284} height={5712} sizes="(max-width: 700px) 96px, 260px" preload alt="Sahil Dua at the beach at sunset"/></div>
          <figcaption>Engineer by training.<br/>Product builder by practice.</figcaption>
        </figure>
        <div data-analytics-location="leadership_highlights" className="experience-strip" aria-label="Product leadership highlights">
          <a href="/work/doc-intelligence-ps"><strong>AI in production <span aria-hidden="true">↗</span></strong><span>100K+ documents/month. 95%+ field-level exact match before human review.</span><span className="highlight-company">ProductSquads</span></a>
          <a href="/work/closphere-inventory-intelligence"><strong>Founder to exit <span aria-hidden="true">↗</span></strong><span>63 paying customers, 1K+ users. Technology/IP sale.</span><span className="highlight-company">Closphere</span></a>
          <a href="/work/filo-us-product-launch"><strong>US market launch <span aria-hidden="true">↗</span></strong><span>120K users and $1.5M ARR in six months</span><span className="highlight-company">Filo</span></a>
        </div>
      </section>

      <SelectedWork/>

      <section id="experiments" data-analytics-location="homepage_experiments" data-analytics-section="experiments" className="builds-section section" aria-labelledby="build-title">
        <div className="section-heading"><div><Tag>Prototypes &amp; experiments</Tag><h2 id="build-title">Ideas, put to work.</h2></div><ArrowLink href="/projects">All experiments</ArrowLink></div>
        <div className="build-list">
          {projects.filter(project => project.featured).map(project => (
            <article key={project.id}>
              <Image src={project.image} width={project.width} height={project.height} sizes="(max-width: 700px) 96px, 156px" alt={project.alt}/>
              <div className="build-copy"><span className="small muted">{project.status}</span><h3>{project.name}</h3><p>{project.description}</p></div>
              <ArrowLink href={`/projects#${project.id}`} label={`Explore prototype: ${project.name}`}>Explore prototype</ArrowLink>
            </article>
          ))}
        </div>
      </section>

      <section id="about" data-analytics-location="homepage_about" data-analytics-section="about" className="about-section section" aria-labelledby="about-title">
        <div className="about-intro"><Tag>Background</Tag><h2 id="about-title">An engineer’s foundation.<br/>A founder’s perspective.</h2><p>I started with data pipelines and operational systems. Product management brought me closer to the people using them. Founding Closphere made me responsible for the whole business.</p><p>Today, my focus is AI and enterprise software: connecting technical systems, real workflows, and the decisions that make a product useful.</p><ArrowLink href="/about">More about me</ArrowLink><div className="education-note">{education.map(item => <div key={item.institution}><span>{item.institution}</span><p>{item.shortDegree} · {item.completed}</p></div>)}</div></div>
        <figure><Image src="/images/kindred-team.webp" width={828} height={552} sizes="(max-width: 700px) 90vw, 38vw" alt="Sahil and the Kindred team with their award at UW’s Dempsey Startup Competition"/><figcaption>Building with the Kindred team.<br/>UW Dempsey Startup Competition.</figcaption></figure>
      </section>
      <Contact/>
    </main>
  );
}
