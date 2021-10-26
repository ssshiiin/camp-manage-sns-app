import { loadingAction, signInAction } from './actions';
import axios from 'axios';

//ユーザーがサインインしているか確認
export const signInUser = () => {
  return async (dispatch, getState) => {
    const state = getState();
    const isSignedIn = state.users.isSignedIn;

    if (!isSignedIn) {
      console.log('getUser');
      const url = '/user';

      await axios
        .get(url)
        .then((res) => {
          dispatch(
            signInAction({
              isSignedIn: true,
              user_id: res.data.id,
            })
          );
          dispatch(
            loadingAction({
              loading: true,
            })
          );
        })
        .catch((err) => {
          dispatch(
            loadingAction({
              loading: true,
            })
          );
          console.log('err:', err);
        });
    }
  };
};
