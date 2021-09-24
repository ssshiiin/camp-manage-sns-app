import { ProfileAction, signInAction, MenuAction,
  editAppNameAction, editProfBolbAction, editProfContentAction, errorAction } from "./actions";
import { AlertOpenAction, StoreAction, SuccessAction } from "../alerts/actions";
import { ModalProfEditAction } from "../modals/actions";
import axios from 'axios';


//ユーザーがサインインしているか確認
export const signInUser = () => {
  return async (dispach, getState) => {
    const state = getState()
    const isSignedIn = state.users.isSignedIn;
    

    if (!isSignedIn) {
      console.log("getUser");
      const url = "/api/user";

      await axios.get(url)
        .then((res) => {
          dispach(signInAction({
            isSignedIn: true,
            user_name: res.data.name,
            user_id: res.data.id
          }))
        })
        .catch(err => { console.log('err:', err); });
      
    }
  }
}

//プロフィール取得
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

//プロフィールの更新
export const updateProfile = (user_id) => {
  return async (dispatch, getState) => {
    console.log("updateProfile");
    const state = getState();
    const csrf_token = document.head.querySelector('meta[name="csrf-token"]').content;
    const app_name = state.users.app_name;
    const prof_content = state.users.prof_content;
    const prof_image = state.users.prof_image;
    const data = new FormData();

    data.append("app_name", (app_name === null) ? "": app_name)
    data.append("profile", (prof_content === null) ? "": prof_content)
    data.append(`img`, (prof_image === null || typeof prof_image === "undefined") ? "": prof_image)
    data.append("_token", csrf_token);

    const url = `/api/profiles/edit/${user_id}`;
    await axios.post(url, 
      data, 
      {
        headers: {
          'content-type': 'multipart/form-data',
          }
      })
      .then((res) => {
        dispatch(ProfileAction({
          profile: res.data
        }));
        dispatch(SuccessAction({
          success: true
        }));
        dispatch(AlertOpenAction({
          open: false
        }))
        dispatch(ModalProfEditAction({
          modal_prof_edit_open: false
        }));
        dispatch(MenuAction({
          menu_open: null
        }));
      })
      .catch((err) => {
        dispatch(errorAction({
          errors: err.response.data.errors
        }))
      });
    

  }
}


export const handleApp_nameChange = (event) => {
  return (dispatch, getState) => {
    dispatch(editAppNameAction({
      app_name: event.target.value,
    }));
    dispatch(StoreAction({
      store: false
    }));
  }
};

export const handleImageChange = (event) => {
  return (dispatch, getState) => {
    const image = event.target.files[0];
    const bolbUrl = (URL.createObjectURL(image));
    dispatch(editProfBolbAction({
      prof_bolb_url: bolbUrl,
      prof_image: image,
    }));
    dispatch(StoreAction({
      store: false
    }));
  }
};

export const handleProfileChange = (event) => {
  return (dispatch, getState) => {
    dispatch(editProfContentAction({
      prof_content: event.target.value,
    }));
    dispatch(StoreAction({
      store: false
    }));
  }
};

export const handleSubmit = () => {
  return (dispatch, getState) => {
    const state = getState();
    const user_id = state.users.user_id;
    dispatch(updateProfile(user_id));
  }
}