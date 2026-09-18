# TUDUMTSS — arquivo da v1 (descartada em 2026-09-16)

Registro do que existia antes de recomeçar. Backup completo dos arquivos:
`~/tudumtss-nextjs-legacy-2026-09-16.tar.gz`

## O produto (isso continua valendo)

Onde filme e música se cruzam. Busca uma música → descobre filmes onde ela aparece
(ou que tenham a mesma vibe). Busca um filme → descobre as músicas da trilha.

## A descoberta que justifica o projeto

Não existe API aberta para "música que toca em filme". TMDB/OMDb cobrem filme,
Spotify/Discogs/MusicBrainz cobrem música — mas a **ligação** entre os dois só
existe em produtos comerciais fechados (Tunefind, WhatSong). Ou seja: o dado
é o produto, não o código.

Estratégia definida na v1:
1. Catálogo curado próprio (a tabela de ligação filme↔música)
2. Povoar aos poucos: manual no começo, Wikipédia/pesquisa depois
3. APIs externas só para metadados "bonitos" (poster, sinopse, gênero, diretor)
4. Contribuição da comunidade no futuro (modelo Letterboxd/RateYourMusic)

## Modelo de dados (Prisma/Postgres)

Movie, Artist, Album, Song, Genre + **MovieSong** (a tabela central).

O que importava no MovieSong e vale preservar em qualquer modelagem futura —
a ligação tem **contexto**, não é um simples N:N:

```
MovieSong {
  movieId, songId
  context   // "cena de abertura", "créditos finais", "trilha original", "referência/citação"
  note      // curadoria livre: "toca no rádio do carro na cena de fuga"
  @@unique([movieId, songId])
}
```

Detalhes: IDs externos opcionais em toda entidade (`tmdbId`, `spotifyId`,
`discogsId`) para enrichment; `slug` único em tudo para URLs.

## Catálogo curado (seed) — os únicos dados reais que existiam

| Filme | Música | Artista | Contexto |
|---|---|---|---|
| Easy Rider (1969) | Born to Be Wild | Steppenwolf | cena de abertura — "toca enquanto os motociclistas partem pela estrada, virou sinônimo da vibe road movie" |
| The Graduate (1967) | The Sound of Silence | Simon & Garfunkel | trilha original / tema recorrente — "usada em vários momentos-chave, quase como um segundo narrador" |
| — | Radar Love | Golden Earring | (cadastrada, sem ligação) |

Gêneros semeados: Rock, Rock Clássico, Surf Rock, Synth-Pop, Soul, Funk.

## Integrações (o que já foi resolvido tecnicamente)

**TMDB** — autentica com "API Read Access Token" (v4) como Bearer, não com a
API key v3. Endpoints usados: `/search/movie` e `/movie/{id}?append_to_response=credits`
(o diretor sai de `credits.crew` onde `job === "Director"`). Imagens:
`https://image.tmdb.org/t/p/{w342|w500|original}{path}`. Token gerado em
themoviedb.org/settings/api. Cache de 24h nas chamadas.

**MusicBrainz** — foi usado como fonte de música/artista na busca externa
(sem chave, mas exige User-Agent identificável e respeita rate limit de 1 req/s).

**Não chegaram a ser usados**: Spotify, Discogs, Trakt (chaves ficaram vazias no .env).

## Credenciais

`.env` foi mantido na pasta. Preenchidas: `DATABASE_URL`, `TMDB_READ_TOKEN`.
Vazias: `SPOTIFY_CLIENT_ID/SECRET`, `DISCOGS_TOKEN`, `TRAKT_CLIENT_ID`.

## Por que foi descartada

Stack: Next.js 14 App Router + Prisma + Postgres + Tailwind + TypeScript (~1800 linhas).
O motor de busca (`src/lib/search.ts`) sozinho tinha 840 linhas tentando fazer busca
local + fallback externo + criação automática de registros ao mesmo tempo. Infra de
produção antes de existir produto: banco, migrations e SSR para um catálogo de 2 filmes.

Rotas que existiam, caso sirvam de referência de IA (information architecture):
`/`, `/filme/[slug]`, `/musica/[slug]`, `/artista/[slug]`, `/genero/[slug]`,
`+ /api/search`, `/api/discover`, `/api/movies/[slug]`, `/api/songs/[slug]`.

## Estado do GitHub

`gilabarreto/tudumtss` (público, commit único de 2025-07-31) é só o scaffold do
Vite + React — uma Home com um `<h1>` e páginas vazias. Dependências instaladas
mas não usadas: react-router-dom, @tanstack/react-query, axios, framer-motion,
tailwind v4. Nada a preservar. O código Next.js nunca foi commitado.
