import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import SimpleModal from './SimpleModal';

const PostCreate = React.forwardRef((props, ref) => {
    const [fileUrl, setFileUrl] = useState(null);
    const [content, setContent] = useState("");
    const [place, setPlace] = useState("");
    const [day, setDay] = useState("");
    
    const handleImageChange = (event) => {
        const image = event.target.files[0];
        const imageUrl = URL.createObjectURL(image);
        setFileUrl(imageUrl);
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
        event.preventDefault();
    }
    
    return (
        <MenuItem>
            <SimpleModal 
            nav={"投稿する"} 
            body=
                {
                <form onSubmit={handleSubmit}>
                    <label>
                        image : <input type="file" onChange={handleImageChange} /><br />
                        place : <input type="text" value={place} onChange={handlePlaceChange} /><br />
                        day : <input type="date" value={day} onChange={handleDayChange} /><br />
                        content : <textarea value={content} onChange={handleContentChange} />
                    </label>
                    <input type="submit" value="保存" />
                    <img src={fileUrl} style={{width: "320px"}} />
                </form>
                }
            />
        </MenuItem>
    )
})

export default PostCreate;