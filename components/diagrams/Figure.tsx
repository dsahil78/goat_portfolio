'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { capturePortfolioEvent } from '@/lib/analytics';

/** Shared accessible figure. Emits diagram_viewed once per mounted figure at 50% visibility. */
export function Figure({ id, caseStudy, caption, children, className = '', illustrative = true }: {
  id: string; caseStudy: string; caption: string; children: ReactNode; className?: string; illustrative?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const viewed = useRef(false);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(entries => {
      if (!viewed.current && entries.some(entry => entry.intersectionRatio >= .5)) {
        viewed.current = true;
        element.dataset.entered = 'true';
        capturePortfolioEvent('diagram_viewed', { case_study: caseStudy, diagram: id });
        observer.disconnect();
      }
    }, { threshold: .5 });
    observer.observe(element);
    return () => observer.disconnect();
  }, [caseStudy, id]);
  return <figure ref={ref} className={`v2-figure ${className}`} data-diagram={id} data-case-study={caseStudy}>
    {illustrative && <span className="figure-kicker">Illustrative</span>}
    <div className="figure-canvas">{children}</div>
    <figcaption>{caption}</figcaption>
  </figure>;
}

export function Arrow({ label = 'Continue to the next stage', className = '' }: { label?: string; className?: string }) {
  return <svg className={`flow-arrow ${className}`} viewBox="0 0 40 24" role="img" aria-label={label}><path d="M2 12H35M27 4l8 8-8 8" fill="none" stroke="currentColor" strokeWidth="1.6"/></svg>;
}
