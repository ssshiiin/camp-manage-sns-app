import { getProfileAction } from './actions';

//プロフィール取得
export const getProfile = (user_id) => {
  return async (dispatch, getState) => {
    console.log('getProfile');
    const url = `/profiles/${user_id}`;

    await axios
      .get(url)
      .then((res) => {
        const profile = () => {
          if (res.data.profile !== null) {
            return res.data.profile;
          } else {
            return {};
          }
        };
        dispatch(
          getProfileAction({
            profile: profile(),
          })
        );
      })
      .catch((err) => {
        console.log('err:', err);
      });
  };
};

//プロフィールの更新
export const update = (name, content, image, setErrors, setOpen) => {
  return async (dispatch, getState) => {
    console.log('updateProfile');
    const state = getState();
    const userId = state.users.user_id;
    const csrfToken = document.head.querySelector('meta[name="csrf-token"]').content;
    const data = new FormData();

    data.append('app_name', name === null ? '' : name);
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
        setOpen(false);
        setErrors([]);
      })
      .catch((err) => {
        setErrors(err.response.data.errors);
      });
  };
};
