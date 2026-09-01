// Engagement utility with LocalStorage persistence for likes, dislikes, and favorites

const LIKES_KEY = 'saeed_blog_likes';
const DISLIKES_KEY = 'saeed_blog_dislikes';
const FAVORITES_KEY = 'saeed_blog_favorites';

export interface EngagementState {
  liked: boolean;
  disliked: boolean;
  favorited: boolean;
}

export const getEngagementState = (postId: string): EngagementState => {
  try {
    const likes: string[] = JSON.parse(localStorage.getItem(LIKES_KEY) || '[]');
    const dislikes: string[] = JSON.parse(localStorage.getItem(DISLIKES_KEY) || '[]');
    const favorites: string[] = JSON.parse(localStorage.getItem(FAVORITES_KEY) || '[]');

    return {
      liked: likes.includes(postId),
      disliked: dislikes.includes(postId),
      favorited: favorites.includes(postId)
    };
  } catch {
    return { liked: false, disliked: false, favorited: false };
  }
};

export const toggleLike = (postId: string): EngagementState => {
  const likes: string[] = JSON.parse(localStorage.getItem(LIKES_KEY) || '[]');
  const dislikes: string[] = JSON.parse(localStorage.getItem(DISLIKES_KEY) || '[]');

  let newLikes = [...likes];
  let newDislikes = [...dislikes];

  if (newLikes.includes(postId)) {
    newLikes = newLikes.filter(id => id !== postId);
  } else {
    newLikes.push(postId);
    newDislikes = newDislikes.filter(id => id !== postId); // Mutual exclusivity
  }

  localStorage.setItem(LIKES_KEY, JSON.stringify(newLikes));
  localStorage.setItem(DISLIKES_KEY, JSON.stringify(newDislikes));

  return getEngagementState(postId);
};

export const toggleDislike = (postId: string): EngagementState => {
  const likes: string[] = JSON.parse(localStorage.getItem(LIKES_KEY) || '[]');
  const dislikes: string[] = JSON.parse(localStorage.getItem(DISLIKES_KEY) || '[]');

  let newLikes = [...likes];
  let newDislikes = [...dislikes];

  if (newDislikes.includes(postId)) {
    newDislikes = newDislikes.filter(id => id !== postId);
  } else {
    newDislikes.push(postId);
    newLikes = newLikes.filter(id => id !== postId); // Mutual exclusivity
  }

  localStorage.setItem(LIKES_KEY, JSON.stringify(newLikes));
  localStorage.setItem(DISLIKES_KEY, JSON.stringify(newDislikes));

  return getEngagementState(postId);
};

export const toggleFavorite = (postId: string): EngagementState => {
  const favorites: string[] = JSON.parse(localStorage.getItem(FAVORITES_KEY) || '[]');
  let newFavorites = [...favorites];

  if (newFavorites.includes(postId)) {
    newFavorites = newFavorites.filter(id => id !== postId);
  } else {
    newFavorites.push(postId);
  }

  localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
  return getEngagementState(postId);
};

export const getAllFavorites = (): string[] => {
  try {
    return JSON.parse(localStorage.getItem(FAVORITES_KEY) || '[]');
  } catch {
    return [];
  }
};
