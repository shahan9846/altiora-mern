// Shows a number that counts up from 0, e.g. "100%".
// Text that does not start with a number (like "Practical") is shown as written.
export default function StatValue({ text }) {
  const match = /^(\d+)(.*)$/.exec(text.trim()); // "100%" -> "100" and "%"
  if (!match) return text;

  const [, number, rest] = match;
  return <><span className="count-up" data-target={number}>0</span>{rest}</>;
}
