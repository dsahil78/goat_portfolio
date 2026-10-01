import productSquads from './cases/doc-intelligence-ps.json';
import closphere from './cases/closphere-inventory-intelligence.json';
import supreme from './cases/supreme-rfq-quoting.json';
import filo from './cases/filo-us-product-launch.json';

export type Metric = { value: string; label: string; definition: string };
export type CaseSection = { id: string; label: string; title: string; paragraphs: string[] };
export type CaseStudy = {
  slug: string; company: string; role: string; dates: string; title: string;
  shortTitle: string; description: string; context?: string; trust: string; scope: string;
  metrics: Metric[]; hero: string; heroCaption: string; supporting?: string; supportingCaption?: string;
  decision: { chose: string; over: string; evidence: string; tradeoff: string; cost: string };
  systemDetails: string[][]; sections: CaseSection[];
};
export const cases: CaseStudy[] = [productSquads, closphere, supreme, filo];
export const caseHref = (item: CaseStudy) => `/work/${item.slug}`;
export const findCase = (slug: string) => cases.find(item => item.slug === slug);
