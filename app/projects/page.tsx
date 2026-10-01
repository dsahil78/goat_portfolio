import { ExperimentVisual } from '@/components/experiment-visual';
import { projects } from '@/content/projects';
import { Tag, ArrowLink } from '@/components/ui';
import { Contact } from '@/components/site-shell';
import { pageMetadata } from '@/lib/site';
export const metadata = pageMetadata('Experiments', 'Questions explored through working prototypes: Rotten Tom-AI-toes, NXTai, TalentSphere, and Kindred.', '/projects');
export default function Projects() {
  return <main id="main" tabIndex={-1}><header className="page-hero text-column"><Tag>Experiments</Tag><h1>Questions worth building.</h1><p className="lead">Working prototypes that keep product judgment close to the system.</p></header>
    <div className="project-directory">{projects.map(project => <article className="project-entry" id={project.id} key={project.id} data-analytics-location="project_directory" data-analytics-section={`project_${project.id}`} aria-labelledby={`${project.id}-title`}>
      <div className="text-column"><Tag>{project.status}</Tag><h2 id={`${project.id}-title`}>{project.name}</h2><dl className="project-description"><div><dt>The question:</dt><dd>{project.question}</dd></div><div><dt>What I built:</dt><dd>{project.contribution}</dd></div></dl><ul className="stack-list" aria-label="Implementation building blocks">{project.stack.map(item => <li key={item}>{item}</li>)}</ul>{project.award && <p className="project-award">{project.award}</p>}<ArrowLink href={project.url!} project={project.name} demo={!project.linkLabel}>{project.linkLabel || 'Open live prototype'}</ArrowLink></div>
      <ExperimentVisual id={project.id} name={project.name}/>
    </article>)}</div><Contact/>
  </main>;
}
