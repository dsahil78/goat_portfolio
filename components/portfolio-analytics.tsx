'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { analyticsEnabled, capturePortfolioEvent as capture, registerOutreachRef } from '@/lib/analytics';

const privateSelector = 'input, textarea, select, form, [contenteditable], [data-private], .ph-no-capture';

function locationOf(element: Element) {
  return element.closest<HTMLElement>('[data-analytics-location]')?.dataset.analyticsLocation || 'body';
}

function trackLink(event: MouseEvent) {
  if (event.type === 'auxclick' && event.button !== 1) return;
  const target = event.target instanceof Element ? event.target : null;
  if (!target || target.closest(privateSelector)) return;
  const link = target.closest<HTMLAnchorElement>('a[href]');
  if (!link) return;
  const url = new URL(link.href, window.location.href);
  const location = locationOf(link);
  const label = link.dataset.analyticsLabel || link.getAttribute('aria-label') || link.textContent?.trim().replace(/\s+/g, ' ').slice(0, 160) || url.pathname;
  const project = link.dataset.analyticsProject;

  if (url.pathname === '/resume.pdf' && url.origin === window.location.origin) {
    capture('resume_downloaded', { location });
  } else if (url.protocol === 'mailto:') {
    capture('contact_clicked', { channel: 'email', location });
  } else if (/(^|\.)linkedin\.com$/.test(url.hostname)) {
    capture('contact_clicked', { channel: 'linkedin', location });
  } else if (/(^|\.)calendly\.com$/.test(url.hostname)) {
    capture('contact_clicked', { channel: 'calendly', location });
  } else if (url.origin !== window.location.origin && /^https?:$/.test(url.protocol)) {
    capture('external_link_clicked', { url: url.origin + url.pathname, label });
    if (project) capture(link.dataset.analyticsDemo === 'true' ? 'project_demo_opened' : 'project_website_opened', { project });
  } else if (url.origin === window.location.origin) {
    if (url.pathname.startsWith('/diagrams/')) {
      capture('diagram_opened', { diagram: link.closest<HTMLElement>('[data-diagram]')?.dataset.diagram || url.pathname });
    } else if (url.pathname.startsWith('/images/')) {
      capture('interface_image_opened', { asset: url.pathname, label });
    } else {
      capture('navigation_clicked', { destination: url.pathname + url.hash, label, location });
      const slug = url.pathname.match(/^\/work\/([^/]+)\/?$/)?.[1];
      if (slug) capture('case_study_link_clicked', { slug, location });
      if (url.hash) capture('section_jump_clicked', { section: url.hash.slice(1), location });
      if (url.hash === '#contact') capture('contact_clicked', { channel: 'contact_section', location });
      if (url.pathname === '/projects' && url.hash) capture('project_details_opened', { project: url.hash.slice(1), location });
    }
  }
}

/** One delegated listener covers both server-rendered anchors and Next.js links. */
export function PortfolioAnalytics() {
  const pathname = usePathname();
  const lastPage = useRef<string | null>(null);

  useEffect(() => {
    if (!analyticsEnabled) return;
    document.addEventListener('click', trackLink, true);
    document.addEventListener('auxclick', trackLink, true);
    const toggle = (event: Event) => {
      const details = event.target;
      if (!(details instanceof HTMLDetailsElement) || !details.matches('.diagram-explanation')) return;
      const diagram = details.closest<HTMLElement>('[data-diagram]')?.dataset.diagram;
      if (diagram) capture('diagram_explanation_toggled', { diagram, expanded: details.open });
    };
    document.addEventListener('toggle', toggle, true);
    return () => {
      document.removeEventListener('click', trackLink, true);
      document.removeEventListener('auxclick', trackLink, true);
      document.removeEventListener('toggle', toggle, true);
    };
  }, []);

  useEffect(() => {
    if (!analyticsEnabled) return;
    registerOutreachRef();
    const main = document.querySelector('main');
    const slug = main?.getAttribute('data-case-study');
    if (lastPage.current !== pathname) {
      lastPage.current = pathname;
      if (slug) capture('case_study_opened', { slug }, pathname);
      if (main?.classList.contains('not-found')) capture('not_found_viewed', {}, pathname);
    }

    const seen = new Set<string>();
    const scrollMilestones = new Set<number>();
    const readingMilestones = new Set<number>();
    const pending = new Map<Element, ReturnType<typeof setTimeout>>();
    const intersecting = new Set<Element>();
    let visibleMs = 0;
    let startedAt = document.visibilityState === 'visible' ? performance.now() : null;
    let maxScroll = 0;
    let lastReportedMs = 0;
    let scrollFrame = 0;

    const elapsed = () => visibleMs + (startedAt === null ? 0 : performance.now() - startedAt);
    const report = (reason: string) => {
      const total = elapsed();
      if (total - lastReportedMs < 1000) return;
      lastReportedMs = total;
      capture('page_engagement', { visible_seconds: Math.floor(total / 1000), max_scroll_percent: maxScroll, reason }, pathname);
    };
    const visibility = () => {
      if (document.visibilityState === 'hidden') {
        if (startedAt !== null) visibleMs += performance.now() - startedAt;
        startedAt = null;
        pending.forEach(clearTimeout);
        pending.clear();
        report('hidden');
      } else {
        if (startedAt === null) startedAt = performance.now();
        intersecting.forEach(scheduleSection);
      }
    };
    const scroll = () => {
      if (scrollFrame) return;
      scrollFrame = requestAnimationFrame(() => {
        scrollFrame = 0;
        if (document.visibilityState !== 'visible') return;
        const extent = document.documentElement.scrollHeight - window.innerHeight;
        const percent = extent <= 0 ? 100 : Math.min(100, Math.round(window.scrollY / extent * 100));
        maxScroll = Math.max(maxScroll, percent);
        for (const milestone of [25, 50, 75, 100]) {
          if (percent >= milestone && !scrollMilestones.has(milestone)) {
            scrollMilestones.add(milestone);
            capture('scroll_depth_reached', { percent: milestone }, pathname);
          }
        }
      });
    };
    const scheduleSection = (element: Element) => {
      const section = (element as HTMLElement).dataset.analyticsSection;
      if (!section || seen.has(section) || pending.has(element) || document.visibilityState !== 'visible') return;
      pending.set(element, setTimeout(() => {
        pending.delete(element);
        if (document.visibilityState !== 'visible') return;
        seen.add(section);
        capture('section_viewed', { section }, pathname);
        if (slug && element.hasAttribute('data-case-end')) capture('case_study_end_reached', { slug }, pathname);
        observer.unobserve(element);
        intersecting.delete(element);
      }, 1000));
    };
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        const section = (entry.target as HTMLElement).dataset.analyticsSection;
        if (!section || seen.has(section)) continue;
        if (!entry.isIntersecting) {
          intersecting.delete(entry.target);
          clearTimeout(pending.get(entry.target));
          pending.delete(entry.target);
        } else {
          intersecting.add(entry.target);
          scheduleSection(entry.target);
        }
      }
    }, { rootMargin: '0px 0px -15% 0px', threshold: 0 });
    document.querySelectorAll('[data-analytics-section]').forEach(element => observer.observe(element));
    const timer = setInterval(() => {
      for (const seconds of [30, 60, 120]) {
        if (elapsed() >= seconds * 1000 && !readingMilestones.has(seconds)) {
          readingMilestones.add(seconds);
          capture('reading_time_reached', { seconds }, pathname);
        }
      }
    }, 1000);
    const pagehide = () => report('pagehide');
    window.addEventListener('scroll', scroll, { passive: true });
    window.addEventListener('pagehide', pagehide);
    document.addEventListener('visibilitychange', visibility);
    return () => {
      report('route_change');
      observer.disconnect();
      pending.forEach(clearTimeout);
      clearInterval(timer);
      cancelAnimationFrame(scrollFrame);
      window.removeEventListener('scroll', scroll);
      window.removeEventListener('pagehide', pagehide);
      document.removeEventListener('visibilitychange', visibility);
    };
  }, [pathname]);

  return null;
}
