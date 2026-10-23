import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';

// A confirmation box in the dashboard's own style, used instead of the browser's plain "OK / Cancel" box.
// const confirm = useConfirm();
// if (!(await confirm({ title: 'Delete this?', message: '…', confirmLabel: 'Delete', danger: true }))) return;
const ConfirmContext = createContext(null);

export function useConfirm() {
  const ctx = useContext(ConfirmContext);
  if (!ctx) throw new Error('useConfirm must be used inside <ConfirmProvider>');
  return ctx;
}

const ICONS = {
  danger: <path d="M12 4.5 3.5 19h17L12 4.5Zm0 5.5v4.5m0 2.5v.01" />,
  signout: <path d="M10 4H6a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h4m5-12 4 4-4 4m4-4H10" />,
};

export function ConfirmProvider({ children }) {
  const [request, setRequest] = useState(null); // { title, message, confirmLabel, danger, icon, resolve }
  const cancelRef = useRef(null);

  const confirm = useCallback((options) => new Promise((resolve) => setRequest({ ...options, resolve })), []);

  const answer = useCallback((value) => {
    setRequest((r) => { if (r) r.resolve(value); return null; });
  }, []);

  useEffect(() => {
    if (!request) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') answer(false); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    cancelRef.current?.focus(); // the safe choice is focused, so Enter never deletes by accident
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [request, answer]);

  return (
    <ConfirmContext.Provider value={confirm}>
      {children}
      {request && (
        <div className="adm-overlay" onMouseDown={(e) => { if (e.target === e.currentTarget) answer(false); }}>
          <div className={'adm-confirm' + (request.danger ? ' danger' : '')} role="alertdialog" aria-modal="true" aria-labelledby="confirm-title" aria-describedby="confirm-text">
            <span className="adm-confirm-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                {ICONS[request.danger ? 'danger' : request.icon || 'signout']}
              </svg>
            </span>
            <h3 id="confirm-title">{request.title}</h3>
            <p id="confirm-text">{request.message}</p>
            <div className="adm-confirm-actions">
              <button type="button" className="adm-btn-sm" ref={cancelRef} onClick={() => answer(false)}>{request.cancelLabel || 'Cancel'}</button>
              <button type="button" className={request.danger ? 'adm-btn-sm danger solid' : 'btn btn-gold'} onClick={() => answer(true)}>{request.confirmLabel || 'Confirm'}</button>
            </div>
          </div>
        </div>
      )}
    </ConfirmContext.Provider>
  );
}
