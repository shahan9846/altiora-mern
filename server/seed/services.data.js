// The five starting services (wording from Altiora_Website_Content.docx).
// `description` is shown on the service page (a blank line starts a new paragraph); the cards show the first paragraph.
// After this is loaded, services are managed from the admin dashboard.
export const SERVICES = [
  {
    slug: 'corporate-learning-development',
    title: 'Corporate Training & Learning and Development',
    description: 'We support organizations in developing the capabilities required for stronger individual, team, and business performance through relevant and practical learning interventions.\n\nCustomized learning programs designed to strengthen employee capabilities, leadership effectiveness, and organizational performance.',
    image: '/assets/svc-training-new.jpg',
    icon: 'building',
  },
  {
    slug: 'customized-training-solutions',
    title: 'Customized Training Solutions',
    description: 'Every organization has unique development requirements. We work with clients to understand their objectives, target audience, and expected outcomes before developing or recommending an appropriate learning solution.\n\nOrganizations with a specific development need who want a training solution aligned with their objectives, audience, and desired outcomes.',
    image: '/assets/svc-training.jpg',
    icon: 'shield',
  },
  {
    slug: 'professional-development',
    title: 'Professional Development',
    description: "We support professionals in strengthening the knowledge, skills, and capabilities required to progress in today's evolving workplace.\n\nPractical learning solutions that support continuous professional growth and help individuals develop relevant workplace capabilities.",
    image: '/assets/svc-learning-new.jpg',
    icon: 'book',
  },
  {
    slug: 'organizational-capability-development',
    title: 'Organizational Capability Development',
    description: 'We help organizations identify development priorities and capability gaps, and translate them into focused learning and development actions that support workforce performance.\n\nFocused development support that helps organizations identify capability needs, strengthen workforce skills, and build effective learning pathways.',
    image: '/assets/svc-hr.jpg',
    icon: 'people',
  },
  {
    slug: 'career-guidance-development',
    title: 'Career Guidance & Development',
    description: 'We provide career development support for professionals, graduates, and emerging talent through career planning, CV and profile development, interview preparation, and professional development guidance.\n\nPersonalized guidance for professionals, graduates, and emerging talent seeking greater clarity, confidence, and direction in their career journey.',
    image: '/assets/svc-compliance-new.jpg',
    icon: 'target',
  },
].map((s, i) => ({ ...s, order: i + 1 }));
