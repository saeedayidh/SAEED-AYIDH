import {useEffect} from 'react';

const MAX_EDGE=1600;
const QUALITY=0.82;

async function compressImage(dataUrl:string):Promise<string>{
  if(!dataUrl.startsWith('data:image/')||dataUrl.startsWith('data:image/svg'))return dataUrl;
  if(dataUrl.length<450000)return dataUrl;
  try{
    const blob=await (await fetch(dataUrl)).blob();
    const bitmap=await createImageBitmap(blob);
    const scale=Math.min(1,MAX_EDGE/Math.max(bitmap.width,bitmap.height));
    const width=Math.max(1,Math.round(bitmap.width*scale));
    const height=Math.max(1,Math.round(bitmap.height*scale));
    const canvas=document.createElement('canvas');canvas.width=width;canvas.height=height;
    const ctx=canvas.getContext('2d');if(!ctx)return dataUrl;
    ctx.drawImage(bitmap,0,0,width,height);bitmap.close();
    const out=canvas.toDataURL('image/webp',QUALITY);
    return out.length<dataUrl.length?out:dataUrl;
  }catch{return dataUrl}
}

async function optimize(value:any):Promise<any>{
  if(typeof value==='string')return compressImage(value);
  if(Array.isArray(value))return Promise.all(value.map(optimize));
  if(value&&typeof value==='object'){
    const entries=await Promise.all(Object.entries(value).map(async([k,v])=>[k,await optimize(v)]));
    return Object.fromEntries(entries);
  }
  return value;
}

export const CMSUploadOptimizer=()=>{
  useEffect(()=>{
    const original=window.fetch.bind(window);
    window.fetch=(async(input:RequestInfo|URL,init?:RequestInit)=>{
      const target=typeof input==='string'?input:input instanceof URL?input.toString():input.url;
      if(target==='/api/admin/cms'&&init?.method?.toUpperCase()==='PUT'&&typeof init.body==='string'){
        try{
          const parsed=JSON.parse(init.body);
          const optimized=await optimize(parsed);
          const body=JSON.stringify(optimized);
          return original(input,{...init,body});
        }catch{return original(input,init)}
      }
      return original(input,init);
    }) as typeof window.fetch;
    return()=>{window.fetch=original as typeof window.fetch};
  },[]);
  return null;
};
