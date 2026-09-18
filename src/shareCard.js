import { COLOR_RGB } from './data.js';

/* Cartão de compartilhamento 4:5 (story) desenhado em canvas.
   Sem nota dada, sai só poster + título — nada de estrelas vazias. */

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function drawStar(ctx, cx, cy, r, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  for (let i = 0; i < 10; i++) {
    const ang = (Math.PI / 5) * i - Math.PI / 2;
    const rad = i % 2 === 0 ? r : r * 0.42;
    const x = cx + rad * Math.cos(ang);
    const y = cy + rad * Math.sin(ang);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fill();
}

function drawStarRow(ctx, cx, y, value, color, label) {
  ctx.textAlign = 'center';
  ctx.fillStyle = '#8B8E96';
  ctx.font = '600 24px "JetBrains Mono", monospace';
  ctx.fillText(label, cx, y);

  const size = 42;
  const gap = 10;
  const n = 5;
  let sx = cx - (n * size + (n - 1) * gap) / 2 + size / 2;

  for (let i = 0; i < n; i++) {
    const frac = Math.max(0, Math.min(1, value - i));
    drawStar(ctx, sx, y + 52, size / 2, '#2A2E37');
    if (frac > 0) {
      ctx.save();
      ctx.beginPath();
      ctx.rect(sx - size / 2, y + 52 - size / 2, size * frac, size);
      ctx.clip();
      drawStar(ctx, sx, y + 52, size / 2, color);
      ctx.restore();
    }
    sx += size + gap;
  }
}

function wrapCenteredText(ctx, text, cx, y, maxWidth, lineHeight) {
  const words = text.split(' ');
  const lines = [];
  let line = '';
  words.forEach((w) => {
    const test = line + w + ' ';
    if (ctx.measureText(test).width > maxWidth && line !== '') {
      lines.push(line.trim());
      line = w + ' ';
    } else {
      line = test;
    }
  });
  lines.push(line.trim());

  const startY = y - ((lines.length - 1) * lineHeight) / 2;
  lines.forEach((l, i) => ctx.fillText(l, cx, startY + i * lineHeight));
  return lines.length;
}

export function buildShareCanvas(film, state) {
  const accent = COLOR_RGB[film.color] || COLOR_RGB.blue;
  const w = 1080;
  const h = 1350;

  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');

  const bg = ctx.createLinearGradient(0, 0, 0, h);
  bg.addColorStop(0, '#0D0F13');
  bg.addColorStop(1, '#08090B');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  const glow = ctx.createRadialGradient(w * 0.28, h * 0.06, 40, w * 0.28, h * 0.06, 680);
  glow.addColorStop(0, accent + '30');
  glow.addColorStop(1, 'transparent');
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, w, h);

  // poster estilizado (placeholder tipográfico — vira imagem real quando houver TMDB)
  const pw = 560;
  const ph = 820;
  const px = (w - pw) / 2;
  const py = 110;
  const pg = ctx.createLinearGradient(px, py, px + pw, py + ph);
  pg.addColorStop(0, accent + '26');
  pg.addColorStop(1, '#1C1F26');
  ctx.fillStyle = pg;
  roundRect(ctx, px, py, pw, ph, 22);
  ctx.fill();
  ctx.strokeStyle = accent + '55';
  ctx.lineWidth = 3;
  roundRect(ctx, px, py, pw, ph, 22);
  ctx.stroke();

  ctx.fillStyle = accent;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = '260px Anton, sans-serif';
  ctx.fillText(film.title.charAt(0), px + pw / 2, py + ph / 2 - 30);

  ctx.textAlign = 'left';
  ctx.textBaseline = 'alphabetic';
  ctx.fillStyle = 'rgba(242,240,235,0.85)';
  ctx.font = '500 30px "JetBrains Mono", monospace';
  ctx.fillText(String(film.year), px + 28, py + ph - 34);

  let y = py + ph + 95;
  ctx.textAlign = 'center';
  ctx.fillStyle = accent;
  ctx.font = '64px Anton, sans-serif';
  const lineCount = wrapCenteredText(ctx, film.title.toUpperCase(), w / 2, y, w - 160, 72);
  y += (lineCount - 1) * 36 + 60;

  ctx.font = '500 28px "Space Grotesk", sans-serif';
  ctx.fillStyle = '#8B8E96';
  ctx.fillText('Dir. ' + film.director, w / 2, y);
  y += 70;

  if (state.filmRating > 0) {
    drawStarRow(ctx, w / 2, y, state.filmRating, COLOR_RGB.blue, 'FILM RATING');
    y += 120;
  }
  if (state.soundtrackRating > 0) {
    drawStarRow(ctx, w / 2, y, state.soundtrackRating, COLOR_RGB.magenta, 'SOUNDTRACK RATING');
    y += 120;
  }

  ctx.font = '34px Anton, sans-serif';
  ctx.fillStyle = COLOR_RGB.blue;
  ctx.fillText('TUDUM', w / 2 - 40, h - 56);
  ctx.fillStyle = COLOR_RGB.magenta;
  ctx.fillText('TSS', w / 2 + 72, h - 56);

  return canvas;
}

/* As fontes precisam estar carregadas antes do canvas medir/desenhar texto. */
export function loadShareFonts() {
  return Promise.all([
    document.fonts.load('260px Anton'),
    document.fonts.load('64px Anton'),
    document.fonts.load('500 28px "Space Grotesk"'),
    document.fonts.load('600 24px "JetBrains Mono"'),
  ]).catch(() => {});
}
