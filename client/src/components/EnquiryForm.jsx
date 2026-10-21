import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Field, { validateRequired } from './Field';
import Arrow from './Arrow';
import services from '../data/services';
import { submitEnquiry } from '../api/client';

const REQUIRED = ['name', 'company', 'email', 'phone', 'service', 'message'];
const SERVICE_OPTIONS = [...services.map((s) => s.cardTitle), 'General Enquiry'];

// Contact page form. /contact?service=<slug> (used by the service pages) pre-selects the service.
export default function EnquiryForm() {
  const [params] = useSearchParams();
  const preselected = services.find((s) => s.slug === params.get('service'));

  const [values, setValues] = useState({
    name: '', company: '', email: '', phone: '', service: preselected ? preselected.cardTitle : '', message: '',
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null); // { type: 'success' | 'error', text }
  const [sending, setSending] = useState(false);

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
      await submitEnquiry({ ...values, source: 'contact' });
      setStatus({ type: 'success', text: 'Thank you. Your enquiry has been received — a member of our team will contact you shortly.' });
      setValues({ name: '', company: '', email: '', phone: '', service: '', message: '' });
    } catch (err) {
      setStatus({ type: 'error', text: err.message || 'Something went wrong. Please try again.' });
    } finally {
      setSending(false);
    }
  };

  return (
    <form
      id="enquiry-form"
      className="reveal"
      style={{ background: 'var(--white)', border: '1px solid rgba(23,20,15,0.1)', borderRadius: 'var(--radius-l)', padding: 36 }}
      noValidate
      onSubmit={onSubmit}
    >
      <h3 style={{ marginBottom: 22 }}>Send Us a Message</h3>
      <div className="form-grid">
        <Field id="full-name" label="Full Name *" error={errors.name} errorText="Please enter your full name.">
          <input type="text" id="full-name" name="name" value={values.name} onChange={set} />
        </Field>
        <Field id="company-name" label="Company Name *" error={errors.company} errorText="Please enter your company name.">
          <input type="text" id="company-name" name="company" value={values.company} onChange={set} />
        </Field>
        <Field id="email" label="Email *" error={errors.email} errorText="Please enter a valid email address.">
          <input type="email" id="email" name="email" value={values.email} onChange={set} />
        </Field>
        <Field id="phone" label="Phone *" error={errors.phone} errorText="Please enter your phone number.">
          <input type="tel" id="phone" name="phone" value={values.phone} onChange={set} />
        </Field>
        <Field id="service" label="Service / Area of Interest *" full error={errors.service} errorText="Please select an area of interest.">
          <select id="service" name="service" value={values.service} onChange={set}>
            <option value="">Select an option</option>
            {SERVICE_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        </Field>
        <Field id="message" label="Message *" full error={errors.message} errorText="Please add a short message.">
          <textarea id="message" name="message" value={values.message} onChange={set} placeholder="Tell us about your organization and what you're looking to achieve..." />
        </Field>
      </div>
      <button type="submit" className="btn btn-gold" style={{ marginTop: 26 }} disabled={sending}>
        {sending ? 'Sending…' : 'Submit Enquiry'}
        <Arrow />
      </button>
      <p className="form-note">Fields marked * are required. We typically respond within one business day.</p>
      <div id="form-status" className={'form-status' + (status ? ' show ' + status.type : '')} role="status">
        {status && status.text}
      </div>
    </form>
  );
}
