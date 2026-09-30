import Image from 'next/image';
import { MermaidDiagram } from '@/components/mermaid-diagram';
import { projects } from '@/content/projects';
import { Tag, ArrowLink } from '@/components/ui';
import { Contact } from '@/components/site-shell';
import { pageMetadata } from '@/lib/site';

export const metadata = pageMetadata('Projects', 'Graduate projects, hackathon builds, and product prototypes by Sahil Dua: NXTai, Kindred, TalentSphere, and Rotten Tom-AI-toes.', '/projects');

export default function Projects() {
  return (
    <main id="main" tabIndex={-1}>
      <div className="page-hero"><Tag>Prototypes &amp; experiments</Tag><h1>Ideas, put to work.</h1><p>Product questions explored through working prototypes. A selection of graduate projects, hackathon builds, and experiments in AI.</p></div>
      <div className="project-directory">
        {projects.map((project, index) => (
          <article className="project-entry" data-analytics-location="project_directory" data-analytics-section={`project_${project.id}`} id={project.id} key={project.id} aria-labelledby={`${project.id}-title`}>
            <div className="project-entry-copy">
              <Tag>{project.status}</Tag><h2 id={`${project.id}-title`}>{project.name}</h2>
              <p className="project-category">{project.category}</p><p>{project.description}</p>
              <div className="contribution"><h3>My contribution</h3><p>{project.contribution}</p></div>
              {project.url ? <ArrowLink href={project.url} project={project.name} demo={!project.linkLabel} label={`${project.linkLabel || 'Try the prototype'}: ${project.name}`}>{project.linkLabel || 'Try the prototype'}</ArrowLink> : <span className="small muted">Demo currently unavailable</span>}
            </div>
            <figure><a href={project.image} target="_blank" rel="noreferrer" aria-label={`View full interface: ${project.name} (new tab)`}><Image src={project.image} alt={project.alt} width={project.width} height={project.height} sizes="(max-width: 800px) 90vw, 540px" preload={index === 0}/></a><figcaption><span>{project.name} · Prototype interface.</span><a href={project.image} target="_blank" rel="noreferrer" aria-label={`View full interface: ${project.name} (new tab)`}>View full interface <span aria-hidden="true">↗</span></a></figcaption></figure>
            {project.id === 'nxtai' && <MermaidDiagram id="product-memory" className="project-system"/>}
          </article>
        ))}
      </div>
      <Contact/>
    </main>
  );
}
