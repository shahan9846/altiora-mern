import { useEffect, useState } from 'react';
import { getCategories } from '../api/client';

// Loads the training categories (with program counts) once and shares them between components.
let cached = null;

export default function useCategories() {
  const [categories, setCategories] = useState(cached);

  useEffect(() => {
    let alive = true;
    getCategories()
      .then((data) => { cached = data; if (alive) setCategories(data); })
      .catch(() => { if (alive) setCategories((c) => c || []); });
    return () => { alive = false; };
  }, []);

  return categories; // null while loading
}
