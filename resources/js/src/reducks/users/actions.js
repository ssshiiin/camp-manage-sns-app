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
      profile: userState.profile,
    }
  }
}

export const EDIT_APPNAME = "EDIT_APPNAME";
export const editAppNameAction = (userState) => {
  return {
    type: "EDIT_APPNAME",
    payload: {
      app_name: userState.app_name, 
      store: userState.store
    }
  }
}

export const EDIT_PROFCONTENT = "EDIT_PROFCONTENT";
export const editProfContentAction = (userState) => {
  return {
    type: "EDIT_PROFCONTENT",
    payload: {
      prof_content: userState.prof_content, 
      store: userState.store,
      store: userState.store
    }
  }
}

export const EDIT_PROFBOLB = "EDIT_PROFBOLB";
export const editProfBolbAction = (userState) => {
  return {
    type: "EDIT_PROFBOLB",
    payload: {
      prof_bolb_url: userState.prof_bolb_url, 
      prof_image: userState.prof_image,
      store: userState.store
    }
  }
}

export const MENU_OPEN = "MENU_OPEN";
export const MenuAction = (userState) => {
  return {
    type: "MENU_OPEN",
    payload: {
      menu_open: userState.menu_open
    }
  }
} 

export const MODAL_OPEN = "MODAL_OPEN";
export const ModalAction = (userState) => {
  return {
    type: "MODAL_OPEN",
    payload: {
      modal_open: userState.modal_open
    }
  }
} 

export const STORE = "STORE";
export const StoreAction = (userState) => {
  return {
    type: "STORE",
    payload: {
      store: userState.store
    }
  }
}