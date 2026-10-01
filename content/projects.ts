export type Project = {
  name: string; id: string; category: string; status: string; description: string;
  contribution: string; question: string; stack: string[]; award?: string; image: string; width:number; height:number; alt: string; url?: string; linkLabel?: string; featured?: boolean;
};

const entries: Project[] = [
  {
    question:'Can product priorities stay connected to the evidence behind them?',stack:['Product Memory Graph','Jira','Notion'],name:'NXTai',id:'nxtai',category:'Decision intelligence for product teams',status:'Graduate project',
    description:'A product prioritization prototype that connects scattered customer signals to evidence-backed recommendations.',
    contribution:'Designed a Product Memory Graph across feedback, support, CRM, reviews, and backlog data. Built ROI-weighted prioritization and workflows connecting recommendations to Jira and Notion.',
    image:'/images/nxtai.png',width:1920,height:961,alt:'NXTai prototype dashboard for organizing product signals and priorities',url:'https://nxt.duasahil.com/',featured:true,
  },
  {
    question:'Can better intake help therapists and clients find a better fit?',stack:['Intake workflows','Matching logic'],award:'Dempsey Startup Competition investment round: top 39 of approximately 200. Best Marketplace Idea, sponsored by eBay.',name:'Kindred',id:'kindred',category:'Therapist–client matching',status:'Class project',
    description:'An intake and matching prototype exploring how therapists and clients find a better fit.',
    contribution:'Led discovery with therapists and clients, defined the matching dimensions, and built an intake prototype.',
    image:'/images/kindred.png',width:1920,height:965,alt:'Kindred prototype landing page for therapist and client matching',url:'https://www.findmykindred.app/',linkLabel:'Visit project website',
  },
  {
    question:'Can career exploration connect a graduate’s background to a practical next step?',stack:['Role matching','Application workflows'],award:'Most Innovative and Viable Product, UW MSIM Hackathon.',name:'TalentSphere',id:'talentsphere',category:'Career intelligence for new graduates',status:'Hackathon',
    description:'A career exploration prototype that maps a candidate’s background to potential roles and skill gaps.',
    contribution:'Built a workflow for role matching, application drafts, and recruiter outreach drafts during the UW MSIM Hackathon.',
    image:'/images/talentsphere.png',width:1920,height:966,alt:'TalentSphere prototype career dashboard',url:'https://uh.duasahil.com/',linkLabel:'Visit project website',
  },
  {
    question:'How do we compare AI models on trust, beyond a single score?',stack:['Evaluation workflows','Model comparisons'],name:'Rotten Tom-AI-toes',id:'rotten-tom-ai-toes',category:'Clinical AI governance and trust scoring',status:'Personal build',
    description:'A prototype for exploring model evaluations across accuracy, safety, fairness, explainability, and other trust dimensions.',
    contribution:'Built an evaluation wizard and comparison dashboards covering 6 trust dimensions and 17 foundation models. This is an exploration of evaluation workflows, not a validated clinical decision tool.',
    image:'/images/rotten-tom-ai-toes.png',width:1920,height:960,alt:'Rotten Tom-AI-toes prototype dashboard for comparing AI model evaluations',url:'https://rt.duasahil.com/',featured:true,
  },
];

const order = ['rotten-tom-ai-toes', 'nxtai', 'talentsphere', 'kindred'];
export const projects = order.map(id => entries.find(project => project.id === id)!);
