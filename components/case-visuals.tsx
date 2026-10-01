import type { CaseStudy } from '@/content/case-studies';
import { Figure } from './diagrams/Figure';

const fields = [
  ['Product name', 'Isopropyl alcohol', 'High confidence'],
  ['CAS number', '67-63-0', 'High confidence'],
  ['Concentration', '99%', 'High confidence'],
  ['Hazard class', 'Flammable liquid, Cat. 2', 'Low confidence'],
  ['Revision date', '2024-03', 'High confidence'],
];

function Extraction({ compact }: { compact: boolean }) {
  return <div className={`extraction-ui ${compact ? 'compact' : ''}`}>
    <div className="document-page">
      <span className="diagram-label">Source document</span>
      <strong className="document-title">Safety data sheet</strong>
      <div className="document-rule"/>
      <span className="document-subtitle">Substance identification</span>
      <div className="source-highlight">Isopropyl alcohol</div>
      <div className="document-lines" aria-hidden="true"><i/><i/><i/></div>
      <span className="document-subtitle">Composition</span>
      <div className="source-pair"><span>67-63-0</span><span>99%</span></div>
      <div className="document-lines" aria-hidden="true"><i/><i/></div>
      <span className="document-subtitle">Hazard identification</span>
      <div className="source-highlight uncertain">Flammable liquid, Cat. 2</div>
      <span className="document-date">Revision: 2024-03</span>
    </div>
    <div className="extracted-fields">
      <div className="diagram-heading"><span className="diagram-label">Extracted fields</span><span className="review-indicator">Review</span></div>
      <dl>{fields.map(([name, value, confidence]) => <div className={confidence.startsWith('Low') ? 'uncertain-field' : ''} key={name}>
        <dt>{name}</dt><dd>{value}</dd><dd className={`confidence ${confidence.startsWith('Low') ? 'warning' : ''}`}>{confidence}</dd>
        {confidence.startsWith('Low') && <dd className="reextracted">re-extracted at 300 DPI</dd>}
      </div>)}</dl>
      <p className="review-footnote">Source linked. Human judgment retained.</p>
    </div>
  </div>;
}

function Reconciliation() {
  return <div className="reconciliation-ui">
    <div className="diagram-heading"><span className="diagram-label">Inventory reconciliation</span><span className="diagram-label">Source checks</span></div>
    <table><caption className="sr-only">Illustrative reconciliation showing matched balances, a mismatch, and a silent sync.</caption><thead><tr><th>SKU</th><th>Source ERP</th><th>Closphere</th><th>Status</th></tr></thead>
      <tbody>
        <tr><th>CTN-180-NVY</th><td>Available</td><td>Available</td><td><span className="status-dot"/>Matched</td></tr>
        <tr><th>BTN-12-BLK</th><td>Available</td><td>Reserved</td><td className="warning">Mismatch</td></tr>
        <tr><th>ZIP-20-SLV</th><td>Updated</td><td>Last synced</td><td className="warning">Sync silent for 6h</td></tr>
      </tbody>
    </table>
    <div className="reconciliation-note"><span className="warning">Review needed</span><span>Check the balance. Check the connection.</span></div>
  </div>;
}

function TrustRouting() {
  return <div className="trust-routing">
    <div className="matrix-top"><span>Model confidence</span><span>High →</span></div>
    <div className="matrix-body"><div className="matrix-axis"><span>High risk</span><span>Commercial risk</span><span>Low risk</span></div>
      <div className="matrix-grid">
        <div><strong className="warning">Escalate</strong><span>Low confidence<br/>High commercial risk</span></div>
        <div><strong className="warning">Review</strong><span>High confidence<br/>High commercial risk</span></div>
        <div><strong className="warning">Review</strong><span>Low confidence<br/>Low commercial risk</span></div>
        <div className="auto-send"><strong>Auto-send</strong><span>High confidence<br/>Low commercial risk</span></div>
      </div>
    </div>
    <div className="matrix-footer">Price floors and human override apply on every route.</div>
  </div>;
}

function Matching() {
  return <div className="matching-timeline">
    <span className="diagram-label">From request to live learning</span>
    <ol className="request-path">{['Upload problem','OCR intake','US-specific matching','Tutor accepts','Live session'].map(step => <li key={step}>{step}</li>)}</ol>
    <div className="timeline-result"><strong>98%</strong><span>of US requests matched<br/>in under 45 seconds</span></div>
    <div className="timeline-track"><div className="timeline-completed"/><span className="timeline-marker"/></div>
    <div className="timeline-ticks"><span>0s</span><span>45s</span><span>60s target</span></div>
  </div>;
}

function Evaluation() {
  const layers = [
    ['Golden sets','Per-tenant production documents. The reference for release decisions.'],
    ['LLM-as-judge','A complementary assessment of extraction quality.'],
    ['Human review','Inspect uncertain outputs against their source.'],
    ['Online monitoring','Watch quality as production inputs change.'],
  ];
  return <div className="evaluation-layout"><ol className="evaluation-stack">{layers.map(([name, detail]) => <li key={name}><strong>{name}</strong><span>{detail}</span></li>)}</ol>
    <div className="evaluation-signals"><span className="diagram-label">Measured signals</span>{['Field-level exact match','Hallucination rate','Confidence calibration'].map(signal => <div key={signal}>{signal}</div>)}<p>Evidence for a human release decision.</p></div>
  </div>;
}

function InventoryModel() {
  return <div className="inventory-model">
    <div><span className="diagram-label">Source systems</span><ul>{['Tally','Zoho','Vyapar','Custom systems'].map(name => <li key={name}>{name}</li>)}</ul></div>
    <span className="model-arrow" aria-hidden="true">→</span>
    <div className="canonical-model"><span className="diagram-label">Canonical model</span><ul>{['Item master','Units of measure','Multi-location','Batch / lot','Transaction types'].map(name => <li key={name}>{name}</li>)}</ul></div>
    <span className="model-arrow" aria-hidden="true">→</span>
    <div className="model-output"><strong>Config-driven mappings</strong><span aria-hidden="true">↓</span><strong>Dashboards and alerts</strong></div>
  </div>;
}

function AccountContext() {
  return <div className="account-context">
    <div><span className="diagram-label">Standalone request</span><h3>What is being requested?</h3><ul><li>Part number</li><li>Availability</li><li>Requested quote</li></ul></div>
    <div><span className="diagram-label">Account context</span><h3>What makes this quote appropriate?</h3><ul>{['Prior quotes','Sister entities','Pricing tier','Relationship history','Revenue risk','Lead time','Alternates','NPI vs repeat'].map(item => <li key={item}>{item}</li>)}</ul></div>
  </div>;
}

export function CaseGraphic({ kind, compact = false }: { kind: string; compact?: boolean }) {
  return <div className={`case-graphic graphic-${kind} ${compact ? 'graphic-compact' : ''}`}>
    {kind === 'extraction' && <Extraction compact={compact}/>}
    {kind === 'reconciliation' && <Reconciliation/>}
    {kind === 'trust-routing' && <TrustRouting/>}
    {kind === 'matching' && <Matching/>}
    {kind === 'evaluation' && <Evaluation/>}
    {kind === 'inventory-model' && <InventoryModel/>}
    {kind === 'account-context' && <AccountContext/>}
  </div>;
}

export function CaseVisual({ study, supporting = false }: { study: CaseStudy; supporting?: boolean }) {
  const kind = supporting ? study.supporting : study.hero;
  if (!kind) return null;
  return <Figure id={kind} caseStudy={study.slug} caption={(supporting ? study.supportingCaption : study.heroCaption) || ''}>
    <CaseGraphic kind={kind}/>
  </Figure>;
}
