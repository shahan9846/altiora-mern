// Services page text: getServicesContent(c).intro.heading
// `c` is the lookup from usePage('services'). The names in quotes ('intro.title') are the saved field names
// in the database (see content/schema.js), so do NOT rename them here.
// The service cards themselves come from the API (Dashboard -> Services), not from here.

// ---------------------------------------------------------------------------------------------
// Text that is NOT editable from the dashboard. To change it, change it here in the code.
// ---------------------------------------------------------------------------------------------

// The big title of the page banner
const BANNER_TITLE = 'Our Services';

export function getServicesContent(c) {
  return {
    banner: { title: BANNER_TITLE, image: c('banner.image') },

    intro: {
      smallHeading: c('intro.eyebrow'),
      heading: c('intro.title'),
      text: c('intro.text'),
    },

    // the picture behind the closing banner (its wording is fixed, see siteContent.js)
    ctaImage: c('cta.image'),
  };
}
