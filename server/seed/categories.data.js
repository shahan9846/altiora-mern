// Training areas from Altiora_Website_Content.docx, in the order they appear there.
export const CATEGORIES = [
  { name: 'Leadership & Management Development', description: 'Building confident leaders with the skills to lead people, make effective decisions, manage performance, and navigate workplace challenges.' },
  { name: 'Communication & Professional Skills', description: 'Developing essential workplace capabilities including communication, presentation, business writing, negotiation, collaboration, and interpersonal effectiveness.' },
  { name: 'Individual Development Planning', description: 'A structured approach to professional growth, designed around individual strengths, development needs, and career goals.' },
  { name: 'Banking & Financial Services', description: 'Industry-focused learning designed to strengthen knowledge and professional capabilities within the banking and financial services sector.' },
  { name: 'Compliance, Risk & Governance', description: 'Programs supporting awareness and understanding across compliance, financial crime, risk management, governance, ethics, and responsible business practices.' },
  { name: 'Customer Experience & Service Excellence', description: 'Developing the skills and mindset required to deliver professional, consistent, and customer-focused experiences.' },
  { name: 'Project & Change Management', description: 'Building practical capabilities in project execution, stakeholder management, change readiness, adaptability, and implementation.' },
  { name: 'Workplace Effectiveness', description: 'Programs designed to strengthen practical workplace capabilities including time management, problem-solving, decision-making, collaboration, emotional intelligence, and productivity.' },
  { name: 'Customized Corporate Training', description: "Have a specific development need? We can work with your organization to understand the requirement and develop a training solution aligned with your objectives, audience, and desired outcomes." },
].map((c, i) => ({ ...c, order: i + 1 }));
