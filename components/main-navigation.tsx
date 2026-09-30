'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function MainNavigation() {
  const pathname = usePathname();
  const workLocation = pathname === '/work' ? 'page' : pathname.startsWith('/work/') ? 'location' : undefined;

  return (
    <nav aria-label="Main navigation" data-analytics-location="nav">
      <Link href="/work" aria-current={workLocation}>Work</Link>
      <Link href="/projects" aria-current={pathname === '/projects' ? 'page' : undefined}>Experiments</Link>
      <Link href="/about" aria-current={pathname === '/about' ? 'page' : undefined}>About</Link>
      <Link href="/#contact" className="nav-contact">Let’s talk <span aria-hidden="true">↗</span></Link>
    </nav>
  );
}
