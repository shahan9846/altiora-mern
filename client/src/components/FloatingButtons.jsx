import { useEffect, useState } from 'react';
import { useSite } from '../context/ContentContext';

// WhatsApp bubble + back-to-top button, fixed to the corner of every page.
export default function FloatingButtons() {
  const { whatsappUrl } = useSite();
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 500);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {whatsappUrl && <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" id="whatsapp-float" className="whatsapp-float" aria-label="Chat with Altiora on WhatsApp">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12c0 1.85.5 3.58 1.36 5.07L2 22l5.06-1.33A9.94 9.94 0 0 0 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18.2a8.2 8.2 0 0 1-4.19-1.14l-.3-.18-3.1.81.83-3.02-.2-.31A8.18 8.18 0 1 1 20.18 12 8.19 8.19 0 0 1 12 20.2zm4.53-6.13c-.25-.12-1.47-.72-1.7-.81-.23-.08-.4-.12-.56.12-.17.25-.65.81-.79.97-.15.17-.29.19-.54.06-.25-.12-1.04-.38-1.99-1.22-.73-.65-1.23-1.46-1.37-1.71-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.44.12-.15.16-.25.25-.42.08-.17.04-.31-.02-.44-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.87.85-.87 2.08s.89 2.42 1.02 2.59c.12.17 1.75 2.67 4.24 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.06-.1-.23-.16-.48-.28z" /></svg>
      </a>}
      <button
        type="button"
        id="back-to-top"
        aria-label="Back to top"
        className={'back-to-top' + (showTop ? ' show' : '')}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 19V5M5 12l7-7 7 7" /></svg>
      </button>
    </>
  );
}
