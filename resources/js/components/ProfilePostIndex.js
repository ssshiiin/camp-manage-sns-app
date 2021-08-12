import React, { useState, useEffect } from 'react';
import axios from 'axios';

import PostHeader from './PostHeader';
import PostImage from './PostImage';
import PostContent from './PostContent';

function ProfilePostIndex(props){
    const [posts, setPosts] = useState([]);
    
    useEffect(() => {
        getPost();
    }, [])
    
    const getPost = async () => {
        const response = await axios.get(`/api/posts/${props.match.params.id}/${props.match.params.post_id}`);
        setPosts(response.data.data);
        console.log(response.data.data);
    }
    
    return (
        <div className="profile-main-post-index">
            <ul>
            {posts.map((post) => 
                <li key={post.id}>
                    <PostHeader place={post.place} day={post.day} />
                    <PostImage image_path={post.image_path} /> 
                    <PostContent content={post.content} tags={post.tags} />
                </li>
            )}
            </ul>
        </div>
    )
}

export default ProfilePostIndex;