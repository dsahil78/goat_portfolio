import {notFound} from 'next/navigation';
import {cases,findCase,caseHref} from '@/content/case-studies';
import {CaseStudyPage} from '@/components/case-study';
import {pageMetadata} from '@/lib/site';
export function generateStaticParams() {return cases.map(({slug})=>({slug}));}
type Props = {params:Promise<{slug:string}>};
export async function generateMetadata({params}:Props) {
  const study=findCase((await params).slug);
  return study ? pageMetadata(`${study.company}: ${study.shortTitle}`,study.description,caseHref(study)) : {};
}
export default async function Work({params}:Props) {
  const study=findCase((await params).slug);
  if(!study) notFound();
  return <CaseStudyPage study={study}/>;
}
