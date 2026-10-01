import Link from 'next/link';
import type { ReactNode } from 'react';
export function Tag({ children }: { children: ReactNode }) {
  return <span className="tag">{children}</span>;
}
export function ArrowLink({ href, children, className = '', direction = '↗', label, project, demo }: {
  href: string; children: ReactNode; className?: string; direction?: string; label?: string; project?: string; demo?: boolean;
}) {
  const content = <><span>{children}</span><span className="arrow" aria-hidden="true">{direction}</span></>;
  const props = { className: `jump ${className}`, 'aria-label': label, 'data-analytics-project': project, 'data-analytics-demo': demo };
  const isPdf = href.endsWith('.pdf');
  return href.startsWith('/') && !isPdf ? <Link href={href} prefetch={false} {...props}>{content}</Link> : <a href={href} target={isPdf ? '_blank' : undefined} rel={isPdf ? 'noopener noreferrer' : undefined} {...props}>{content}</a>;
}
