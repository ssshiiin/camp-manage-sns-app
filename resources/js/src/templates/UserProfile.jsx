import React, { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import { useImage, useString } from '../Function';

const UserProfile = memo((props) => {
  const posts = useSelector((state) => state.posts);
  const gears = useSelector((state) => state.gears);
  const profiles = useSelector((state) => state.profiles);
  const profile = profiles.profile;
  const countPosts = posts.countPosts;
  const countGears = gears.countGears;
  const name = profile.app_name;
  const content = profile.profile;
  const bolb = profile.image_path;

  return (
    <div className="profile-introduce">
      <Avatar aria-label="recipe" className="profile-image" src={bolb} />
      <div className="profile-content">
        <div className="profileColumn">
          <p className="profileName">{name}</p>
          <div className="profileCount">
            <p>実績 : {countPosts}</p>
            <p>所持ギア : {countGears}</p>
          </div>
        </div>
        <div className="profileContent">{content}</div>
      </div>
    </div>
  );
});

export default UserProfile;
