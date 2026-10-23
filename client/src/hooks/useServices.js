import { useEffect, useState } from 'react';
import { getServices } from '../api/client';

// Loads the services from the API. The last result is kept in memory so pages that
// show services appear instantly when you move between them, and it is refreshed
// from the server every time a page that uses it opens.
let cached = null;

export default function useServices() {
  const [services, setServices] = useState(cached);

  useEffect(() => {
    let alive = true;
    getServices()
      .then((data) => { cached = data; if (alive) setServices(data); })
      .catch(() => { if (alive) setServices((s) => s || []); });
    return () => { alive = false; };
  }, []);

  return services; // null while loading
}
