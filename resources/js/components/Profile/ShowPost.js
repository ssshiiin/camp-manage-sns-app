import React, { useState, useEffect } from 'react';
import axios from 'axios';

import PostHeader from '../Home/PostHeader';
import PostImage from '../Home/PostImage';
import PostContent from '../Home/PostContent';

function ShowPost(props){
    const [posts, setPosts] = useState([]);
    
    useEffect(() => {
        getPost();
    }, [])
    
    const getPost = async () => {
        const response = await axios.get(`/api/posts/show/${props.match.params.post_id}`);
        setPosts(response.data);
    }
    
    console.log(posts)
    return (
        <div className="profile-main-post-index">
            <ul>
            {posts.map((post) => 
                <li key={post.id}>
                    <PostHeader place={post.place} day={post.day} />
                    <PostImage post_images={post.post_images} /> 
                    <PostContent content={post.content} tags={post.tags} />
                </li>
            )}
            </ul>
        </div>
    )
}

export default ShowPost;