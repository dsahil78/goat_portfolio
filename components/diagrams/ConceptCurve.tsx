import { Figure } from './Figure';

/** Qualitative crossing curves and a cost area. Illustrative only; no numeric ticks. */
export function ConceptCurve({ caseStudy }: { caseStudy: string }) {
  return <Figure id="concept-curve" caseStudy={caseStudy} caption="Hand-tuned accuracy is a liability that looks like an asset.">
    <div className="chart-legend"><span className="risk">Per-format parsers</span><span className="science">Schema-driven retrieval</span></div>
    <svg viewBox="0 0 920 310" role="img" aria-label="Illustrative: per-format parsers start with high accuracy and increasing engineering cost. Schema-driven retrieval starts lower and improves through feedback, eventually overtaking."><path d="M35 36V275H895" className="axis"/><path d="M50 116C280 105 540 108 870 112L870 265C640 262 280 191 50 132Z" className="cost-area"/><path pathLength="1" d="M50 116C280 105 540 108 870 112" className="curve risk draw-path"/><path pathLength="1" d="M50 235C250 230 350 168 485 128S740 58 870 44" className="curve science draw-path"/></svg>
    <div className="curve-notes"><span className="risk">Rising engineering cost per format</span><span className="science">Tenant-scoped feedback loops</span></div><p className="axis-label">Formats supported over time →</p>
  </Figure>;
}
