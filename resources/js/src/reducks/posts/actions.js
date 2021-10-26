export const POSTS = 'POSTS';
export const getPostsAction = (postState) => {
  return {
    type: 'POSTS',
    payload: {
      posts: postState.posts,
      countPosts: postState.countPosts,
    },
  };
};

export const PLACE_POSTS = 'PLACE_POSTS';
export const PlacePostsAction = (postState) => {
  return {
    type: 'PLACE_POSTS',
    payload: {
      place_posts: postState.place_posts,
    },
  };
};

export const SHOW_POST = 'SHOW_POST';
export const ShowPostAction = (postState) => {
  return {
    type: 'SHOW_POST',
    payload: {
      post: postState.post,
    },
  };
};

export const COUNT_POSTS = 'COUNT_POSTS';
export const countPostsAction = (postState) => {
  return {
    type: 'COUNT_POSTS',
    payload: {
      count_posts: postState.count_posts,
    },
  };
};
