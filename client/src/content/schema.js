// Every editable text on the website, grouped by page.
// - The dashboard builds its edit forms from this file.
// - The pages read their wording through usePage(key).c('field.key'); anything the admin has not changed
//   shows the `default` below. A text the admin clears and saves is empty on purpose: the page hides it.
//   (Pictures can not be empty: they fall back to the original photo.)
// To make another text editable: add a field here, then use c('that.key') in the page.

const t = (key, label, def) => ({ key, label, type: 'text', default: def });
const p = (key, label, def) => ({ key, label, type: 'textarea', default: def });
// A picture. `def` is the photo that ships with the website (/assets/...); the admin can replace it with an upload.
const img = (key, label, def, hint) => ({ key, label, type: 'image', default: def, hint });

// Fields repeated for numbered items, e.g. items('home.value', 'Point', 5, [...])
const items = (prefix, noun, defaults, kinds = ['text', 'textarea']) =>
  defaults.flatMap((d, i) => [
    { key: `${prefix}${i + 1}.title`, label: `${noun} ${i + 1}: title`, type: kinds[0], default: d[0] },
    { key: `${prefix}${i + 1}.text`, label: `${noun} ${i + 1}: text`, type: kinds[1], default: d[1] },
  ]);

export const PAGES = {
  // ------------------------------------------------------------------ site settings
  site: {
    label: 'Site settings',
    description: 'Contact details, social links and wording shown on every page (header, footer, Contact page, WhatsApp button).',
    seo: {
      description: 'Altiora Business Advisory partners with organizations to build capabilities, develop people and drive sustainable business success.',
      seoNote: 'Used when a page has no description or share image of its own.',
    },
    groups: [
      {
        title: 'Pictures',
        description: 'Change a picture with Change image. If you change nothing, the original photo stays.',
        fields: [
          img('logo.image', 'Logo (header and footer)', '/assets/logo-mark.png', 'Square or nearly square, ideally with a transparent background.'),
        ],
      },
      {
        title: 'Contact details',
        fields: [
          t('phone', 'Phone number', '+974 6666 8704'),
          t('email', 'Email address', 'info@altiorabusinessadvisory.com'),
          t('address', 'Address', 'Doha, Qatar'),
          t('mapQuery', 'Map location (a place name or address Google Maps can find)', 'Doha, Qatar'),
        ],
      },
      {
        title: 'WhatsApp',
        fields: [
          t('whatsappNumber', 'WhatsApp number (country code and number, no + or spaces)', '97466668704'),
          p('whatsappMessage', 'First message the visitor sees', 'Hello Altiora Business Advisory, I would like to enquire about your services.'),
        ],
      },
      {
        title: 'Social links',
        description: 'Full web addresses, for example https://www.linkedin.com/company/altiora. Type a new address to replace the current one. Clear a box and save to hide that icon.',
        fields: [
          t('linkedin', 'LinkedIn', ''),
          t('instagram', 'Instagram', 'https://www.instagram.com/altiorabusinessadvisory.qa?xtok=MWtlanMzeWQ4ZDBscg%3D%3D&utm_source=qr'),
          t('facebook', 'Facebook', 'https://www.facebook.com/people/Altiora-Businesses-Advisory/pfbid02ReE3vo6r8kwnrHjjUwFprT3AgcjAC814CCjPA8VdazJTp6VuZaDmnzzxj6VAAddyl/?mibextid=wwXIfr&rdid=SnofQSC0hrPEXarZ&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1CjBypZZ6C%2F%3Fmibextid%3DwwXIfr'),
          t('x', 'X (Twitter)', ''),
          t('tiktok', 'TikTok', ''),
        ],
      },
    ],
  },

  // ------------------------------------------------------------------ home
  home: {
    label: 'Home',
    path: '/',
    seo: {
      title: 'Home | Altiora Business Advisory',
      description: 'Altiora Business Advisory partners with organizations to build capabilities, develop people and drive sustainable business success.',
    },
    groups: [
      {
        title: 'Pictures',
        description: 'Change a picture with Change image. If you change nothing, the original photo stays.',
        fields: [
          img('hero1.image', 'Hero slide 1 photo', '/assets/hero-advisory-strategy.jpg', 'Landscape photo, at least 1600 × 900 px. Faces near the centre stay visible when the edges are cropped.'),
          img('hero2.image', 'Hero slide 2 photo', '/assets/hero-practical-training.jpg', 'Landscape photo, at least 1600 × 900 px. Faces near the centre stay visible when the edges are cropped.'),
          img('hero3.image', 'Hero slide 3 photo', '/assets/hero-trusted-partnership.jpg', 'Landscape photo, at least 1600 × 900 px. Faces near the centre stay visible when the edges are cropped.'),
          img('about.image', 'About block photo', '/assets/photo-team-whiteboard.jpg', 'Landscape, about 4:3.'),
          img('approach.image', 'Approach block background', '/assets/img-training.jpg', 'Wide photo; the text sits on top of it.'),
          img('cta.image', 'Closing banner background', '/assets/img-approach.jpg', 'Wide photo; the text sits on top of it.'),
        ],
      },
      {
        title: 'Hero (three slides)',
        fields: [
          t('hero1.eyebrow', 'Slide 1: small heading', 'Altiora Business Advisory'),
          t('hero1.title', 'Slide 1: heading line 1', 'Elevating Potential.'),
          t('hero1.em', 'Slide 1: heading line 2 (gold)', 'Delivering Excellence.'),
          p('hero1.lede', 'Slide 1: text', 'At Altiora Business Advisory, we believe that meaningful growth begins with the right knowledge, skills, and direction.'),
          t('hero2.eyebrow', 'Slide 2: small heading', 'Practical Learning'),
          t('hero2.title', 'Slide 2: heading line 1', 'Training That'),
          t('hero2.em', 'Slide 2: heading line 2 (gold)', 'Creates Real Impact.'),
          p('hero2.lede', 'Slide 2: text', 'Hands-on programs designed to build skills your teams can put to work from day one.'),
          t('hero3.eyebrow', 'Slide 3: small heading', 'Trusted Partnership'),
          t('hero3.title', 'Slide 3: heading line 1', 'Advisory Built On'),
          t('hero3.em', 'Slide 3: heading line 2 (gold)', 'Lasting Relationships.'),
          p('hero3.lede', 'Slide 3: text', 'We work alongside your organization for the long term — not just for a single engagement.'),
          t('hero.button1', 'Button 1 label', 'Explore Our Services'),
          t('hero.button2', 'Button 2 label', 'Talk to Our Team'),
        ],
      },
      {
        title: 'About block',
        fields: [
          t('about.eyebrow', 'Small heading', 'Who We Are'),
          t('about.title', 'Heading', 'About Altiora'),
          p('about.text', 'First paragraph', 'We provide tailored learning and development solutions, professional development programs, organizational capability support, and career guidance designed to help individuals and organizations grow, perform, and succeed.'),
          t('about.button', 'Button label', 'More About Us'),
        ],
      },
      {
        title: 'Services block (the cards come from Dashboard → Services)',
        fields: [
          t('services.eyebrow', 'Small heading', 'What We Do'),
          t('services.title', 'Heading', 'Solutions Designed to Develop People and Strengthen Performance'),
          p('services.text', 'Text', 'At Altiora, we turn development needs into focused, practical solutions.'),
          t('services.button', 'Button label', 'View All Services'),
        ],
      },
      {
        title: 'Why Altiora block',
        fields: [
          t('why.eyebrow', 'Small heading', 'Why Altiora'),
          p('why.title', 'Heading (a new line starts a new line in the heading)', 'Development with purpose'),
          p('why.text', 'Text', 'We go beyond conventional training by delivering practical, relevant, and engaging development experiences designed to strengthen capabilities and create meaningful workplace impact.'),
          t('why.button', 'Button label', 'Discover Why Altiora'),
        ],
      },
      {
        title: 'Approach block (the four steps are fixed)',
        fields: [
          t('approach.eyebrow', 'Small heading', 'Our Approach'),
          t('approach.title', 'Heading', 'A Structured, Practical Methodology'),
          p('approach.text', 'Text', 'Every engagement follows the same disciplined process, adapted to your organization.'),
        ],
      },
      {
        title: 'Training block (the three numbers, their labels and the tags are automatic)',
        fields: [
          t('training.eyebrow', 'Small heading', 'Training Programs'),
          t('training.title', 'Heading', 'Learning Designed for Today’s Workplace'),
          p('training.text', 'Text', 'Our training programs are designed to build practical skills, strengthen professional capabilities, and support better performance in the workplace.'),
          t('training.button', 'Button label', 'View Training Programs'),
        ],
      },
    ],
  },

  // ------------------------------------------------------------------ about
  about: {
    label: 'About',
    path: '/about',
    seo: {
      title: 'About Us | Altiora Business Advisory',
      description: 'Learn who Altiora Business Advisory is, our vision, mission, values and why organizations choose us as their development partner.',
    },
    groups: [
      {
        title: 'Pictures',
        description: 'Change a picture with Change image. If you change nothing, the original photo stays.',
        fields: [
          img('banner.image', 'Banner photo', '/assets/photo-doha-sunset.jpg', 'Wide photo behind the page title.'),
          img('who.image', 'Who we are photo', '/assets/photo-team-meeting.jpg', 'Landscape, about 4:3.'),
          img('cta.image', 'Closing banner background', '/assets/photo-doha-aerial.jpg', 'Wide photo; the text sits on top of it.'),
        ],
      },
      {
        title: 'Who we are',
        fields: [
          t('who.eyebrow', 'Small heading', 'Who We Are'),
          t('who.title', 'Heading', 'About Altiora'),
          p('who.text1', 'First paragraph', 'Altiora Business Advisory was established with a clear purpose — to create meaningful development opportunities that enable people and organizations to move forward with confidence. Based in Qatar, Altiora brings a practical and people-focused approach to development.'),
          t('who.button', 'Button label', 'Talk To Our Team'),
        ],
      },
      {
        title: 'Purpose, mission and vision (the three cards are fixed)',
        fields: [
          t('foundation.eyebrow', 'Small heading', 'Our Foundation'),
          t('foundation.title', 'Heading', 'Vision, Mission & Belief'),
          p('foundation.text', 'Text', 'Our approach is centered on relevance, quality, and continuous improvement. We aim to create development experiences that go beyond learning — helping individuals strengthen their potential and organizations build capable, confident, and future-ready teams.'),
        ],
      },
      {
        title: 'Our values (the five cards are fixed)',
        fields: [
          t('values.eyebrow', 'Small heading', 'What Guides Us'),
          t('values.title', 'Heading', 'Our Values'),
        ],
      },
    ],
  },

  // ------------------------------------------------------------------ why altiora
  why: {
    label: 'Why Altiora',
    path: '/why-altiora',
    seo: {
      title: 'Why Altiora | Altiora Business Advisory',
      description: 'Development with purpose: practical, relevant and people-focused learning and career support from Altiora Business Advisory.',
    },
    groups: [
      {
        title: 'Pictures',
        description: 'Change a picture with Change image. If you change nothing, the original photo stays.',
        fields: [
          img('banner.image', 'Banner photo', '/assets/img-why.jpg', 'Wide photo behind the page title.'),
          img('intro.image', 'Introduction photo', '/assets/img-home-why.jpg', 'Landscape, about 4:3.'),
          img('cta.image', 'Closing banner background', '/assets/closing-team-planning.jpg', 'Wide photo; the text sits on top of it.'),
        ],
      },
      {
        title: 'Introduction',
        fields: [
          t('intro.eyebrow', 'Small heading', 'Why Altiora?'),
          t('intro.title', 'Heading', 'Development with purpose'),
          p('intro.text1', 'First paragraph', 'At Altiora, every development journey begins with a clear purpose. Our approach is centered on identifying the right priorities and creating solutions that align with individual and organizational goals.'),
        ],
      },
      {
        title: 'What sets us apart (the six cards are fixed)',
        fields: [
          t('apart.eyebrow', 'Small heading', 'Our Strengths'),
          t('apart.title', 'Heading', 'What Sets Us Apart'),
        ],
      },
    ],
  },

  // ------------------------------------------------------------------ approach
  // approach: {
  //   label: 'Our Approach',
  //   path: '/our-approach',
  //   seo: {
  //     title: 'Our Approach | Altiora Business Advisory',
  //     description: 'Discover the Understand, Design, Deliver, Measure methodology behind every Altiora engagement.',
  //   },
  //   groups: [
  //     { title: 'Banner', fields: [t('banner.title', 'Page title', 'Our Approach')] },
  //     {
  //       title: 'Four steps (top strip)',
  //       fields: items('step', 'Step', [
  //         ['Understand', "Understand the organization's goals, challenges and people."],
  //         ['Design', 'Build tailored solutions around actual business requirements.'],
  //         ['Deliver', 'Deliver practical, engaging and relevant programs.'],
  //         ['Measure', 'Focus on application, outcomes and sustainable impact.'],
  //       ], ['text', 'text']),
  //     },
  //     {
  //       title: 'The four stages in detail',
  //       fields: [
  //         t('stage1.eyebrow', 'Stage 1: small heading', 'Stage 01'), t('stage1.title', 'Stage 1: heading', 'Understand'),
  //         p('stage1.text', 'Stage 1: text', "Every engagement begins with listening. We take the time to understand your organization's goals, the challenges your teams are facing, and the people who will be part of the program — before proposing any solution."),
  //         t('stage2.eyebrow', 'Stage 2: small heading', 'Stage 02'), t('stage2.title', 'Stage 2: heading', 'Design'),
  //         p('stage2.text', 'Stage 2: text', 'With a clear picture of your needs, we design a solution around your actual business requirements — not a repackaged, generic program. Content, format and delivery are shaped to fit your context.'),
  //         t('stage3.eyebrow', 'Stage 3: small heading', 'Stage 03'), t('stage3.title', 'Stage 3: heading', 'Deliver'),
  //         p('stage3.text', 'Stage 3: text', 'Delivery is practical and engaging, led by experienced facilitators who keep sessions relevant to real work — not abstract theory disconnected from the job at hand.'),
  //         t('stage4.eyebrow', 'Stage 4: small heading', 'Stage 04'), t('stage4.title', 'Stage 4: heading', 'Measure'),
  //         p('stage4.text', 'Stage 4: text', "Our focus doesn't end at delivery. We look at how learning is applied on the job, and how the engagement contributes to sustainable, measurable impact over time."),
  //       ],
  //     },
  //     {
  //       title: 'Principles (four cards)',
  //       fields: [
  //         t('principles.eyebrow', 'Small heading', 'What Underpins the Approach'),
  //         t('principles.title', 'Heading', 'The principles behind every project'),
  //         ...items('principle', 'Card', [
  //           ['Tailored Solutions', 'Every program is shaped around your organization, not a template.'],
  //           ['Practical Application', 'Learning designed to be used, not just discussed.'],
  //           ['Measurable Impact', 'A focus on outcomes that matter to the business.'],
  //           ['Long-Term Partnership', 'Relationships that continue well past a single project.'],
  //         ], ['text', 'text']),
  //       ],
  //     },
  //   ],
  // },

  // ------------------------------------------------------------------ services page
  services: {
    label: 'Services page',
    path: '/services',
    description: 'The wording around the service cards. The services themselves are managed in Dashboard → Services.',
    seo: {
      title: 'Our Services | Altiora Business Advisory',
      description: 'Corporate training, customized training solutions, professional development, organizational capability development and career guidance.',
    },
    groups: [
      {
        title: 'Pictures',
        description: 'Change a picture with Change image. If you change nothing, the original photo stays.',
        fields: [
          img('banner.image', 'Banner photo', '/assets/svc-training-new.jpg', 'Wide photo behind the page title.'),
          img('cta.image', 'Closing banner background', '/assets/closing-consultation.jpg', 'Wide photo; the text sits on top of it.'),
        ],
      },
      {
        title: 'Page text',
        fields: [
          t('intro.eyebrow', 'Small heading', 'Our Services'),
          t('intro.title', 'Heading', 'Solutions Designed to Develop People and Strengthen Performance'),
          p('intro.text', 'Text', 'At Altiora, we turn development needs into focused, practical solutions. Whether supporting an organization in strengthening its workforce or helping an individual advance professionally, our services are designed with a clear understanding of the desired outcome.'),
        ],
      },
    ],
  },

  // ------------------------------------------------------------------ training page
  training: {
    label: 'Training page',
    path: '/training',
    description: 'The wording around the program list. Categories and programs are managed in their own dashboard pages.',
    seo: {
      title: 'Training Programs | Altiora Business Advisory',
      description: "Browse Altiora's catalogue of leadership, communication, compliance, customer service and professional skills training programs.",
    },
    groups: [
      {
        title: 'Pictures',
        description: 'Change a picture with Change image. If you change nothing, the original photo stays.',
        fields: [
          img('banner.image', 'Banner photo', '/assets/photo-training-session.jpg', 'Wide photo behind the page title.'),
          img('custom.image', 'Custom programs photo', '/assets/photo-advisory-discussion.jpg', 'Landscape, about 4:3.'),
          img('cta.image', 'Closing banner background', '/assets/closing-training-seminar.jpg', 'Wide photo; the text sits on top of it.'),
        ],
      },
      {
        title: 'Custom programs block',
        fields: [
          t('custom.eyebrow', 'Small heading', 'Customized Corporate Training'),
          t('custom.title', 'Heading', 'Have a specific development need?'),
          p('custom.text', 'Text', 'We can work with your organization to understand the requirement and develop a training solution aligned with your objectives, audience, and desired outcomes.'),
          t('custom.button', 'Button label', 'Talk to Our Team'),
        ],
      },
      {
        title: 'Training areas heading (the cards come from Dashboard → Training → Categories)',
        fields: [
          t('areas.eyebrow', 'Small heading', 'Training Areas'),
          t('areas.title', 'Heading', 'Key Areas We Develop'),
          p('areas.text', 'Text', 'From leadership and communication to compliance, customer experience, and essential business skills, Altiora offers programs across key areas that address the evolving development needs of professionals and organizations.'),
        ],
      },
    ],
  },

  // ------------------------------------------------------------------ career guidance
  career: {
    label: 'Career Guidance page',
    path: '/career-guidance',
    description: 'The wording on the page. The eight support cards are managed in Dashboard → Career Guidance.',
    seo: {
      title: 'Career Guidance | Altiora Business Advisory',
      description: 'Personalized career guidance: career planning, CV and LinkedIn profile help, interview preparation and support for graduates and career changers.',
    },
    groups: [
      {
        title: 'Pictures',
        description: 'Change a picture with Change image. If you change nothing, the original photo stays.',
        fields: [
          img('banner.image', 'Banner photo', '/assets/svc-compliance-new.jpg', 'Wide photo behind the page title.'),
          img('intro.image', 'Introduction photo', '/assets/career-resume-interview.jpg', 'Landscape, about 4:3.'),
          img('cta.image', 'Closing banner background', '/assets/closing-mentoring.jpg', 'Wide photo; the text sits on top of it.'),
        ],
      },
      {
        title: 'Introduction',
        fields: [
          t('intro.eyebrow', 'Small heading', 'Career Guidance & Development'),
          t('intro.title', 'Heading', 'Build Your Career With Clarity and Confidence'),
          p('intro.text', 'Text', 'Career development is more than finding the next job. It is about understanding your strengths, identifying the right direction, and preparing yourself for future opportunities. Whether you are beginning your career, looking to progress professionally, considering a career transition, or exploring further qualifications, Altiora provides personalized guidance to support informed career and development decisions.'),
          t('intro.button1', 'Button 1 label', 'Book a Career Consultation'),
          t('intro.button2', 'Button 2 label', 'Explore Our Services'),
        ],
      },
      {
        title: 'Support section heading (the cards are managed in Dashboard → Career Guidance)',
        fields: [
          t('support.eyebrow', 'Small heading', 'Our Career Services'),
          t('support.title', 'Heading', 'Practical Support for Your Next Step'),
          p('support.text', 'Text', 'Our aim is to help individuals make informed career decisions and present their skills and experience with greater confidence.'),
        ],
      },
    ],
  },

  // ------------------------------------------------------------------ contact
  contact: {
    label: 'Contact page',
    path: '/contact',
    description: 'The phone, email, address and map come from Site settings.',
    seo: {
      title: 'Contact Us | Altiora Business Advisory',
      description: 'Get in touch with Altiora Business Advisory to request a consultation or ask about our services and training programs.',
    },
    groups: [
      {
        title: 'Pictures',
        description: 'Change a picture with Change image. If you change nothing, the original photo stays.',
        fields: [
          img('banner.image', 'Banner photo', '/assets/img-contact.jpg', 'Wide photo behind the page title.'),
        ],
      },
      {
        title: 'Page text',
        fields: [
          t('intro.eyebrow', 'Small heading', 'Contact Us'),
          t('intro.title', 'Heading', 'Let’s Build Something Meaningful'),
          p('intro.text', 'Text', 'Whether you are looking to develop your workforce, strengthen professional capabilities, explore a customized training solution, or receive guidance for your career journey, we would be pleased to hear from you. Tell us what you are looking for, and our team will connect with you to discuss your requirements and explore the right way forward. Let’s start a conversation.'),
        ],
      },
    ],
  },
};

// { page: { fieldKey: defaultText } } for quick lookup
export const DEFAULTS = Object.fromEntries(
  Object.entries(PAGES).map(([page, def]) => [
    page,
    Object.fromEntries(def.groups.flatMap((g) => g.fields.map((f) => [f.key, f.default]))),
  ])
);

// { page: Set of field keys that hold a picture }. A picture can never be empty (it falls back to the original photo),
// but every text can: a text the admin clears and saves is empty on purpose, and the page hides it.
export const IMAGE_KEYS = Object.fromEntries(
  Object.entries(PAGES).map(([page, def]) => [
    page,
    new Set(def.groups.flatMap((g) => g.fields).filter((f) => f.type === 'image').map((f) => f.key)),
  ])
);

export const PAGE_ORDER = ['site', 'home', 'about', 'why', 'services', 'training', 'career', 'contact'];
