export type FavoriteItem={id:string;title:string;url:string;type:string};
const FAV_KEY='sba_favorites_v1';const NOTIF_KEY='sba_notifications_seen_v1';
export const getFavorites=():FavoriteItem[]=>{try{return JSON.parse(localStorage.getItem(FAV_KEY)||'[]')}catch{return[]}};
export const isFavorite=(id:string)=>getFavorites().some(x=>x.id===id);
export const toggleFavorite=(item:FavoriteItem)=>{const items=getFavorites();const exists=items.some(x=>x.id===item.id);const next=exists?items.filter(x=>x.id!==item.id):[item,...items];localStorage.setItem(FAV_KEY,JSON.stringify(next));window.dispatchEvent(new CustomEvent('sba-favorites-changed',{detail:next}));return !exists};
export const markNotificationsSeen=()=>{localStorage.setItem(NOTIF_KEY,new Date().toISOString());window.dispatchEvent(new Event('sba-notifications-seen'))};
export const notificationsSeen=()=>!!localStorage.getItem(NOTIF_KEY);
