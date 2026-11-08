import { useEffect, useState } from 'react';
import Field, { validateRequired, isFieldValid, MAX_LENGTH } from './Field';
import Arrow from './Arrow';
import ThankYou from './ThankYou';
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
  const [sent, setSent] = useState(false); // true once the request has been received: the thank-you message replaces the form

  useEffect(() => {
    if (!isOpen) return undefined;
    setSent(false); // a fresh form every time the popup opens
    setStatus(null);
    document.body.classList.add('no-scroll');
    const onKey = (e) => { if (e.key === 'Escape') closeConsult(); };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.classList.remove('no-scroll');
      document.removeEventListener('keydown', onKey);
    };
  }, [isOpen, closeConsult]);

  // an error disappears as soon as the field is fixed; a field is checked when the visitor leaves it
  const set = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name] && isFieldValid(name, value, REQUIRED)) setErrors((er) => ({ ...er, [name]: false }));
  };
  const check = (e) => {
    const { name, value } = e.target;
    if (name in values) setErrors((er) => ({ ...er, [name]: !isFieldValid(name, value, REQUIRED) }));
  };

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
      await submitEnquiry({ ...values, source: 'consultation' }, () => setStatus({ type: 'info', text: 'Still sending… our server is waking up, this can take up to a minute. Please keep this page open.' }));
      setValues(EMPTY);
      setErrors({});
      setStatus(null);
      setSent(true);
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
        {sent ? (
          <ThankYou
            text="We have received your request. Our team will contact you soon, usually within one business day."
            buttonLabel="Close"
            onButton={closeConsult}
          />
        ) : (<>
        <span className="eyebrow">Get In Touch</span>
        <h3>Request a Consultation</h3>
        <p className="modal-sub">Tell us a little about your organization — we'll get back to you within one business day.</p>
        <form id="consult-form" noValidate onSubmit={onSubmit} onBlur={check}>
          <Field id="consult-name" label="Full Name *" error={errors.name} errorText="Please enter your name.">
            <input type="text" id="consult-name" name="name" value={values.name} onChange={set} maxLength={MAX_LENGTH.name} autoComplete="name" />
          </Field>
          <Field id="consult-email" label="Email *" error={errors.email} errorText="Please enter a valid email address.">
            <input type="email" id="consult-email" name="email" value={values.email} onChange={set} maxLength={MAX_LENGTH.email} autoComplete="email" />
          </Field>
          <Field id="consult-phone" label="Phone *" error={errors.phone} errorText="Please enter a valid phone number, e.g. +974 5555 1234.">
            <input type="tel" id="consult-phone" name="phone" value={values.phone} onChange={set} maxLength={MAX_LENGTH.phone} autoComplete="tel" />
          </Field>
          <Field id="consult-subject" label="Subject *" error={errors.subject} errorText="Please enter a subject.">
            <input type="text" id="consult-subject" name="subject" value={values.subject} onChange={set} maxLength={MAX_LENGTH.subject} />
          </Field>
          <Field id="consult-message" label="Message *" full error={errors.message} errorText="Please add a short message.">
            <textarea id="consult-message" name="message" rows="4" value={values.message} onChange={set} maxLength={MAX_LENGTH.message} />
          </Field>
          <button type="submit" className="btn btn-gold btn-block" disabled={sending}>
            {sending ? 'Sending…' : 'Submit Request'}
            <Arrow />
          </button>
          <div id="consult-form-status" className={'form-status' + (status ? ' show ' + status.type : '')} role="status">
            {status && status.text}
          </div>
        </form>
        </>)}
      </div>
    </div>
  );
}
