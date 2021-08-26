import React from 'react';

function PostImage(props){
    return (
        <img src={props.post_images[0].image_path} className="post-img" />    
    )
}

export default PostImage;