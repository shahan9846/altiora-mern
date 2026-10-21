// Label + control + error message, styled by the existing .field CSS.
export default function Field({ id, label, error, errorText, full, children }) {
  return (
    <div className={'field' + (full ? ' full' : '') + (error ? ' error' : '')}>
      <label htmlFor={id}>{label}</label>
      {children}
      <span className="err-msg">{errorText}</span>
    </div>
  );
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Returns { field: true } for each required field that is empty (or a bad email).
export function validateRequired(values, required) {
  const errors = {};
  required.forEach((name) => {
    const v = (values[name] || '').trim();
    let ok = v.length > 0;
    if (name === 'email' && ok) ok = EMAIL_RE.test(v);
    if (!ok) errors[name] = true;
  });
  return errors;
}
