export const POSTS = "POSTS";
export const PostsAction = (postsState) => {
  return {
    type: "POSTS",
    payload: {
      posts: postsState.posts,
    }
  }
}

export const SHOW_POST = "SHOW_POST";
export const ShowPostAction = (postsState) => {
  return {
    type: "SHOW_POST",
    payload: {
      post: postsState.post,
    }
  }
}

export const COUNT_POSTS = "COUNT_POSTS";
export const countPostsAction = (postsState) => {
  return {
    type: "COUNT_POSTS",
    payload: {
      count_posts: postsState.count_posts
    }
  }
}

export const CREATE_PLACE = "CREATE_PLACE"
export const CreatePlaceAction =  (postsState) => {
  return {
    type: "CREATE_PLACE",
    payload: {
      post_place: postsState.post_place,
    }
  }
}

export const CREATE_DAY = "CREATE_DAY"
export const CreateDayAction =  (postsState) => {
  return {
    type: "CREATE_DAY",
    payload: {
      post_day: postsState.post_day,
    }
  }
}

export const CREATE_CONTENT = "CREATE_CONTENT"
export const CreateContentAction =  (postsState) => {
  return {
    type: "CREATE_CONTENT",
    payload: {
      post_content: postsState.post_content,
    }
  }
}

export const CREATE_BOLB_URLS = "CREATE_BOLB_URLS"
export const CreateBolbAction =  (postsState) => {
  return {
    type: "CREATE_BOLB_URLS",
    payload: {
      post_bolb_urls: postsState.post_bolb_urls,
    }
  }
}

export const CREATE_IMAGES = "CREATE_IMAGES"
export const CreateImagesAction =  (postsState) => {
  return {
    type: "CREATE_IMAGES",
    payload: {
      post_bolb_urls: postsState.post_bolb_urls,
      post_image: postsState.post_image,
    }
  }
}

export const CREATE_ERRORS = "CREATE_ERRORS";
export const CreateErrorsAction = (postsState) => {
  return {
    type: "CREATE_ERRORS",
    payload: {
      create_errors: postsState.create_errors
    }
  }
}