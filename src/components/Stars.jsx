import { COLOR_RGB } from '../data.js';
import { Star } from '../icons.jsx';

/* Fileira de 5 estrelas com preenchimento fracionário.
   interactive → metades clicáveis (esquerda = .5, direita = inteiro). */
export default function Stars({ value, kind = 'film', interactive = false, onRate }) {
  const color = kind === 'soundtrack' ? COLOR_RGB.magenta : COLOR_RGB.blue;

  return (
    <span className="star-row" data-interactive={interactive ? 1 : 0}>
      {[1, 2, 3, 4, 5].map((i) => {
        const frac = Math.max(0, Math.min(1, value - (i - 1)));
        return (
          <span className="star-wrap" key={i}>
            <span className="star-back" style={{ color: 'var(--surface-3)' }}>
              <Star />
            </span>
            <span className="star-front" style={{ width: `${frac * 100}%`, color }}>
              <Star />
            </span>
            {interactive && (
              <>
                <button
                  className="star-hit left"
                  aria-label={`${i - 0.5} stars`}
                  onClick={() => onRate(i - 0.5)}
                />
                <button
                  className="star-hit right"
                  aria-label={`${i} stars`}
                  onClick={() => onRate(i)}
                />
              </>
            )}
          </span>
        );
      })}
    </span>
  );
}
