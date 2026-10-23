// Set VITE_API_URL (e.g. https://api.example.com) when the API is hosted separately.
// In development it stays empty and Vite proxies /api to the Express server.
const BASE = import.meta.env.VITE_API_URL || '';

async function request(path, options) {
  const res = await fetch(BASE + path, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(data.message || 'Request failed');
    err.status = res.status;
    throw err;
  }
  return data;
}

// Photos that ship with the website live at /assets/...; photos uploaded from the dashboard are served by the API,
// so they need the API address in front when the website and API are hosted separately.
export const imageUrl = (src) => (src && src.startsWith('/api/') ? BASE + src : src);

export const getPrograms = () => request('/api/programs');
export const getCategories = () => request('/api/categories');
export const getServices = () => request('/api/services');
export const getCareerServices = () => request('/api/career-services');
export const getPages = () => request('/api/pages');

export const submitEnquiry = (payload) =>
  request('/api/enquiries', { method: 'POST', body: JSON.stringify(payload) });
