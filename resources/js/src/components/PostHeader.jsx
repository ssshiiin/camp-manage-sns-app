import React from 'react';

function PostHeader(props) {
  return (
    <div className="post-header">
      <ul>
        <li>
          <div className="post-header-userImage" style={{ backgroundImage: `url(${props.profile_image})` }}></div>
        </li>
        <li className="post-header-index">
          <ul>
            <li className="post-header-index-title">Place : </li>
            <li className="post-header-index-content">{props.place}</li>
          </ul>
          <ul>
            <li className="post-header-index-title">Day : </li>
            <li className="post-header-index-content">{props.day}</li>
          </ul>
        </li>
      </ul>
    </div>
  )
}

export default PostHeader;