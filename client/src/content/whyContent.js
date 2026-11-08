// "Why Altiora" page text, grouped by section: getWhyContent(c).intro.heading
// `c` is the lookup from usePage('why'). The names in quotes ('intro.title') are the saved field names
// in the database (see content/schema.js), so do NOT rename them here.

// ---------------------------------------------------------------------------------------------
// Text that is NOT editable from the dashboard. To change any of it, change it here in the code.
// ---------------------------------------------------------------------------------------------

// The big title of the page banner
const BANNER_TITLE = 'Why Altiora';

// "What sets us apart": the 6 cards
const APART_CARDS = [
  { title: 'Tailored to Your Needs', text: 'We recognize that every organization and individual is different. Our solutions can be adapted to specific objectives, audiences, industries, and development priorities.' },
  { title: 'Practical & Relevant', text: 'We focus on learning that participants can understand, relate to, and apply in their professional environment.' },
  { title: 'People-Focused Approach', text: 'Development is about people. We place the learner at the center of the experience while keeping organizational objectives in focus.' },
  { title: 'Flexible Solutions', text: 'From focused workshops to customized development programs, our approach allows us to respond to different learning requirements and delivery needs.' },
  { title: 'Quality-Driven', text: 'We are committed to maintaining professionalism, relevance, and quality throughout every stage of the learning journey.' },
  { title: 'Built for Continuous Growth', text: 'We look beyond a single training session and encourage development that supports continued learning, stronger capabilities, and long-term professional growth.' },
];

// The closing banner at the bottom of the page (only its background picture is editable)
const CLOSING_BANNER = {
  heading: 'Your Goals. Our Focus.',
  text: 'Whether you are developing a team, strengthening a specific capability, or investing in your own professional growth, Altiora works with you to create a development experience that has purpose and direction.',
  button: 'Request a Consultation',
};

export function getWhyContent(c) {
  return {
    banner: { title: BANNER_TITLE, image: c('banner.image') },

    intro: {
      image: c('intro.image'),
      smallHeading: c('intro.eyebrow'),
      heading: c('intro.title'),
      text1: c('intro.text1'),
    },

    // "What sets us apart": the heading is editable, the six cards are fixed
    apart: {
      smallHeading: c('apart.eyebrow'),
      heading: c('apart.title'),
      cards: APART_CARDS,
    },

    cta: { image: c('cta.image'), ...CLOSING_BANNER },
  };
}
