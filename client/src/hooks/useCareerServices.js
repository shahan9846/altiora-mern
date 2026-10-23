import { useEffect, useState } from 'react';
import { getCareerServices } from '../api/client';

// Loads the Career Guidance cards from the API. The last result is kept in memory so the page
// appears instantly when you come back to it; it is refreshed from the server on every visit.
let cached = null;

export default function useCareerServices() {
  const [items, setItems] = useState(cached);

  useEffect(() => {
    let alive = true;
    getCareerServices()
      .then((data) => { cached = data; if (alive) setItems(data); })
      .catch(() => { if (alive) setItems((s) => s || []); });
    return () => { alive = false; };
  }, []);

  return items; // null while loading
}
