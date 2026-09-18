/* Ícones inline — mesmos paths do protótipo, agora como componentes. */

export const Star = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2.5l2.95 6.53 7.05.62-5.36 4.73 1.63 6.98L12 17.6l-6.27 3.76 1.63-6.98L2 9.65l7.05-.62L12 2.5z" />
  </svg>
);

const stroked = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

export const Eye = () => (
  <svg {...stroked}>
    <path d="M1.5 12S5.5 5 12 5s10.5 7 10.5 7-4 7-10.5 7S1.5 12 1.5 12z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export const Heart = () => (
  <svg {...stroked}>
    <path d="M20.8 4.9a5.4 5.4 0 00-7.6 0L12 6.1l-1.2-1.2a5.4 5.4 0 00-7.6 7.6L12 21l8.8-8.5a5.4 5.4 0 000-7.6z" />
  </svg>
);

export const Bookmark = () => (
  <svg {...stroked}>
    <path d="M17 21l-5-3.5L7 21V4.5A1.5 1.5 0 018.5 3h7A1.5 1.5 0 0117 4.5V21z" />
  </svg>
);

export const Play = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 5.14v13.72c0 .79.87 1.27 1.54.84l11-6.86a1 1 0 000-1.72l-11-6.86A1 1 0 008 5.14z" />
  </svg>
);

export const Share = () => (
  <svg {...stroked}>
    <circle cx="18" cy="5" r="2.6" />
    <circle cx="6" cy="12" r="2.6" />
    <circle cx="18" cy="19" r="2.6" />
    <path d="M8.4 10.6l7.2-4.2M8.4 13.4l7.2 4.2" />
  </svg>
);

export const SearchIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#8B8E96" strokeWidth="2">
    <circle cx="11" cy="11" r="7" />
    <path d="M21 21l-4.35-4.35" />
  </svg>
);
