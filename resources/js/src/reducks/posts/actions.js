export const POSTS = "POSTS";
export const PostsAction = (postsState) => {
  return {
    type: "POSTS",
    payload: {
      posts_user_id: postsState.posts_user_id,
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