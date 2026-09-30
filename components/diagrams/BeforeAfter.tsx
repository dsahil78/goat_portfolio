import { Figure, Arrow } from './Figure';
import { AnimatedValue } from './AnimatedValue';

/** Exact before/after values. Bound qualifiers are preserved; no invented percentage reduction. */
export function BeforeAfter({ id, caseStudy, before, after, label, caption }: { id: string; caseStudy: string; before: string; after: string; label: string; caption: string }) {
  return <Figure id={id} caseStudy={caseStudy} caption={caption} illustrative={false} className="before-after"><span className="spec-label">{label}</span><div className="before-after-values"><div><small>Before</small><strong><AnimatedValue value={before}/></strong></div><Arrow label={`From ${before} to ${after}`}/><div><small>After</small><strong><AnimatedValue value={after}/></strong></div></div></Figure>;
}
