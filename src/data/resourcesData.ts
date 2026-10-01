export type WallpaperCategory='الكل'|'طبيعة'|'بحر'|'جبال'|'صحراء'|'سماء';
export type WallpaperItem={id:number;title:string;category:Exclude<WallpaperCategory,'الكل'>;image:string};
export const wallpaperCategories:WallpaperCategory[]=['الكل','طبيعة','بحر','جبال','صحراء','سماء'];
const baseWallpapers=[
  {
    "category": "طبيعة",
    "image": "https://gcdn.picsart.com/editing-temp/39afefd6-82b2-41b1-bf0b-7c0c783d8200.jpeg"
  },
  {
    "category": "طبيعة",
    "image": "https://gcdn.picsart.com/editing-temp/7e260983-6b59-43a7-8ab7-5af1dfea6bcd.jpeg"
  },
  {
    "category": "طبيعة",
    "image": "https://gcdn.picsart.com/editing-temp/0a92fea7-2a8e-4974-9362-e836f04b9b21.jpeg"
  },
  {
    "category": "طبيعة",
    "image": "https://gcdn.picsart.com/editing-temp/697a0884-f46e-4067-b9ea-54c327813d06.jpeg"
  },
  {
    "category": "طبيعة",
    "image": "https://gcdn.picsart.com/editing-temp/937637fa-d283-498a-901a-fdc61933afb0.jpeg"
  },
  {
    "category": "طبيعة",
    "image": "https://gcdn.picsart.com/editing-temp/0e93b905-93a1-4863-a520-8c240762575c.jpeg"
  },
  {
    "category": "طبيعة",
    "image": "https://gcdn.picsart.com/editing-temp/b5d1b8ae-23d6-4f53-8a10-9c6039357aa5.jpeg"
  },
  {
    "category": "طبيعة",
    "image": "https://gcdn.picsart.com/editing-temp/8112bd84-60b6-477a-a32c-459790c6165a.jpeg"
  },
  {
    "category": "بحر",
    "image": "https://gcdn.picsart.com/editing-temp/3c8196bc-5a7e-4048-831d-07e4451c79a1.jpeg"
  },
  {
    "category": "بحر",
    "image": "https://gcdn.picsart.com/editing-temp/b4d28946-c58e-4083-b2d5-790f0bc99601.jpeg"
  },
  {
    "category": "بحر",
    "image": "https://gcdn.picsart.com/editing-temp/0d912d63-659e-45a5-971d-48ebe8174d3a.jpeg"
  },
  {
    "category": "بحر",
    "image": "https://gcdn.picsart.com/editing-temp/deca70d3-796b-4dc6-9ad1-01c97dbf35f5.jpeg"
  },
  {
    "category": "جبال",
    "image": "https://gcdn.picsart.com/editing-temp/7e3d30be-baaf-40b6-8425-fd3045428d5e.jpeg"
  },
  {
    "category": "جبال",
    "image": "https://gcdn.picsart.com/editing-temp/0c543cfd-0070-4aa4-bf9f-8c589b7fa31f.jpeg"
  },
  {
    "category": "جبال",
    "image": "https://gcdn.picsart.com/editing-temp/fbb3d9cf-e91b-422a-917a-3e39c45f0419.jpeg"
  },
  {
    "category": "جبال",
    "image": "https://gcdn.picsart.com/editing-temp/f873852a-8870-4400-9117-2701d8a3d86f.jpeg"
  },
  {
    "category": "جبال",
    "image": "https://gcdn.picsart.com/editing-temp/8650c207-d06d-491b-ac08-9df4b7a922ff.jpeg"
  },
  {
    "category": "جبال",
    "image": "https://gcdn.picsart.com/editing-temp/0fd99839-fd4e-4c30-a573-f4a99f84323f.jpeg"
  },
  {
    "category": "صحراء",
    "image": "https://gcdn.picsart.com/editing-temp/b86e7789-df49-4f15-962c-0755e678d98b.jpeg"
  },
  {
    "category": "صحراء",
    "image": "https://gcdn.picsart.com/editing-temp/c1d38773-bc9a-491f-9359-cfe7665baed0.jpeg"
  },
  {
    "category": "سماء",
    "image": "https://gcdn.picsart.com/editing-temp/d9a2940f-112f-4bcb-a56c-5e467637b92d.jpeg"
  },
  {
    "category": "سماء",
    "image": "https://gcdn.picsart.com/editing-temp/c79212e2-59d0-4552-a151-5c9c8fe94882.jpeg"
  },
  {
    "category": "سماء",
    "image": "https://gcdn.picsart.com/editing-temp/b14eecb7-ef94-4631-83f9-bd5c2edd3d68.jpeg"
  },
  {
    "category": "سماء",
    "image": "https://gcdn.picsart.com/editing-temp/02662f00-098f-46b7-9f95-2910d72bf345.jpeg"
  },
  {
    "category": "سماء",
    "image": "https://gcdn.picsart.com/editing-temp/2d5d9631-50ff-4b7c-b59d-4ba39c721570.jpeg"
  }
] as const;
export const wallpapers:WallpaperItem[]=Array.from({length:100},(_,i)=>{
 const base=baseWallpapers[i%baseWallpapers.length];
 const n=i+1;
 return{id:n,title:`خلفية ${n}`,category:base.category,image:base.image};
});