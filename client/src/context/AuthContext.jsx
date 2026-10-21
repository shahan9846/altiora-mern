import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import * as api from '../api/admin';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(!!api.getToken());

  // restore the session on page load
  useEffect(() => {
    if (!api.getToken()) return;
    api.me().then(setUser).catch(() => api.setToken(null)).finally(() => setLoading(false));
  }, []);

  // any 401 from the API (expired token) signs the user out
  useEffect(() => {
    const onUnauthorized = () => setUser(null);
    window.addEventListener('admin-unauthorized', onUnauthorized);
    return () => window.removeEventListener('admin-unauthorized', onUnauthorized);
  }, []);

  const login = useCallback(async (email, password) => {
    const { token, user: u } = await api.login(email, password);
    api.setToken(token);
    setUser(u);
  }, []);

  const logout = useCallback(() => {
    api.setToken(null);
    setUser(null);
  }, []);

  const value = useMemo(() => ({ user, loading, login, logout }), [user, loading, login, logout]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}
