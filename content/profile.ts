export const profile = {
  name: 'Sahil Dua',
  identity: 'Technical Product Manager & Founder',
  email: 'hello@duasahil.com',
  linkedin: 'https://www.linkedin.com/in/sahildua78',
  github: 'https://github.com/dsahil78',
  resume: '/resume.pdf',
  intro: 'I build AI and enterprise products. Previously, I founded an inventory SaaS and helped take Filo into the US.',
  about: [
    'My foundation is a BTech in Computer Science and Engineering from Amity University. I started in engineering, building data pipelines and operational systems. That work put me close to the things that make software difficult to rely on: messy inputs, brittle integrations, and failures that stay hidden until someone makes a decision from the wrong data.',
    'Moving into product management gave me a wider view of those problems. At Filo, I helped launch the US tutoring marketplace, where matching logic had to adapt to different supply and student expectations. At Supreme Components, I worked with sales and engineering on an AI-assisted quoting workflow. Knowing what the model could extract was only part of the job; we also had to decide what it should be allowed to send.',
    'I later founded Closphere. I went door to door speaking with business owners and warehouse managers across India. More than 50 conversations changed the company’s direction: customers wanted their existing inventory systems to agree, and had little interest in replacing them. We built an intelligence layer over those systems, reached 63 paying customers, 1K+ users, and exited through a technology/IP sale.',
    'At ProductSquads, I returned to the same question in document AI: how do you make a system reliable across inputs you have not seen? I worked on processing architecture, evaluation, model routing, and human review for a platform handling 100K+ documents each month.',
    'I completed my MS in Information Management at the University of Washington in August 2026. Along the way, I explored product decision support through NXTai and therapist–client matching through Kindred. Building prototypes keeps me close to the decisions that are easy to leave abstract in a roadmap.',
    'As a technical product manager, I want to build AI platforms and enterprise software where reliability, customer adoption, and business outcomes have to work together. I enjoy getting close enough to a problem to understand where the system breaks, and working across disciplines to do something about it.',
  ],
};

export const experience = [
  {company:'ProductSquads',role:'Lead Product Manager',period:'Feb 2025 to Sep 2025',summary:'Document intelligence, evaluation, model routing, and human review at 100K+ documents/month.'},
  {company:'Closphere',role:'Founder & Product Lead',period:'Dec 2023 to Jan 2025',summary:'Built inventory intelligence for 63 paying customers, 1K+ users and exited through a technology/IP sale.'},
  {company:'Supreme Components',role:'Product Manager',period:'Aug 2023 to Dec 2023',summary:'AI-assisted quoting with account context and commercial guardrails across 8K RFQs/month.'},
  {company:'Filo',role:'Product Manager (Founding US PM)',period:'Aug 2022 to Aug 2023',summary:'US marketplace launch, matching, activation, and session experience.'},
];

export const education = [
  {
    institution: 'University of Washington', location: 'Seattle, WA',
    degree: 'Master of Science in Information Management',
    specialization: 'Product and Artificial Intelligence', period: 'Sep 2025 to Aug 2026',
    shortDegree: 'MS, Information Management', completed: '2026',
  },
  {
    institution: 'Amity University', location: 'Noida, India',
    degree: 'Bachelor of Technology',
    specialization: 'Computer Science and Engineering', period: '2016 to 2020',
    shortDegree: 'BTech, Computer Science and Engineering', completed: '2020',
  },
];

export const technicalStrengths = [
  { title: 'AI product systems', detail: 'LLM evaluation, retrieval-augmented generation, model routing, guardrails, and human-in-the-loop design.', href: '/work/doc-intelligence-ps', link: 'See the document AI case' },
  { title: 'Engineering fluency', detail: 'SQL, Python, API and system design, data pipelines, and AWS/Azure. A foundation for working through architecture and delivery trade-offs.', href: '/work/closphere-inventory-intelligence', link: 'See the inventory platform case' },
];
export const certifications = ['Microsoft AI & ML Engineering Professional', 'Microsoft Azure Solutions Architect Expert (AZ-305)'];
