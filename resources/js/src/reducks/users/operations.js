import { signInAction } from "./actions";
import { push } from "connected-react-router";
import axios from 'axios';

export const SignIn = () => {
  return async (dispach, getState) => {
    const state = getState()
    const isSignIn = state.users.isSignIn;

    if (!isSignIn) {
      const url = "/api/user"

      const response = await axios.get(url)
        .catch(err => {console.log('err:', err);});
      
      dispach(signInAction({
        isSignIn: true,
        user_name: response.data.name,
        user_id: response.data.id
      }))
    }
  }
}