// Service pages content (one template, ServiceDetail, renders every service).
// Add a service by appending an object here: it shows up on the home slider, the Services page,
// its own page and the contact form. Wording comes from Altiora_Website_Content.docx.

const services = [
  {
    slug: "corporate-learning-development",
    title: "Corporate Training & Learning and Development",
    bannerImg: "/assets/svc-training-new.jpg",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M4 18V9l8-4 8 4v9"/><path d="M9 21v-6h6v6"/><path d="M4 10.5h16"/></svg>
    ),
    num: "01",
    lede: "We support organizations in developing the capabilities required for stronger individual, team, and business performance through relevant and practical learning interventions.",
    audience: "Customized learning programs designed to strengthen employee capabilities, leadership effectiveness, and organizational performance.",
    photo: "/assets/svc-training-new.jpg",
    photoAlt: "Facilitator leading a corporate training session",
    features: [
      { title: "Practical Learning Interventions", text: "Relevant and practical learning that builds the capabilities needed across individuals, teams and the wider business." },
      { title: "Employee & Leadership Capability", text: "Learning programs that strengthen employee capabilities and leadership effectiveness." },
      { title: "Organizational Performance", text: "Relevant and practical learning interventions that support stronger team and business performance." },
    ],
    benefits: "Stronger individual, team and business performance through learning that is relevant, practical and aligned to your objectives.",
    cardImg: "/assets/svc-training-new.jpg",
    cardAlt: "Facilitator leading a corporate training session",
    cardTitle: "Corporate Training & Learning and Development",
    cardText: "Customized learning programs that strengthen employee capabilities, leadership effectiveness and organizational performance.",
  },
  {
    slug: "customized-training-solutions",
    title: "Customized Training Solutions",
    bannerImg: "/assets/svc-training.jpg",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 3 5 6.5V11c0 5 3 8.5 7 10 4-1.5 7-5 7-10V6.5L12 3Z"/><path d="m9 12 2 2 4-4.5"/></svg>
    ),
    num: "02",
    lede: "Every organization has unique development requirements. We work with clients to understand their objectives, target audience, and expected outcomes before developing or recommending an appropriate learning solution.",
    audience: "Organizations with a specific development need who want a training solution aligned with their objectives, audience, and desired outcomes.",
    photo: "/assets/svc-training.jpg",
    photoAlt: "Facilitator presenting to a team during a customized training session",
    features: [
      { title: "Understand Your Objectives", text: "We start by understanding your objectives, target audience and expected outcomes." },
      { title: "The Right Learning Solution", text: "We develop or recommend an appropriate learning solution built around your requirement." },
      { title: "Tailored to Your Context", text: "Programs customized to your organization's industry requirements, participant profiles and learning priorities." },
    ],
    benefits: "Training that fits your organization's objectives, audience and desired outcomes, rather than a one-size-fits-all course.",
    cardImg: "/assets/svc-training.jpg",
    cardAlt: "Facilitator presenting to a team during a customized training session",
    cardTitle: "Customized Training Solutions",
    cardText: "Training solutions developed around your objectives, target audience and desired outcomes.",
  },
  {
    slug: "professional-development",
    title: "Professional Development",
    bannerImg: "/assets/svc-learning-new.jpg",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M4 5.5c2.5-1 5.5-1 8 0v13c-2.5-1-5.5-1-8 0v-13Z"/><path d="M20 5.5c-2.5-1-5.5-1-8 0v13c2.5-1 5.5-1 8 0v-13Z"/></svg>
    ),
    num: "03",
    lede: "We support professionals in strengthening the knowledge, skills, and capabilities required to progress in today's evolving workplace.",
    audience: "Practical learning solutions that support continuous professional growth and help individuals develop relevant workplace capabilities.",
    photo: "/assets/svc-learning-new.jpg",
    photoAlt: "Team collaborating during a learning and development session",
    features: [
      { title: "Continuous Professional Growth", text: "Practical learning that supports ongoing growth throughout a professional's career." },
      { title: "Relevant Workplace Capabilities", text: "Development of the knowledge, skills and capabilities needed to progress in today's evolving workplace." },
      { title: "Individual Development Planning", text: "A structured approach to professional growth, designed around individual strengths, development needs, and career goals." },
    ],
    benefits: "Professionals who are more capable, confident and ready to progress in an evolving workplace.",
    cardImg: "/assets/svc-learning-new.jpg",
    cardAlt: "Team collaborating during a learning and development session",
    cardTitle: "Professional Development",
    cardText: "Practical learning solutions that support continuous professional growth and relevant workplace capabilities.",
  },
  {
    slug: "organizational-capability-development",
    title: "Organizational Capability Development",
    bannerImg: "/assets/svc-hr.jpg",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="9" cy="8" r="3"/><path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6"/><circle cx="17" cy="8.5" r="2.4"/><path d="M16 14.2c2.6.4 4.5 2.4 4.5 5.3"/></svg>
    ),
    num: "04",
    lede: "We help organizations identify development priorities and capability gaps, and translate them into focused learning and development actions that support workforce performance.",
    audience: "Focused development support that helps organizations identify capability needs, strengthen workforce skills, and build effective learning pathways.",
    photo: "/assets/svc-hr.jpg",
    photoAlt: "Team discussing workforce development priorities",
    features: [
      { title: "Identify Capability Needs", text: "Clear identification of development priorities and capability gaps across the organization." },
      { title: "Strengthen Workforce Skills", text: "Focused learning and development actions that support workforce performance." },
      { title: "Build Learning Pathways", text: "Effective learning pathways that turn identified needs into practical development." },
    ],
    benefits: "Clear development priorities, a stronger workforce, and learning pathways that support performance.",
    cardImg: "/assets/svc-hr.jpg",
    cardAlt: "Team discussing workforce development priorities",
    cardTitle: "Organizational Capability Development",
    cardText: "Focused support to identify capability needs, strengthen workforce skills and build effective learning pathways.",
  },
  {
    slug: "career-guidance-development",
    title: "Career Guidance & Development",
    bannerImg: "/assets/svc-compliance-new.jpg",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r="0.6" fill="currentColor"/></svg>
    ),
    num: "05",
    lede: "We provide career development support for professionals, graduates, and emerging talent through career planning, CV and profile development, interview preparation, and professional development guidance.",
    audience: "Personalized guidance for professionals, graduates, and emerging talent seeking greater clarity, confidence, and direction in their career journey.",
    photo: "/assets/svc-compliance-new.jpg",
    photoAlt: "Professional preparing for the next step in their career",
    features: [
      { title: "Career Planning & Consultations", text: "Personalized guidance to understand your strengths and identify the right direction." },
      { title: "CV, Profile & Interview Preparation", text: "CV and professional profile development, LinkedIn profile guidance and interview preparation." },
      { title: "Transitions & Early-Career Support", text: "Guidance for career transitions, graduates and early-career professionals, including certification and qualification planning." },
    ],
    benefits: "Greater clarity, confidence and direction, and the ability to present your skills and experience with confidence.",
    cardImg: "/assets/svc-compliance-new.jpg",
    cardAlt: "Professional preparing for the next step in their career",
    cardTitle: "Career Guidance & Development",
    cardText: "Personalized guidance for professionals, graduates and emerging talent seeking clarity, confidence and direction.",
  },
];

export default services;
