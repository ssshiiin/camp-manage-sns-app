import React from 'react';

function UserProfile(props){
    return (
        <div className="profile-introduce">
            <div className="profile-image" style={{backgroundImage: `url(${props.profile.image_path})`}}></div>
            <div className="profile-content">
                <div className="profileColumn">
                    <p className="profileName">{props.profile.app_name}</p>
                    <div className="profileCount">
                        <p>実績 : {props.countPost}</p>
                        <p>所持ギア : {props.countGear}</p>
                    </div>
                </div>
                <div className="profileContent">{props.profile.profile}</div>
            </div>
        </div>
    )
}

export default UserProfile;