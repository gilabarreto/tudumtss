import { useState } from 'react';
import { FILMS, SONGS, ARTISTS, GENRES, GENRE_COLOR, fmt, genreFilms } from '../data.js';
import { navigate } from '../useHash.js';
import Stars from '../components/Stars.jsx';
import Modal from '../components/Modal.jsx';
import { Eye, Heart, Bookmark, Share } from '../icons.jsx';
import { useInteractions } from '../useInteractions.js';
import { buildShareCanvas, loadShareFonts } from '../shareCard.js';

function relatedFilms(film) {
  const map = {};
  film.genres.forEach((g) => genreFilms(g).forEach((f) => { if (f.id !== film.id) map[f.id] = f; }));
  return Object.values(map).slice(0, 4);
}

export default function FilmPage({ id }) {
  const film = FILMS[id];
  const [interactions, update] = useInteractions(id);
  const [shareImg, setShareImg] = useState(null);
  const [shareOpen, setShareOpen] = useState(false);
  const [infoModal, setInfoModal] = useState(null);

  if (!film) {
    return (
      <main>
        <div className="empty">
          <div className="display">404</div>
          <p>That film isn't in the catalog yet.</p>
        </div>
      </main>
    );
  }

  async function openShare() {
    setShareOpen(true);
    setShareImg(null);
    await loadShareFonts();
    const canvas = buildShareCanvas(film, {
      filmRating: interactions.filmRating,
      soundtrackRating: interactions.soundtrackRating,
    });
    setShareImg(canvas.toDataURL('image/png'));
  }

  function download() {
    const a = document.createElement('a');
    a.href = shareImg;
    a.download = `${film.id}-tudumtss.png`;
    a.click();
  }

  const related = relatedFilms(film);

  return (
    <>
      <main>
        <section className="hero">
          <div className="marquee-row">
            {Array.from({ length: 40 }).map((_, i) => <i key={i} />)}
          </div>
          <div className="film-head">
            <div
              className="poster"
              style={{ background: `linear-gradient(160deg, var(--${film.color}), var(--surface-2))` }}
            >
              <span className="glyph">{film.title.charAt(0)}</span>
              <span className="film-year-tag">{film.year}</span>
            </div>
            <div className="film-meta">
              <div className="eyebrow mono">Film</div>
              <h1 className="film-title display">{film.title}</h1>
              <div className="film-sub">
                <span>{film.year}</span>
                <span>·</span>
                <span>{film.runtime} min</span>
                <span>·</span>
                <span className="dir">Dir. {film.director}</span>
              </div>

              <div className="rating-badges">
                <div className="rating-badge">
                  <span className="rating-badge-label">Film</span>
                  <Stars value={film.communityFilmRating} />
                  <span className="rating-badge-val">{film.communityFilmRating}</span>
                </div>
                <div className="rating-badge">
                  <span className="rating-badge-label">Soundtrack</span>
                  <Stars value={film.communitySoundtrackRating} kind="soundtrack" />
                  <span className="rating-badge-val">{film.communitySoundtrackRating}</span>
                </div>
                <div className="rating-badge you">
                  <span className="rating-badge-label">You · Film</span>
                  <Stars value={interactions.filmRating} interactive onRate={(v) => update({ filmRating: v })} />
                  <span className="rating-badge-val">{interactions.filmRating || '—'}</span>
                </div>
                <div className="rating-badge you">
                  <span className="rating-badge-label">You · Soundtrack</span>
                  <Stars
                    value={interactions.soundtrackRating}
                    kind="soundtrack"
                    interactive
                    onRate={(v) => update({ soundtrackRating: v })}
                  />
                  <span className="rating-badge-val">{interactions.soundtrackRating || '—'}</span>
                </div>
              </div>

              <div className="genre-row">
                {film.genres.map((g) => (
                  <span
                    key={g}
                    className={`chip c-${GENRE_COLOR[g]}`}
                    onClick={() => navigate('genre', g)}
                  >
                    {GENRES[g]?.name || g}
                  </span>
                ))}
              </div>
              <p className="synopsis">{film.synopsis}</p>

              <div className="action-row">
                <button
                  className={`action-btn${interactions.watched ? ' active' : ''}`}
                  data-toggle="watched"
                  onClick={() => update({ watched: !interactions.watched })}
                >
                  <Eye /> {interactions.watched ? 'Watched' : 'Mark watched'}
                </button>
                <button
                  className={`action-btn${interactions.liked ? ' active' : ''}`}
                  data-toggle="liked"
                  onClick={() => update({ liked: !interactions.liked })}
                >
                  <Heart /> Like
                </button>
                <button
                  className={`action-btn${interactions.watchlist ? ' active' : ''}`}
                  data-toggle="watchlist"
                  onClick={() => update({ watchlist: !interactions.watchlist })}
                >
                  <Bookmark /> Watchlist
                </button>
                <button className="action-btn share" onClick={openShare}>
                  <Share /> Share
                </button>
              </div>
            </div>
          </div>
        </section>

        <div className="film-layout">
          <div className="film-main">
            <section className="section">
              <div className="section-head">
                <div className="section-title"><b>Cast</b></div>
              </div>
              <div className="cast-strip">
                {film.cast.map((c) => (
                  <div className="cast-card" key={c.name}>
                    <div className="cast-avatar">{c.name.charAt(0)}</div>
                    <div className="cast-name">{c.name}</div>
                    <div className="cast-role">{c.role}</div>
                  </div>
                ))}
              </div>
            </section>

            <section className="section">
              <div className="section-head">
                <div className="section-title"><b>Soundtrack</b></div>
              </div>
              <div className="cue-timeline">
                <div className="sprockets">
                  {Array.from({ length: 24 }).map((_, i) => <i key={i} />)}
                </div>
                <div className="track-line">
                  {film.songs.map((s) => (
                    <span
                      key={s.songId}
                      className="cue-marker"
                      style={{ left: `${(s.minute / film.runtime) * 100}%`, background: `var(--${film.color})` }}
                      title={SONGS[s.songId]?.title}
                    />
                  ))}
                </div>
                <div className="sprockets bottom">
                  {Array.from({ length: 24 }).map((_, i) => <i key={i} />)}
                </div>
                <div className="cue-labels">
                  <span>{fmt(0)}</span>
                  <span>{fmt(film.runtime)}</span>
                </div>
              </div>
              <div className="track-list" style={{ marginTop: 16 }}>
                {film.songs.map((s, i) => {
                  const song = SONGS[s.songId];
                  const artist = ARTISTS[song.artistId];
                  return (
                    <div className="track-row" key={s.songId} onClick={() => navigate('song', s.songId)}>
                      <div className="track-index mono">{i + 1}</div>
                      <div className="track-titling">
                        <div className="track-title">{song.title}</div>
                        <div
                          className="track-artist"
                          onClick={(e) => { e.stopPropagation(); navigate('artist', artist.id); }}
                        >
                          {artist.name}
                        </div>
                        <div className="track-scene">{s.scene}</div>
                      </div>
                      <div className="track-time mono">{fmt(s.minute)}</div>
                      <div className="track-genre">
                        {song.genres.map((g) => (
                          <span key={g} className={`chip c-${GENRE_COLOR[g]}`}>{GENRES[g]?.name}</span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            <section className="section">
              <div className="section-head">
                <div className="section-title"><b>Crew</b></div>
              </div>
              <div className="col-list">
                {film.crew.map((c) => (
                  <div className="col-item" key={c.role}>
                    <div className="ci-name">{c.name}</div>
                    <div className="ci-role">{c.role}</div>
                  </div>
                ))}
              </div>
            </section>

            {related.length > 0 && (
              <section className="section">
                <div className="section-head">
                  <div className="section-title"><b>Related films</b></div>
                </div>
                <div className="related-films">
                  {related.map((f) => (
                    <div className="related-card" key={f.id} onClick={() => navigate('film', f.id)}>
                      <div className="rc-title">{f.title}</div>
                      <div className="rc-meta mono">{f.year}</div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          <aside className="film-side">
            <div className="side-block">
              <h4>Where to watch</h4>
              <div className="side-providers">
                {film.providers.map((p) => (
                  <span key={p.name} className={`provider-chip${p.type === 'rent' ? ' rent' : ''}`}>
                    {p.name}
                    <span className="ptype">{p.type}</span>
                  </span>
                ))}
              </div>
            </div>

            <div className="side-block">
              <h4>Community</h4>
              <div className="col-list">
                <div className="detail-row clickable" onClick={() => setInfoModal('watched')}>
                  <span className="dk">Watched</span>
                  <span className="dv">{film.community.watchedCount}</span>
                </div>
                <div className="detail-row clickable" onClick={() => setInfoModal('reviews')}>
                  <span className="dk">Reviews</span>
                  <span className="dv">{film.community.reviewCount}</span>
                </div>
                <div className="detail-row clickable" onClick={() => setInfoModal('lists')}>
                  <span className="dk">Lists</span>
                  <span className="dv">{film.community.listCount}</span>
                </div>
              </div>
            </div>

            <div className="side-block">
              <h4>Details</h4>
              <div className="col-list">
                {Object.entries(film.details).map(([k, v]) => (
                  <div className="detail-row" key={k}>
                    <span className="dk">{k}</span>
                    <span className="dv">{v}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="side-block">
              <h4>Lists featuring this</h4>
              <div className="col-list">
                {film.community.lists.map((l) => (
                  <div className="list-card" key={l.name}>
                    <span className="list-name">{l.name}</span>
                    <span className="list-meta mono">{l.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>

        <div className="footer-note mono">TUDUMTSS — where film and music cross paths.</div>
      </main>

      {shareOpen && (
        <Modal onClose={() => setShareOpen(false)}>
          {shareImg ? (
            <>
              <img src={shareImg} alt="" />
              <div className="modal-actions">
                <button onClick={() => setShareOpen(false)}>Close</button>
                <button className="primary" onClick={download}>Download</button>
              </div>
            </>
          ) : (
            <div className="modal-generating">Generating card…</div>
          )}
        </Modal>
      )}

      {infoModal === 'watched' && (
        <Modal className="info-modal-card" onClose={() => setInfoModal(null)}>
          <button className="close-x" onClick={() => setInfoModal(null)}>×</button>
          <div className="info-modal-title">Watched by</div>
          <div className="avatar-cluster">
            {film.community.recentWatchers.map((initial, i) => (
              <span className="mini-avatar" key={i}>{initial}</span>
            ))}
          </div>
          <div className="modal-sub">{film.community.watchedCount} people watched this</div>
        </Modal>
      )}

      {infoModal === 'reviews' && (
        <Modal className="info-modal-card" onClose={() => setInfoModal(null)}>
          <button className="close-x" onClick={() => setInfoModal(null)}>×</button>
          <div className="info-modal-title">Reviews</div>
          {film.community.reviews.map((r) => (
            <div className="review-card" key={r.user}>
              <div className="review-head">
                <span className="mini-avatar">{r.user.charAt(0).toUpperCase()}</span>
                <span className="review-user">{r.user}</span>
                <Stars value={r.rating} />
              </div>
              <div className="review-text">{r.text}</div>
            </div>
          ))}
        </Modal>
      )}

      {infoModal === 'lists' && (
        <Modal className="info-modal-card" onClose={() => setInfoModal(null)}>
          <button className="close-x" onClick={() => setInfoModal(null)}>×</button>
          <div className="info-modal-title">Lists</div>
          {film.community.lists.map((l) => (
            <div className="list-card" key={l.name}>
              <span className="list-name">{l.name}</span>
              <span className="list-meta mono">{l.count} lists</span>
            </div>
          ))}
        </Modal>
      )}
    </>
  );
}
