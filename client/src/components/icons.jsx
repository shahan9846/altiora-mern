// All the small icon drawings used on the website pages, in one place.
// Use them like this:   import { icons } from '../components/icons';   ->   {icons.people}
// Each icon is just an <svg> with a few lines (shapes). To add an icon, add one line to `icons` below.
const svg = (shapes, strokeWidth = 1.6) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth}>{shapes}</svg>
);

export const icons = {
  // ----- arrow used inside buttons
  arrow: svg(<path d="M5 12h14M13 6l6 6-6 6" />, 2),

  // ----- general icons
  people: svg(<><circle cx="9" cy="8" r="3" /><path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6" /><circle cx="17" cy="8.5" r="2.4" /><path d="M16 14.2c2.6.4 4.5 2.4 4.5 5.3" /></>),
  target: svg(<><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="4" /><circle cx="12" cy="12" r="0.6" fill="currentColor" /></>),
  ring: svg(<><circle cx="12" cy="12" r="8.5" /><circle cx="12" cy="12" r="3" /></>),
  award: svg(<><circle cx="12" cy="9" r="5.5" /><path d="M9 14 7.5 21 12 18.5 16.5 21 15 14" /></>),
  handshake: svg(<path d="M8 12.5 6 11a2.4 2.4 0 0 0-3 3.7l5 4.8 5-4.8m-3-2.2 1.8-1.7a2.4 2.4 0 0 1 3.4 3.4L14 17.5" />),
  handshakeFull: svg(<><path d="M8 12.5 6 11a2.4 2.4 0 0 0-3 3.7l5 4.8 5-4.8m-3-2.2 1.8-1.7a2.4 2.4 0 0 1 3.4 3.4L14 17.5" /><path d="m10 11 3.3-3.2a2.3 2.3 0 0 1 3.2 3.3" /></>),
  growth: svg(<><path d="M3.5 18.5 9 12l4 3 7.5-8.5" /><path d="M15.5 6.5H20.5V11.5" /></>),
  shield: svg(<path d="M12 3 5 6.5V11c0 5 3 8.5 7 10 4-1.5 7-5 7-10V6.5L12 3Z" />),
  shieldCheck: svg(<><path d="M12 3 5 6.5V11c0 5 3 8.5 7 10 4-1.5 7-5 7-10V6.5L12 3Z" /><path d="m9 12 2 2 4-4.5" /></>),
  house: svg(<><path d="M4 20V10l8-6 8 6v10" /><path d="M9 20v-7h6v7" /></>),
  book: svg(<><path d="M4 5.5c2.5-1 5.5-1 8 0v13c-2.5-1-5.5-1-8 0v-13Z" /><path d="M20 5.5c-2.5-1-5.5-1-8 0v13c2.5-1 5.5-1 8 0v-13Z" /></>),

  // ----- Contact page
  pin: svg(<><path d="M12 21s7-6.1 7-11.5A7 7 0 0 0 5 9.5C5 14.9 12 21 12 21Z" /><circle cx="12" cy="9.5" r="2.4" /></>),
  phone: svg(<path d="M4 5.5A1.5 1.5 0 0 1 5.5 4h2.2a1 1 0 0 1 1 .8l.7 3.3a1 1 0 0 1-.5 1.1l-1.6.9a12 12 0 0 0 6.6 6.6l.9-1.6a1 1 0 0 1 1.1-.5l3.3.7a1 1 0 0 1 .8 1v2.2A1.5 1.5 0 0 1 18.5 20 14.5 14.5 0 0 1 4 5.5Z" />),
  mail: svg(<><path d="M4 6.5A1.5 1.5 0 0 1 5.5 5h13A1.5 1.5 0 0 1 20 6.5v11A1.5 1.5 0 0 1 18.5 19h-13A1.5 1.5 0 0 1 4 17.5v-11Z" /><path d="m4.5 6.5 7.5 6 7.5-6" /></>),
};

// The real social media logos (filled shapes), used for the social buttons in the footer and on the Contact page.
// Each logo has its own viewBox because the logos come in different shapes. The colours are set in style.css (.social-...).
const brand = (viewBox, d) => (
  <svg viewBox={viewBox} fill="currentColor" aria-hidden="true"><path d={d} /></svg>
);

export const brandIcons = {
  linkedin: brand('0 0 448 512', 'M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z'),
  // Instagram is drawn as an outline (rounded square, circle and dot), the other logos are filled shapes
  instagram: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" aria-hidden="true">
      <rect x="3.4" y="3.4" width="17.2" height="17.2" rx="5.2" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.3" cy="6.7" r="0.7" fill="currentColor" stroke="none" />
    </svg>
  ),
  facebook: brand('0 0 320 512', 'M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z'),
  x: brand('0 0 24 24', 'M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z'),
  tiktok: brand('0 0 24 24', 'M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z'),
  whatsapp: brand('0 0 24 24', 'M12 2C6.48 2 2 6.48 2 12c0 1.85.5 3.58 1.36 5.07L2 22l5.06-1.33A9.94 9.94 0 0 0 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18.2a8.2 8.2 0 0 1-4.19-1.14l-.3-.18-3.1.81.83-3.02-.2-.31A8.18 8.18 0 1 1 20.18 12 8.19 8.19 0 0 1 12 20.2zm4.53-6.13c-.25-.12-1.47-.72-1.7-.81-.23-.08-.4-.12-.56.12-.17.25-.65.81-.79.97-.15.17-.29.19-.54.06-.25-.12-1.04-.38-1.99-1.22-.73-.65-1.23-1.46-1.37-1.71-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.44.12-.15.16-.25.25-.42.08-.17.04-.31-.02-.44-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.87.85-.87 2.08s.89 2.42 1.02 2.59c.12.17 1.75 2.67 4.24 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.06-.1-.23-.16-.48-.28z'),
};
