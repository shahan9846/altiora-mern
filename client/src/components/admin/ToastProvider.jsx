import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';

// A small message that slides in at the top right after something is saved or deleted, then goes away by itself.
// const toast = useToast();  toast('Changes saved', 'The website now shows them.');
const ToastContext = createContext(() => {});

export const useToast = () => useContext(ToastContext);

const SHOW_MS = 4500;

export function ToastProvider({ children }) {
  const [items, setItems] = useState([]);
  const nextId = useRef(1);

  const dismiss = useCallback((id) => setItems((list) => list.filter((t) => t.id !== id)), []);

  const toast = useCallback((title, text = '') => {
    const id = nextId.current++;
    setItems((list) => [...list.slice(-2), { id, title, text }]); // at most three at a time
  }, []);

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <div className="adm-toasts" aria-live="polite">
        {items.map((t) => <Toast key={t.id} item={t} onClose={() => dismiss(t.id)} />)}
      </div>
    </ToastContext.Provider>
  );
}

function Toast({ item, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, SHOW_MS);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="adm-toast" role="status">
      <span className="adm-toast-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12.5 4.5 4.5L19 7.5" /></svg>
      </span>
      <div className="adm-toast-body">
        <strong>{item.title}</strong>
        {item.text && <span>{item.text}</span>}
      </div>
      <button type="button" className="adm-toast-close" onClick={onClose} aria-label="Dismiss">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 6l12 12M18 6L6 18" /></svg>
      </button>
    </div>
  );
}
