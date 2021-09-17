import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountGears } from "../reducks/gears/operations";
import { getCountPosts } from "../reducks/posts/operations";
import { getProfile } from "../reducks/users/operations";

const UserProfile = (props) => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const user_id = props.user_id;
  const app_name = selector.users.app_name;
  const content = selector.users.prof_content;
  const image = selector.users.prof_bolb_url;
  const count_posts = selector.posts.count_posts;
  const count_gears = selector.gears.count_gears;

  useEffect(() => {
    dispatch(getProfile(user_id));
    dispatch(getCountPosts(user_id));
    dispatch(getCountGears(user_id));
  }, [user_id])

  return (
    <div className="profile-introduce">
      <div className="profile-image" style={{ backgroundImage: `url(${image})` }}></div>
      <div className="profile-content">
        <div className="profileColumn">
          <p className="profileName">{app_name}</p>
          <div className="profileCount">
            <p>実績 : {count_posts}</p>
            <p>所持ギア : {count_gears}</p>
          </div>
        </div>
        <div className="profileContent">{content}</div>
      </div>
    </div>
  )

}

export default UserProfile;