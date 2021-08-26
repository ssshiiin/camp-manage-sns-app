import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function UserPosts(props){
    return (
        <div className="profile-main-posts">
            {props.posts.map((post) =>
                <Link to={`/${props.user_id}/post/${post.id}`} style={{backgroundImage: `url(${post.post_images[0].image_path})`}} className="profile-main-posts-image" key={post.id}>
                    <p className="p-center">{post.place}<br />{post.day}</p>
                </Link>
            )}
        </div>
    )
}

export default UserPosts;