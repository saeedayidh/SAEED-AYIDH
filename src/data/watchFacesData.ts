export type WatchFaceCategory='الكل'|'كلاسيكي'|'رياضي'|'رقمي'|'بسيط'|'فاخر';
export type WatchFaceItem={id:number;title:string;category:Exclude<WatchFaceCategory,'الكل'>;image:string};
export const watchFaceCategories:WatchFaceCategory[]=['الكل','كلاسيكي','رياضي','رقمي','بسيط','فاخر'];

const palettes=[
 ['#050505','#f5f5f5','#d51f2b'],['#07111f','#f8fafc','#38bdf8'],['#120b05','#f8e7b0','#d4a72c'],
 ['#0b120d','#e9ffe9','#22c55e'],['#170707','#fff1f2','#ef4444'],['#0b0718','#f5f3ff','#8b5cf6'],
 ['#101010','#f3f4f6','#f97316'],['#020617','#e2e8f0','#2563eb'],['#16130b','#fff7d6','#eab308'],['#071414','#ecfeff','#06b6d4']
];
const cats:Exclude<WatchFaceCategory,'الكل'>[]=['كلاسيكي','رياضي','رقمي','بسيط','فاخر'];
const makeFace=(n:number)=>{
 const [bg,fg,accent]=palettes[(n-1)%palettes.length];
 const digital=n%5===3;
 const minimal=n%5===4;
 const ticks=Array.from({length:12},(_,i)=>{const a=i*30;return `<rect x="197" y="28" width="6" height="${i%3===0?22:13}" rx="3" fill="${i%3===0?accent:fg}" opacity="${i%3===0?1:.62}" transform="rotate(${a} 200 200)"/>`}).join('');
 const hour=(n*37)%360,minute=(n*71)%360;
 const sub=n%2===0?`<circle cx="135" cy="235" r="35" fill="none" stroke="${fg}" opacity=".35"/><circle cx="265" cy="235" r="35" fill="none" stroke="${fg}" opacity=".35"/>`:'';
 const body=digital
  ?`<text x="200" y="205" fill="${fg}" font-size="68" text-anchor="middle" font-family="Arial" font-weight="700">${String((n*3)%24).padStart(2,'0')}:${String((n*7)%60).padStart(2,'0')}</text><text x="200" y="245" fill="${accent}" font-size="18" text-anchor="middle" font-family="Arial">SAEED • ${n}</text>`
  :`${minimal?'':ticks}${sub}<line x1="200" y1="200" x2="200" y2="105" stroke="${fg}" stroke-width="10" stroke-linecap="round" transform="rotate(${hour} 200 200)"/><line x1="200" y1="200" x2="200" y2="72" stroke="${accent}" stroke-width="6" stroke-linecap="round" transform="rotate(${minute} 200 200)"/><circle cx="200" cy="200" r="11" fill="${accent}"/><text x="200" y="150" fill="${fg}" opacity=".8" font-size="18" text-anchor="middle" font-family="Arial" font-weight="700">SBA</text><text x="200" y="280" fill="${accent}" font-size="14" text-anchor="middle" font-family="Arial">SAEED ${String(n).padStart(2,'0')}</text>`;
 const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 400 400"><defs><radialGradient id="g"><stop stop-color="${accent}" stop-opacity=".18"/><stop offset="1" stop-color="${bg}" stop-opacity="0"/></radialGradient></defs><rect width="400" height="400" rx="92" fill="${bg}"/><rect x="10" y="10" width="380" height="380" rx="84" fill="url(#g)" stroke="${fg}" stroke-opacity=".14" stroke-width="2"/>${body}</svg>`;
 return 'data:image/svg+xml;charset=UTF-8,'+encodeURIComponent(svg);
};
export const watchFaces:WatchFaceItem[]=Array.from({length:50},(_,i)=>{const n=i+1;return{id:n,title:`واجهة ساعة ${n}`,category:cats[i%cats.length],image:makeFace(n)}});