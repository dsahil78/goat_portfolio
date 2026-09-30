import type { ReactNode } from 'react';
import { Figure, Arrow } from './Figure';

export type FlowNode = { label: string; badge?: string; tone?: 'science' | 'craft' | 'risk'; detail?: string };
/** Semantic pipeline with hand-authored SVG connectors. Branches stay distinct on narrow screens. */
export function FlowDiagram({ id, caseStudy, caption, nodes, branches, tail, rail, children }: {
  id: string; caseStudy: string; caption: string; nodes: FlowNode[]; branches?: FlowNode[]; tail?: FlowNode[]; rail?: string; children?: ReactNode;
}) {
  const list = (items: FlowNode[], className = '') => <ol className={`flow-nodes ${className}`}>{items.map((node, index) => <li key={node.label} className={node.tone || ''}><div><strong>{node.label}</strong>{node.badge && <span className="node-badge">{node.badge}</span>}{node.detail && <small>{node.detail}</small>}</div>{index < items.length - 1 && <Arrow label={`Then ${items[index + 1].label}`}/>}</li>)}</ol>;
  return <Figure id={id} caseStudy={caseStudy} caption={caption}>
    {list(nodes)}
    {branches && <div className="flow-branches">{branches.map(node => <div key={node.label} className={node.tone || ''}><Arrow label={node.label}/><strong>{node.label}</strong>{node.detail && <small>{node.detail}</small>}</div>)}</div>}
    {tail && list(tail, 'flow-tail')}
    {rail && <div className="override-rail">{rail}</div>}{children}
  </Figure>;
}
