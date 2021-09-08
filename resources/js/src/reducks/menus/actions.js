export const POST_NAV = "POST_NAV";
export const PostNavAction = (menusState) => {
  return {
    type: "POST_NAV",
    payload: {
      post_nav: menusState.post_nav,
    }
  }
}

export const GEAR_NAV = "GEAR_NAV";
export const GearNavAction = (menusState) => {
  return {
    type: "GEAR_NAV",
    payload: {
      gear_nav: menusState.gear_nav,
    }
  }
}