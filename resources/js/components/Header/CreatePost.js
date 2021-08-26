import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import SimpleModal from '../ReactUI/SimpleModal';

const CreatePost = React.forwardRef((props, ref) => {
    const csrf_token = document.head.querySelector('meta[name="csrf-token"]').content;
    const [bolbs, setBolbs] = useState([]);
    const [content, setContent] = useState("");
    const [place, setPlace] = useState("");
    const [day, setDay] = useState("");
    const [params, setParams] = useState(new FormData());
    
    const handleImageChange = (event) => {
        let bolbUrls = Array();
        const len = event.target.files["length"];
        for (let i=0; i<len; i++){
            const image = event.target.files[i];
            bolbUrls.push(URL.createObjectURL(image));
            params.append(`${i}`, image);
        }
        setBolbs(bolbUrls);
    };
    
    const handleContentChange = (event) => {
        setContent(event.target.value);
    };
    
    const handlePlaceChange = (event) => {
        setPlace(event.target.value);
    };
    
    const handleDayChange = (event) => {
        setDay(event.target.value);
    };
    
    const handleSubmit = (event) => {
        alert('保存しました');
        createPost();
        event.preventDefault();
    }
    
    const createPost = async () => {
        params.append("content", content)
        params.append("place", place)
        params.append("day", day)
        params.append("_token", csrf_token);
        
        const response = await axios.post(`/api/posts/create/${props.user_id}`, 
        params,
        {
          headers: {
            'content-type': 'multipart/form-data',
            }
        }
        );
        props.getUserPosts();
    }
    
    return (
        <MenuItem>
            <SimpleModal 
            nav={"投稿する"} 
            body=
                {
                <form onSubmit={handleSubmit}>
                    <label>
                        image : <input type="file" onChange={handleImageChange} multiple /><br />
                        place : <input type="text" value={place} onChange={handlePlaceChange} /><br />
                        day : <input type="date" value={day} onChange={handleDayChange} /><br />
                        content : <textarea value={content} onChange={handleContentChange} />
                    </label>
                    <input type="submit" value="保存" />
                    {bolbs.map((file) => (
                    <div>
                       <img src={file} style={{width: "200px", height: '200px', objectFit: 'contain'}} key={file}/> 
                    </div> 
                    ))}
                </form>
                }
            />
        </MenuItem>
    )
})

export default CreatePost;