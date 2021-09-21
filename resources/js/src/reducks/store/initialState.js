import { now } from "lodash";

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
    place_posts: [],
    count_posts: 0,
    post_place: "",
    post_day: null,
    post_content: "",
    post_bolb_urls: [],
    post_image: null,
    create_errors: [],
  },
  gears: {
    gears: [],
    count_gears: 0,
    gear_name: "",
    gear_category: "",
    gear_purchased_day: null,
    gear_brand: null,
    gear_price: null,
    gear_amount: null,
    gear_bolb_urls: [],
    gear_image: null,
    create_errors: []
  }, 
  modals: {
    modal_prof_edit_open: false,
    modal_post_create_open: false,
    modal_gear_create_open: false,
    modal_post_edit_open: false,
    modal_bring_edit_open: false,
    modal_templates_create_open: false,
    modal_templates_use_open: false,
  }, 
  alerts: {
    open: false,
    store: true,
    success: false
  },
  menus: {
    post_nav: null,
    gear_nav: null,
  },
  bring_gears: {
    bring_gears: [],
    add_gears: [],
    count_all: {},
    count_add_all: {},
  },
  templates: {
    templates: [],
    template_name: ""
  },
  schedules: {
    nap_camp: "ふもとっぱら",
    nap_check_in: "宿泊施設15：00～、キャンプ8：30～",
    nap_check_out: "宿泊施設～11：00、キャンプ～14：00",
    nap_address: "静岡県富士宮市麓156",
    dayout_camp: "ふもとっぱら",
    dayout_tel: "0544-52-2112",
    dayout_home_page: "http://fumotoppara.net/",
    schedule_place: "",
    schedule_day: ""
  }
}

export default initialState;