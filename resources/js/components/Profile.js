import React, { useState, useEffect } from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import axios from 'axios';

import Header from './Header';
import ProfileUser from './ProfileUser';
import ProfilePost from './ProfilePost';
import ProfileGear from './ProfileGear';
import ProfilePostIndex from './ProfilePostIndex';
import ProfileGearIndex from './ProfileGearIndex';

function Profile(props){
    const [profile, setProfile] = useState([]);
    const [countPost, setCountPost] = useState(0);
    const [countGear, setCountGear] = useState(0);
    
    useEffect(() => {
        getProfile();
        getCountPost();
        getCountGear();
    },[]);
    
    const getProfile = async () => {
        const response = await axios.get(`/api/profile/${props.match.params.id}`);
        setProfile(response.data);
    }
    
    const getCountPost = async () => {
        const response = await axios.get(`/api/count/post/${props.match.params.id}`);
        setCountPost(response.data);
    }
    
    const getCountGear = async () => {
        const response = await axios.get(`/api/count/gear/${props.match.params.id}`);
        setCountGear(response.data);
    }
    
    return (
        <div className="profile">
            <Header />
            <div className="profile-main">
            <ProfileUser profile={profile} countPost={countPost} countGear={countGear}/>
            <ul className="profile-nav">
                <Link to={`/${props.match.params.id}`}><li>Achivement</li></Link>
                <Link to={`/${props.match.params.id}/gear`}><li>Gear Lists</li></Link>
            </ul>
            <Switch>
                <Route path="/:id" exact component={ProfilePost} />
                <Route path="/:id/gear" exact component={ProfileGear} />
                <Route path="/:id/:post_id" exact component={ProfilePostIndex} />
                <Route path="/:id/gear/:gear_id" component={ProfileGearIndex} />
            </Switch>
            </div>
        </div>
    )
}

export default Profile;