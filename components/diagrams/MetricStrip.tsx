import type { Metric } from '@/content/case-studies';
import { AnimatedValue } from './AnimatedValue';

/** Outcome stats with explicit measurement definitions; semantic definition list, no decorative chart. */
export function MetricStrip({ metrics }: { metrics: Metric[] }) {
  return <dl className="v2-metrics">{metrics.map(metric => <div key={metric.label}><dt>{metric.label}</dt><dd><AnimatedValue value={metric.value}/></dd><dd className="metric-definition">{metric.definition}</dd></div>)}</dl>;
}
