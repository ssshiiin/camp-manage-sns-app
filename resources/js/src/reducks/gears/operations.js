import axios from 'axios';
import { push } from 'connected-react-router';
import moment from 'moment';
import { openModalGearCreateAction } from '../modals/actions';
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

//Gearを編集するために各項目をstateに保存する
export const getShowGears = (gear_id) => {
  return async (dispatch, getState) => {
    console.log('getShowGears');
    const url = `/gears/show/${gear_id}`;

    await axios
      .get(url)
      .then((res) => {
        console.log(res);
        dispatch(
          changeGearNameAction({
            gearName: res.data.data.gear_name,
          })
        );
        dispatch(
          changeCategoryAction({
            category: res.data.data.category,
          })
        );
        dispatch(
          changeBrandAction({
            brand: res.data.data.brand,
          })
        );
        dispatch(
          changeAmountAction({
            amount: res.data.data.amount,
          })
        );
        dispatch(
          changePriceAction({
            price: res.data.data.price,
          })
        );
        dispatch(
          changePurchasedDayAction({
            purchasedDay: res.data.data.purchased_day,
          })
        );
        dispatch(
          changeImageAction({
            bolbUrl: res.data.data.gear_images[0].image_path,
          })
        );
        dispatch(
          catchErrorsAction({
            errors: [],
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

export const create = () => {
  return async (dispatch, getState) => {
    console.log('createGear');
    const state = getState();
    const csrfToken = document.head.querySelector('meta[name="csrf-token"]').content;
    const gearName = state.gears.gearName;
    const category = state.gears.category;
    const day = state.gears.purchasedDay;
    const brand = state.gears.brand;
    const price = state.gears.price;
    const amount = state.gears.amount;
    const image = state.gears.image;
    const user_id = state.users.user_id;

    const data = new FormData();

    data.append('gear_name', gearName === null ? '' : gearName);
    data.append('category', category === null ? '' : category);
    data.append('brand', brand === null ? '' : brand);
    data.append('purchased_day', day === null ? '' : moment(day).format('YYYY/MM/DD'));
    data.append('price', price === null ? '' : price);
    data.append('amount', amount === null ? '' : amount);
    data.append(`img`, image === null ? '' : image);
    data.append('_token', csrfToken);

    const url = `/gears/create/${user_id}`;
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
        dispatch(
          openModalGearCreateAction({
            modalGearCreate: false,
          })
        );
      })
      .catch((err) => {
        dispatch(
          catchErrorsAction({
            errors: err.response.data.errors,
          })
        );
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

export const handleImageChange = (event) => {
  return (dispatch, getState) => {
    const image = event.target.files[0];
    const bolbUrl = URL.createObjectURL(image);
    dispatch(
      changeImageAction({
        bolbUrl: bolbUrl,
        image: image,
      })
    );
  };
};

export const handleGearNameChange = (event) => {
  return (dispatch, getState) => {
    dispatch(
      changeGearNameAction({
        gearName: event.target.value,
      })
    );
  };
};

export const handleCategoryChange = (event) => {
  return (dispatch, getState) => {
    dispatch(
      changeCategoryAction({
        category: event.target.value,
      })
    );
  };
};

export const handleBrandChange = (event) => {
  return (dispatch, getState) => {
    dispatch(
      changeBrandAction({
        brand: event.target.value,
      })
    );
  };
};

export const handlePriceChange = (event) => {
  return (dispatch, getState) => {
    dispatch(
      changePriceAction({
        price: event.target.value,
      })
    );
  };
};

export const handleAmountChange = (event) => {
  return (dispatch, getState) => {
    dispatch(
      changeAmountAction({
        amount: event.target.value,
      })
    );
  };
};

export const handlePurchasedDayChange = (date) => {
  return (dispatch, getState) => {
    dispatch(
      changePurchasedDayAction({
        purchasedDay: date,
      })
    );
  };
};
