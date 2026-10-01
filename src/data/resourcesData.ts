export type WallpaperCategory='الكل'|'طبيعة'|'بحر'|'جبال'|'صحراء'|'سماء';
export type WallpaperItem={id:number;title:string;category:Exclude<WallpaperCategory,'الكل'>;image:string};
const categories:Exclude<WallpaperCategory,'الكل'>[]=['طبيعة','بحر','جبال','صحراء','سماء'];
const tags:Record<Exclude<WallpaperCategory,'الكل'>,string>={
'طبيعة':'nature,forest,landscape',
'بحر':'ocean,beach,sea',
'جبال':'mountains,nature,landscape',
'صحراء':'desert,dunes,landscape',
'سماء':'sky,clouds,nature'
};
export const wallpaperCategories:WallpaperCategory[]=['الكل',...categories];
export const wallpapers:WallpaperItem[]=Array.from({length:100},(_,i)=>{
 const category=categories[i%categories.length];
 const n=i+1;
 return{id:n,title:`خلفية ${n}`,category,image:`https://loremflickr.com/1080/1920/${tags[category]}?lock=${n+400}`};
});