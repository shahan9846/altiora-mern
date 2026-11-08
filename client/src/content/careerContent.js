// Career Guidance page text, grouped by section: getCareerContent(c).intro.heading
// `c` is the lookup from usePage('career'). The names in quotes ('intro.title') are the saved field names
// in the database (see content/schema.js), so do NOT rename them here.
// The support cards come from the API (Dashboard -> Career Guidance), not from here.

// ---------------------------------------------------------------------------------------------
// Text that is NOT editable from the dashboard. To change any of it, change it here in the code.
// ---------------------------------------------------------------------------------------------

// The big title of the page banner
const BANNER_TITLE = 'Career Guidance';

// The closing banner at the bottom of the page (only its background picture is editable)
const CLOSING_BANNER = {
  heading: "Let's Build Something Meaningful",
  text: 'Tell us what you are looking for, and our team will connect with you to discuss your requirements and explore the right way forward.',
  button: 'Send Enquiry',
};

export function getCareerContent(c) {
  return {
    banner: { title: BANNER_TITLE, image: c('banner.image') },

    intro: {
      image: c('intro.image'),
      smallHeading: c('intro.eyebrow'),
      heading: c('intro.title'),
      text: c('intro.text'),
      button1: c('intro.button1'),
      button2: c('intro.button2'),
    },

    support: {
      smallHeading: c('support.eyebrow'),
      heading: c('support.title'),
      text: c('support.text'),
    },

    cta: { image: c('cta.image'), ...CLOSING_BANNER },
  };
}
