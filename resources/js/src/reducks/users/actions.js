export const SIGN_IN = 'SIGN_IN';
export const signInAction = (userState) => {
  return {
    type: 'SIGN_IN',
    payload: {
      isSignedIn: true,
      user_id: userState.user_id,
    },
  };
};

export const LOADING = 'LOADING';
export const loadingAction = (userState) => {
  return {
    type: 'LOADING',
    payload: {
      loading: true,
    },
  };
};
