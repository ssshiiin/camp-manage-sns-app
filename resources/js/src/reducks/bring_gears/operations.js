import axios from 'axios';
import { getBringsAction, updateBringAction, updateNotBringAction } from './actions';

export const getBring = (userId) => {
  return async (dispatch, getState) => {
    const url = `/bring_gears/${userId}`;

    await axios
      .get(url)
      .then((res) => {
        dispatch(
          getBringsAction({
            brings: res.data.brings,
            brings_count_all: res.data.brings_count_all,
            brings_count_true: res.data.brings_count_true,
            not_brings: res.data.not_brings,
            not_brings_count_all: res.data.not_brings_count_all,
            not_brings_count_true: res.data.not_brings_count_true,
          })
        );
      })
      .catch((err) => {
        'getBringGear : ', console.log(err);
      });
  };
};

export const updateBringCheck = (is_check, id) => {
  return async (dispatch, getState) => {
    console.log('BringIs_check-----');

    const url = `/bring_gears/bring/${id}`;
    await axios
      .put(url, {
        is_check: is_check,
      })
      .then((res) => {
        dispatch(
          updateBringAction({
            brings: res.data.brings,
            brings_count_all: res.data.brings_count_all,
            brings_count_true: res.data.brings_count_true,
          })
        );
      })
      .catch((err) => console.log('updateBringCheck', err));
  };
};

export const updateBringsAllCheck = (user_id, is_check) => {
  return async (dispatch, getState) => {
    console.log('BringAllIs_check-----');
    const state = getState();

    const url = `/bring_gears/brings/${user_id}`;
    await axios
      .put(url, {
        is_check: is_check,
      })
      .then((res) => {
        dispatch(
          updateBringAction({
            brings: res.data.brings,
            brings_count_all: res.data.brings_count_all,
            brings_count_true: res.data.brings_count_true,
          })
        );
      })
      .catch((err) => console.log('updateBringsAllCheck', err));
  };
};

export const updateNotBringCheck = (is_check, id) => {
  return async (dispatch, getState) => {
    console.log('AddIs_check-----');
    const state = getState();
    const user_id = state.users.user_id;

    const url = `/bring_gears/not/bring/${id}`;
    await axios
      .put(url, {
        is_check: is_check,
      })
      .then((res) => {
        dispatch(
          updateNotBringAction({
            not_brings: res.data.not_brings,
            not_brings_count_all: res.data.not_brings_count_all,
            not_brings_count_true: res.data.not_brings_count_true,
          })
        );
      })
      .catch((err) => console.log('updateNotBringCheck', err));
  };
};

export const updateNotBringsAllCheck = (user_id, is_check) => {
  return async (dispatch, getState) => {
    console.log('AddAllIs_check-----');
    const state = getState();

    const url = `/bring_gears/not/brings/${user_id}`;
    await axios
      .put(url, {
        is_check: is_check,
      })
      .then((res) => {
        dispatch(
          updateNotBringAction({
            not_brings: res.data.not_brings,
            not_brings_count_all: res.data.not_brings_count_all,
            not_brings_count_true: res.data.not_brings_count_true,
          })
        );
      })
      .catch((err) => console.log('updateNotBringsAllCheck', err));
  };
};

export const create = (id) => {
  return async (dispatch, getState) => {
    console.log('createBringGear-----');
    const state = getState();
    const user_id = state.users.user_id;

    const url = `/bring_gears/create/${id}`;
    await axios
      .post(url)
      .then((res) => {
        dispatch(
          getBringsAction({
            brings: res.data.brings,
            brings_count_all: res.data.brings_count_all,
            brings_count_true: res.data.brings_count_true,
            not_brings: res.data.not_brings,
            not_brings_count_all: res.data.not_brings_count_all,
            not_brings_count_true: res.data.not_brings_count_true,
          })
        );
      })
      .catch((err) => {
        console.log('createBrings', err);
      });
  };
};

export const destroy = (id) => {
  return async (dispatch, getState) => {
    console.log('deleteBringGear-----');
    const state = getState();
    const user_id = state.users.user_id;

    const url = `/bring_gears/delete/${id}`;
    await axios
      .delete(url)
      .then((res) => {
        dispatch(
          getBringsAction({
            brings: res.data.brings,
            brings_count_all: res.data.brings_count_all,
            brings_count_true: res.data.brings_count_true,
            not_brings: res.data.not_brings,
            not_brings_count_all: res.data.not_brings_count_all,
            not_brings_count_true: res.data.not_brings_count_true,
          })
        );
      })
      .catch((err) => {
        console.log('deleteBrings', err);
      });
  };
};
