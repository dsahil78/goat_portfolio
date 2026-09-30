import Image from 'next/image';
import { MermaidDiagram } from './mermaid-diagram';
import { cases, caseHref } from '@/content/case-studies';
import { Tag, ArrowLink, Metrics, KeyDecision } from './ui';

export function SelectedWork() {
  const document = cases.find(study => study.slug === 'doc-intelligence-ps')!;
  const inventory = cases.find(study => study.slug === 'closphere-inventory-intelligence')!;
  const filo = cases.find(study => study.slug === 'filo-us-product-launch')!;
  return (
    <section id="work" data-analytics-location="selected_work" data-analytics-section="selected_work" className="selected-work section" aria-labelledby="work-title">
      <div className="section-heading"><div><Tag>Selected work</Tag><h2 id="work-title">The decisions behind the outcomes.</h2></div></div>
      <article className="featured-case" aria-labelledby="document-title">
        <div className="featured-content">
          <div className="project-meta"><span className="company-label">{document.company}</span><span>{document.role}</span></div>
          <h3 id="document-title">{document.title}</h3>
          <p className="project-problem">The roadmap called for six more format-specific parsers.</p>
          <KeyDecision>{document.decision}</KeyDecision>
          <ArrowLink href={caseHref(document)} label="Read case study: ProductSquads">Read case study</ArrowLink>
        </div>
        <div className="featured-visual"><MermaidDiagram id="document-overview" compact/></div>
        <Metrics items={document.metrics} className="featured-metrics"/>
      </article>

      <div className="work-grid">
        <article className="work-story" aria-labelledby="inventory-title">
          <figure className="work-image inventory-image"><Image src="/images/closphere-dashboard.png" width={1471} height={809} sizes="(max-width: 700px) 90vw, 520px" alt="Closphere InventoryIQ interface with inventory coverage and operational exceptions"/><figcaption>InventoryIQ by Closphere · Interface reference</figcaption></figure>
          <div className="project-meta"><span className="company-label">{inventory.company}</span><span>{inventory.role}</span></div>
          <h3 id="inventory-title">{inventory.title}</h3>
          <p className="project-problem">Small manufacturers ran on Tally, Zoho, Vyapar, and spreadsheets that never agreed with each other.</p>
          <KeyDecision>{inventory.decision}</KeyDecision>
          <Metrics items={[inventory.metrics[0], inventory.metrics[2]]} className="story-metrics"/>
          <div className="story-footer"><ArrowLink href={caseHref(inventory)} label="Read case study: Closphere">Read case study</ArrowLink><span>Exited through a technology/IP sale</span></div>
        </article>
        <article className="work-story" aria-labelledby="filo-title">
          <figure className="work-image filo-image"><Image src="/images/filo-product.png" width={2940} height={1506} sizes="(max-width: 700px) 90vw, 520px" alt="Filo’s tutoring experience with question intake and tutor connection options"/><figcaption>Filo · Instant tutoring experience</figcaption></figure>
          <div className="project-meta"><span className="company-label">{filo.company}</span><span>{filo.role}</span></div>
          <h3 id="filo-title">{filo.title}</h3>
          <p className="project-problem">US students wanted a collaborative learning experience, not the model that worked in India.</p>
          <KeyDecision>{filo.decision}</KeyDecision>
          <Metrics items={filo.metrics.slice(0,2)} className="story-metrics"/>
          <div className="story-footer"><ArrowLink href={caseHref(filo)} label="Read case study: Filo">Read case study</ArrowLink><span>From launch to scale in six months</span></div>
        </article>
      </div>

      <div className="all-work-link"><ArrowLink href="/work">View all work</ArrowLink></div>
    </section>
  );
}
