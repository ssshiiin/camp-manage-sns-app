export const SIGN_IN = "SIGN_IN";
export const signInAction = (userState) => {
  return {
    type: "SIGN_IN",
    payload: {
      isSignedIn: true,
      user_name: userState.user_name,
      user_id: userState.user_id,
    }
  }
}

export const PROFILE = "PROFILE";
export const ProfileAction = (userState) => {
  return {
    type: "PROFILE",
    payload: {
      profile_user_id: userState.profile_user_id, 
      profile: userState.profile,
    }
  }
}