import Image from 'next/image';
import type { CaseVisual } from '@/content/visual-studies';

export function CaseArtifact({ image, className = '' }: { image: NonNullable<CaseVisual['image']>; className?: string }) {
  return (
    <figure className={`case-artifact ${className}`}>
      <a href={image.src} target="_blank" rel="noreferrer" aria-label={`View full interface: ${image.caption} (new tab)`}>
        <Image src={image.src} width={image.width} height={image.height} sizes="(max-width: 700px) 85vw, (max-width: 1100px) 60vw, 700px" alt={image.alt}/>
      </a>
      <figcaption><span>{image.caption}</span><a href={image.src} target="_blank" rel="noreferrer" aria-label={`View full interface: ${image.caption} (new tab)`}>View full interface <span aria-hidden="true">↗</span></a></figcaption>
    </figure>
  );
}
