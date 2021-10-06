import axios from 'axios';

export const store = (userId, postId) => {
  return async (dispatch, getState) => {
    const url = `/nices`;
    console.log('nices');
    console.log(userId);
    console.log('nices');
    await axios.post(url, {
      user_id: userId,
      post_id: postId,
    });
  };
};

export const destroy = (userId, postId) => {
  return async (dispatch, getState) => {
    const url = `/nices/destroy`;
    await axios.post(url, {
      user_id: userId,
      post_id: postId,
    });
  };
};
