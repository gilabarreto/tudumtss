import {
  SONGS, ARTISTS, GENRES, GENRE_COLOR, fmt,
  songFilmAppearances, artistSongs, artistFilms, genreFilms, genreSongs,
} from '../data.js';
import { navigate } from '../useHash.js';

function NotFound() {
  return (
    <main>
      <div className="empty">
        <div className="display">404</div>
        <p>Not in the catalog yet.</p>
      </div>
    </main>
  );
}

function FilmGrid({ films }) {
  if (!films.length) return null;
  return (
    <div className="related-films">
      {films.map((f) => (
        <div className="related-card" key={f.id} onClick={() => navigate('film', f.id)}>
          <div className="rc-title">{f.title}</div>
          <div className="rc-meta mono">{f.year}</div>
        </div>
      ))}
    </div>
  );
}

function SongRow({ song }) {
  const artist = ARTISTS[song.artistId];
  return (
    <div className="track-row" onClick={() => navigate('song', song.id)}>
      <div className="track-index mono">♪</div>
      <div className="track-titling">
        <div className="track-title">{song.title}</div>
        <div className="track-artist">{artist?.name}</div>
      </div>
      <div className="track-genre">
        {song.genres.map((g) => (
          <span key={g} className={`chip c-${GENRE_COLOR[g]}`}>{GENRES[g]?.name}</span>
        ))}
      </div>
    </div>
  );
}

function SongPage({ id }) {
  const song = SONGS[id];
  if (!song) return <NotFound />;
  const artist = ARTISTS[song.artistId];
  const appearances = songFilmAppearances(id);

  return (
    <main>
      <section className="entity-hero">
        <div className="entity-kicker song mono">Song</div>
        <h1 className="entity-title display">{song.title}</h1>
        <p className="entity-desc">
          by{' '}
          <span
            onClick={() => navigate('artist', artist.id)}
            style={{ cursor: 'pointer', color: 'var(--cyan)' }}
          >
            {artist.name}
          </span>
        </p>
        <div className="genre-row" style={{ marginTop: 14 }}>
          {song.genres.map((g) => (
            <span key={g} className={`chip c-${GENRE_COLOR[g]}`} onClick={() => navigate('genre', g)}>
              {GENRES[g]?.name}
            </span>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <div className="section-title"><b>Appears in</b></div>
        </div>
        <div className="track-list">
          {appearances.map((a) => (
            <div className="track-row" key={a.film.id} onClick={() => navigate('film', a.film.id)}>
              <div className="track-index mono">{a.film.year}</div>
              <div className="track-titling">
                <div className="track-title">{a.film.title}</div>
                <div className="track-scene">{a.scene}</div>
              </div>
              <div className="track-time mono">{fmt(a.minute)}</div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

function ArtistPage({ id }) {
  const artist = ARTISTS[id];
  if (!artist) return <NotFound />;
  const songs = artistSongs(id);
  const films = artistFilms(id);

  return (
    <main>
      <section className="entity-hero">
        <div className="entity-kicker mono">{artist.kind}</div>
        <h1 className="entity-title display">{artist.name}</h1>
        <p className="entity-desc">{artist.bio}</p>
      </section>

      <section className="section">
        <div className="section-head">
          <div className="section-title"><b>Songs</b></div>
        </div>
        <div className="track-list">
          {songs.map((s) => <SongRow key={s.id} song={s} />)}
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <div className="section-title"><b>Films</b></div>
        </div>
        <FilmGrid films={films} />
      </section>
    </main>
  );
}

function GenrePage({ id }) {
  const genre = GENRES[id];
  if (!genre) return <NotFound />;
  const films = genreFilms(id);
  const songs = genreSongs(id);

  return (
    <main>
      <section className="entity-hero">
        <div className="entity-kicker genre mono">Genre</div>
        <h1 className="entity-title display">{genre.name}</h1>
        <p className="entity-desc">{genre.tagline}</p>
      </section>

      <section className="section">
        <div className="section-head">
          <div className="section-title"><b>Films</b></div>
        </div>
        <FilmGrid films={films} />
      </section>

      <section className="section">
        <div className="section-head">
          <div className="section-title"><b>Songs</b></div>
        </div>
        <div className="track-list">
          {songs.map((s) => <SongRow key={s.id} song={s} />)}
        </div>
      </section>
    </main>
  );
}

export default function EntityPage({ type, id }) {
  if (type === 'song') return <SongPage id={id} />;
  if (type === 'artist') return <ArtistPage id={id} />;
  return <GenrePage id={id} />;
}
