'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function MainNavigation() {
  const pathname = usePathname();
  const workLocation = pathname === '/work' ? 'page' : pathname.startsWith('/work/') ? 'location' : undefined;

  return (
    <nav aria-label="Main navigation" data-analytics-location="nav">
      <Link href="/work" prefetch={false} aria-current={workLocation}>Work</Link>
      <Link href="/projects" prefetch={false} aria-current={pathname === '/projects' ? 'page' : undefined}>Experiments</Link>
      <Link href="/about" prefetch={false} aria-current={pathname === '/about' ? 'page' : undefined}>About</Link>
      <Link href="/#contact" prefetch={false} className="nav-contact">Let’s talk <span aria-hidden="true">↗</span></Link>
    </nav>
  );
}
