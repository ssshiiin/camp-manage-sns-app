import { countPostsAction, PostsAction } from './actions';
import axios from 'axios';


export const getPosts = (user_id) => {
  return async (dispatch, getState) => {
    const state = getState();
    const posts_user_id = state.posts.posts_user_id;


    if (!(posts_user_id === user_id)) {
      console.log("getPosts");
      const url = `/api/posts/${user_id}`;

      const response = await axios.get(url)
        .catch(err => { console.log('err:', err); });
      
      dispatch(PostsAction({
        posts_user_id: user_id,
        posts: response.data
      }));
    }
  }
}

export const getCountPosts = (user_id) => {
  return async (dispatch, getState) => {
    console.log("getCountPosts");
    const url = `/api/count/posts/${user_id}`;
    
    const response = await axios.get(url)
      .catch((err) => {console.log("err:", err)})

    dispatch(countPostsAction({
      count_posts: response.data
    }))
  } 
}