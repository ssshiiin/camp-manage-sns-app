const initialState = {
  users: {
    isSignedIn: false,
    user_name: "",
    profile: {},
    app_name: "",
    prof_content: "",
    prof_bolb_url: "",
    prof_image: "",
    menu_open: null,
  },
  posts: {
    posts: [],
    count_posts: 0,
    post_place: "",
    post_day: "",
    post_content: "",
    post_bolb_urls: [],
    post_images: []
  },
  gears: {
    gears: [],
    count_gears: 0
  }, 
  modals: {
    modal_prof_edit_open: false,
  }, 
  alerts: {
    open: false,
    store: true,
    success: false
  }
}

export default initialState;