const initialState = {
  users: {
    isSignedIn: false,
    user_name: "",
    profile: {},
    app_name: "",
    prof_content: "",
    prof_bolb_url: "",
    prof_image: "",
    modal_open: false,
    menu_open: null
  },
  posts: {
    posts: [],
    count_posts: 0
  },
  gears: {
    gears: [],
    count_gears: 0
  }
}

export default initialState;