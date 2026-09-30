import { ArrowLink, Tag } from '@/components/ui';
export default function NotFound() {
  return <main id="main" tabIndex={-1} className="not-found"><Tag>404 · Page not found</Tag><h1>This page isn’t here.</h1><p>You can find my case studies and projects from the homepage.</p><ArrowLink href="/work">Browse selected work</ArrowLink></main>;
}
