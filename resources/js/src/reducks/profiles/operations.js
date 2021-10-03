import {
  getProfileAction,
  changeAppNameAction,
  changeImageAction,
  changeProfContentAction,
  catchErrorsAction,
} from './actions';
import { openModalProfEditAction } from '../modals/actions';

//プロフィール取得
export const getProfile = (user_id) => {
  return async (dispatch, getState) => {
    console.log('getProfile');
    const url = `/profiles/${user_id}`;

    await axios
      .get(url)
      .then((res) => {
        dispatch(
          getProfileAction({
            profile: res.data.profile,
          })
        );
        if (res.data.profile !== null) {
          dispatch(
            changeAppNameAction({
              appName: res.data.profile.app_name,
            })
          );
          dispatch(
            changeProfContentAction({
              profContent: res.data.profile.profile,
            })
          );
          dispatch(
            changeImageAction({
              bolbUrl: res.data.profile.image_path,
            })
          );
        }
      })
      .catch((err) => {
        console.log('err:', err);
      });
  };
};

//プロフィールの更新
export const update = () => {
  return async (dispatch, getState) => {
    console.log('updateProfile');
    const state = getState();
    const userId = state.users.user_id;
    const csrfToken = document.head.querySelector('meta[name="csrf-token"]').content;
    const appName = state.profiles.appName;
    const content = state.profiles.profContent;
    const image = state.profiles.image;
    const data = new FormData();

    data.append('app_name', appName === null ? '' : appName);
    data.append('profile', content === null ? '' : content);
    data.append(`img`, image === null || typeof image === 'undefined' ? '' : image);
    data.append('_token', csrfToken);

    const url = `/profiles/create/${userId}`;
    await axios
      .post(url, data, {
        headers: {
          'content-type': 'multipart/form-data',
        },
      })
      .then((res) => {
        dispatch(
          getProfileAction({
            profile: res.data.profile,
          })
        );
        dispatch(
          openModalProfEditAction({
            modalProfEdit: false,
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

export const handleAppNameChange = (event) => {
  return (dispatch, getState) => {
    dispatch(
      changeAppNameAction({
        appName: event.target.value,
      })
    );
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

export const handleProfileChange = (event) => {
  return (dispatch, getState) => {
    dispatch(
      changeProfContentAction({
        profContent: event.target.value,
      })
    );
  };
};
