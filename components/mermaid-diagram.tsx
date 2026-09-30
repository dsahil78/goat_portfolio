import { diagramAssets } from '@/content/diagram-assets';
import { diagrams, type DiagramId } from '@/content/visual-studies';

export function MermaidDiagram({ id, compact = false, anchor, className = '' }: {
  id: DiagramId; compact?: boolean; anchor?: string; className?: string;
}) {
  const asset = diagramAssets[id];
  const content = diagrams[id];
  return (
    <figure data-diagram={id} data-analytics-section={`diagram_${id}`} id={anchor} className={`mermaid-figure ${compact ? 'mermaid-compact' : ''} ${className}`}>
      <figcaption>
        <div><span className="visual-eyebrow">{id === 'product-memory' ? 'Prototype workflow' : 'System view'} · Illustrative</span><strong>{content.title}</strong></div>
        {!compact && <a className="diagram-open" href={asset.desktop.src} target="_blank" rel="noreferrer" aria-label={`Open full diagram: ${content.title} (new tab)`}>Open full diagram <span aria-hidden="true">↗</span></a>}
      </figcaption>
      {!compact && <p className="diagram-description">{content.description}</p>}
      <div className="mermaid-art">
        <picture>
          <source media={id === 'evaluation-loop' ? 'all' : '(max-width: 1100px)'} srcSet={asset.mobile.src} width={asset.mobile.width} height={asset.mobile.height}/>
          <img src={asset.desktop.src} width={asset.desktop.width} height={asset.desktop.height} alt={content.alt} loading="lazy" decoding="async"/>
        </picture>
      </div>
      {!compact && <details className="diagram-explanation"><summary>Read the workflow in words</summary><ol>{content.explanation.map(step => <li key={step}>{step}</li>)}</ol><p>Reconstructed from the case study{ id === 'product-memory' ? ' and prototype description' : ' and résumé' }.</p></details>}
    </figure>
  );
}
