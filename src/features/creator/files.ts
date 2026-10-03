export function saveFile(content:Blob|string,filename:string,type='text/plain;charset=utf-8'){
 const blob=typeof content==='string'?new Blob([content],{type}):content;
 const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=filename;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),60000);
}
export async function copyText(value:string){if(navigator.clipboard?.writeText){await navigator.clipboard.writeText(value);return;}const el=document.createElement('textarea');el.value=value;el.style.position='fixed';el.style.opacity='0';document.body.append(el);el.select();const ok=document.execCommand('copy');el.remove();if(!ok)throw Error('copy_failed');}
export async function svgToPng(svg:string,width:number,height:number){
 const url=URL.createObjectURL(new Blob([svg],{type:'image/svg+xml'}));
 try{const img=new Image();await new Promise<void>((resolve,reject)=>{img.onload=()=>resolve();img.onerror=reject;img.src=url});const c=document.createElement('canvas');c.width=width;c.height=height;const ctx=c.getContext('2d');if(!ctx)throw Error('canvas');ctx.drawImage(img,0,0,width,height);return await new Promise<Blob>((resolve,reject)=>c.toBlob(b=>b?resolve(b):reject(Error('encode')),'image/png'));}finally{URL.revokeObjectURL(url);}
}
export async function compressImage(file:File,targetKB:number,maxEdge:number,mime:'image/jpeg'|'image/webp'){
 if(!['image/jpeg','image/png','image/webp'].includes(file.type)||file.size>20*1024**2)throw Error('image_type');
 if(!Number.isFinite(targetKB)||targetKB<10||targetKB>10000||!Number.isFinite(maxEdge)||maxEdge<100||maxEdge>4096)throw Error('image_settings');
 const targetBytes=Math.min(targetKB*1024,file.size-1);
 const bitmap=await createImageBitmap(file);
 try{if(bitmap.width*bitmap.height>40_000_000)throw Error('image_pixels');const c=document.createElement('canvas');const ratio=Math.min(1,maxEdge/Math.max(bitmap.width,bitmap.height));let width=Math.max(1,Math.round(bitmap.width*ratio)),height=Math.max(1,Math.round(bitmap.height*ratio));
 for(let pass=0;pass<12;pass++){c.width=width;c.height=height;const ctx=c.getContext('2d');if(!ctx)throw Error('canvas');if(mime==='image/jpeg'){ctx.fillStyle='#fff';ctx.fillRect(0,0,width,height)}ctx.drawImage(bitmap,0,0,width,height);
 let lo=.1,hi=.95,best:Blob|null=null;
 for(let i=0;i<8;i++){const q=(lo+hi)/2;const blob=await new Promise<Blob>((resolve,reject)=>c.toBlob(b=>b?resolve(b):reject(Error('encode')),mime,q));if(blob.type!==mime)throw Error('image_encoder');if(blob.size<=targetBytes){best=blob;lo=q}else hi=q;}
 if(best)return {blob:best,width,height};width=Math.max(1,Math.floor(width*.8));height=Math.max(1,Math.floor(height*.8));}
 throw Error('image_target');
 }finally{bitmap.close();}
}
export async function imageToPng(url:string,width:number,height:number){
 const image=new Image();image.crossOrigin='anonymous';await new Promise<void>((resolve,reject)=>{image.onload=()=>resolve();image.onerror=reject;image.src=url});
 const canvas=document.createElement('canvas');canvas.width=width;canvas.height=height;const ctx=canvas.getContext('2d');if(!ctx)throw Error('canvas');
 const scale=Math.max(width/image.naturalWidth,height/image.naturalHeight);ctx.drawImage(image,(width-image.naturalWidth*scale)/2,(height-image.naturalHeight*scale)/2,image.naturalWidth*scale,image.naturalHeight*scale);
 return await new Promise<Blob>((resolve,reject)=>canvas.toBlob(b=>b?resolve(b):reject(Error('encode')),'image/png'));
}
