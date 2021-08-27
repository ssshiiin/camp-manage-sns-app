export const SIGN_IN = "SIGN_IN";
export const signInAction = (userState) => {
  return {
    type: "SIGN_IN",
    payload: {
      isSignIn: true,
      user_name: userState.user_name,
      user_id: userState.user_id,
    }
  }
}