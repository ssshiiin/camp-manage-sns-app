export const SIGN_IN = "SIGN_IN";
export const signInAction = (userState) => {
  return {
    type: "GET_USER_ID",
    payload: {
      isSignIn: true,
      user_name: userState.user_name,
      user_id: userState.user_id,
    }
  }
}