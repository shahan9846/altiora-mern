// Small display helpers shared by the dashboard pages.

// "05 Nov 2026, 14:30"
export const fmtDate = (date) =>
  new Date(date).toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });

// The coloured "new / contacted / closed" label
export function StatusBadge({ status }) {
  return <span className={'adm-badge ' + (status || 'new')}>{status || 'new'}</span>;
}
