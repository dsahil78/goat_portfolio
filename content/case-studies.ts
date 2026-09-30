import productSquads from './cases/doc-intelligence-ps.json';
import closphere from './cases/closphere-inventory-intelligence.json';
import supreme from './cases/scieden-sales-workflow.json';
import filo from './cases/filo-us-product-launch.json';

export type Metric = { value: string; label: string; definition?: string };
export type Workflow = { title: string; steps: { title: string; detail: string }[] };
export type CaseParagraph = { text: string; kind?: string };
export type CaseSection = {
  id: string; label: string; title: string; paragraphs: CaseParagraph[]; figures: string[];
  systemDetails?: boolean; footnotes?: string[]; notices?: string[];
};
export type CaseStudy = {
  slug: string; company: string; role: string; dates: string; readingTime: string; labels: string[];
  title: string; shortTitle: string; description: string; problem: string; decision: string; scope: string;
  metrics: Metric[]; artifact: string; artifactCaption: string;
  decisionCard: { options: string; science: string; craft: string; cost: string; result: string };
  systemDetails: string[][]; sections: CaseSection[];
};
// CONFIRM NDA: client names
// The v2 brief replaces the earlier factual baseline. Unconfirmed claims remain visibly flagged.
export const cases: CaseStudy[] = [productSquads, closphere, supreme, filo];
export const caseHref = (item: CaseStudy) => `/work/${item.slug}`;
export const findCase = (slug: string) => cases.find(item => item.slug === slug);
