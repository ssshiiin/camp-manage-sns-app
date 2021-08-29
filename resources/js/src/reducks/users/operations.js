import { ProfileAction, signInAction } from "./actions";
import { push } from "connected-react-router";
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
    const state = getState();
    const profile_user_id = state.users.profile_user_id;
  

    if (!(profile_user_id === user_id)){
      console.log("getProfile");
      const url = `/api/profiles/${user_id}`
      
      const response = await axios.get(url)
        .catch((err) => {console.log("err:", err)});
      
  
      dispatch(ProfileAction({
        profile_user_id: user_id,
        profile: response.data
      }));
    }
  }
}