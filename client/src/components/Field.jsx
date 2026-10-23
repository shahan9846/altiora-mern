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
const PHONE_RE = /^\+?[\d\s().-]{7,20}$/;

// Longest text each field accepts (the server enforces the same limits).
export const MAX_LENGTH = { name: 120, company: 160, email: 200, phone: 40, service: 160, subject: 200, message: 3000 };

// Is this one field acceptable? Required fields must be filled; email and phone must also look right.
export function isFieldValid(name, value, required) {
  const v = (value || '').trim();
  if (!v) return !required.includes(name);
  if (v.length > (MAX_LENGTH[name] || 3000)) return false;
  if (name === 'email') return EMAIL_RE.test(v);
  if (name === 'phone') return PHONE_RE.test(v) && v.replace(/\D/g, '').length >= 7;
  return true;
}

// Returns { field: true } for each field that is not acceptable.
export function validateRequired(values, required) {
  const errors = {};
  Object.keys(values).forEach((name) => {
    if (!isFieldValid(name, values[name], required)) errors[name] = true;
  });
  return errors;
}
