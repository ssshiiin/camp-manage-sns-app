import { countPostsAction, PostsAction } from './actions';
import { push } from 'connected-react-router';
import axios from 'axios';
import { getProfile } from '../users/operations';
import { getCountGears } from '../gears/operations';


export const getPosts = (user_id) => {
  return async (dispatch, getState) => {
    console.log("getPosts");
    const url = `/api/posts/${user_id}`;

    const response = await axios.get(url)
      .catch(err => { console.log('err:', err); });
    
    dispatch(PostsAction({
      posts: response.data
    }));
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

export const pushMyProfile = (user_id) => {
  return async(dispatch, getState) => {
    dispatch(getPosts(user_id));
    dispatch(getProfile(user_id));
    dispatch(getCountPosts(user_id));
    dispatch(getCountGears(user_id));
    dispatch(push(`/${user_id}`));
  }
}