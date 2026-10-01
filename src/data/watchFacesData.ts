export type WatchFaceItem = { id: number; title: string; englishTitle: string; image: string };

// Fifty original SVG compositions. These are downloadable design images, not watchOS packages.
// The official SBA mark is intentionally absent; it must never be recreated in code.
const names: [string, string][] = [
  ['المدار','Orbit'],['النبض','Pulse'],['المحور','Axis'],['الشفق','Dusk'],['البوصلة','Compass'],
  ['المدى','Range'],['الطيف','Spectrum'],['المؤشر','Pointer'],['الوهج','Glow'],['الظل','Shadow'],
  ['الإيقاع','Rhythm'],['الخطوة','Step'],['المرآة','Mirror'],['الخط الأحمر','Red Line'],['المسار','Path'],
  ['النافذة','Window'],['المقياس','Measure'],['الوميض','Flash'],['الحافة','Edge'],['الشريط','Ribbon'],
  ['الحلقات','Rings'],['الموجة','Wave'],['الأفق','Horizon'],['الأطوار','Phases'],['التقويم','Calendar'],
  ['الطاقة','Energy'],['المرصد','Observatory'],['الإشارة','Signal'],['النجوم','Stars'],['المدار الثاني','Orbit II'],
  ['المتاهة','Labyrinth'],['القطر','Diagonal'],['المربعات','Squares'],['الساعة الرملية','Hourglass'],['المثلث','Triangle'],
  ['الكتل','Blocks'],['الأشعة','Rays'],['الإزاحة','Offset'],['الانحناء','Curve'],['النقاط','Dots'],
  ['الميدان','Field'],['الطيار','Pilot'],['الغواص','Diver'],['السباق','Racer'],['الأرباع','Quadrants'],
  ['العالم','World'],['الغروب','Sunset'],['التدرج','Gradient'],['الرأسية','Vertical'],['الختام','Finale'],
];
const RED = '#D51F2B', WHITE = '#f6f6f6', MUTED = '#8b8b91';
const T = (x:number,y:number,value:string,size=20,color=WHITE,weight=600,anchor='middle') =>
  `<text x="${x}" y="${y}" fill="${color}" font-size="${size}" font-family="Arial, sans-serif" font-weight="${weight}" text-anchor="${anchor}">${value}</text>`;
const L = (x1:number,y1:number,x2:number,y2:number,color=WHITE,width=3,opacity=1) =>
  `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="${width}" opacity="${opacity}" stroke-linecap="round"/>`;
const C = (x:number,y:number,r:number,color=RED,opacity=1) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${color}" opacity="${opacity}"/>`;
const R = (x:number,y:number,w:number,h:number,color=RED,rx=0,opacity=1) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${color}" opacity="${opacity}"/>`;
const O = (x:number,y:number,r:number,color=RED,width=2,opacity=1) =>
  `<circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="${color}" stroke-width="${width}" opacity="${opacity}"/>`;
const path = (d:string,color=RED,width=3,fill='none') => `<path d="${d}" fill="${fill}" stroke="${color}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round"/>`;
const ticks = (r=150,count=12,major=RED,minor=WHITE) => Array.from({length:count},(_,i)=>
  `<line x1="200" y1="${200-r}" x2="200" y2="${200-r+(i%Math.max(1,count/4)===0?17:8)}" stroke="${i%Math.max(1,count/4)===0?major:minor}" stroke-width="${i%Math.max(1,count/4)===0?5:2}" opacity="${i%Math.max(1,count/4)===0?1:.7}" transform="rotate(${i*360/count} 200 200)"/>`).join('');
const hands = (cx=200,cy=200,size=1) =>
  `<g transform="translate(${cx} ${cy}) scale(${size})">${L(0,0,-42,-67,WHITE,9)}${L(0,0,46,-91,RED,5)}${L(0,0,0,93,WHITE,2,.7)}${C(0,0,9,RED)}</g>`;
const digits = (size=78,x=200,y=219,color=WHITE) => T(x,y,'10:08',size,color,700);
const mini = (label:string,value:string,x:number,y:number) => T(x,y,label,12,MUTED,500)+T(x,y+24,value,18,WHITE,700);
const arcs = (r:number,colors=[RED,WHITE,MUTED],cx=200,cy=200) => colors.map((color,i)=>
  `<circle cx="${cx}" cy="${cy}" r="${r-i*14}" fill="none" stroke="${color}" stroke-width="8" stroke-dasharray="${(r-i*14)*2.7} 999" stroke-linecap="round" transform="rotate(${-90+i*48} ${cx} ${cy})"/>`).join('');
const base = (n:number,art:string) => {
  const bg = ['#080809','#101013','#15090b','#0a0a0c','#1b1114'][Math.floor((n-1)/10)];
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 400 400"><defs><linearGradient id="shade" x2="1" y2="1"><stop stop-color="${bg}"/><stop offset="1" stop-color="#050506"/></linearGradient><linearGradient id="red" x2="1" y2="1"><stop stop-color="#f63b4a"/><stop offset="1" stop-color="#7b0b15"/></linearGradient></defs><rect width="400" height="400" rx="94" fill="url(#shade)"/><rect x="9" y="9" width="382" height="382" rx="86" fill="none" stroke="#ffffff" stroke-opacity=".13" stroke-width="2"/>${art}</svg>`;
  return 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg);
};

// Each entry has its own layout and dominant graphic, not a repeated color or time variant.
const art: Array<() => string> = [
  () => O(200,200,147,RED,1)+ticks()+O(200,200,116,RED,1,.4)+hands()+T(200,91,'12',23)+T(200,326,'6',23),
  () => path('M35 230 H91 L116 181 L145 257 L179 143 L211 240 L240 213 H365',RED,8)+digits(62,200,130)+T(200,317,'BPM  •  72',18),
  () => L(200,40,200,360,RED,2)+L(40,200,360,200,RED,2)+O(200,200,111,WHITE,2,.4)+hands()+mini('DAY','01',93,300)+mini('MONTH','OCT',307,300),
  () => R(29,30,342,152,'url(#red)',57)+T(200,136,'10',115)+T(200,268,'08',119,WHITE,700)+L(87,296,313,296,RED,4)+T(200,329,'THURSDAY',16,MUTED),
  () => O(200,200,139,WHITE,2,.5)+ticks(151,24)+T(200,78,'N',30,RED)+T(326,209,'E',23)+T(200,345,'S',23)+T(72,209,'W',23)+C(200,200,9)+path('M200 107 L215 200 L200 190 L185 200 Z',RED,3,RED)+path('M200 293 L215 200 L200 210 L185 200 Z',WHITE,3,WHITE),
  () => arcs(146)+digits(69)+T(200,275,'01 OCT',20,RED)+mini('STEPS','8,420',105,335)+mini('CAL','320',294,335),
  () => Array.from({length:14},(_,i)=>L(35+i*25,100+(i%3)*18,35+i*25,312-(i%4)*15,i%3?WHITE:RED,2,.65)).join('')+R(55,141,290,119,'#080809',22,.92)+digits(76)+T(200,299,'WED • 01',18,RED),
  () => ticks(142,60)+O(200,200,117,RED,3)+hands()+R(166,280,68,26,RED,13)+T(200,299,'01',17),
  () => C(200,200,125,RED,.1)+arcs(125,[RED,RED,WHITE])+O(200,200,74,WHITE,1,.3)+digits(54)+T(200,274,'ACTIVE',15,RED),
  () => R(52,66,296,267,'#f6f6f6',26)+T(200,202,'10:08',75,'#080809')+R(72,225,256,6,RED,3)+T(200,286,'01 / 10',28,'#171719'),
  () => Array.from({length:11},(_,i)=>R(64+i*26,270-(i%5)*31,12,90+(i%5)*31,i%3?WHITE:RED,6,.75)).join('')+digits(68,200,194)+T(200,94,'RHYTHM',19,RED),
  () => path('M53 272 H105 V235 H157 V198 H209 V161 H261 V124 H345',RED,7)+T(200,99,'8,420',69)+T(200,334,'STEPS TODAY',18,WHITE),
  () => R(33,56,153,287,RED,36,.92)+R(214,56,153,287,WHITE,36,.94)+T(108,229,'10',72,WHITE)+T(290,229,'08',72,'#111114')+T(200,369,'THU 01',15,MUTED),
  () => R(178,34,7,332,RED,2)+T(112,179,'10',71)+T(275,280,'08',71)+mini('HOUR','AM',109,271)+mini('MIN','OCT',282,181),
  () => O(200,200,145,RED,1)+path('M80 308 Q161 278 171 207 T322 89',RED,7)+C(169,209,15,WHITE)+digits(48,205,343),
  () => R(43,43,314,314,WHITE,40)+R(61,61,278,94,RED,23)+T(200,129,'10',75)+T(200,266,'08',113,'#111114')+T(200,312,'OCT 01',17,'#111114'),
  () => O(200,200,125,RED,18,.45)+O(200,200,98,WHITE,2,.7)+T(200,197,'10:08',57)+T(200,258,'01 / THU',21,RED)+Array.from({length:12},(_,i)=>C(200+145*Math.cos(i*Math.PI/6),200+145*Math.sin(i*Math.PI/6),3,i%3?WHITE:RED)).join(''),
  () => path('M48 210 L350 210',RED,13)+digits(89,200,187)+T(200,268,'01  /  OCTOBER',21,WHITE)+L(61,297,339,297,WHITE,2,.5),
  () => R(43,53,314,290,'#171719',44)+L(62,98,338,98,RED,11)+digits(80)+T(200,283,'THURSDAY',18,RED)+L(62,310,338,310,RED,11),
  () => path('M28 270 C91 181 145 312 200 208 S312 155 373 84',RED,38)+digits(57,200,213)+T(200,308,'01 OCT',19,WHITE),
  () => arcs(148,[RED,WHITE,RED])+arcs(79,[WHITE,RED,WHITE])+digits(41)+T(200,269,'MOVE / 420',16,RED),
  () => path('M25 231 C57 231 64 143 97 143 S132 296 169 296 S209 174 245 174 S297 259 375 201',RED,7)+digits(67,200,108)+T(200,352,'FREQUENCY',18,WHITE),
  () => R(0,235,400,165,RED,0,.8)+C(200,235,106,'#d22b37')+T(200,174,'10:08',70)+T(200,305,'01 OCT',24,WHITE),
  () => Array.from({length:7},(_,i)=>C(87+i*38,118+Math.abs(i-3)*8,13,i===3?RED:WHITE,i===3?1:.55)).join('')+C(200,245,92,RED,.23)+digits(58,200,264)+T(200,356,'LUNAR',18,RED),
  () => R(50,56,300,289,'#18181b',27)+T(200,112,'OCTOBER',18,RED)+T(200,213,'01',105)+L(80,241,320,241,RED,3)+T(200,299,'THURSDAY',23),
  () => R(54,70,292,23,'#3b3b42',11)+R(54,70,218,23,RED,11)+digits(67,200,219)+T(200,306,'75% ENERGY',20,WHITE)+C(92,309,8,RED)+C(309,309,8,WHITE),
  () => O(200,180,115,WHITE,1,.5)+O(200,180,82,RED,1)+L(200,70,200,290,RED,2)+L(90,180,310,180,RED,2)+C(256,126,9,WHITE)+T(200,342,'10:08',45),
  () => Array.from({length:18},(_,i)=>R(51+i*17,133+(i%4)*19,7,140-(i%4)*28,i%5?WHITE:RED,4,.7)).join('')+digits(61,200,95)+T(200,339,'SIGNAL  /  01',18,RED),
  () => Array.from({length:34},(_,i)=>C(42+(i*71)%319,38+(i*113)%306,i%7===0?3:1.4,i%6?WHITE:RED,.5)).join('')+O(200,200,104,RED,1)+digits(62)+T(200,269,'NIGHT SKY',17,WHITE),
  () => O(156,197,111,RED,9)+O(244,197,111,WHITE,3,.58)+C(156,197,8,RED)+C(244,197,8,WHITE)+T(200,201,'10:08',55)+T(200,328,'DUAL ORBIT',17,RED),
  () => Array.from({length:7},(_,i)=>R(46+i*43,52,16,296,i%2?RED:WHITE,8,i%2?.7:.17)).join('')+T(200,207,'10:08',74)+R(93,238,214,36,'#09090a',18)+T(200,264,'01 OCT',17,RED),
  () => path('M50 315 L315 50',RED,39)+path('M104 345 L345 104',WHITE,3)+T(142,186,'10',65)+T(265,272,'08',65)+T(200,366,'THU',15,RED),
  () => R(44,44,144,144,RED,25)+R(212,44,144,144,'#2a2a2e',25)+R(44,212,144,144,'#2a2a2e',25)+R(212,212,144,144,WHITE,25)+T(116,139,'10',69)+T(284,311,'08',69,'#111114')+T(284,125,'01',27)+T(116,296,'OCT',21),
  () => path('M79 69 L322 69 L79 331 L322 331 Z',RED,2)+T(200,163,'10',62)+T(200,286,'08',62)+L(87,198,313,198,WHITE,4),
  () => path('M200 55 L348 332 H52 Z',RED,5)+path('M200 124 L289 290 H111 Z',WHITE,2)+digits(50,200,238)+T(200,357,'THU 01',17,MUTED),
  () => R(45,61,148,133,RED,17)+R(207,61,148,133,WHITE,17)+R(45,208,148,133,WHITE,17)+R(207,208,148,133,RED,17)+T(119,152,'10',72)+T(282,300,'08',72)+T(282,147,'01',35,'#111114')+T(119,294,'OCT',24,'#111114'),
  () => Array.from({length:24},(_,i)=>`<g transform="rotate(${i*15} 200 200)">${L(200,68,200,82,i%3?WHITE:RED,i%3?2:5,i%3?.45:1)}</g>`).join('')+ticks(145,24)+O(200,200,111,RED,1)+hands(),
  () => C(260,186,105,RED,.44)+C(161,219,110,WHITE,.12)+digits(70,194,217)+T(200,299,'SHIFTED',16,RED),
  () => path('M42 268 Q95 129 153 246 T254 232 T355 102',RED,14)+path('M42 302 Q95 163 153 280 T254 266 T355 136',WHITE,3)+digits(62,200,132),
  () => Array.from({length:9},(_,row)=>Array.from({length:9},(_,col)=>C(56+col*36,55+row*36,(row+col)%4===0?6:2,(row+col)%4===0?RED:WHITE,.8)).join('')).join('')+R(86,151,228,96,'#0b0b0d',22)+digits(56),
  () => ticks(149,12)+T(200,103,'12',27)+T(200,324,'6',27)+T(83,210,'9',27)+T(319,210,'3',27)+hands()+R(159,253,82,29,RED,9)+T(200,275,'OCT 01',15),
  () => O(200,200,150,WHITE,3)+ticks(150,24)+T(200,95,'N',20,RED)+T(317,207,'E',20)+T(200,330,'S',20)+T(82,207,'W',20)+hands()+T(200,260,'ALT 240',13,RED),
  () => O(200,200,150,RED,11)+ticks(144,60)+O(200,200,110,WHITE,1,.55)+hands()+T(200,280,'DEPTH  32 M',13),
  () => path('M52 292 L88 124 L124 208 L161 91 L198 279 L237 133 L277 216 L345 105',RED,9)+T(200,91,'10:08',62)+T(200,342,'LAP 03   •   01 OCT',16),
  () => L(200,45,200,355,RED,2)+L(45,200,355,200,RED,2)+T(118,164,'10',67)+T(283,165,'08',67)+mini('DAY','THU',111,264)+mini('DATE','01',283,264),
  () => O(200,200,139,WHITE,1,.6)+Array.from({length:6},(_,i)=>`<g transform="rotate(${i*60} 200 200)">${L(200,62,200,81,i%2?WHITE:RED,4)}</g>`).join('')+digits(56)+T(200,277,'UTC +03',20,RED)+T(200,317,'RIYADH',16),
  () => R(0,250,400,150,'url(#red)')+C(200,246,91,RED,.8)+O(200,246,106,WHITE,1,.6)+T(200,154,'10:08',68)+T(200,337,'SUNSET',22),
  () => Array.from({length:20},(_,i)=>L(48+i*16,311,48+i*16,311-i*8,i%3?WHITE:RED,6,i%3?.4:1)).join('')+digits(67,200,188)+T(200,104,'01 OCT',20,RED),
  () => Array.from({length:12},(_,i)=>R(107,38+i*27,186,4,i===5||i===6?RED:WHITE,2,i===5||i===6?1:.25)).join('')+T(200,174,'10',74)+T(200,269,'08',74),
  () => arcs(145,[RED,WHITE,RED])+O(200,200,89,WHITE,2)+hands()+T(200,338,'01  •  OCT',17,RED),
];

export const watchFaces: WatchFaceItem[] = names.map(([title, englishTitle], index) => ({
  id: index + 1,
  title,
  englishTitle,
  image: base(index + 1, art[index]()),
}));
