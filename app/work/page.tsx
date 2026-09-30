import { cases, caseHref } from '@/content/case-studies';
import { caseVisuals } from '@/content/visual-studies';
import { ArrowLink, KeyDecision, Metrics, Tag } from '@/components/ui';
import { Contact } from '@/components/site-shell';
import { MermaidDiagram } from '@/components/mermaid-diagram';
import { CaseArtifact } from '@/components/case-artifact';
import { pageMetadata } from '@/lib/site';

export const metadata = pageMetadata('Work', 'Explore Sahil Dua’s product case studies: AI document intelligence, founding Closphere, launching Filo in the US, and automating enterprise sales workflows.', '/work');

export default function Work() {
  return (
    <main id="main" tabIndex={-1}>
      <div className="page-hero work-page-hero">
        <Tag>Work</Tag><h1>Selected work.</h1>
        <p>AI reliability, enterprise adoption, and marketplace growth. Explore the decisions behind the outcomes, and the systems that made them possible.</p>
        <nav data-analytics-location="work_jump_links" className="work-jump-links" aria-label="Browse case studies">{cases.map(study => <a href={`#${study.slug}`} key={study.slug}>{study.company}<span aria-hidden="true">↓</span></a>)}</nav>
      </div>
      <div className="work-directory">
        {cases.map(study => {
          const visual = caseVisuals[study.slug];
          return (
            <article className="work-index-entry" data-analytics-location="work_directory" data-analytics-section={`work_${study.slug}`} id={study.slug} key={study.slug} aria-labelledby={`${study.slug}-title`}>
              <div className="work-index-context">
                <Tag>{visual.focus}</Tag>
                <div className="work-index-preview">{visual.image ? <CaseArtifact image={visual.image}/> : <MermaidDiagram id={study.slug === 'doc-intelligence-ps' ? 'document-overview' : 'quote-overview'} compact/>}</div>
                <ul className="focus-list" aria-label={`${study.company} focus`}>{visual.skills.map(skill => <li key={skill}>{skill}</li>)}</ul>
              </div>
              <div className="work-index-story">
                <div className="project-meta"><span className="company-label">{study.company}</span><span>{study.role}</span></div>
                <h2 id={`${study.slug}-title`}>{study.shortTitle}</h2>
                <p className="work-index-problem">{study.problem}</p>
                <KeyDecision>{study.decision}</KeyDecision>
                <Metrics items={study.metrics} className="work-index-metrics"/>
                <ArrowLink href={caseHref(study)} label={`Read case study: ${study.company}`}>Read case study</ArrowLink>
              </div>
            </article>
          );
        })}
      </div>
      <div className="work-experiments-link"><p>Looking for prototypes and smaller builds?</p><ArrowLink href="/projects">Explore experiments</ArrowLink></div>
      <Contact/>
    </main>
  );
}
