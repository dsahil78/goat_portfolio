import { Figure } from './Figure';

/** Confidence versus commercial risk. Named quadrants express policy without invented thresholds. */
export function Matrix2x2({ caseStudy }: { caseStudy: string }) {
  return <Figure id="trust-matrix" caseStudy={caseStudy} caption="Automation earns autonomy through confidence tiers, price floors, and overrides."><div className="matrix-heading"><strong>Trust routing</strong><span>Commercial risk ↑</span></div><div className="matrix-grid"><div className="risk"><small>Low confidence · High risk</small><strong>Escalate</strong></div><div className="craft"><small>High confidence · High risk</small><strong>Review</strong></div><div className="craft"><small>Low confidence · Low risk</small><strong>Review</strong></div><div className="science"><small>High confidence · Low risk</small><strong>Auto-send</strong></div></div><div className="matrix-axis"><span>Model confidence</span><svg viewBox="0 0 300 18" role="img" aria-label="Model confidence increases from left to right"><path d="M1 9H295M287 2l8 7-8 7" className="axis"/></svg></div></Figure>;
}
