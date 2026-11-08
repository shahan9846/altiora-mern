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

// Sends a contact / consultation form. On free hosting the server sleeps when nobody has visited for a while and takes
// up to a minute to wake, so this waits that long, tries once more if the server could not be reached yet,
// and calls onSlow() after 5 seconds so the form can tell the visitor to wait.
export async function submitEnquiry(payload, onSlow) {
  const slowTimer = onSlow ? setTimeout(onSlow, 5000) : null;
  try {
    for (let attempt = 1; ; attempt++) {
      try {
        return await request('/api/enquiries', { method: 'POST', body: JSON.stringify(payload), signal: AbortSignal.timeout(70000) });
      } catch (err) {
        // "not reached yet": no answer at all (TypeError) or the hosting's "still starting" answers (502, 503, 504)
        const notReached = err.name === 'TypeError' || [502, 503, 504].includes(err.status);
        if (attempt < 2 && notReached) { await new Promise((resolve) => setTimeout(resolve, 4000)); continue; }
        if (err.name === 'TimeoutError') throw new Error('The server is taking too long to answer. Please try again in a minute.');
        if (err.name === 'TypeError' || [502, 503, 504].includes(err.status)) throw new Error('We could not reach the server. Please try again in a minute.');
        throw err;
      }
    }
  } finally {
    clearTimeout(slowTimer);
  }
}
