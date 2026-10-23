// The eight starting cards for the Career Guidance page (titles from Altiora_Website_Content.docx).
// After this is loaded, they are managed from the admin dashboard.
export const CAREER_SERVICES = [
  { title: 'Career Planning & Consultations', description: 'One-to-one guidance to set clear career goals and build a practical plan.', icon: 'target' },
  { title: 'CV & Professional Profile Development', description: 'Create a strong profile that presents your strengths and experience.', icon: 'document' },
  { title: 'Interview Preparation', description: 'Build confidence and prepare to perform well in interviews.', icon: 'chat' },
  { title: 'LinkedIn Profile Guidance', description: 'Make your LinkedIn profile work harder for your career.', icon: 'linkedin' },
  { title: 'Professional Development Planning', description: 'Identify the skills you need to grow and plan how to build them.', icon: 'building' },
  { title: 'Career Transition Guidance', description: 'Support for professionals exploring new career paths or industries.', icon: 'swap' },
  { title: 'Graduate & Early-Career Support', description: 'Guidance to help you enter the workforce with confidence.', icon: 'award' },
  { title: 'Professional Certification & Qualification Planning', description: 'Choose the qualifications that support your career goals.', icon: 'shield' },
].map((c, i) => ({ ...c, order: i + 1 }));
