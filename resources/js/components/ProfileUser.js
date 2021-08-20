import React from 'react';

function ProfileUser(props){
    return (
        <div className="profile-introduce">
            <div className="profile-image"></div>
            <div className="profile-content">
                <div>{props.profile.app_name}</div>
                <div>{props.profile.profile}</div>
                <div>{props.countPost}</div>
                <div>{props.countGear}</div>
            </div>
        </div>
    )
}

export default ProfileUser;