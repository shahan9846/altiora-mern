// Home page text, grouped by section so the page file can read it like plain data:
//   const home = getHomeContent(c);   ->   home.about.heading
//
// `c` is the text lookup from usePage('home'). It returns the text the admin saved in the
// dashboard, or the default text from content/schema.js. The names in quotes ('about.title')
// are the saved field names in the database, so do NOT rename them here.
// Adding a new editable text? Add the field in content/schema.js first, then read it here.

// ---------------------------------------------------------------------------------------------
// Text that is NOT editable from the dashboard. To change any of it, change it here in the code.
// ---------------------------------------------------------------------------------------------

// The 5 short points under the hero banner
const VALUE_POINTS = [
  { title: 'People Focussed', text: 'Developing talent and strengthening capabilities.' },
  { title: 'Custom Solutions', text: 'Tailored programs aligned to your business goals.' },
  { title: 'Practical & Impactful', text: 'Real-world learning for measurable results.' },
  { title: 'Trust & Partnership', text: 'Building long-term relationships you can rely on.' },
  { title: 'Driving Growth', text: 'Empowering organizations to achieve excellence.' },
];

// The 4 highlights of the "Why Altiora" block (a number with a symbol, like 100%, counts up)
const WHY_HIGHLIGHTS = [
  { value: '100%', label: 'Tailored Solutions' },
  { value: 'Practical', label: 'Learning Impact' },
  { value: 'Long-term', label: 'Client Partnership' },
  { value: 'Every Time', label: 'Commitment to Excellence' },
];

// The 4 steps of the "Our approach" block
const APPROACH_STEPS = [
  { title: 'Understand', text: "Understand the organization's goals, challenges and people." },
  { title: 'Design', text: 'Build tailored solutions around actual business requirements.' },
  { title: 'Deliver', text: 'Deliver practical, engaging and relevant programs.' },
  { title: 'Measure', text: 'Focus on application, outcomes and sustainable impact.' },
];

// The labels under the three numbers of the Training block. The numbers themselves are counted
// automatically from the categories and programs added in the dashboard (see HomeTraining.jsx).
const TRAINING_NUMBER_LABELS = ['Ready Programs', 'Categories', 'Customizable'];

export function getHomeContent(c) {
  return {
    valueStrip: VALUE_POINTS,

    about: {
      image: c('about.image'),
      smallHeading: c('about.eyebrow'),
      heading: c('about.title'),
      intro: c('about.text'),
      button: c('about.button'),
    },

    // The service cards themselves are inside <ServicesSlider>; only the button text is here
    services: {
      button: c('services.button'),
    },

    why: {
      smallHeading: c('why.eyebrow'),
      heading: c('why.title'),
      text: c('why.text'),
      button: c('why.button'),
      highlights: WHY_HIGHLIGHTS,
    },

    approach: {
      image: c('approach.image'),
      smallHeading: c('approach.eyebrow'),
      heading: c('approach.title'),
      text: c('approach.text'),
      steps: APPROACH_STEPS,
    },

    // the picture behind the closing banner (its wording is fixed, see siteContent.js)
    ctaImage: c('cta.image'),

    training: {
      smallHeading: c('training.eyebrow'),
      heading: c('training.title'),
      text: c('training.text'),
      numberLabels: TRAINING_NUMBER_LABELS,
      button: c('training.button'),
    },
  };
}
