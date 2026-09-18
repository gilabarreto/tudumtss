import { useCallback, useState } from 'react';

const KEY = 'tudumtss:interactions';
const DEFAULT_STATE = { filmRating: 0, soundtrackRating: 0, watched: false, liked: false, watchlist: false };

function load() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || {};
  } catch {
    return {};
  }
}

/* Notas e watched/liked/watchlist do usuário, por filme, no localStorage.
   ponytail: sem backend — quando houver auth, esta função vira uma chamada de API. */
export function useInteractions(filmId) {
  const [all, setAll] = useState(load);

  const update = useCallback(
    (patch) => {
      setAll((prev) => {
        const next = { ...prev, [filmId]: { ...DEFAULT_STATE, ...prev[filmId], ...patch } };
        localStorage.setItem(KEY, JSON.stringify(next));
        return next;
      });
    },
    [filmId]
  );

  return [all[filmId] || DEFAULT_STATE, update];
}
