import { signInAction } from './actions';
import axios from 'axios';

//ユーザーがサインインしているか確認
export const signInUser = () => {
  return async (dispach, getState) => {
    const state = getState();
    const isSignedIn = state.users.isSignedIn;

    if (!isSignedIn) {
      console.log('getUser');
      const url = '/user';

      await axios
        .get(url)
        .then((res) => {
          dispach(
            signInAction({
              isSignedIn: true,
              user_id: res.data.id,
            })
          );
        })
        .catch((err) => {
          console.log('err:', err);
        });
    }
  };
};
