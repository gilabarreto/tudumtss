import { useEffect, useState } from 'react';

/* Router inteiro: a URL é a fonte da verdade, o hash é a rota.
   ponytail: react-router quando precisar de rotas aninhadas ou query params. */
export function useHash() {
  const [hash, setHash] = useState(() => window.location.hash.slice(1));

  useEffect(() => {
    const onChange = () => {
      setHash(window.location.hash.slice(1));
      window.scrollTo({ top: 0, behavior: 'instant' });
    };
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);

  return hash;
}

export const navigate = (type, id) => {
  window.location.hash = `${type}/${id}`;
};
