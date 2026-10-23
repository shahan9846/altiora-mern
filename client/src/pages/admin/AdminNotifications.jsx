import { useEffect, useState } from 'react';
import { getNotifications, saveNotifications, sendTestEmail } from '../../api/admin';
import { useToast } from '../../components/admin/ToastProvider';

// Who receives the "new enquiry" emails, and a button to check that email works
export default function AdminNotifications() {
  const toast = useToast();
  const [info, setInfo] = useState(null);
  const [emails, setEmails] = useState('');
  const [error, setError] = useState('');
  const [fieldError, setFieldError] = useState('');
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState(null); // { ok, text }

  useEffect(() => {
    getNotifications()
      .then((d) => { setInfo(d); setEmails(d.emails); })
      .catch((e) => setError(e.message));
  }, []);

  const save = async (e) => {
    e.preventDefault();
    setSaving(true); setError(''); setFieldError(''); setTestResult(null);
    try {
      const d = await saveNotifications(emails);
      setInfo(d); setEmails(d.emails);
      toast('Email address saved', d.recipients.length ? `New enquiries will be sent to ${d.recipients.join(', ')}.` : '');
    } catch (err) {
      setError(err.message);
      setFieldError(err.fieldErrors?.emails?.[0] || '');
    } finally {
      setSaving(false);
    }
  };

  const test = async () => {
    setTesting(true); setTestResult(null);
    try {
      const r = await sendTestEmail();
      setTestResult({ ok: true, text: `Test email sent to ${r.sentTo.join(', ')}. Check the inbox (and the Spam folder).` });
      toast('Test email sent', 'It should arrive within a minute.');
    } catch (err) {
      setTestResult({ ok: false, text: err.message });
    } finally {
      setTesting(false);
    }
  };

  const unsaved = info && emails.trim() !== (info.emails || '').trim();

  return (
    <>
      <div className="adm-page-head">
        <div>
          <span className="eyebrow">Settings</span>
          <h1>Notifications</h1>
          <p className="adm-head-text">Get an email as soon as someone sends the contact form or the consultation request. Replying to that email answers the visitor directly.</p>
        </div>
      </div>

      {error && <div className="adm-alert" role="alert">{error}</div>}
      {!info && !error && <div className="adm-loading">Loading…</div>}

      {info && (
        <div className="adm-editor">
          <div className={'adm-card adm-mail-status ' + (info.configured ? 'ok' : 'warn')}>
            <span className="adm-mail-dot" aria-hidden="true" />
            <div>
              <strong>{info.configured ? 'Email sending is set up' : 'Email sending is not set up yet'}</strong>
              <span>
                {info.configured
                  ? <>Emails are sent from <b>{info.sender}</b> through Brevo.</>
                  : 'The server needs BREVO_API_KEY and MAIL_FROM_EMAIL in its settings (see the README). Enquiries are still saved here in the dashboard.'}
              </span>
            </div>
          </div>

          <form onSubmit={save} className="adm-card adm-group">
            <div className="adm-group-fields" style={{ gridTemplateColumns: '1fr' }}>
              <div className="adm-field">
                <label htmlFor="notify-emails">Send new enquiries to <small>(one address, or several separated by commas, up to 5)</small></label>
                <input
                  id="notify-emails"
                  type="text"
                  value={emails}
                  onChange={(e) => { setEmails(e.target.value); setTestResult(null); }}
                  placeholder={info.usingFallback && info.recipients.length ? info.recipients.join(', ') : 'name@yourcompany.com'}
                  autoComplete="off"
                  maxLength={300}
                />
                <small className="adm-hint">
                  {info.usingFallback
                    ? (info.recipients.length ? 'Empty: the address from the server settings is used (shown in grey).' : 'No receiving address is set yet.')
                    : 'Saved. Leave it empty and save to go back to the address in the server settings.'}
                </small>
                {fieldError && <span className="adm-err">{fieldError}</span>}
              </div>
            </div>
            <div className="adm-mail-actions">
              <button type="submit" className="btn btn-gold" disabled={saving || !unsaved}>{saving ? 'Saving…' : 'Save address'}</button>
              <button
                type="button"
                className="adm-btn-sm"
                onClick={test}
                disabled={testing || unsaved || !info.configured || !info.recipients.length}
                title={unsaved ? 'Save the address first' : ''}
              >
                {testing ? 'Sending…' : 'Send test email'}
              </button>
            </div>
            {testResult && <div className={'adm-mail-result ' + (testResult.ok ? 'ok' : 'bad')} role="status">{testResult.text}</div>}
          </form>
        </div>
      )}
    </>
  );
}
