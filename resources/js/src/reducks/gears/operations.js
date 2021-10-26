import axios from 'axios';
import { push } from 'connected-react-router';
import moment from 'moment';
import {
  CountGearsAction,
  changeAmountAction,
  changeBrandAction,
  changeCategoryAction,
  catchErrorsAction,
  changeGearNameAction,
  changeImageAction,
  changePriceAction,
  changePurchasedDayAction,
  getGearsAction,
} from './actions';

export const getGears = (user_id) => {
  return async (dispatch, getState) => {
    console.log('getGears');
    const url = `/gears/${user_id}`;

    await axios
      .get(url)
      .then((res) => {
        dispatch(
          getGearsAction({
            gears: res.data.gearsProfile,
            countGears: res.data.countGears,
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

// export const getCountGears = (user_id) => {
//   return async (dispatch, getState) => {
//     console.log('getCountGears');
//     const url = `/api/count/gears/${user_id}`;

//     const response = await axios.get(url).catch((err) => {
//       console.log(err);
//     });

//     dispatch(
//       CountGearsAction({
//         count_gears: response.data,
//       })
//     );
//   };
// };

export const create = (gear, category, brand, amount, price, date, image, setErrors, resetState) => {
  return async (dispatch, getState) => {
    console.log('createGear');
    const state = getState();
    const csrfToken = document.head.querySelector('meta[name="csrf-token"]').content;
    const userId = state.users.user_id;

    const data = new FormData();

    data.append('gear_name', gear === null ? '' : gear);
    data.append('category', category === null ? '' : category);
    data.append('brand', brand === null ? '' : brand);
    data.append('purchased_day', date === null ? '' : moment(date).format('YYYY/MM/DD'));
    data.append('price', price === null ? '' : price);
    data.append('amount', amount === null ? '' : amount);
    data.append(`img`, image === null ? '' : image);
    data.append('_token', csrfToken);

    const url = `/gears/create/${userId}`;
    await axios
      .post(url, data, {
        headers: {
          'content-type': 'multipart/form-data',
        },
      })
      .then((res) => {
        dispatch(
          getGearsAction({
            gears: res.data.gearsProfile,
            countGears: res.data.countGears,
          })
        );
        resetState();
      })
      .catch((err) => {
        setErrors(err.response.data.errors);
      });
  };
};

export const update = (gearId, gear, category, brand, amount, price, date, image, setErrors, setOpen) => {
  return async (dispatch, getState) => {
    console.log('updateGear');
    const csrfToken = document.head.querySelector('meta[name="csrf-token"]').content;

    const data = new FormData();

    data.append('gear_name', gear === null ? '' : gear);
    data.append('category', category === null ? '' : category);
    data.append('brand', brand === null ? '' : brand);
    data.append('purchased_day', date === null ? '' : moment(date).format('YYYY/MM/DD'));
    data.append('price', price === null ? '' : price);
    data.append('amount', amount === null ? '' : amount);
    data.append(`img`, image === null || typeof image === 'undefined' ? '' : image);
    data.append('_token', csrfToken);

    const url = `/gears/update/${gearId}`;
    await axios
      .post(url, data, {
        headers: {
          'content-type': 'multipart/form-data',
        },
      })
      .then((res) => {
        dispatch(
          getGearsAction({
            gears: res.data.gearsProfile,
            countGears: res.data.countGears,
          })
        );
        setOpen(false);
        setErrors([]);
      })
      .catch((err) => {
        setErrors(err.response.data.errors);
      });
  };
};

export const destroy = (gearId) => {
  return async (dispatch, getState) => {
    const state = getState();
    const userId = state.users.user_id;
    const url = `/gears/delete/${gearId}`;

    await axios
      .delete(url)
      .then((res) => {
        dispatch(
          getGearsAction({
            gears: res.data.gearsProfile,
            countGears: res.data.countGears,
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
