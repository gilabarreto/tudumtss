import { useHash } from './useHash.js';
import Header from './components/Header.jsx';
import Home from './pages/Home.jsx';
import FilmPage from './pages/FilmPage.jsx';
import EntityPage from './pages/EntityPage.jsx';

function parseHash(hash) {
  const [type, id] = hash.split('/');
  return { type: type || '', id };
}

export default function App() {
  const { type, id } = parseHash(useHash());

  return (
    <>
      <Header />
      {type === '' && <Home />}
      {type === 'film' && <FilmPage id={id} />}
      {(type === 'song' || type === 'artist' || type === 'genre') && <EntityPage type={type} id={id} />}
    </>
  );
}
