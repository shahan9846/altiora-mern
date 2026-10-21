// Authenticated calls for the admin dashboard. The login token lives in localStorage.
const BASE = import.meta.env.VITE_API_URL || '';
const TOKEN_KEY = 'altiora_admin_token';

export const getToken = () => {
  try { return localStorage.getItem(TOKEN_KEY); } catch { return null; }
};
export const setToken = (t) => {
  try { t ? localStorage.setItem(TOKEN_KEY, t) : localStorage.removeItem(TOKEN_KEY); } catch { /* storage blocked */ }
};

async function request(path, { method = 'GET', body } = {}) {
  const token = getToken();
  const res = await fetch(BASE + path, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: 'Bearer ' + token } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(data.message || 'Request failed');
    err.status = res.status;
    err.fieldErrors = data.errors;
    // a stale/expired token anywhere except the login call sends the user back to the login page
    if (res.status === 401 && path !== '/api/auth/login') {
      setToken(null);
      window.dispatchEvent(new Event('admin-unauthorized'));
    }
    throw err;
  }
  return data;
}

export const login = (email, password) => request('/api/auth/login', { method: 'POST', body: { email, password } });
export const me = () => request('/api/auth/me');
export const getStats = () => request('/api/admin/stats');

export const listEnquiries = () => request('/api/enquiries');
export const setEnquiryStatus = (id, status) => request('/api/enquiries/' + id, { method: 'PATCH', body: { status } });
export const deleteEnquiry = (id) => request('/api/enquiries/' + id, { method: 'DELETE' });

export const listCategories = () => request('/api/categories');
export const createCategory = (c) => request('/api/categories', { method: 'POST', body: c });
export const updateCategory = (id, c) => request('/api/categories/' + id, { method: 'PUT', body: c });
export const deleteCategory = (id) => request('/api/categories/' + id, { method: 'DELETE' });

export const listPrograms = () => request('/api/programs');
export const createProgram = (p) => request('/api/programs', { method: 'POST', body: p });
export const updateProgram = (id, p) => request('/api/programs/' + id, { method: 'PUT', body: p });
export const deleteProgram = (id) => request('/api/programs/' + id, { method: 'DELETE' });
