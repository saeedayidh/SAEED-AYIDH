import type{ResourceItem}from'./resourceCatalog';
export const escapeMarkup=(s:string)=>s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]!));
export const svgUrl=(svg:string)=>`data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
export function gradientCss(item:ResourceItem){return item.variant%2?`radial-gradient(circle at 25% 20%, ${item.colors[2]}, ${item.colors[1]} 45%, ${item.colors[0]})`:`linear-gradient(${110+item.variant*20}deg, ${item.colors[0]}, ${item.colors[1]}, ${item.colors[2]})`;}
export const iconNames=['camera','mail','music','calendar','notes','folder','clock','phone','home','settings'];
const glyphs=[
 '<path d="M7 8h3l2-3h8l2 3h3v16H7z"/><circle cx="16" cy="16" r="5"/>',
 '<rect x="5" y="8" width="22" height="17" rx="2"/><path d="m5 9 11 9L27 9"/>',
 '<path d="M13 23V7l13-3v16M13 10l13-3"/><circle cx="9" cy="24" r="4"/><circle cx="22" cy="21" r="4"/>',
 '<rect x="5" y="7" width="22" height="21" rx="3"/><path d="M5 13h22M10 4v6M22 4v6M10 19h4m4 0h4m-12 5h4"/>',
 '<rect x="8" y="4" width="17" height="25" rx="2"/><path d="M5 9h6M5 16h6M5 23h6M14 10h7M14 15h7M14 20h5"/>',
 '<path d="M4 10V6h9l3 4h12v17H4z"/>',
 '<circle cx="16" cy="16" r="12"/><path d="M16 8v9l6 3"/>',
 '<rect x="9" y="3" width="14" height="26" rx="3"/><path d="M13 7h6M15 25h2"/>',
 '<path d="m3 15 13-11 13 11M7 12v16h7v-8h5v8h6V12"/>',
 '<circle cx="16" cy="16" r="5"/><path d="M16 2v5M16 25v5M2 16h5M25 16h5M6 6l4 4m12 12 4 4M6 26l4-4M22 10l4-4"/>',
];
export function iconSvg(item:ResourceItem,index:number){return`<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 32 32"><rect width="32" height="32" rx="7" fill="${item.colors[0]}"/><g transform="translate(5 5) scale(.6875)" stroke="${item.colors[2]}" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" fill="none">${glyphs[index]}</g></svg>`;}
export function resourceSvg(item:ResourceItem,color?:string){
 const[c0,c1,c2,c3]=item.colors,accent=color&&/^#[a-f0-9]{6}$/i.test(color)?color:c1;
 const w=item.width||1200,h=item.height||900;
 const patterns=[
 `<circle cx="840" cy="450" r="280" fill="none" stroke="${accent}" stroke-width="100"/><circle cx="360" cy="450" r="140" fill="${c2}" opacity=".8"/><path d="M0 690Q450 50 1200 440" fill="none" stroke="${c3}" stroke-width="3"/>`,
 `<path d="M0 450Q280 100 600 450T1200 450V900H0" fill="${accent}"/><path d="M0 650Q300 320 650 640T1200 620V900H0" fill="${c3}"/><path d="M0 800Q300 590 650 800T1200 780V900H0" fill="${c2}"/>`,
 `<g stroke="${accent}" stroke-width="2" opacity=".55">${Array.from({length:12},(_,i)=>`<path d="M${i*110} 0v900M0 ${i*85}h1200"/>`).join('')}</g><circle cx="650" cy="430" r="170" fill="url(#g)"/>`,
 `<path d="M250 900V350a350 350 0 0 1 700 0v550" fill="${accent}"/><path d="M360 900V350a240 240 0 0 1 480 0v550" fill="${c0}"/><circle cx="600" cy="560" r="120" fill="${c2}"/>`,
 `<rect y="420" width="1200" height="480" fill="${accent}"/><circle cx="600" cy="410" r="190" fill="${c2}"/><path d="M0 660Q300 590 600 660T1200 660" stroke="${c0}" stroke-width="90" fill="none"/>`,
 `<g fill="none" stroke="${accent}">${Array.from({length:8},(_,i)=>`<path d="M-60 ${220+i*80}Q350 ${-50+i*95} 650 ${350+i*55}T1280 ${240+i*80}" stroke-width="${8+i*3}"/>`).join('')}</g>`,
 ];
 let art=patterns[item.variant%6];
 if(item.kind==='gradient')art='<rect width="1200" height="900" fill="url(#g)"/>';
 if(item.kind==='avatar')art+=`<circle cx="600" cy="345" r="135" fill="${c2}"/><path d="M320 860v-90a280 280 0 0 1 560 0v90" fill="${c2}"/>`;
 if(item.kind==='sizes'){const ratio=(item.width||1)/(item.height||1);const bw=Math.min(740,480*ratio),bh=bw/ratio;art=`<rect x="${600-bw/2}" y="${420-bh/2}" width="${bw}" height="${bh}" rx="12" fill="${accent}" opacity=".3" stroke="${c2}" stroke-width="4"/><text x="600" y="780" fill="${c2}" text-anchor="middle" font-size="54" font-family="sans-serif">${w} × ${h}</text>`;}
 if(item.kind==='template'){art=`<rect x="260" y="60" width="680" height="780" rx="10" fill="${c2}"/><rect x="260" y="60" width="${item.variant===2?210:680}" height="${item.variant===2?780:170}" fill="${accent}"/><circle cx="${item.variant===2?365:370}" cy="145" r="45" fill="${c0}" opacity=".3"/>${Array.from({length:7},(_,i)=>`<rect x="${item.variant===2?510:315}" y="${300+i*65}" width="${i%3===0?220:item.variant===2?340:530}" height="${i%3===0?15:9}" fill="${c0}" opacity="${i%3===0?.7:.25}"/>`).join('')}`;}
 if(item.kind==='icons')art=`${[0,1,2,3].map((n)=>`<svg x="${220+(n%2)*390}" y="${90+Math.floor(n/2)*380}" width="330" height="330" viewBox="0 0 32 32"><rect width="32" height="32" rx="7" fill="${accent}"/><g transform="translate(5 5) scale(.6875)" stroke="${c2}" stroke-width="1.7" fill="none">${glyphs[n]}</g></svg>`).join('')}`;
 return`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 1200 900" preserveAspectRatio="none"><defs>${item.kind==='gradient'&&item.variant%2?`<radialGradient id="g" cx="25%" cy="20%" r="100%"><stop stop-color="${c2}"/><stop offset=".45" stop-color="${accent}"/><stop offset="1" stop-color="${c0}"/></radialGradient>`:`<linearGradient id="g" x2="1" y2="1"><stop stop-color="${c0}"/><stop offset=".5" stop-color="${accent}"/><stop offset="1" stop-color="${c2}"/></linearGradient>`}</defs><rect width="1200" height="900" fill="${c0}"/>${art}</svg>`;
}
export function textCss(item:ResourceItem){const c=item.colors;return[
 `font-family: sans-serif; font-weight: 900; color: ${c[2]}; letter-spacing: -0.03em;`,
 `font-family: sans-serif; font-weight: 900; background: linear-gradient(120deg, ${c[1]}, ${c[2]}); -webkit-background-clip: text; background-clip: text; color: transparent;`,
 `font-family: sans-serif; font-weight: 900; color: transparent; -webkit-text-stroke: 2px ${c[2]};`,
 `font-family: sans-serif; font-weight: 700; color: ${c[2]}; text-shadow: 0 0 12px ${c[1]}, 0 0 32px ${c[1]};`,
 `font-family: sans-serif; font-weight: 900; color: ${c[2]}; text-shadow: 3px 3px 0 ${c[1]}, 6px 6px 0 ${c[3]};`,
 `font-family: Georgia, serif; font-weight: 400; color: ${c[2]}; line-height: 1.6;`,
 ][item.variant%6];}
