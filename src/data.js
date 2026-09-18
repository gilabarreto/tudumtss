const FILMS = {
  drive: {
    id:'drive', title:'Drive', year:2011, runtime:100, director:'Nicolas Winding Refn',
    genres:['neo-noir','crime','synthwave'],
    synopsis:'A quiet Hollywood stunt driver moonlights as a getaway driver at night. When a job for his neighbor goes wrong, the neon-lit calm of his double life collapses into violence.',
    cast:[
      {name:'Ryan Gosling', role:'Driver'},
      {name:'Carey Mulligan', role:'Irene'},
      {name:'Albert Brooks', role:'Bernie Rose'},
      {name:'Oscar Isaac', role:'Standard'},
    ],
    songs:[
      {songId:'nightcall', minute:2, scene:'Opening title sequence — the Driver cruises LA at night.'},
      {songId:'a-real-hero', minute:31, scene:'Elevator scene — the calm before the violence.'},
      {songId:'under-your-spell', minute:57, scene:'Irene begins to see who the Driver really is.'},
      {songId:'oh-my-love', minute:94, scene:'Closing credits.'},
    ],
    color:'magenta',
    communityFilmRating:4.4, communitySoundtrackRating:4.8,
    providers:[{name:'Max', type:'stream'},{name:'Prime Video', type:'rent'},{name:'Apple TV', type:'rent'}],
    crew:[
      {role:'Director', name:'Nicolas Winding Refn'},
      {role:'Writer', name:'Hossein Amini'},
      {role:'Cinematography', name:'Newton Thomas Sigel'},
      {role:'Editor', name:'Mat Newman'},
      {role:'Composer', name:'Cliff Martinez'},
    ],
    details:{Studio:'FilmDistrict', Country:'USA', Language:'English', Released:'Sep 16, 2011'},
    community:{
      watchedCount:'182K', reviewCount:3400, listCount:890,
      recentWatchers:['A','M','J','P','T','R'],
      reviews:[
        {user:'nightcall_fan', rating:5, text:'The synths hit different every single time. This film taught me that silence is a soundtrack too.'},
        {user:'refnhead', rating:4.5, text:'Gosling barely speaks and somehow says everything. Cliff Martinez turned LA into a fever dream.'},
      ],
      lists:[
        {name:'Neon Noir Essentials', count:214},
        {name:'Best Needle Drops in Film', count:892},
        {name:'Sunday Night Rewatches', count:63},
      ],
    },
  },
  'baby-driver': {
    id:'baby-driver', title:'Baby Driver', year:2017, runtime:113, director:'Edgar Wright',
    genres:['crime','garage-rock'],
    synopsis:'A young getaway driver relies on the beat of his personal soundtrack to be the best in the game, until a doomed heist threatens his life, love, and freedom.',
    cast:[
      {name:'Ansel Elgort', role:'Baby'},
      {name:'Lily James', role:'Debora'},
      {name:'Jon Hamm', role:'Buddy'},
      {name:'Jamie Foxx', role:'Bats'},
    ],
    songs:[
      {songId:'bellbottoms', minute:1, scene:'Opening heist and car chase through Atlanta.'},
      {songId:'b-a-b-y', minute:22, scene:'Baby orders coffee — the diner meet-cute with Debora.'},
      {songId:'brighton-rock', minute:98, scene:'The final shootout in the parking garage.'},
    ],
    color:'cyan',
    communityFilmRating:4.0, communitySoundtrackRating:4.6,
    providers:[{name:'Netflix', type:'stream'},{name:'Apple TV', type:'rent'}],
    crew:[
      {role:'Director', name:'Edgar Wright'},
      {role:'Writer', name:'Edgar Wright'},
      {role:'Cinematography', name:'Bill Pope'},
      {role:'Editor', name:'Paul Machliss, Jonathan Amos'},
      {role:'Music Supervisor', name:'Kirsten "Kiwi" Lane'},
    ],
    details:{Studio:'TriStar Pictures', Country:'UK / USA', Language:'English', Released:'Jun 28, 2017'},
    community:{
      watchedCount:'156K', reviewCount:2100, listCount:610,
      recentWatchers:['B','D','K','S','C'],
      reviews:[
        {user:'getawaygroove', rating:4.5, text:'Every gunshot lands on the beat. I\u2019ve never seen editing this musical.'},
        {user:'atlantaheist', rating:4, text:'The soundtrack does half the storytelling here. Bellbottoms as an opener is untouchable.'},
      ],
      lists:[
        {name:'Soundtrack-Driven Cinema', count:301},
        {name:'Best Car Chases', count:540},
        {name:'Music Supervisor Masterclass', count:47},
      ],
    },
  }
};

const SONGS = {
  'nightcall': {id:'nightcall', title:'Nightcall', artistId:'kavinsky', genres:['synthwave']},
  'a-real-hero': {id:'a-real-hero', title:'A Real Hero', artistId:'college-electric-youth', genres:['synthwave']},
  'under-your-spell': {id:'under-your-spell', title:'Under Your Spell', artistId:'desire', genres:['synthwave']},
  'oh-my-love': {id:'oh-my-love', title:'Oh My Love', artistId:'riz-ortolani', genres:['soul']},
  'bellbottoms': {id:'bellbottoms', title:'Bellbottoms', artistId:'jsbx', genres:['garage-rock']},
  'b-a-b-y': {id:'b-a-b-y', title:'B-A-B-Y', artistId:'carla-thomas', genres:['soul']},
  'brighton-rock': {id:'brighton-rock', title:'Brighton Rock', artistId:'queen', genres:['classic-rock']},
};

const ARTISTS = {
  'kavinsky': {id:'kavinsky', name:'Kavinsky', kind:'Producer', bio:'French electronic producer whose slow-motion synths defined the sound of modern synthwave.'},
  'college-electric-youth': {id:'college-electric-youth', name:'College & Electric Youth', kind:'Duo', bio:'French producer College teamed with Canadian duo Electric Youth for one of synthwave\u2019s defining collaborations.'},
  'desire': {id:'desire', name:'Desire', kind:'Band', bio:'Synth-pop project led by Megan Louise, known for icy, romantic electronic soundscapes.'},
  'riz-ortolani': {id:'riz-ortolani', name:'Riz Ortolani', kind:'Composer', bio:'Italian film composer whose lush orchestral-soul work spans decades of European cinema.'},
  'jsbx': {id:'jsbx', name:'The Jon Spencer Blues Explosion', kind:'Band', bio:'New York noise-blues trio known for raw, distorted garage-rock energy.'},
  'carla-thomas': {id:'carla-thomas', name:'Carla Thomas', kind:'Singer', bio:'Memphis soul singer known as the "Queen of Memphis Soul," a Stax Records icon.'},
  'queen': {id:'queen', name:'Queen', kind:'Band', bio:'British rock band whose theatrical, genre-spanning catalog became a cornerstone of film soundtracks.'},
};

const GENRES = {
  'neo-noir': {id:'neo-noir', name:'Neo-Noir', tagline:'Modern crime cinema soaked in shadow, neon, and moral ambiguity.'},
  'crime': {id:'crime', name:'Crime', tagline:'Heists, getaways, and the price of the double life.'},
  'synthwave': {id:'synthwave', name:'Synthwave', tagline:'Retro-futurist synths, slow-motion basslines, midnight driving music.'},
  'garage-rock': {id:'garage-rock', name:'Garage Rock', tagline:'Raw, distorted, three-chord energy built for a getaway car.'},
  'soul': {id:'soul', name:'Soul', tagline:'Warm, human, unmistakably felt — the genre cinema returns to for its quiet moments.'},
  'classic-rock': {id:'classic-rock', name:'Classic Rock', tagline:'Big, theatrical, built for the moment everything goes loud.'},
};

const GENRE_COLOR = {
  'neo-noir':'magenta', 'synthwave':'cyan', 'crime':'blue',
  'garage-rock':'blue', 'soul':'magenta', 'classic-rock':'cyan'
};
const COLOR_HEX = { blue:'var(--blue)', cyan:'var(--cyan)', magenta:'var(--magenta)' };
const COLOR_RGB = { blue:'#3D6DFF', cyan:'#3FE0E5', magenta:'#F23F9E' };

export { FILMS, SONGS, ARTISTS, GENRES, GENRE_COLOR, COLOR_HEX, COLOR_RGB };

/* ---- derived helpers: relações primárias ficam nos dados, o resto se calcula ---- */
export const fmt = (min) => String(min).padStart(2, '0') + ':00';

export function songFilmAppearances(songId) {
  const out = [];
  Object.values(FILMS).forEach((f) => {
    f.songs.forEach((s) => {
      if (s.songId === songId) out.push({ film: f, minute: s.minute, scene: s.scene });
    });
  });
  return out;
}

export const artistSongs = (artistId) =>
  Object.values(SONGS).filter((s) => s.artistId === artistId);

export function artistFilms(artistId) {
  const filmMap = {};
  artistSongs(artistId).forEach((s) =>
    songFilmAppearances(s.id).forEach((a) => { filmMap[a.film.id] = a.film; })
  );
  return Object.values(filmMap);
}

export const genreFilms = (genreId) =>
  Object.values(FILMS).filter((f) => f.genres.includes(genreId));

export const genreSongs = (genreId) =>
  Object.values(SONGS).filter((s) => s.genres.includes(genreId));

/* ---- camada de descoberta: texto livre → entidade ---- */
export function resolveQuery(query) {
  const q = query.trim().toLowerCase();
  if (!q) return null;

  const pools = [
    ...Object.values(FILMS).map((x) => ({ type: 'film', id: x.id, name: x.title })),
    ...Object.values(SONGS).map((x) => ({ type: 'song', id: x.id, name: x.title })),
    ...Object.values(ARTISTS).map((x) => ({ type: 'artist', id: x.id, name: x.name })),
    ...Object.values(GENRES).map((x) => ({ type: 'genre', id: x.id, name: x.name })),
  ];

  return (
    pools.find((p) => p.name.toLowerCase() === q) ||
    pools.find((p) => p.name.toLowerCase().startsWith(q)) ||
    pools.find((p) => p.name.toLowerCase().includes(q)) ||
    null
  );
}
