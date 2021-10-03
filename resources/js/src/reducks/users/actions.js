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

export const MENU_OPEN = 'MENU_OPEN';
export const MenuAction = (userState) => {
  return {
    type: 'MENU_OPEN',
    payload: {
      menu_open: userState.menu_open,
    },
  };
};
