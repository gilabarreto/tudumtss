import { useState } from 'react';
import { resolveQuery } from '../data.js';
import { navigate } from '../useHash.js';
import { SearchIcon } from '../icons.jsx';
import Nav from './Nav.jsx';

export default function Header() {
  const [q, setQ] = useState('');

  function onSubmit(e) {
    e.preventDefault();
    const hit = resolveQuery(q);
    if (hit) {
      navigate(hit.type, hit.id);
      setQ('');
    }
  }

  return (
    <header>
      <div className="header-inner">
        <Nav to="" className="logo">
          TUDUM<span>TSS</span>
        </Nav>
        <form className="search-wrap" onSubmit={onSubmit}>
          <SearchIcon />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search films, songs, artists, genres…"
          />
          <span className="search-hint">↵</span>
        </form>
        <div className="nav-types">
          <span>Film</span>
          <span>Song</span>
          <span>Artist</span>
          <span>Genre</span>
        </div>
      </div>
    </header>
  );
}
