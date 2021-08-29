import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountPosts } from "../reducks/posts/operations";
import { getProfile } from "../reducks/users/operations";

const UserProfile = (props) => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const user_id = props.user_id;
  const profile = selector.users.profile;
  const count_posts = selector.posts.count_posts;
  const count_gears = 25;

  useEffect(() => {
    dispatch(getProfile(user_id));
    dispatch(getCountPosts(user_id));
  }, [])

  return (
    <div className="profile-introduce">
      <div className="profile-image" style={{ backgroundImage: `url(${profile.image_path})` }}></div>
      <div className="profile-content">
        <div className="profileColumn">
          <p className="profileName">{profile.app_name}</p>
          <div className="profileCount">
            <p>実績 : {count_posts}</p>
            <p>所持ギア : {count_gears}</p>
          </div>
        </div>
        <div className="profileContent">{profile.profile}</div>
      </div>
    </div>
  )

}

export default UserProfile;