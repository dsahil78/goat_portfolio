import type { Metric } from '@/content/case-studies';
export function MetricStrip({ metrics }: { metrics: Metric[] }) {
  return <dl className="metric-row">{metrics.map(metric => <div key={metric.label}><dt>{metric.label}</dt><dd className={`metric-value${metric.value.includes('→') ? ' metric-value--transition' : ''}`}>{metric.value}</dd><dd className="metric-definition">{metric.definition}</dd></div>)}</dl>;
}
