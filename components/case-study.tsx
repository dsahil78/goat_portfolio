import { Fragment } from 'react';
import { cases, caseHref, type CaseStudy } from '@/content/case-studies';
import { ArrowLink, Tag } from './ui';
import { Contact } from './site-shell';
import { MetricStrip } from './diagrams/MetricStrip';
import { DecisionCard } from './diagrams/DecisionCard';
import { CaseVisual } from './case-visuals';
import { CaseContents } from './case-v2/case-contents';

export function CaseStudyPage({ study }: { study: CaseStudy }) {
  const next = cases[(cases.findIndex(item => item.slug === study.slug) + 1) % cases.length];
  const contents = [
    ...study.sections.slice(0, 2).map(({ id, label }) => ({ id, label })),
    { id: 'decision', label: 'The Decision' },
    { id: 'shipped', label: 'What Shipped' },
    { id: 'system-details', label: 'System Details' },
    ...study.sections.slice(3).map(({ id, label }) => ({ id, label })),
  ];
  return <main id="main" tabIndex={-1} className="case-page" data-case-study={study.slug} data-analytics-location="case_study">
    <header className="case-hero text-column"><ArrowLink href="/work" className="back-link" direction="←">All work</ArrowLink>
      <div className="case-meta"><span>{study.company}</span><span>{study.role}</span><span>{study.dates}</span><span>Brief read</span></div>
      <h1>{study.title}</h1><p className="lead">{study.description}</p><p className="trust-line">{study.trust}</p>{study.context && <p className="company-context">{study.context}</p>}
    </header>
    <MetricStrip metrics={study.metrics}/><CaseVisual study={study}/>
    <section className="case-scope text-column" aria-labelledby="scope-title"><h2 id="scope-title" className="tag">My scope</h2><p>{study.scope}</p></section>
    <CaseContents sections={contents}/>
    <article className="case-narrative" aria-label={`${study.company} case study`}>
      {study.sections.map(section => <Fragment key={section.id}>
        <section id={section.id} className="case-section text-column" aria-labelledby={`${section.id}-title`} data-analytics-section={`case_${section.id}`} data-case-end={section.id === 'learning' ? 'true' : undefined}>
          <Tag>{section.label}</Tag><h2 id={`${section.id}-title`}>{section.title}</h2>{section.paragraphs.map(text => <p key={text}>{text}</p>)}
        </section>
        {section.id === 'findings' && <><DecisionCard study={study}/><CaseVisual study={study} supporting/></>}
        {section.id === 'shipped' && <section id="system-details" className="system-details text-column" aria-labelledby="system-details-title"><h2 id="system-details-title">System Details</h2><dl>{study.systemDetails.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl></section>}
      </Fragment>)}
    </article>
    <div className="case-next" data-analytics-location="next_case"><div><Tag>Next case study · {next.company}</Tag><h2>{next.shortTitle}</h2></div><ArrowLink href={caseHref(next)} label={`Read case study: ${next.company} (next)`}>Read case study</ArrowLink></div>
    <Contact/>
  </main>;
}
