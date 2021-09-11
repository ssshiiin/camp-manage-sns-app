import { countPostsAction, CreateContentAction, CreateDayAction, CreateImagesAction, CreatePlaceAction, CREATE_IMAGES, PostsAction, ShowPostAction } from './actions';
import { push } from 'connected-react-router';
import axios from 'axios';
import { getProfile } from '../users/operations';
import { getCountGears } from '../gears/operations';
import { AlertOpenAction, StoreAction, SuccessAction } from '../alerts/actions';
import { ModalPostCreateAction, ModalPostEditAction } from '../modals/actions';
import { MenuAction } from '../users/actions';
import { CreatePurchasedDayAction } from '../gears/actions';
import { PostNavAction } from '../menus/actions';


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

export const getShowPost = (user_id, post_id) => {
  return async (dispatch, getState) => {
    console.log("getShowPost");
    const url = `/api/posts/show/${post_id}`;

    const response = await axios.get(url)
      .catch(err => { console.log('err:', err); });
    
    dispatch(ShowPostAction({
      post: response.data.data
    }));

    dispatch(push(`/${user_id}/post/${post_id}`));
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

//他人のプロフィールからsidebarから自分のプロフィールに飛んだときの再描画
export const pushMyProfile = (user_id) => {
  return async(dispatch, getState) => {
    dispatch(getPosts(user_id));
    dispatch(getProfile(user_id));
    dispatch(getCountPosts(user_id));
    dispatch(getCountGears(user_id));
    dispatch(push(`/${user_id}`));
  }
}

export const createPost = () => {
  return async (dispatch, getState) => {
    console.log("createPost");
    const state = getState();
    const csrf_token = document.head.querySelector('meta[name="csrf-token"]').content;
    const place = state.posts.post_place;
    const day = state.posts.post_day;
    const content = state.posts.post_content;
    const images = state.posts.post_images;
    const user_id = state.users.user_id;
    
    const data = new FormData();

    data.append("place", place);
    data.append("day", day);
    data.append("content", content);
    images.map((image, i) => {
      data.append(`${i}`, image);
    });
    data.append("_token", csrf_token);

    const url = `/api/posts/create/${user_id}`;
    const response = await axios.post(url, 
      data, 
      {
        headers: {
          'content-type': 'multipart/form-data',
          }
      })
      .catch((err) => {console.log("err:", err)});
    

    dispatch(SuccessAction({
      success: true
    }));
    dispatch(AlertOpenAction({
      open: false
    }))
    dispatch(ModalPostCreateAction({
      modal_post_create_open: false
    }));
    dispatch(MenuAction({
      menu_open: null
    }));
    dispatch(StoreAction({
      store: true
    }));
    dispatch(push(`/${user_id}`));
  }
}

export const updatePost = (post_id) => {
  return async (dispatch, getState) => {
    console.log("updatePost");
    const state = getState();
    const csrf_token = document.head.querySelector('meta[name="csrf-token"]').content;
    const place = state.posts.post_place;
    const day = state.posts.post_day;
    const content = state.posts.post_content;
    const images = state.posts.post_images;
    const user_id = state.users.user_id;
    
    const data = new FormData();

    data.append("place", place);
    data.append("day", day);
    data.append("content", content);
    if(typeof images !== 'undefined'){
      images.map((image, i) => {
        data.append(`${i}`, image);
      });
    }
    data.append("_token", csrf_token);

    const url = `/api/posts/update/${post_id}`;
    const response = await axios.post(url, 
      data, 
      {
        headers: {
          'content-type': 'multipart/form-data',
          }
      })
      .catch((err) => {console.log("err:", err)});
    

    dispatch(SuccessAction({
      success: true
    }));
    dispatch(AlertOpenAction({
      open: false
    }))
    dispatch(ModalPostEditAction({
      modal_post_edit_open: false
    }));
    dispatch(PostNavAction({
      post_nav: null
    }));
    dispatch(StoreAction({
      store: true
    }));
    dispatch(push(`/${user_id}`));
  }
}

export const handleImageChange = (event) => {
  return (dispatch, getState) => {
    let images = Array();
    let bolbUrls = Array();
    const len = event.target.files["length"];
    console.log(len)
    for (let i=0; i<len; i++){
      const image = event.target.files[i];
      images.push(image);
      bolbUrls.push(URL.createObjectURL(image));
    }
    dispatch(CreateImagesAction({
      post_bolb_urls: bolbUrls,
      post_images: images,
    }));
    dispatch(StoreAction({
      store: false
    }));
    dispatch(SuccessAction({
      success: false
    }));
  }
};

export const handlePlaceChange = (event) => {
  return (dispatch, getState) => {
    dispatch(CreatePlaceAction({
      post_place: event.target.value,
    }));
    dispatch(StoreAction({
      store: false
    }));
    dispatch(SuccessAction({
      success: false
    }));
  }
};


export const handleDayChange = (date) => {
  return (dispatch, getState) => {
    dispatch(CreateDayAction({
      post_day: date,
    }));
    dispatch(StoreAction({
      store: false
    }));
    dispatch(SuccessAction({
      success: false
    }));
  }
};

export const handleContentChange = (event) => {
  return (dispatch, getState) => {
    dispatch(CreateContentAction({
      post_content: event.target.value,
    }));
    dispatch(StoreAction({
      store: false
    }));
    dispatch(SuccessAction({
      success: false
    }));
  }
};

export const deletePost = (post_id) => {
  return async (dispatch, getState) => {
    const state = getState();
    const user_id = state.users.user_id;
    const url = `/api/posts/delete/${post_id}`;

    const response = await axios.post(url)
      .catch((err) => {console.log(err);});

    dispatch(push(`/${user_id}`));
  }
}