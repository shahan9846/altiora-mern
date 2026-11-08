// The red message under a form field. `errors` is what the server sent back, e.g. { title: ['Required'] }.
//   <FieldError errors={fieldErrors} name="title" />   shows nothing when that field has no problem.
export default function FieldError({ errors, name }) {
  return errors[name] ? <span className="adm-err">{errors[name][0]}</span> : null;
}
