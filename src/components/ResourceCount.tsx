export function ResourceCount({count,unit,unitEn,isArabic}:{count:number;unit:string;unitEn:string;isArabic:boolean}){
 return <span className="absolute left-3 top-1/2 -translate-y-1/2 whitespace-nowrap text-[10px] font-semibold text-gray-400 sm:text-xs">{count} {isArabic?unit:unitEn}</span>;
}
export const resourceUnits:Record<string,[string,string]>={
 'ipad-wallpapers':['خلفية','wallpapers'],'desktop-wallpapers':['خلفية','wallpapers'],
 'profile-pictures':['صورة','photos'],'color-palettes':['لوحة ألوان','palettes'],
 'gradients':['تدرج','gradients'],'font-packs':['خط','fonts'],
 'app-icons':['أيقونة','icons'],'social-sizes':['مقاس','sizes']
};
