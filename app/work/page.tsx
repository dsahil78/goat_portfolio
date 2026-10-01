import { CaseGrid } from '@/components/project-previews';
import { Tag } from '@/components/ui';
import { Contact } from '@/components/site-shell';
import { pageMetadata } from '@/lib/site';
export const metadata = pageMetadata('Selected work', 'Trustworthy systems across document AI, inventory intelligence, commercial quoting, and a US tutoring marketplace.', '/work');
export default function Work() {
  return <main id="main" tabIndex={-1}><header className="page-hero text-column"><Tag>Work</Tag><h1>Capability, made dependable.</h1><p className="lead">Product decisions that made AI, enterprise software, and marketplaces worthy of trust.</p></header><CaseGrid/><Contact/></main>;
}
