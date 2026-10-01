import { wallpapers } from './resourcesData';

export type FeaturedFilter = {
  id: string;
  title: string;
  titleEn: string;
  kind: 'photo' | 'video';
  preview: string;
  brightness: number;
  contrast: number;
  saturation: number;
  sepia: number;
  hue: number;
};

const photoLooks = [
  ['وهج الغروب', 'Sunset Glow', 1.08, 1.12, 1.23, .22, -12],
  ['سينما دافئة', 'Warm Cinema', .96, 1.19, .86, .27, -8],
  ['نسيم البحر', 'Sea Breeze', 1.08, 1.08, 1.22, .04, 16],
  ['أسود مخملي', 'Velvet Black', .87, 1.34, .69, .08, -5],
  ['صباح ناعم', 'Soft Morning', 1.17, .88, .92, .12, -6],
  ['طبيعة حية', 'Living Nature', 1.06, 1.13, 1.43, .02, 9],
  ['رمل ذهبي', 'Golden Sand', 1.07, 1.15, 1.13, .35, -11],
  ['ليل أزرق', 'Blue Night', .82, 1.27, 1.14, .03, 25],
  ['حكاية قديمة', 'Vintage Story', 1.02, 1.11, .63, .44, -9],
  ['صفاء أبيض', 'Clean Light', 1.16, 1.02, .78, 0, 2],
] as const;

const videoLooks = [
  ['إطار سينمائي', 'Cinematic Frame', .91, 1.24, .84, .17, -7],
  ['مدينة نيون', 'Neon City', .91, 1.36, 1.55, .02, 24],
  ['ساعة ذهبية', 'Golden Hour', 1.13, 1.10, 1.22, .31, -13],
  ['غروب وردي', 'Rose Sunset', 1.06, 1.16, 1.33, .08, -23],
  ['دراما داكنة', 'Dark Drama', .75, 1.46, .68, .12, 2],
  ['ألوان الشارع', 'Street Color', 1.02, 1.27, 1.46, 0, 12],
  ['شتاء بارد', 'Cold Winter', .99, 1.17, .79, .01, 31],
  ['أثر الفيلم', 'Film Memory', 1.04, .98, .71, .39, -15],
  ['وضوح نابض', 'Vivid Motion', 1.14, 1.30, 1.37, 0, -2],
  ['ضوء هادئ', 'Quiet Light', 1.12, .91, .90, .08, 8],
] as const;

const create = (looks: typeof photoLooks | typeof videoLooks, kind: 'photo' | 'video'): FeaturedFilter[] =>
  looks.map(([title, titleEn, brightness, contrast, saturation, sepia, hue], index) => ({
    id: `${kind}-${String(index + 1).padStart(2, '0')}`,
    title, titleEn, kind,
    preview: kind === 'photo' ? wallpapers[index % wallpapers.length].image : '/assets/filter-preview.mp4',
    brightness, contrast, saturation, sepia, hue,
  }));

export const featuredFilters = [...create(photoLooks, 'photo'), ...create(videoLooks, 'video')];
export const filterCss = (item: FeaturedFilter) =>
  `brightness(${item.brightness}) contrast(${item.contrast}) saturate(${item.saturation}) sepia(${item.sepia}) hue-rotate(${item.hue}deg)`;

// CSS Filter Effects color matrices, in the same order as the visible preview.
const clamp = (n: number) => Math.min(1, Math.max(0, n));
export function filterPixel(item: FeaturedFilter, red: number, green: number, blue: number) {
  let [r, g, b] = [red, green, blue].map(n => n * item.brightness);
  [r, g, b] = [r, g, b].map(n => (n - .5) * item.contrast + .5);
  const gray = .2126 * r + .7152 * g + .0722 * b;
  [r, g, b] = [r, g, b].map(n => gray + (n - gray) * item.saturation);
  const sr = .393 * r + .769 * g + .189 * b;
  const sg = .349 * r + .686 * g + .168 * b;
  const sb = .272 * r + .534 * g + .131 * b;
  [r, g, b] = [r * (1 - item.sepia) + sr * item.sepia, g * (1 - item.sepia) + sg * item.sepia, b * (1 - item.sepia) + sb * item.sepia];
  const cos = Math.cos(item.hue * Math.PI / 180), sin = Math.sin(item.hue * Math.PI / 180);
  return [
    (.213 + cos * .787 - sin * .213) * r + (.715 - cos * .715 - sin * .715) * g + (.072 - cos * .072 + sin * .928) * b,
    (.213 - cos * .213 + sin * .143) * r + (.715 + cos * .285 + sin * .140) * g + (.072 - cos * .072 - sin * .283) * b,
    (.213 - cos * .213 - sin * .787) * r + (.715 - cos * .715 + sin * .715) * g + (.072 + cos * .928 + sin * .072) * b,
  ].map(clamp);
}

export function downloadFilter(item: FeaturedFilter) {
  const size = 17;
  const lines = [`TITLE "Saeed ${item.titleEn}"`, `LUT_3D_SIZE ${size}`, 'DOMAIN_MIN 0 0 0', 'DOMAIN_MAX 1 1 1'];
  for (let b = 0; b < size; b++) for (let g = 0; g < size; g++) for (let r = 0; r < size; r++) {
    lines.push(filterPixel(item, r / (size - 1), g / (size - 1), b / (size - 1)).map(n => n.toFixed(6)).join(' '));
  }
  const url = URL.createObjectURL(new Blob([lines.join('\n') + '\n'], { type: 'text/plain' }));
  const a = document.createElement('a'); a.href = url; a.download = `saeed-${item.id}.cube`; a.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 60000);
}
