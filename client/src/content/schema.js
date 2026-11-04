// Every editable text on the website, grouped by page.
// - The dashboard builds its edit forms from this file.
// - The pages read their wording through usePage(key).c('field.key'); anything the admin has not changed
//   (or leaves empty) shows the `default` below, so a page can never end up blank.
// To make another text editable: add a field here, then use c('that.key') in the page.

const t = (key, label, def) => ({ key, label, type: 'text', default: def });
const p = (key, label, def) => ({ key, label, type: 'textarea', default: def });

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
        title: 'Contact details',
        fields: [
          t('phone', 'Phone number', '+974 XXXX XXXX'),
          t('email', 'Email address', 'info@altiorabusinessadvisory.com'),
          t('address', 'Address', 'Doha, Qatar'),
          t('mapQuery', 'Map location (a place name or address Google Maps can find)', 'Doha, Qatar'),
        ],
      },
      {
        title: 'WhatsApp',
        fields: [
          t('whatsappNumber', 'WhatsApp number (country code and number, no + or spaces)', '97400000000'),
          p('whatsappMessage', 'First message the visitor sees', 'Hello Altiora Business Advisory, I would like to enquire about your services.'),
        ],
      },
      {
        title: 'Social links',
        description: 'Full web addresses, for example https://www.linkedin.com/company/altiora. Leave empty to hide the icon.',
        fields: [
          t('linkedin', 'LinkedIn', ''),
          t('instagram', 'Instagram', ''),
          t('facebook', 'Facebook', ''),
        ],
      },
      {
        title: 'Header and footer',
        fields: [
          t('headerCta', 'Header button label', 'Request a Consultation'),
          t('tagline', 'Footer line under the description', 'Altiora Business Advisory | Elevating Potential. Delivering Excellence.'),
          p('footerText', 'Footer description', 'A business advisory firm helping organizations build capability, develop people and drive sustainable growth through practical, tailored learning solutions.'),
          t('copyright', 'Company name in the copyright line', 'Altiora Business Advisory'),
        ],
      },
      {
        title: 'Closing banner (shown at the bottom of several pages)',
        fields: [
          t('cta.title', 'Heading', 'Ready to Elevate Your People and Performance?'),
          p('cta.text', 'Text', "Let's build practical solutions that create meaningful and sustainable business impact."),
          t('cta.button', 'Button label', 'Request a Consultation'),
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
        title: 'Five points under the hero',
        fields: items('value', 'Point', [
          ['People Focussed', 'Developing talent and strengthening capabilities.'],
          ['Custom Solutions', 'Tailored programs aligned to your business goals.'],
          ['Practical & Impactful', 'Real-world learning for measurable results.'],
          ['Trust & Partnership', 'Building long-term relationships you can rely on.'],
          ['Driving Growth', 'Empowering organizations to achieve excellence.'],
        ], ['text', 'text']),
      },
      {
        title: 'About block',
        fields: [
          t('about.eyebrow', 'Small heading', 'Who We Are'),
          t('about.title', 'Heading', 'About Altiora'),
          p('about.text', 'First paragraph', 'We provide tailored learning and development solutions, professional development programs, organizational capability support, and career guidance designed to help individuals and organizations grow, perform, and succeed.'),
          p('about.text2', 'Second paragraph', 'From strengthening workforce capabilities to supporting individual career journeys, our approach is focused on creating meaningful learning experiences that translate into real-world value.'),
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
          t('stat1.value', 'Highlight 1: value (a number with a symbol counts up)', '100%'),
          t('stat1.label', 'Highlight 1: label', 'Tailored Solutions'),
          t('stat2.value', 'Highlight 2: value', 'Practical'),
          t('stat2.label', 'Highlight 2: label', 'Learning Impact'),
          t('stat3.value', 'Highlight 3: value', 'Long-term'),
          t('stat3.label', 'Highlight 3: label', 'Client Partnership'),
          t('stat4.value', 'Highlight 4: value', 'Every Time'),
          t('stat4.label', 'Highlight 4: label', 'Commitment to Excellence'),
        ],
      },
      {
        title: 'Approach block (four steps)',
        fields: [
          t('approach.eyebrow', 'Small heading', 'Our Approach'),
          t('approach.title', 'Heading', 'A Structured, Practical Methodology'),
          p('approach.text', 'Text', 'Every engagement follows the same disciplined process, adapted to your organization.'),
          ...items('step', 'Step', [
            ['Understand', "Understand the organization's goals, challenges and people."],
            ['Design', 'Build tailored solutions around actual business requirements.'],
            ['Deliver', 'Deliver practical, engaging and relevant programs.'],
            ['Measure', 'Focus on application, outcomes and sustainable impact.'],
          ], ['text', 'text']),
        ],
      },
      {
        title: 'Training block (the numbers and tags come from your categories and programs)',
        fields: [
          t('training.eyebrow', 'Small heading', 'Training Programs'),
          t('training.title', 'Heading', 'Learning Designed for Today’s Workplace'),
          p('training.text', 'Text', 'Our training programs are designed to build practical skills, strengthen professional capabilities, and support better performance in the workplace.'),
          t('training.button', 'Button label', 'View Training Programs'),
          t('training.label1', 'Number 1 label', 'Ready Programs'),
          t('training.label2', 'Number 2 label', 'Categories'),
          t('training.label3', 'Number 3 label', 'Customizable'),
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
      { title: 'Banner', fields: [t('banner.title', 'Page title', 'About Us')] },
      {
        title: 'Who we are',
        fields: [
          t('who.eyebrow', 'Small heading', 'Who We Are'),
          t('who.title', 'Heading', 'About Altiora'),
          p('who.text1', 'First paragraph', 'Altiora Business Advisory was established with a clear purpose — to create meaningful development opportunities that enable people and organizations to move forward with confidence. Based in Qatar, Altiora brings a practical and people-focused approach to development.'),
          p('who.text2', 'Second paragraph', 'We believe that meaningful progress comes from understanding where you are today, recognizing where you want to go, and building the right capabilities to get there.'),
          t('who.button', 'Button label', 'Talk To Our Team'),
        ],
      },
      {
        title: 'Purpose, mission and vision',
        fields: [
          t('foundation.eyebrow', 'Small heading', 'Our Foundation'),
          t('foundation.title', 'Heading', 'Vision, Mission & Belief'),
          p('foundation.text', 'Text', 'Our approach is centered on relevance, quality, and continuous improvement. We aim to create development experiences that go beyond learning — helping individuals strengthen their potential and organizations build capable, confident, and future-ready teams.'),
          ...items('pmv', 'Card', [
            ['Our Vision', 'To be a trusted partner in developing people, strengthening organizations, and enabling continuous professional growth.'],
            ['Our Mission', 'To create practical, relevant, and meaningful development experiences that strengthen capabilities, encourage continuous learning, and support individuals and organizations in achieving their goals.'],
            ['Our Belief', 'At Altiora, we believe progress begins with potential — and the right development can elevate it.'],
          ]),
        ],
      },
      {
        title: 'What we believe',
        fields: [
          t('believe.eyebrow', 'Small heading', 'What We Believe'),
          t('believe.title', 'Heading', 'Principles behind every engagement'),
          t('believe.item1', 'Point 1', 'Learning should be practical, not theoretical for its own sake.'),
          t('believe.item2', 'Point 2', "Every organization's context is different, and solutions should reflect that."),
          t('believe.item3', 'Point 3', 'Long-term partnerships create better outcomes than one-off projects.'),
          t('believe.item4', 'Point 4', 'Quality and professionalism matter in every engagement, large or small.'),
        ],
      },
      {
        title: 'Our values (five cards)',
        fields: [
          t('values.eyebrow', 'Small heading', 'What Guides Us'),
          t('values.title', 'Heading', 'Our Values'),
          ...items('value', 'Value', [
            ['Excellence', 'We strive for quality and professionalism in everything we deliver.'],
            ['Integrity', 'We build relationships based on trust, transparency, and accountability.'],
            ['Collaboration', 'We believe the strongest solutions are created by listening, understanding, and working together.'],
            ['Growth', 'We believe continuous learning is fundamental to individual and organizational progress.'],
            ['Impact', 'We focus on development that creates meaningful and practical outcomes.'],
          ]),
        ],
      },
      {
        title: 'Why organizations choose us',
        fields: [
          t('choose.eyebrow', 'Small heading', 'Why Organizations Choose Us'),
          t('choose.title', 'Heading', 'A practical, people-first approach'),
          ...items('choose', 'Card', [
            ['Tailored, Not Templated', 'Solutions built around your organization, not generic packages.'],
            ['Practical Delivery', 'Programs designed for real application, not just awareness.'],
            ['Long-Term Partnership', 'Relationships that extend beyond a single project.'],
            ['Professional Standards', 'Quality and rigour applied consistently across every engagement.'],
          ], ['text', 'text']),
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
      { title: 'Banner', fields: [t('banner.title', 'Page title', 'Why Altiora')] },
      {
        title: 'Introduction',
        fields: [
          t('intro.eyebrow', 'Small heading', 'Why Altiora?'),
          t('intro.title', 'Heading', 'Development with purpose'),
          p('intro.text1', 'First paragraph', 'At Altiora, every development journey begins with a clear purpose. Our approach is centered on identifying the right priorities and creating solutions that align with individual and organizational goals.'),
          p('intro.text2', 'Second paragraph', 'We go beyond conventional training by delivering practical, relevant, and engaging development experiences designed to strengthen capabilities and create meaningful workplace impact.'),
        ],
      },
      {
        title: 'What sets us apart (six cards)',
        fields: [
          t('apart.eyebrow', 'Small heading', 'Our Strengths'),
          t('apart.title', 'Heading', 'What Sets Us Apart'),
          ...items('apart', 'Card', [
            ['Tailored to Your Needs', 'We recognize that every organization and individual is different. Our solutions can be adapted to specific objectives, audiences, industries, and development priorities.'],
            ['Practical & Relevant', 'We focus on learning that participants can understand, relate to, and apply in their professional environment.'],
            ['People-Focused Approach', 'Development is about people. We place the learner at the center of the experience while keeping organizational objectives in focus.'],
            ['Flexible Solutions', 'From focused workshops to customized development programs, our approach allows us to respond to different learning requirements and delivery needs.'],
            ['Quality-Driven', 'We are committed to maintaining professionalism, relevance, and quality throughout every stage of the learning journey.'],
            ['Built for Continuous Growth', 'We look beyond a single training session and encourage development that supports continued learning, stronger capabilities, and long-term professional growth.'],
          ]),
        ],
      },
      {
        title: 'Closing banner',
        fields: [
          t('cta.title', 'Heading', 'Your Goals. Our Focus.'),
          p('cta.text', 'Text', 'Whether you are developing a team, strengthening a specific capability, or investing in your own professional growth, Altiora works with you to create a development experience that has purpose and direction.'),
          t('cta.button', 'Button label', 'Request a Consultation'),
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
        title: 'Page text',
        fields: [
          t('banner.title', 'Page title', 'Our Services'),
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
        title: 'Page text',
        fields: [
          t('banner.title', 'Page title', 'Training Programs'),
          t('intro.eyebrow', 'Small heading', 'Training Programs'),
          t('intro.title', 'Heading', 'Learning Designed for Today’s Workplace'),
          p('intro.text', 'Text', 'Our training programs are designed to build practical skills, strengthen professional capabilities, and support better performance in the workplace. Programs can be delivered as ready-to-run courses or customized to suit your organization’s objectives, industry requirements, participant profiles, and learning priorities.'),
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
      {
        title: 'Closing banner',
        fields: [
          t('cta.title', 'Heading', 'Looking for a Specific Program?'),
          p('cta.text', 'Text', 'Tell us what you want your people to learn, improve, or achieve, and we’ll help identify the right training solution.'),
          t('cta.button1', 'Button 1 label', 'Explore Programs'),
          t('cta.button2', 'Button 2 label', 'Request a Customized Program'),
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
      { title: 'Banner', fields: [t('banner.title', 'Page title', 'Career Guidance')] },
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
      {
        title: 'Approach (four steps)',
        fields: [
          t('approach.eyebrow', 'Small heading', 'Our Approach'),
          t('approach.title', 'Heading', 'Your Goals. A Clearer Way Forward.'),
          p('approach.text', 'Text', 'A structured, personalized approach to help you make informed career decisions.'),
          ...items('step', 'Step', [
            ['Understand Your Goals', 'We take the time to understand your aspirations, interests and current situation.'],
            ['Identify Your Strengths', 'We help you recognize your strengths and the areas you want to develop.'],
            ['Create a Personalized Plan', 'We build a practical action plan tailored to your goals.'],
            ['Prepare for Your Next Step', 'We provide the guidance and support you need to move forward with confidence.'],
          ], ['text', 'text']),
        ],
      },
      {
        title: 'Why choose Altiora',
        fields: [
          t('why.eyebrow', 'Small heading', 'Why Choose Altiora'),
          t('why.title', 'Heading', 'Guidance That Goes Beyond the Next Job'),
          p('why.text', 'Text', 'We combine practical expertise with a people-focused approach to help you make meaningful progress in your career journey.'),
          t('why.item1', 'Checklist 1', 'Personalized guidance built around your goals'),
          t('why.item2', 'Checklist 2', 'Support at every stage of your career'),
          t('why.item3', 'Checklist 3', 'Practical help with CVs, profiles and interviews'),
          t('why.item4', 'Checklist 4', 'A focus on informed decisions and greater confidence'),
        ],
      },
      {
        title: 'Closing banner',
        fields: [
          t('cta.title', 'Heading', "Let's Build Something Meaningful"),
          p('cta.text', 'Text', 'Tell us what you are looking for, and our team will connect with you to discuss your requirements and explore the right way forward.'),
          t('cta.button', 'Button label', 'Send Enquiry'),
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
        title: 'Page text',
        fields: [
          t('banner.title', 'Page title', 'Contact Us'),
          t('intro.eyebrow', 'Small heading', 'Contact Us'),
          t('intro.title', 'Heading', 'Let’s Build Something Meaningful'),
          p('intro.text', 'Text', 'Whether you are looking to develop your workforce, strengthen professional capabilities, explore a customized training solution, or receive guidance for your career journey, we would be pleased to hear from you. Tell us what you are looking for, and our team will connect with you to discuss your requirements and explore the right way forward. Let’s start a conversation.'),
          t('visit.title', 'Address box title', 'Visit Us'),
          t('call.title', 'Phone box title', 'Call Us'),
          t('email.title', 'Email box title', 'Email Us'),
          t('whatsapp.button', 'WhatsApp button label', 'Chat on WhatsApp'),
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

export const PAGE_ORDER = ['site', 'home', 'about', 'why', 'services', 'training', 'career', 'contact'];
