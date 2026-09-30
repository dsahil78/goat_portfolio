import { Figure } from './Figure';

/** Qualitative position between two competing priorities. The marker is not a measured score. */
export function TradeoffSpectrum({ caseStudy }: { caseStudy: string }) {
  return <Figure id="customization-spectrum" caseStudy={caseStudy} caption="Configuration scales. Customization sells."><div className="spectrum-labels"><strong>Configuration (scales)</strong><strong>Bespoke (sells)</strong></div><svg viewBox="0 0 920 130" role="img" aria-label="Illustrative: Closphere favored configuration, with a bounded allowance for paid customization."><path d="M24 50H896" className="spectrum-track"/><path pathLength="1" d="M24 50H295" className="curve science draw-path"/><circle cx="295" cy="50" r="11" className="spectrum-marker"/><path d="M325 78V104H620V78" className="craft-bracket"/></svg><p className="spectrum-caption">Paid customization</p></Figure>;
}
