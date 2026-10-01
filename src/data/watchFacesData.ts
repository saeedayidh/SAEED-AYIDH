export type WatchFaceItem = { id: number; title: string; image: string };

// Original downloadable SVG faces. The official SBA logo is not recreated.
const backgrounds = ['#080808', '#111114', '#181818', '#0d0b0c', '#201012'];
const accents = ['#D51F2B', '#a81624', '#ed3040', '#b9222e', '#f05a62'];

function makeFace(n: number): string {
  const bg = backgrounds[(n - 1) % backgrounds.length];
  const accent = accents[Math.floor((n - 1) / 5) % accents.length];
  const fg = n % 4 === 0 ? '#d2d2d2' : '#f5f5f5';
  const mode = (n - 1) % 5;
  const ticks = Array.from({ length: 12 }, (_, i) =>
    `<rect x="197" y="27" width="6" height="${i % 3 === 0 ? 22 : 12}" rx="3" fill="${i % 3 === 0 ? accent : fg}" opacity="${i % 3 === 0 ? 1 : .6}" transform="rotate(${i * 30} 200 200)"/>`
  ).join('');
  const hour = (n * 37) % 360;
  const minute = (n * 71) % 360;
  const digital = `<text x="200" y="208" fill="${fg}" font-size="65" text-anchor="middle" font-family="Arial" font-weight="700">${String((n * 3) % 24).padStart(2, '0')}:${String((n * 7) % 60).padStart(2, '0')}</text><text x="200" y="250" fill="${accent}" font-size="17" text-anchor="middle" font-family="Arial">${String(n).padStart(2, '0')} / 50</text>`;
  const analog = `${mode === 3 ? '' : ticks}<circle cx="200" cy="200" r="${mode === 4 ? 139 : 125}" fill="none" stroke="${accent}" stroke-opacity=".45" stroke-width="${mode === 4 ? 3 : 1}"/><line x1="200" y1="200" x2="200" y2="112" stroke="${fg}" stroke-width="10" stroke-linecap="round" transform="rotate(${hour} 200 200)"/><line x1="200" y1="200" x2="200" y2="72" stroke="${accent}" stroke-width="6" stroke-linecap="round" transform="rotate(${minute} 200 200)"/><circle cx="200" cy="200" r="10" fill="${accent}"/><text x="200" y="286" fill="${fg}" opacity=".75" font-size="14" text-anchor="middle" font-family="Arial">${String(n).padStart(2, '0')}</text>`;
  const body = mode === 2 || (mode === 4 && n % 2 === 0) ? digital : analog;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 400 400"><defs><radialGradient id="g"><stop stop-color="${accent}" stop-opacity=".16"/><stop offset="1" stop-color="${bg}" stop-opacity="0"/></radialGradient></defs><rect width="400" height="400" rx="92" fill="${bg}"/><rect x="10" y="10" width="380" height="380" rx="84" fill="url(#g)" stroke="${fg}" stroke-opacity=".14" stroke-width="2"/>${body}</svg>`;
  return 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg);
}

export const watchFaces: WatchFaceItem[] = Array.from({ length: 50 }, (_, i) => {
  const id = i + 1;
  return { id, title: `واجهة ساعة ${id}`, image: makeFace(id) };
});
