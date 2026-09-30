import { Fragment } from 'react';
import { cases, caseHref, type CaseStudy } from '@/content/case-studies';
import { ArrowLink, Tag } from './ui';
import { Contact } from './site-shell';
import { MetricStrip } from './diagrams/MetricStrip';
import { DecisionCard } from './diagrams/DecisionCard';
import { ProductArtifact } from './case-v2/product-artifacts';
import { CaseFigure } from './case-v2/case-figures';
import { CaseContents } from './case-v2/case-contents';

function MarkedCopy({ text }: { text: string }) {
  return <>{text.split(/(\[(?:CONFIRM|SAHIL)[^\]]*\])/g).map((part, i) => part.startsWith('[CONFIRM') || part.startsWith('[SAHIL') ? <mark className="confirmation" key={i}>{part}</mark> : <Fragment key={i}>{part}</Fragment>)}</>;
}

export function CaseStudyPage({ study }: { study: CaseStudy }) {
  const next = cases[(cases.findIndex(item => item.slug === study.slug) + 1) % cases.length];
  return <main id="main" tabIndex={-1} className="case-v2" data-case-study={study.slug} data-analytics-location="case_study">
    <header className="v2-hero">
      <ArrowLink href="/work" className="back-link" direction="←">All work</ArrowLink>
      <div className="v2-meta"><strong>{study.company}</strong><span>{study.role}</span><span>{study.dates}</span><span>{study.readingTime}</span></div>
      <h1>{study.title}</h1><p className="v2-dek">{study.description}</p>
      <p className="v2-skills">{study.labels.join(' · ')}</p>
    </header>
    <MetricStrip metrics={study.metrics}/>
    <ProductArtifact study={study}/>
    <div className="v2-scope v2-prose"><div><Tag>The key decision</Tag><p>{study.decision}</p></div><div><Tag>My scope</Tag><p>{study.scope}</p></div></div>
    <CaseContents sections={study.sections.map(({ id, label }) => ({ id, label }))}/>
    <article className="v2-narrative" aria-label={`${study.company} case study`}>
      {study.sections.map(section => <Fragment key={section.id}>
        <section id={section.id} className={`v2-section ${section.id === 'decision' ? 'decision-moment' : ''}`} aria-labelledby={`${section.id}-title`} data-analytics-section={`case_${section.id}`} data-case-end={section.id === study.sections.at(-1)?.id ? 'true' : undefined}>
          <div className="v2-prose"><Tag>{section.label}</Tag><h2 id={`${section.id}-title`}>{section.title}</h2></div>
          {section.id === 'decision' && <DecisionCard study={study}/>}
          <div className="v2-prose">{section.paragraphs.map((paragraph, i) => <div className="marked-paragraph" key={i}>{paragraph.kind && <span className={`reason-chip margin-marker ${paragraph.kind}`}>{paragraph.kind}</span>}<p><MarkedCopy text={paragraph.text}/></p></div>)}</div>
          {section.figures.map(id => <CaseFigure id={id} caseStudy={study.slug} key={id}/>)}
          {section.notices && <div className="v2-prose case-notices">{section.notices.map(note => <p key={note}><MarkedCopy text={note}/></p>)}</div>}
          {section.footnotes && <div className="v2-prose case-footnotes">{section.footnotes.map(note => <p key={note}>{note}</p>)}</div>}
        </section>
        {section.systemDetails && <section className="system-details v2-prose" aria-labelledby="system-details-title"><h2 id="system-details-title">System details</h2><dl>{study.systemDetails.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl></section>}
      </Fragment>)}
    </article>
    <div className="case-next" data-analytics-location="next_case" data-analytics-section="next_case"><div><Tag>Next case study / {next.company}</Tag><h2>{next.shortTitle}</h2></div><ArrowLink href={caseHref(next)} className="button button-secondary" label={`Explore ${next.company}: next case study`}>Explore {next.company}</ArrowLink></div>
    <Contact/>
  </main>;
}
