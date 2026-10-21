import { createContext, useCallback, useContext, useMemo, useState } from 'react';

// Lets any "Request a Consultation" button open the popup form.
const ConsultContext = createContext(null);

export function ConsultProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const openConsult = useCallback(() => setIsOpen(true), []);
  const closeConsult = useCallback(() => setIsOpen(false), []);
  const value = useMemo(() => ({ isOpen, openConsult, closeConsult }), [isOpen, openConsult, closeConsult]);
  return <ConsultContext.Provider value={value}>{children}</ConsultContext.Provider>;
}

export function useConsult() {
  const ctx = useContext(ConsultContext);
  if (!ctx) throw new Error('useConsult must be used inside <ConsultProvider>');
  return ctx;
}
