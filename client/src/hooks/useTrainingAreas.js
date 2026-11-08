import { useEffect, useState } from 'react';
import { getCategories, getPrograms } from '../api/client';

// "Customized Corporate Training" is a training area in the dashboard, but the Training page shows it
// as its own block further down, so it is left out of the list of areas.
const CUSTOM_AREA = 'customized corporate training';

// Loads the training areas (categories) and programs for the Training page.
//   state:      'loading' | 'ready' | 'error'
//   areas:      the training areas, in display order
//   programs:   every program (each has .category with the area it belongs to)
// Both are managed in the dashboard (Training -> Categories / Training Programs).
export default function useTrainingAreas() {
  const [state, setState] = useState('loading');
  const [areas, setAreas] = useState([]);
  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    Promise.all([getPrograms(), getCategories()])
      .then(([allPrograms, allCategories]) => {
        setPrograms(allPrograms);
        setAreas(allCategories.filter((a) => a.name.trim().toLowerCase() !== CUSTOM_AREA));
        setState('ready');
      })
      .catch(() => setState('error'));
  }, []);

  return { state, areas, programs };
}
