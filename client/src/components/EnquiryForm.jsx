import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Field, { validateRequired, isFieldValid, MAX_LENGTH } from './Field';
import Arrow from './Arrow';
import ThankYou from './ThankYou';
import useServices from '../hooks/useServices';
import { submitEnquiry } from '../api/client';

const REQUIRED = ['name', 'company', 'email', 'phone', 'service', 'message'];

// Contact page form. /contact?service=<slug> (used by the service pages) pre-selects the service.
export default function EnquiryForm() {
  const [params] = useSearchParams();
  const services = useServices();
  const serviceOptions = [...(services || []).map((s) => s.title), 'General Enquiry'];

  const [values, setValues] = useState({
    name: '', company: '', email: '', phone: '', service: '', message: '',
  });

  // once the services have loaded, pre-select the one named in the address (only if nothing is chosen yet)
  useEffect(() => {
    const wanted = (services || []).find((s) => s.slug === params.get('service'));
    if (wanted) setValues((v) => (v.service ? v : { ...v, service: wanted.title }));
  }, [services, params]);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null); // { type: 'success' | 'error', text }
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false); // true once the enquiry has been received: the thank-you message replaces the form

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
      await submitEnquiry({ ...values, source: 'contact' });
      setValues({ name: '', company: '', email: '', phone: '', service: '', message: '' });
      setErrors({});
      setStatus(null);
      setSent(true);
    } catch (err) {
      setStatus({ type: 'error', text: err.message || 'Something went wrong. Please try again.' });
    } finally {
      setSending(false);
    }
  };

  if (sent) {
    return (
      <ThankYou
        framed
        text="We have received your message. Our team will contact you soon, usually within one business day."
        buttonLabel="Send another message"
        onButton={() => setSent(false)}
      />
    );
  }

  return (
    <form
      id="enquiry-form"
      className="reveal"
      style={{ background: 'var(--white)', border: '1px solid rgba(23,20,15,0.1)', borderRadius: 'var(--radius-l)', padding: 36 }}
      noValidate
      onSubmit={onSubmit}
      onBlur={check}
    >
      <h3 style={{ marginBottom: 22 }}>Send Us a Message</h3>
      <div className="form-grid">
        <Field id="full-name" label="Name *" error={errors.name} errorText="Please enter your name.">
          <input type="text" id="full-name" name="name" value={values.name} onChange={set} maxLength={MAX_LENGTH.name} autoComplete="name" />
        </Field>
        <Field id="company-name" label="Company / Organization *" error={errors.company} errorText="Please enter your company or organization name.">
          <input type="text" id="company-name" name="company" value={values.company} onChange={set} maxLength={MAX_LENGTH.company} autoComplete="organization" />
        </Field>
        <Field id="email" label="Email Address *" error={errors.email} errorText="Please enter a valid email address.">
          <input type="email" id="email" name="email" value={values.email} onChange={set} maxLength={MAX_LENGTH.email} autoComplete="email" />
        </Field>
        <Field id="phone" label="Contact Number *" error={errors.phone} errorText="Please enter a valid phone number, e.g. +974 5555 1234.">
          <input type="tel" id="phone" name="phone" value={values.phone} onChange={set} maxLength={MAX_LENGTH.phone} autoComplete="tel" />
        </Field>
        <Field id="service" label="Service of Interest *" full error={errors.service} errorText="Please select an area of interest.">
          <select id="service" name="service" value={values.service} onChange={set}>
            <option value="">Select an option</option>
            {serviceOptions.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        </Field>
        <Field id="message" label="Message *" full error={errors.message} errorText="Please add a short message.">
          <textarea id="message" name="message" value={values.message} onChange={set} maxLength={MAX_LENGTH.message} placeholder="Tell us about your organization and what you're looking to achieve..." />
        </Field>
      </div>
      <button type="submit" className="btn btn-gold" style={{ marginTop: 26 }} disabled={sending}>
        {sending ? 'Sending…' : 'Send Enquiry'}
        <Arrow />
      </button>
      <p className="form-note">Fields marked * are required. We typically respond within one business day.</p>
      <div id="form-status" className={'form-status' + (status ? ' show ' + status.type : '')} role="status">
        {status && status.text}
      </div>
    </form>
  );
}
