import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

// The loading screen shown when the visitor moves to another page (the first load uses the one in index.html).
// Styles: ".preloader" in client/index.html.
export default function RouteLoader() {
  const { pathname } = useLocation();
  const first = useRef(true);
  const [phase, setPhase] = useState('off'); // off -> show -> done (fading out)

  useEffect(() => {
    if (first.current) { first.current = false; return undefined; }
    setPhase('show');
    const fade = setTimeout(() => setPhase('done'), 650);
    const end = setTimeout(() => setPhase('off'), 1050);
    return () => { clearTimeout(fade); clearTimeout(end); };
  }, [pathname]);

  if (phase === 'off') return null;
  return (
    <div className={'preloader route' + (phase === 'done' ? ' done' : '')} role="status" aria-label="Loading">
      <img src="/assets/logo-preload.png" alt="" width="92" height="73" />
      <div className="pre-track"><div className="pre-bar" /></div>
    </div>
  );
}
