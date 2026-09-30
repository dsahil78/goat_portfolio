import type { CaseStudy } from '@/content/case-studies';
import { Figure, Arrow } from './Figure';

/** Signature decision: alternatives, evidence, judgment, cost, and outcome. One per case. */
export function DecisionCard({ study }: { study: CaseStudy }) {
  const card = study.decisionCard;
  const [rejected, rest] = card.options.replace(/^~~/, '').split('~~ · ');
  const [chosen, note] = rest.split(' [CONFIRM:');
  return <Figure id="decision-card" caseStudy={study.slug} caption={`Result: ${card.result}.`} illustrative={false} className="decision-card">
    <div className="decision-options"><span className="spec-label">Options</span><div><s>{rejected}</s><Arrow label="The selected option"/><strong>{chosen}</strong></div>{note && <p className="confirmation">[CONFIRM:{note}</p>}</div>
    <div className="decision-reasoning"><div><span className="reason-chip science">Science</span><p>{card.science}</p></div><div><span className="reason-chip craft">Craft</span><p>{card.craft}</p></div></div>
    <div className="decision-cost"><span className="spec-label">Cost</span><p>{card.cost}</p></div>
  </Figure>;
}
