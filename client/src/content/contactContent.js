// Contact page text: getContactContent(c).intro.heading
// `c` is the lookup from usePage('contact'). The names in quotes ('intro.title') are the saved field names
// in the database (see content/schema.js), so do NOT rename them here.
// The phone number, email, address and social links come from Site settings (see useSite in ContentContext).

// ---------------------------------------------------------------------------------------------
// Text that is NOT editable from the dashboard. To change any of it, change it here in the code.
// ---------------------------------------------------------------------------------------------

// The big title of the page banner (also the last word of the "Home / Contact Us" trail)
const BANNER_TITLE = 'Contact Us';

// The titles of the three contact boxes
const BOX_TITLES = {
  visitTitle: 'Visit Us',
  callTitle: 'Call Us',
  emailTitle: 'Email Us',
};

export function getContactContent(c) {
  return {
    banner: { title: BANNER_TITLE, image: c('banner.image') },

    intro: {
      smallHeading: c('intro.eyebrow'),
      heading: c('intro.title'),
      text: c('intro.text'),
    },

    ...BOX_TITLES,
  };
}
