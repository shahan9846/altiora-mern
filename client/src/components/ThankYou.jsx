import { useEffect, useRef } from 'react';

// Shown in place of an enquiry form once it has been sent, so the visitor clearly sees that it worked.
export default function ThankYou({ title = 'Thank you!', text, buttonLabel, onButton, framed }) {
  const box = useRef(null);

  // bring the message into view (the form can be taller than the screen)
  useEffect(() => {
    box.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    box.current?.focus({ preventScroll: true });
  }, []);

  return (
    <div className={'thanks' + (framed ? ' thanks-framed' : '')} ref={box} tabIndex={-1} role="status" aria-live="polite">
      <span className="thanks-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12.5 4.5 4.5L19 7.5" /></svg>
      </span>
      <h3>{title}</h3>
      <p>{text}</p>
      {onButton && <button type="button" className="btn btn-outline-light" onClick={onButton}>{buttonLabel}</button>}
    </div>
  );
}
