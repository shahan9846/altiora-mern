// Training page text, grouped by section: getTrainingContent(c).areas.heading
// `c` is the lookup from usePage('training'). The names in quotes ('areas.title') are the saved field names
// in the database (see content/schema.js), so do NOT rename them here.
// The program list itself is inside <TrainingExplorer> and comes from the API (Dashboard -> Training).

// ---------------------------------------------------------------------------------------------
// Text that is NOT editable from the dashboard. To change it, change it here in the code.
// ---------------------------------------------------------------------------------------------

// The big title of the page banner
const BANNER_TITLE = 'Training Programs';

// The closing banner at the bottom of the page (only its background picture is editable)
const CLOSING_BANNER = {
  heading: 'Looking for a Specific Program?',
  text: 'Tell us what you want your people to learn, improve, or achieve, and we’ll help identify the right training solution.',
  button: 'Request a Customized Program',
};

export function getTrainingContent(c) {
  return {
    banner: { title: BANNER_TITLE, image: c('banner.image') },

    areas: {
      smallHeading: c('areas.eyebrow'),
      heading: c('areas.title'),
      text: c('areas.text'),
    },

    custom: {
      image: c('custom.image'),
      smallHeading: c('custom.eyebrow'),
      heading: c('custom.title'),
      text: c('custom.text'),
      button: c('custom.button'),
    },

    cta: { image: c('cta.image'), ...CLOSING_BANNER },
  };
}
