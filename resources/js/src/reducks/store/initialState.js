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
    post: [],
    posts: [],
    count_posts: 0,
    post_place: "",
    post_day: new Date(),
    post_content: "",
    post_bolb_urls: [],
    post_images: []
  },
  gears: {
    gears: [],
    count_gears: 0,
    gear_name: "",
    gear_category: "",
    gear_purchased_day: new Date(),
    gear_brand: "",
    gear_price: "",
    gear_amount: "",
    gear_bolb_urls: [],
    gear_images: []
  }, 
  modals: {
    modal_prof_edit_open: false,
    modal_post_create_open: false,
    modal_gear_create_open: false,
    modal_post_edit_open: false,
    modal_gear_edit_open: false,
  }, 
  alerts: {
    open: false,
    store: true,
    success: false
  },
  menus: {
    post_nav: null,
    gear_nav: null,
  }
}

export default initialState;