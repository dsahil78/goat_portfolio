import type { diagramAssets } from './diagram-assets';

export type DiagramId = keyof typeof diagramAssets;
export type DiagramContent = { title: string; description: string; alt: string; explanation: string[] };

export const diagrams: Record<DiagramId, DiagramContent> = {
  'document-overview': {
    title: 'A deliberate boundary for automation',
    description: 'The schema defines what to extract. Confidence policy determines what can proceed.',
    alt: 'Documents flow through schema-driven retrieval and a confidence policy, then to acceptance or human review.',
    explanation: [
      'Define the required fields independently of document layout.',
      'Retrieve and extract the information, then apply confidence policy.',
      'Accept outputs that meet policy; route uncertainty to a human reviewer.',
    ],
  },
  'document-pipeline': {
    title: 'Where the system acts, and where a person steps in',
    description: 'Routing, extraction, and review were designed as one product workflow.',
    alt: 'Document processing from ingestion through model routing, schema-driven extraction, confidence checks, and human review.',
    explanation: [
      'Ingest multi-format documents and classify them. Complexity-based routing balances accuracy, latency, and cost.',
      'Extract against the field schema, making new document variants a configuration change.',
      'Validate against confidence policy. Outputs that meet the policy proceed; uncertain outputs require review.',
      'Reviewer corrections inform system quality. The separate evaluation loop below explains how quality informed releases.',
    ],
  },
  'evaluation-loop': {
    title: 'Evaluation belongs in the release loop',
    description: 'A shared quality bar made the move away from hand-tuned parsers testable.',
    alt: 'Golden datasets feed evaluation, which gates release or further iteration; production monitoring supplies feedback.',
    explanation: [
      'Tenant-level golden datasets and human annotations supplied the evaluation evidence.',
      'LLM-as-judge scoring and field-level evaluation measured accuracy, hallucination rate, and confidence calibration.',
      'Release gates determined when a candidate could progress and when model, prompt, or retrieval work needed another iteration.',
      'Online monitoring and reviewer feedback informed subsequent evaluation.',
    ],
  },
  'inventory-system': {
    title: 'Build trust above the systems customers already use',
    description: 'The architecture followed the adoption decision: integrate and reconcile, without asking customers to replace their ERP.',
    alt: 'Existing ERPs connect through configurable mappings and a canonical inventory model to reconciliation, replenishment, and stale-data exceptions.',
    explanation: [
      'Read from Tally, Zoho, Vyapar, and customer systems through configurable field mappings.',
      'Normalize inventory definitions in a canonical model, including items, locations, units, batches, and transactions.',
      'Reconcile against source balances and check whether connector data is fresh.',
      'Support inventory and replenishment decisions while surfacing stale data and exceptions. Trust includes exposing when the system may be wrong.',
    ],
  },
  'marketplace-matching': {
    title: 'A local matching model inside a complete learning experience',
    description: 'The matching decision had to work with intake, tutor availability, and session continuity.',
    alt: 'Student intake and US market constraints feed matching, connecting an available tutor to a live learning session and continuity.',
    explanation: [
      'A student enters or photographs a question to begin intake.',
      'US-specific matching accounts for tutor liquidity, subject, price, geography, and session intent.',
      'Connect an available tutor and support a reliable live session, including low-bandwidth audio and video.',
      'Onboarding and session-continuity work address the experience around the match. The measured outcome was 98% of US requests matched in under 45 seconds.',
    ],
  },
  'quote-controls': {
    title: 'Account context before pricing. Policy before automation.',
    description: 'Correct extraction is only one step toward a quote the business can send.',
    alt: 'Requests are extracted, enriched with account and inventory context, checked against policy, and routed through review or quoting to order.',
    explanation: [
      'Classify inbound intent and extract manufacturer part numbers from email and attachments.',
      'Thread requests against open quotes and account relationships, and match parts to inventory before pricing.',
      'Apply confidence tiers, price floors, escalation rules, and human overrides.',
      'Route quotes through the appropriate path. Accepted quotes connect to orders without re-keying; out-of-stock requests still depend on supplier sourcing.',
    ],
  },
  'quote-overview': {
    title: 'Controls before automation',
    description: 'Account context and policy determine the next action.',
    alt: 'RFQ and account context feed policy checks that route to a quote or human review.',
    explanation: ['Understand the RFQ in its account context.', 'Apply confidence tiers, price floors, and escalation policy.', 'Route the quote or request human review.'],
  },
  'product-memory': {
    title: 'From scattered signals to a product decision',
    description: 'NXTai explores how evidence can stay connected to prioritization and execution.',
    alt: 'Customer signals feed a Product Memory Graph, ROI-weighted prioritization, evidence-backed recommendations, and Jira or Notion workflows.',
    explanation: [
      'Connect feedback, support, CRM, reviews, and backlog signals in a Product Memory Graph.',
      'Use ROI-weighted prioritization to support evidence-backed recommendations.',
      'Connect recommendations to Jira and Notion workflows.',
      'This is a graduate prototype. The diagram describes its intended workflow, not measured production impact.',
    ],
  },
};

export type CaseVisual = {
  focus: string; skills: string[]; diagram: DiagramId;
  period: string; image?: { src: string; width: number; height: number; alt: string; caption: string };
};
export const caseVisuals: Record<string, CaseVisual> = {
  'doc-intelligence-ps': { focus: 'AI reliability', skills: ['LLM evaluation', 'Model routing', 'Human review'], diagram: 'document-pipeline', period: 'Feb–Sep 2025' },
  'closphere-inventory-intelligence': {
    focus: 'Enterprise platforms', skills: ['Data reconciliation', 'Integrations', 'Founder ownership'], diagram: 'inventory-system', period: 'Dec 2023–Jan 2025',
    image: { src: '/images/closphere-dashboard.png', width: 1471, height: 809, alt: 'Closphere InventoryIQ with inventory coverage and a queue of operational exceptions', caption: 'InventoryIQ by Closphere · Interface reference' },
  },
  'filo-us-product-launch': {
    focus: 'Marketplace expansion', skills: ['Matching', 'Activation', 'US launch'], diagram: 'marketplace-matching', period: 'Aug 2022–Aug 2023',
    image: { src: '/images/filo-product.png', width: 2940, height: 1506, alt: 'Filo tutoring experience with question intake and tutor connection options', caption: 'Filo · Instant tutoring experience' },
  },
  'scieden-sales-workflow': { focus: 'AI workflow automation', skills: ['Guardrails', 'Account context', 'Quote routing'], diagram: 'quote-controls', period: 'Aug–Dec 2023' },
};
