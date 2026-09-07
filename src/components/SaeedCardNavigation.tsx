import React,{useEffect}from'react';
import{useNavigate}from'react-router-dom';

const sectionTypes:Record<string,string>={
  'saeed-press':'إعلام',
  'saeed-projects':'مشروع',
  'saeed-play':'لعبة',
  'saeed-stories':'قصة',
  'saeed-music':'شيلة',
  'saeed-frame':'تغطية',
};

const cardAnchor=(sectionId:string,title:string)=>`${sectionId}-card-${encodeURIComponent(title)}`;

export const SaeedCardNavigation:React.FC=()=>{
  const navigate=useNavigate();
  useEffect(()=>{
    const returnAnchor=sessionStorage.getItem('sba_return_card');
    if(returnAnchor){
      sessionStorage.removeItem('sba_return_card');
      requestAnimationFrame(()=>setTimeout(()=>document.getElementById(returnAnchor)?.scrollIntoView({behavior:'auto',block:'center'}),80));
    }
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
      const anchor=cardAnchor(section.id,title);
      card.id=anchor;
      sessionStorage.setItem('sba_source_card',anchor);
      navigate(`/saeed-item/${encodeURIComponent(type)}/${encodeURIComponent(title)}`,{state:{sourceAnchor:anchor}});
    };
    document.addEventListener('click',handler);
    return()=>document.removeEventListener('click',handler);
  },[navigate]);
  return null;
};
