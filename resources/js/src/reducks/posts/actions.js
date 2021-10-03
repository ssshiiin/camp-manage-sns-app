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

export const CHANGE_PLACE = 'CHANGE_PLACE';
export const changePlaceAction = (postState) => {
  return {
    type: 'CHANGE_PLACE',
    payload: {
      place: postState.place,
    },
  };
};

export const CHANGE_DAY = 'CHANGE_DAY';
export const changeDayAction = (postState) => {
  return {
    type: 'CHANGE_DAY',
    payload: {
      day: postState.day,
    },
  };
};

export const CHANGE_CONTENT = 'CHANGE_CONTENT';
export const changeContentAction = (postState) => {
  return {
    type: 'CHANGE_CONTENT',
    payload: {
      content: postState.content,
    },
  };
};

export const CHANGE_IMAGE = 'CHANGE_IMAGE';
export const changeImageAction = (postState) => {
  return {
    type: 'CHANGE_IMAGE',
    payload: {
      bolbUrl: postState.bolbUrl,
      image: postState.image,
    },
  };
};

export const CATCH_ERRORS = 'CATCH_ERRORS';
export const catchErrorsAction = (postState) => {
  return {
    type: 'CATCH_ERRORS',
    payload: {
      errors: postState.errors,
    },
  };
};
