import Link from 'next/link';
import type { ReactNode } from 'react';
import type { Metric, Workflow } from '@/content/case-studies';

export function Tag({ children }: { children: ReactNode }) {
  return <span className="tag">{children}</span>;
}

export function ArrowLink({ href, children, className = '', direction = '↗', label, project, demo }: {
  href: string; children: ReactNode; className?: string; direction?: string; label?: string; project?: string; demo?: boolean;
}) {
  const content = <><span>{children}</span><span className="arrow" aria-hidden="true">{direction}</span></>;
  const props = { className: `jump ${className}`, 'aria-label': label, 'data-analytics-project': project, 'data-analytics-demo': demo };
  return href.startsWith('/') && !href.endsWith('.pdf')
    ? <Link href={href} {...props}>{content}</Link>
    : <a href={href} {...props}>{content}</a>;
}

export function Metrics({ items, className = '' }: { items: Metric[]; className?: string }) {
  return <dl className={`metrics ${className}`}>{items.map(item => <div key={item.label}><dt>{item.label}{item.definition && <span className="metric-definition">{item.definition}</span>}</dt><dd>{item.value}</dd></div>)}</dl>;
}

export function KeyDecision({ children }: { children: ReactNode }) {
  return <div className="decision-note"><span>My key decision</span><p>{children}</p></div>;
}

export function WorkflowDiagram({ workflow }: { workflow: Workflow }) {
  return (
    <figure className="case-workflow">
      <figcaption>{workflow.title}<span>Illustrative workflow</span></figcaption>
      <ol>{workflow.steps.map((step, index) => <li key={step.title}><span className="step-number" aria-hidden="true">0{index + 1}</span><strong>{step.title}</strong><span>{step.detail}</span></li>)}</ol>
    </figure>
  );
}

export function ExtractionDiagram() {
  return (
    <figure className="extraction-diagram">
      <figcaption><span>Designed to generalize</span><span>Illustrative workflow</span></figcaption>
      <div className="document-sources" aria-label="Example document inputs">
        {['Invoices', 'Purchase orders', 'Reports'].map(label => <div className="source-document" key={label}><span className="document-lines" aria-hidden="true"><i/><i/><i/></span><span>{label}</span></div>)}
      </div>
      <div className="flow-connector" aria-hidden="true">↓</div>
      <div className="retrieval-node"><span className="node-symbol" aria-hidden="true">⌘</span><div><strong>Schema-driven retrieval</strong><span>Define the fields. Adapt to the format.</span></div></div>
      <div className="flow-connector" aria-hidden="true">↓</div>
      <div className="validation-node"><span className="validation-dot" aria-hidden="true"/>Evaluate &amp; validate<span>Confidence policy</span></div>
      <div className="output-branches"><div><span aria-hidden="true">↙</span>Accepted output</div><div><span aria-hidden="true">↘</span>Human review</div></div>
    </figure>
  );
}
