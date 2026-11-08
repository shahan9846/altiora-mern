// The ready-made icons an admin can pick for a service. Keep the keys in sync with
// SERVICE_ICONS in server/src/models/Service.js.
const PATHS = {
  building: <><path d="M4 18V9l8-4 8 4v9" /><path d="M9 21v-6h6v6" /><path d="M4 10.5h16" /></>,
  book: <><path d="M4 5.5c2.5-1 5.5-1 8 0v13c-2.5-1-5.5-1-8 0v-13Z" /><path d="M20 5.5c-2.5-1-5.5-1-8 0v13c2.5-1 5.5-1 8 0v-13Z" /></>,
  people: <><circle cx="9" cy="8" r="3" /><path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6" /><circle cx="17" cy="8.5" r="2.4" /><path d="M16 14.2c2.6.4 4.5 2.4 4.5 5.3" /></>,
  target: <><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="4" /><circle cx="12" cy="12" r="0.6" fill="currentColor" /></>,
  shield: <><path d="M12 3 5 6.5V11c0 5 3 8.5 7 10 4-1.5 7-5 7-10V6.5L12 3Z" /><path d="m9 12 2 2 4-4.5" /></>,
  chart: <><path d="M3.5 18.5 9 12l4 3 7.5-8.5" /><path d="M15.5 6.5H20.5V11.5" /></>,
  award: <><circle cx="12" cy="9" r="5.5" /><path d="M9 14 7.5 21 12 18.5 16.5 21 15 14" /></>,
  // used by the Career Guidance cards
  document: <><path d="M6 3h8l4 4v14H6V3Z" /><path d="M14 3v4h4M9 12h6M9 16h6" /></>,
  chat: <path d="M4 5h16v10H9l-5 4V5Z" />,
  linkedin: <path d="M6.5 9v9M6.5 6.2v.01M11 18V9m0 4c0-2.5 1.6-4 3.8-4S18 10.5 18 13v5" />,
  swap: <><path d="M4 8h13l-3-3" /><path d="M20 16H7l3 3" /></>,
};

// Every service card and service page shows this same icon (services no longer pick their own).
const SERVICE_ICON = 'building';

export default function ServiceIcon({ name = SERVICE_ICON }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">{PATHS[name] || PATHS.building}</svg>
  );
}
