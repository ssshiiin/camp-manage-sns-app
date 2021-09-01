import { ModalAction, ProfileAction, signInAction, MenuAction,
  editAppNameAction, editProfBolbAction, editProfContentAction, 
  SuccessAction } from "./actions";
import axios from 'axios';

export const SignIn = () => {
  return async (dispach, getState) => {
    const state = getState()
    const isSignedIn = state.users.isSignIn;
    

    if (!isSignedIn) {
      console.log("getUser");
      const url = "/api/user";

      const response = await axios.get(url)
        .catch(err => { console.log('err:', err); });
      
      dispach(signInAction({
        user_name: response.data.name,
        user_id: response.data.id
      }))
    }
  }
}

export const getProfile = (user_id) => {
  return async (dispatch, getState) => {
    console.log("getProfile");
    const url = `/api/profiles/${user_id}`
    
    const response = await axios.get(url)
      .catch((err) => {console.log("err:", err)});
    

    dispatch(ProfileAction({
      profile: response.data,
    }));

    dispatch(editAppNameAction({
      app_name: response.data.app_name,
      store: true
    }));

    dispatch(editProfContentAction({
      prof_content: response.data.profile,
      store: true
    }));

    dispatch(editProfBolbAction({
      prof_bolb_url: response.data.image_path,
      store: true
    }));
    
  }
}

export const updateProfile = (user_id) => {
  return async (dispatch, getState) => {
    console.log("updateProfile");
    dispatch(ModalAction({
      modal_open: false
    }));

    dispatch(MenuAction({
      menu_open: null
    }));
    
    const state = getState();
    const csrf_token = document.head.querySelector('meta[name="csrf-token"]').content;
    const app_name = state.users.app_name;
    const prof_content = state.users.prof_content;
    const prof_image = state.users.prof_image;
    const data = new FormData();
    data.append("app_name", app_name);
    data.append("profile", prof_content);
    data.append("0", prof_image);
    data.append("_token", csrf_token);
    const url = `/api/profiles/edit/${user_id}`;
    
    const response = await axios.post(url, 
      data, 
      {
        headers: {
          'content-type': 'multipart/form-data',
          }
      })
      .catch((err) => {console.log("err:", err)});
    

    dispatch(ProfileAction({
      profile: response.data
    }));
    dispatch(SuccessAction({
      success: true
    }));
  }
}