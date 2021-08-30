export const POSTS = "POSTS";
export const PostsAction = (postsState) => {
  return {
    type: "POSTS",
    payload: {
      posts: postsState.posts,
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