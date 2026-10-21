import { useEffect, useState } from 'react';
import Field, { validateRequired } from './Field';
import Arrow from './Arrow';
import { useConsult } from '../context/ConsultContext';
import { submitEnquiry } from '../api/client';

const REQUIRED = ['name', 'email', 'phone', 'subject', 'message'];
const EMPTY = { name: '', email: '', phone: '', subject: '', message: '' };

// "Request a Consultation" popup, opened from any button via useConsult().
export default function ConsultModal() {
  const { isOpen, closeConsult } = useConsult();
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (!isOpen) return undefined;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => { if (e.key === 'Escape') closeConsult(); };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
    };
  }, [isOpen, closeConsult]);

  const set = (e) => setValues((v) => ({ ...v, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    const errs = validateRequired(values, REQUIRED);
    setErrors(errs);
    if (Object.keys(errs).length) {
      setStatus({ type: 'error', text: 'Please complete the required fields correctly before submitting.' });
      return;
    }
    setSending(true);
    try {
      await submitEnquiry({ ...values, source: 'consultation' });
      setStatus({ type: 'success', text: 'Thank you. Your request has been received — a member of our team will contact you shortly.' });
      setValues(EMPTY);
    } catch (err) {
      setStatus({ type: 'error', text: err.message || 'Something went wrong. Please try again.' });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className={'modal-overlay' + (isOpen ? ' open' : '')} id="consult-modal" onClick={(e) => { if (e.target === e.currentTarget) closeConsult(); }}>
      <div className="modal-box">
        <button type="button" className="modal-close" id="consult-modal-close" aria-label="Close" onClick={closeConsult}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 6l12 12M18 6L6 18" /></svg>
        </button>
        <span className="eyebrow">Get In Touch</span>
        <h3>Request a Consultation</h3>
        <p className="modal-sub">Tell us a little about your organization — we'll get back to you within one business day.</p>
        <form id="consult-form" noValidate onSubmit={onSubmit}>
          <Field id="consult-name" label="Full Name *" error={errors.name} errorText="Please enter your name.">
            <input type="text" id="consult-name" name="name" value={values.name} onChange={set} />
          </Field>
          <Field id="consult-email" label="Email *" error={errors.email} errorText="Please enter a valid email address.">
            <input type="email" id="consult-email" name="email" value={values.email} onChange={set} />
          </Field>
          <Field id="consult-phone" label="Phone *" error={errors.phone} errorText="Please enter your phone number.">
            <input type="tel" id="consult-phone" name="phone" value={values.phone} onChange={set} />
          </Field>
          <Field id="consult-subject" label="Subject *" error={errors.subject} errorText="Please enter a subject.">
            <input type="text" id="consult-subject" name="subject" value={values.subject} onChange={set} />
          </Field>
          <Field id="consult-message" label="Message *" full error={errors.message} errorText="Please add a short message.">
            <textarea id="consult-message" name="message" rows="4" value={values.message} onChange={set} />
          </Field>
          <button type="submit" className="btn btn-gold" style={{ width: '100%', justifyContent: 'center' }} disabled={sending}>
            {sending ? 'Sending…' : 'Submit Request'}
            <Arrow />
          </button>
          <div id="consult-form-status" className={'form-status' + (status ? ' show ' + status.type : '')} role="status">
            {status && status.text}
          </div>
        </form>
      </div>
    </div>
  );
}
