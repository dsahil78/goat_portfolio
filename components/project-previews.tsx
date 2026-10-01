import { cases, caseHref, type CaseStudy } from '@/content/case-studies';
import { CaseGraphic } from './case-visuals';
import { ArrowLink, Tag } from './ui';

export function CaseCard({ study }: { study: CaseStudy }) {
  const metric = study.company === 'Filo' ? study.metrics[1] : study.metrics[0];
  return <article className="case-card" data-analytics-section={`work_${study.slug}`}>
    <div className="case-preview" role="img" aria-label={`${study.hero.replaceAll('-', ' ')} for ${study.company}`}>
      <div aria-hidden="true"><CaseGraphic kind={study.hero} compact/></div>
    </div>
    <div className="card-meta"><span>{study.company}</span><span>{study.role}</span><span>{study.dates}</span></div>
    <h3>{study.shortTitle}</h3><p className="card-trust">{study.trust}</p>
    <p className="card-metric"><strong>{metric.value}</strong><span>{metric.label}{study.company === 'Filo' ? ' in six months' : ''}</span></p>
    <ArrowLink href={caseHref(study)} label={`Read case study: ${study.company}`}>Read case study</ArrowLink>
  </article>;
}
export function CaseGrid() {
  return <div className="case-grid" data-analytics-location="case_grid">{cases.map(study => <CaseCard study={study} key={study.slug}/>)}</div>;
}
export function SelectedWork() {
  return <section id="work" className="section selected-work" aria-labelledby="work-title"><div className="section-heading"><div><Tag>Selected work</Tag><h2 id="work-title">Capability is the start.<br/>Trust is the work.</h2></div></div><CaseGrid/></section>;
}
