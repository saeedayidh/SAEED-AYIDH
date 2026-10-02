import React,{useEffect}from'react';
import {useNavigationType} from 'react-router-dom';
import {scrollPageToHash} from '../lib/pageScroll';
export const SaeedCardNavigation:React.FC=()=>{
 const navigationType=useNavigationType();
 useEffect(()=>{
  const anchor=sessionStorage.getItem('sba_return_card');
  if(!anchor)return;
  sessionStorage.removeItem('sba_return_card');
  // A return marker applies only to the explicit in-app back action.
  if(navigationType!=='POP')return;
  let timer:number|undefined;
  const frame=requestAnimationFrame(()=>{timer=window.setTimeout(()=>scrollPageToHash('#'+encodeURIComponent(anchor)),120)});
  return()=>{cancelAnimationFrame(frame);if(timer!==undefined)window.clearTimeout(timer)};
 },[navigationType]);
 return null;
};
