import axios from 'axios';
import { getSaveGearsAction } from './actions';

export const create = (gearId) => {
  return async (dispatch, getState) => {
    console.log('createSaveGears');
    const state = getState();
    const userId = state.users.user_id;
    const url = '/save_gears/create';

    await axios
      .post(url, {
        user_id: userId,
        gear_id: gearId,
      })
      .then((res) => {
        dispatch(
          getSaveGearsAction({
            save_gears: res.data.data,
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const getSaveGears = (userId) => {
  return async (dispatch, getState) => {
    console.log('getSaveGears');
    const state = getState();
    const url = `/save_gears/${userId}`;

    await axios
      .get(url)
      .then((res) => {
        dispatch(
          getSaveGearsAction({
            save_gears: res.data.data,
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
