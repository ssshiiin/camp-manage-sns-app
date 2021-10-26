import { push } from 'connected-react-router';
import axios from 'axios';
import moment from 'moment';
import { getPostsAction, PlacePostsAction, ShowPostAction } from './actions';
import { getProfile } from '../profiles/operations';

//プロフィールpost取得
export const getPosts = (userId) => {
  return async (dispatch, getState) => {
    console.log('getPosts');
    const url = `/posts/${userId}`;

    await axios
      .get(url)
      .then((res) => {
        dispatch(
          getPostsAction({
            posts: res.data.postsProfile,
            countPosts: res.data.countPosts,
          })
        );
      })
      .catch((err) => {
        console.log('err:', err);
      });
  };
};

//キャンプ場の検索
export const getPlacePosts = (place) => {
  return async (dispatch, getState) => {
    console.log('getPlacePosts');

    const url = `/api/posts/place`;

    await axios
      .get(url, {
        params: {
          place: place,
        },
      })
      .then((res) =>
        dispatch(
          PlacePostsAction({
            place_posts: res.data,
          })
        )
      )
      .catch((err) => {
        console.log(err);
      });
  };
};

//postの詳細
export const getShowPost = (postId) => {
  return async (dispatch, getState) => {
    console.log('getShowPost');
    const url = `/posts/show/${postId}`;

    await axios
      .get(url)
      .then((res) => {
        dispatch(
          ShowPostAction({
            post: res.data.data,
          })
        );
      })
      .catch((err) => {
        console.log('err:', err);
      });
  };
};

//
// export const getCountPosts = (userId) => {
//   return async (dispatch, getState) => {
//     console.log('getCountPosts');
//     const url = `/api/count/posts/${userId}`;

//     const response = await axios.get(url).catch((err) => {
//       console.log('err:', err);
//     });

//     dispatch(
//       countPostsAction({
//         count_posts: response.data,
//       })
//     );
//   };
// };

//他人のプロフィールからsidebarから自分のプロフィールに飛んだときの再描画
export const pushMyProfile = (userId) => {
  return async (dispatch, getState) => {
    dispatch(getPosts(userId));
    dispatch(getProfile(userId));
    dispatch(push(`/${userId}`));
  };
};

//postの作成
export const create = (place, date, content, image, setErrors, resetState) => {
  return async (dispatch, getState) => {
    console.log('createPost');
    const state = getState();
    const csrfToken = document.head.querySelector('meta[name="csrf-token"]').content;
    const userId = state.users.user_id;

    const data = new FormData();

    data.append('place', place === null ? '' : place);
    data.append('day', date === null ? '' : moment(date).format('YYYY/MM/DD'));
    data.append('content', content === null ? '' : content);
    data.append(`img`, image === null ? '' : image);
    data.append('_token', csrfToken);

    const url = `/posts/create/${userId}`;
    await axios
      .post(url, data, {
        headers: {
          'content-type': 'multipart/form-data',
        },
      })
      .then((res) => {
        dispatch(
          getPostsAction({
            posts: res.data.postsProfile,
            countPosts: res.data.countPosts,
          })
        );
        resetState();
      })
      .catch((err) => {
        setErrors(err.response.data.errors);
      });
  };
};

//postの更新
export const update = (postId, place, date, content, image, setErrors, setOpen) => {
  return async (dispatch, getState) => {
    console.log('updatePost');
    const state = getState();
    const csrfToken = document.head.querySelector('meta[name="csrf-token"]').content;

    const data = new FormData();

    data.append('place', place === null ? '' : place);
    data.append('day', date === null ? '' : moment(date).format('YYYY/MM/DD'));
    data.append('content', content === null ? '' : content);
    data.append(`img`, image === null || typeof image === 'undefined' ? '' : image);
    data.append('_token', csrfToken);

    const url = `/posts/update/${postId}`;
    await axios
      .post(url, data, {
        headers: {
          'content-type': 'multipart/form-data',
        },
      })
      .then((res) => {
        dispatch(
          ShowPostAction({
            post: res.data.data,
          })
        );
        setOpen(false);
      })
      .catch((err) => {
        setErrors(err.response.data.errors);
      });
  };
};

export const destroy = (postId) => {
  return async (dispatch, getState) => {
    const state = getState();
    const userId = state.users.user_id;
    const url = `/posts/delete/${postId}`;

    await axios
      .delete(url)
      .then((res) => {
        dispatch(
          getPostsAction({
            posts: res.data.postsProfile,
            countPosts: res.data.countPosts,
          })
        );
        dispatch(push(`/${userId}`));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
