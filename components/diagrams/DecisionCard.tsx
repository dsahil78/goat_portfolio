import type { CaseStudy } from '@/content/case-studies';
export function DecisionCard({ study }: { study: CaseStudy }) {
  const labels = { chose: 'Chose', over: 'Over', evidence: 'Evidence', tradeoff: 'Trade-off', cost: 'Cost' };
  return <section id="decision" className="decision-callout text-column" aria-labelledby="decision-title" data-analytics-section="case_decision">
    <h2 id="decision-title" className="tag">The decision</h2>
    <dl>{(Object.keys(labels) as (keyof typeof labels)[]).map(key => <div key={key}><dt>{labels[key]}</dt><dd>{study.decision[key]}</dd></div>)}</dl>
  </section>;
}
