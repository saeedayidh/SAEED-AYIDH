import React,{useEffect,useState}from'react';
import{PanelRightOpen,X,Languages,SlidersHorizontal,Blocks,LayoutGrid,Wand2}from'lucide-react';

const toolLabels=[
  {label:'إدارة أقسام سعيد',icon:LayoutGrid},
  {label:'إدارة المحتوى الكامل',icon:Blocks},
  {label:'إدارة الأقسام الخاصة',icon:Wand2},
  {label:'الحقول المتقدمة',icon:SlidersHorizontal},
  {label:'الترجمة الإنجليزية',icon:Languages},
];

export const AdminResponsiveShell: React.FC<React.PropsWithChildren> = ({ children }) => {
  const[open,setOpen]=useState(false);
  useEffect(()=>{const id='sba-admin-tool-hide';if(document.getElementById(id))return;const style=document.createElement('style');style.id=id;style.textContent=`body[data-admin-tools-ready="1"] button.fixed:not([data-admin-sidebar-toggle]){visibility:hidden!important;pointer-events:none!important}`;document.head.appendChild(style);document.body.dataset.adminToolsReady='1';return()=>{delete document.body.dataset.adminToolsReady;style.remove()}},[]);
  const launch=(label:string)=>{const buttons=Array.from(document.querySelectorAll<HTMLButtonElement>('button.fixed'));const target=buttons.find(b=>(b.textContent||'').trim().includes(label));target?.click();setOpen(false)};
  return <div className="min-h-screen"><button data-admin-sidebar-toggle onClick={()=>setOpen(v=>!v)} className="fixed left-4 top-24 z-[210] grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-[#151515] text-white shadow-2xl"><PanelRightOpen className="h-5 w-5"/></button>{open&&<><button aria-label="إغلاق" onClick={()=>setOpen(false)} className="fixed inset-0 z-[205] bg-black/55"/><aside className="fixed bottom-0 left-0 top-0 z-[220] w-[82%] max-w-xs border-r border-white/10 bg-[#0b0b0b] p-4 shadow-2xl" dir="rtl"><div className="mb-6 flex items-center justify-between"><div><div className="text-lg font-black">أدوات لوحة التحكم</div><div className="mt-1 text-xs text-gray-500">كل أدوات الإدارة في مكان واحد</div></div><button onClick={()=>setOpen(false)} className="rounded-xl border border-white/10 bg-[#151515] p-2"><X className="h-4 w-4"/></button></div><div className="space-y-2">{toolLabels.map(({label,icon:Icon})=><button key={label} onClick={()=>launch(label)} className="flex w-full items-center gap-3 rounded-xl border border-white/10 bg-[#121212] px-4 py-3 text-right text-sm font-bold transition hover:border-[#D51F2B]/50 hover:bg-[#171717]"><Icon className="h-4 w-4 text-[#D51F2B]"/><span>{label}</span></button>)}</div></aside></>}{children}</div>;
};