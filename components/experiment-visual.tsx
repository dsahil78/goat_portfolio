export function ExperimentVisual({ id, name }: { id: string; name: string }) {
  return <figure className="experiment-figure" aria-label={`${name}: illustrative product workflow`}>
    <span className="figure-kicker">Illustrative · {name}</span>
    {id === 'rotten-tom-ai-toes' && <div className="experiment-canvas evaluation-preview">
      <div><span className="diagram-label">Evaluation workspace</span><h3>Make the basis of trust visible.</h3><p>Use case → Model selection → Evaluation review</p></div>
      <ul>{['Accuracy', 'Safety', 'Fairness', 'Explainability', 'Compliance', 'Efficiency'].map(item => <li key={item}><span>{item}</span><span className="diagram-label">Review evidence</span></li>)}</ul>
    </div>}
    {id === 'nxtai' && <div className="experiment-canvas memory-preview">
      <div><span className="diagram-label">Evidence in</span><ul>{['Customer feedback', 'Support conversations', 'CRM and reviews', 'Backlog signals'].map(item => <li key={item}>{item}</li>)}</ul></div>
      <div className="memory-center"><span className="diagram-label">Connected context</span><h3>Product<br/>Memory Graph</h3><p>Signals stay attached to the decision.</p></div>
      <div><span className="diagram-label">Decisions out</span><ul>{['Prioritize opportunities', 'Inspect the rationale', 'Connect to Jira', 'Document in Notion'].map(item => <li key={item}>{item}</li>)}</ul></div>
    </div>}
    {id === 'talentsphere' && <div className="experiment-canvas career-preview">
      <div><span className="diagram-label">Candidate context</span><h3>Start with the person.</h3><ul><li>Experience</li><li>Skills</li><li>Career interests</li></ul></div>
      <div><span className="diagram-label">Career exploration</span><h3>Make the next step concrete.</h3><ul><li>Explore matching roles</li><li>Understand skill gaps</li><li>Draft an application</li><li>Prepare recruiter outreach</li></ul></div>
    </div>}
    {id === 'kindred' && <div className="experiment-canvas kindred-preview">
      <div><span className="diagram-label">Intake</span><h3>What would a good fit feel like?</h3><ul><li>What brings you here</li><li>Support preferences</li><li>What matters in a therapist</li></ul></div>
      <div><span className="diagram-label">Matching</span><h3>A match with an explanation.</h3><p>Connect intake preferences to matching dimensions, then make the reasoning visible.</p><span className="illustrated-action">Explore the fit <span aria-hidden="true">↗</span></span></div>
    </div>}
  </figure>;
}
