const letters: Record<string,string> = {'ا':'a','أ':'a','إ':'i','آ':'a','ب':'b','ت':'t','ث':'th','ج':'j','ح':'h','خ':'kh','د':'d','ذ':'dh','ر':'r','ز':'z','س':'s','ش':'sh','ص':'s','ض':'d','ط':'t','ظ':'dh','ع':'a','غ':'gh','ف':'f','ق':'q','ك':'k','ل':'l','م':'m','ن':'n','ه':'h','و':'w','ي':'y','ى':'a','ة':'h','ؤ':'w','ئ':'y'};
const names:Record<string,string>={'سعيد':'saeed','محمد':'mohammed','احمد':'ahmed','أحمد':'ahmed','عبدالله':'abdullah','عبدالعزيز':'abdulaziz','علي':'ali','خالد':'khalid','فهد':'fahad','نورة':'noura','سارة':'sarah'};
const topics = [
 {keys:['تصوير','صورة','صور','photo','camera'],word:'photo',tags:['تصوير','فن_التصوير','تصوير_جوال','photography','portrait','photooftheday','mobilephotography']},
 {keys:['تصميم','مصمم','design'],word:'design',tags:['تصميم','تصميم_جرافيك','هوية_بصرية','design','graphicdesign','branding','creative']},
 {keys:['العاب','ألعاب','قيم','gaming','game'],word:'gaming',tags:['ألعاب','قيمينق','أخبار_الألعاب','gaming','gamer','videogames','gameplay']},
 {keys:['قهوة','coffee','كافيه'],word:'coffee',tags:['قهوة','قهوة_مختصة','كافيه','coffee','specialtycoffee','coffeelover','barista']},
 {keys:['طبخ','طعام','وصف','food','cook'],word:'food',tags:['طبخ','وصفات','أكل','food','cooking','recipe','foodphotography']},
 {keys:['سفر','رحلة','travel'],word:'travel',tags:['سفر','سياحة','رحلات','travel','travelphotography','explore','adventure']},
 {keys:['رياض','تمرين','fitness','sport'],word:'fit',tags:['رياضة','تمارين','لياقة','fitness','workout','training','sport']},
 {keys:['تسويق','متجر','تجارة','market','shop'],word:'studio',tags:['تسويق','متجر_إلكتروني','تجارة_إلكترونية','marketing','ecommerce','smallbusiness','business']},
 {keys:['تقنية','برمج','tech','code'],word:'tech',tags:['تقنية','برمجة','تطوير','tech','coding','programming','developer']},
 {keys:['قصص','قصة','story'],word:'stories',tags:['قصص','قصة','حكاية','stories','storytelling','storytime','creativewriting']},
];
export function latin(value:string){return value.trim().split(/\s+/).map(word=>names[word]||[...word.normalize('NFKD')].map(c=>letters[c]??c).join('')).join('').toLowerCase().replace(/[^a-z0-9]/g,'');}
export function usernames(name:string,field:string,nickname=''){
 const n=latin(name).slice(0,14), alias=latin(nickname).slice(0,12), topic=topics.find(t=>t.keys.some(k=>field.toLowerCase().includes(k)))?.word||latin(field).slice(0,8)||'creator';
 if(!n||!field.trim())return [];
 const base=alias||n;
 return [...new Set([base,`${base}.${topic}`,`${base}_${topic}`,`${topic}.${base}`,`by.${base}`,`${base}.studio`,`${base}.daily`,`${base}.creates`,`its.${base}`,`${n}.${alias||topic}`,`${base}hq`,`${base}.online`].map(x=>x.slice(0,30)))];
}
export function hashtags(topic:string){
 const clean=topic.normalize('NFKC').trim().slice(0,200);if(!clean)return [];
 const words=clean.split(/[\s,،.!؟?]+/).filter(w=>w.length>1&&!['عن','في','من','على','مع','the','and','for','كيف'].includes(w.toLowerCase())).map(w=>w.replace(/[^\p{L}\p{N}_]/gu,'')).filter(Boolean);
 const related=topics.filter(t=>t.keys.some(k=>clean.toLowerCase().includes(k))).flatMap(t=>t.tags);
 const base=words.slice(0,4).join('_'),english=/^[a-z0-9_]+$/i.test(base),extra=base?[`${base}_${english?'tips':'نصائح'}`,`${base}_${english?'ideas':'أفكار'}`]:[];
 return [...new Set([clean.replace(/[^\p{L}\p{N}\s_]/gu,'').replace(/\s+/g,'_'),...words,...related,...extra].filter(Boolean))].slice(0,25).map(w=>`#${w}`);
}
export function validLink(value:string){const url=new URL(value.trim());if(!['https:','http:'].includes(url.protocol)||url.username||url.password||!url.hostname.includes('.'))throw Error('invalid_url');return url.href;}
