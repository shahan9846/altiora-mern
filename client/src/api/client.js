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

export const getPrograms = () => request('/api/programs');
export const getCategories = () => request('/api/categories');

export const submitEnquiry = (payload) =>
  request('/api/enquiries', { method: 'POST', body: JSON.stringify(payload) });
