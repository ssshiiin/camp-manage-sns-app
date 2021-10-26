const initialState = {
  users: {
    isSignedIn: false,
    loading: false,
    user_id: null,
  },
  profiles: {
    profile: {},
  },
  posts: {
    post: undefined,
    posts: [],
    countPosts: 0,
    place_posts: [],
  },
  gears: {
    gears: [],
    countGears: 0,
  },
  alerts: {
    open: false,
    store: true,
    success: false,
  },
  menus: {
    post_nav: null,
    gear_nav: null,
  },
  bring_gears: {
    brings: [],
    brings_count_all: undefined,
    brings_count_true: undefined,
    not_brings: [],
    not_brings_count_all: undefined,
    not_brings_count_true: undefined,
  },
  save_gears: {
    save_gears: [],
  },
  templates: {
    templates: [],
  },
  schedules: {
    nap_camp: 'ふもとっぱら',
    nap_check_in: '宿泊施設15：00～、キャンプ8：30～',
    nap_check_out: '宿泊施設～11：00、キャンプ～14：00',
    nap_address: '静岡県富士宮市麓156',
    dayout_camp: 'ふもとっぱら',
    dayout_tel: '0544-52-2112',
    dayout_home_page: 'http://fumotoppara.net/',
  },
};

export default initialState;
