export type WallpaperCategory='الكل'|'طبيعة'|'بحر'|'جبال'|'صحراء'|'سماء';
export type WallpaperItem={id:number;title:string;category:Exclude<WallpaperCategory,'الكل'>;image:string};
export const wallpaperCategories:WallpaperCategory[]=['الكل','طبيعة','بحر','جبال','صحراء','سماء'];

const sources=[
['طبيعة','1472214103451-9374bd1c798e'],['طبيعة','1441974231531-c6227db76b6e'],['طبيعة','1433086966358-54859d0ed716'],['طبيعة','1447752875215-b2761acb3c5d'],['طبيعة','1501854140801-50d01698950b'],['طبيعة','1473448912268-2022ce9509d8'],['طبيعة','1511497584788-876760111969'],['طبيعة','1469474968028-56623f02e42e'],
['بحر','1507525428034-b723cf961d3e'],['بحر','1473116763249-2faaef81ccda'],['بحر','1500530855697-b586d89ba3ee'],['بحر','1484291470158-b8f8d608850d'],
['جبال','1470770841072-f978cf4d019e'],['جبال','1501785888041-af3ef285b470'],['جبال','1519681393784-d120267933ba'],['جبال','1464822759023-fed622ff2c3b'],['جبال','1483347756197-71ef80e95f73'],['جبال','1500534623283-312aade485b7'],
['صحراء','1509316785289-025f5b846b35'],['صحراء','1500534314209-a25ddb2bd429'],
['سماء','1470252649378-9c29740c9fa8'],['سماء','1499346030926-9a72daac6c63'],['سماء','1504608524841-42fe6f032b4b'],['سماء','1534088568595-a066f410bcda'],['سماء','1490730141103-6cac27aaab94']
] as const;
const positions=['center','top','bottom','left'];
export const wallpapers:WallpaperItem[]=Array.from({length:100},(_,i)=>{
 const [category,photo]=sources[i%sources.length];
 const pos=positions[Math.floor(i/sources.length)%positions.length];
 const n=i+1;
 return{id:n,title:`خلفية ${n}`,category,image:`https://images.unsplash.com/photo-${photo}?auto=format&fit=crop&w=720&h=1280&q=82&crop=${pos}`};
});