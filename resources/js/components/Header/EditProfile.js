import React, { useState, useEffect } from 'react';
import axios from 'axios';

import MenuItem from '@material-ui/core/MenuItem';

import SimpleModal from '../../src/components/SimpleModal';

function EditProfile(props){
    const csrf_token = document.head.querySelector('meta[name="csrf-token"]').content;
    const [app_name, setApp_name] = useState("");
    const [profile, setProfile] = useState("");
    const [bolb, setBolb] = useState("");
    const [params, setParams] = useState(new FormData());
    
    const handleImageChange = (event) => {
        const image = event.target.files[0];
        const bolbUrl = (URL.createObjectURL(image));
        params.append("0", image);
        setBolb(bolbUrl);
    };
    
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
        params.append("app_name", app_name);
        params.append("profile", profile);
        params.append("_token", csrf_token);
        
        const response = await axios.post(`/api/profiles/edit/${props.user_id}`, 
        params, 
        {
          headers: {
            'content-type': 'multipart/form-data',
            }
        }
        );
        props.getProfile();
    }
    
    return (
        <MenuItem>
            <SimpleModal 
            onClick={handleClick}
            nav={"プロフィールを編集する"} 
            body=
                {
                <form onSubmit={handleSubmit}>
                    <label>
                        <input type="file" onChange={handleImageChange} /><br />
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