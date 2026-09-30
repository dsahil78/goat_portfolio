'use client';
import { useEffect, useRef } from 'react';

/** Counts finite, single-value stats once. Bounds and before/after ranges retain their exact qualifiers. */
export function AnimatedValue({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const element = ref.current;
    const match = value.match(/^(\$|−|\+)?(\d+(?:\.\d+)?)(K\+?|M|%|h|d|\+)?$/);
    if (!element || !match || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let frame = 0;
    const observer = new IntersectionObserver(entries => {
      if (!entries.some(entry => entry.intersectionRatio >= .5)) return;
      observer.disconnect();
      const start = performance.now();
      const digits = match[2].includes('.') ? match[2].split('.')[1].length : 0;
      const tick = (now: number) => {
        const progress = Math.min(1, (now - start) / 650);
        const amount = Number(match[2]) * (1 - Math.pow(1 - progress, 3));
        element.textContent = progress === 1 ? value : `${match[1] || ''}${amount.toFixed(digits)}${match[3] || ''}`;
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    }, { threshold: .5 });
    observer.observe(element);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); element.textContent = value; };
  }, [value]);
  return <><span className="sr-only">{value}</span><span ref={ref} aria-hidden="true">{value}</span></>;
}
