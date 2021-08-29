import React from 'react';
import { push } from 'connected-react-router';
import { useDispatch, useSelector } from "react-redux";
import { UserProfile, IndexPosts } from '../templates';

function Profile(props) {
  const user_id = props.match.params.id;


  return (
    <div className="profile">
      <div className="profile-main">
        <UserProfile user_id={user_id} />
        <ul className="profile-nav">
          <li onClick={() => dispatch(push(`/${user.id}`))}><p>Achivement</p></li>
          <li onClick={() => dispatch(push(`/${user.id}/gear`))}><p>Gear Lists</p></li>
        </ul>
        <IndexPosts user_id={user_id} />
      </div>
    </div >
  )
}

export default Profile;
