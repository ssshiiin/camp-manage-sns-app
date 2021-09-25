import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountGears } from "../reducks/gears/operations";
import { getCountPosts } from "../reducks/posts/operations";
import { getProfile } from "../reducks/users/operations";
import Avatar from "@material-ui/core/Avatar";

const UserProfile = (props) => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const user_id = props.user_id;
  const app_name = selector.users.app_name;
  const content = selector.users.prof_content;
  const image = selector.users.prof_bolb_url;
  const count_posts = selector.posts.posts_count;
  const count_gears = selector.posts.gears_count;

  useEffect(() => {
    dispatch(getProfile(user_id));
  }, [user_id])

  return (
    <div className="profile-introduce">
      <Avatar aria-label="recipe" className="profile-image" src={image} />
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
    </div >
  )

}

export default UserProfile;