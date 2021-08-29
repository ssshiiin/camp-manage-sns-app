const initialState = {
  users: {
    isSignedIn: false,
    user_name: "",
    profile_user_id: null, 
    profile: {},
  },
  posts: {
    posts_user_id: null,
    posts: [],
    count_posts: 0
  }
}

export default initialState;