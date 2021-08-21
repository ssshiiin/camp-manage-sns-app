import React from 'react';

function ProfileUser(props){
    return (
        <div className="profile-introduce">
            <div className="profile-image"></div>
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

export default ProfileUser;