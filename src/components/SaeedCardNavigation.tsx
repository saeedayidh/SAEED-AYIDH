import React,{useEffect}from'react';

const sectionTypes:Record<string,string>={
  'saeed-press':'إعلام',
  'saeed-projects':'مشروع',
  'saeed-play':'لعبة',
  'saeed-stories':'قصة',
  'saeed-music':'شيلة',
  'saeed-frame':'تغطية',
};

export const SaeedCardNavigation:React.FC=()=>{
  useEffect(()=>{
    const handler=(event:MouseEvent)=>{
      const target=event.target as HTMLElement|null;
      if(!target)return;
      const section=target.closest('section[id^="saeed-"]') as HTMLElement|null;
      if(!section||!sectionTypes[section.id])return;
      const card=target.closest('.group.relative.flex.flex-col') as HTMLElement|null;
      if(!card)return;
      const clickedButton=target.closest('button');
      if(clickedButton&&clickedButton.textContent?.trim()!=='استكشف')return;
      const title=card.querySelector('h3')?.textContent?.trim();
      if(!title)return;
      event.preventDefault();
      const type=sectionTypes[section.id];
      window.location.href=`/saeed-item/${encodeURIComponent(type)}/${encodeURIComponent(title)}`;
    };
    document.addEventListener('click',handler);
    return()=>document.removeEventListener('click',handler);
  },[]);
  return null;
};
