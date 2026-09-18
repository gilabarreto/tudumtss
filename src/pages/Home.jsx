import { FILMS, GENRES, GENRE_COLOR } from '../data.js';
import { navigate } from '../useHash.js';

export default function Home() {
  const films = Object.values(FILMS);
  const genres = Object.values(GENRES);

  return (
    <main>
      <section className="entity-hero">
        <div className="entity-kicker mono">Tudumtss</div>
        <h1 className="entity-title display">Where film and music cross paths.</h1>
        <p className="entity-desc">
          Search a song to find the films it plays in, or a film to discover its soundtrack.
        </p>
      </section>

      <section className="section">
        <div className="section-head">
          <div className="section-title"><b>Genres</b></div>
        </div>
        <div className="genre-row">
          {genres.map((g) => (
            <span
              key={g.id}
              className={`chip c-${GENRE_COLOR[g.id]}`}
              onClick={() => navigate('genre', g.id)}
            >
              {g.name}
            </span>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <div className="section-title"><b>Films</b></div>
        </div>
        <div className="related-films">
          {films.map((f) => (
            <div className="related-card" key={f.id} onClick={() => navigate('film', f.id)}>
              <div className="rc-title">{f.title}</div>
              <div className="rc-meta mono">{f.year}</div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
