import React, { useState, useEffect } from 'react';
import axios from 'axios';

import MenuItem from '@material-ui/core/MenuItem';

import SimpleModal from './SimpleModal';

function EditProfile(props){
    const [app_name, setApp_name] = useState("");
    const [profile, setProfile] = useState("");
    
    const handleClick = () => {
        setApp_name(props.profile.app_name);
        setProfile(props.profile.profile);
    };
    
    const handleApp_nameChange = (event) => {
        setApp_name(event.target.value);
    };
    
    const handleProfileChange = (event) => {
        setProfile(event.target.value);
    };
    
    const handleSubmit = (event) => {
        alert('保存しました');
        editProfile();
        event.preventDefault();
    }
    
    const editProfile = async () => {
        const response = axios.post(`api/edit/profile/${props.user_id}`, 
        [app_name, profile]);
        props.getProfile();
    }
    
    return (
        <MenuItem onClick={handleClick}>
            <SimpleModal 
            nav={"プロフィールを編集する"} 
            body=
                {
                <form onSubmit={handleSubmit}>
                    <label>
                        <input type="text" value={app_name} onChange={handleApp_nameChange} /><br />
                        <textarea  value={profile} onChange={handleProfileChange} />
                    </label>
                    <input type="submit" value="保存" />
                </form>
                }
            />
        </MenuItem>
    )
}

export default EditProfile;