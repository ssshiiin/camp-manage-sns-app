import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ProfilePost(props){
    const [posts, setPosts] = useState([]);
    
    useEffect(() => {
        getPost();
    }, [])
    
    const getPost = async () => {
        console.log(props)
        const response = await axios.get(`/api/posts/${props.match.params.id}`);
        setPosts(response.data.data);
    }
    
    return (
        <div className="profile-main-posts">
            {posts.map((post) =>
                <Link to={`/${props.match.params.id}/${post.id}`} className="profile-main-posts-image" key={post.id}>
                    <p className="p-center">{post.place}<br />{post.day}</p>
                </Link>
            )}
        </div>
    )
}

export default ProfilePost;