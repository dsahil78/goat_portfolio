'use client';
import { useEffect, useState } from 'react';

export function CaseContents({ sections }: { sections: { id: string; label: string }[] }) {
  const [active, setActive] = useState(sections[0].id);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      let current = sections[0].id;
      for (const section of sections) {
        if ((document.getElementById(section.id)?.getBoundingClientRect().top ?? Infinity) <= 230) current = section.id;
      }
      setActive(current);
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(frame); };
  }, [sections]);
  return <nav className="v2-toc" aria-label="Case study contents" data-analytics-location="case_contents">{sections.map(section => <a key={section.id} href={`#${section.id}`} aria-current={active === section.id ? 'location' : undefined}>{section.label}</a>)}</nav>;
}
