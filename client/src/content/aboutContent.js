// About page text, grouped by section: getAboutContent(c).who.heading
// `c` is the lookup from usePage('about'). The names in quotes ('who.title') are the saved field names
// in the database (see content/schema.js), so do NOT rename them here.

// ---------------------------------------------------------------------------------------------
// Text that is NOT editable from the dashboard. To change any of it, change it here in the code.
// ---------------------------------------------------------------------------------------------

// The big title of the page banner (also the last word of the "Home / About Us" trail)
const BANNER_TITLE = 'About Us';

// "Purpose, mission and vision": the 3 cards
const FOUNDATION_CARDS = [
  { title: 'Our Vision', text: 'To be a trusted partner in developing people, strengthening organizations, and enabling continuous professional growth.' },
  { title: 'Our Mission', text: 'To create practical, relevant, and meaningful development experiences that strengthen capabilities, encourage continuous learning, and support individuals and organizations in achieving their goals.' },
  { title: 'Our Belief', text: 'At Altiora, we believe progress begins with potential — and the right development can elevate it.' },
];

// "Our values": the 5 cards
const VALUE_CARDS = [
  { title: 'Excellence', text: 'We strive for quality and professionalism in everything we deliver.' },
  { title: 'Integrity', text: 'We build relationships based on trust, transparency, and accountability.' },
  { title: 'Collaboration', text: 'We believe the strongest solutions are created by listening, understanding, and working together.' },
  { title: 'Growth', text: 'We believe continuous learning is fundamental to individual and organizational progress.' },
  { title: 'Impact', text: 'We focus on development that creates meaningful and practical outcomes.' },
];

export function getAboutContent(c) {
  return {
    banner: { title: BANNER_TITLE, image: c('banner.image') },

    who: {
      image: c('who.image'),
      smallHeading: c('who.eyebrow'),
      heading: c('who.title'),
      text1: c('who.text1'),
      button: c('who.button'),
    },

    // "Purpose, mission and vision": the heading is editable, the three cards are fixed
    foundation: {
      smallHeading: c('foundation.eyebrow'),
      heading: c('foundation.title'),
      text: c('foundation.text'),
      cards: FOUNDATION_CARDS,
    },

    // "Our values": the heading is editable, the five cards are fixed
    values: {
      smallHeading: c('values.eyebrow'),
      heading: c('values.title'),
      cards: VALUE_CARDS,
    },

    // the picture behind the closing banner (its wording comes from Site settings)
    ctaImage: c('cta.image'),
  };
}
