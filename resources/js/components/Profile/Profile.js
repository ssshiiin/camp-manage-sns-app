import React, { useState, useEffect } from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import axios from 'axios';

import Header from '../Header/Header';
import UserProfile from './UserProfile';
import UserPosts from './UserPosts';
import UserGears from './UserGears';
import ShowPost from './ShowPost';
import ShowGear from './ShowGear';

function Profile(props){
    const [profile, setProfile] = useState([]);
    const [countPost, setCountPost] = useState(0);
    const [countGear, setCountGear] = useState(0);
    const [posts, setPosts] = useState([]);
    
    
    useEffect(() => {
        getProfile();
        getUserPosts();
        getCountPost();
        getCountGear();
    },[]);
    
    const getProfile = async () => {
        const response = await axios.get(`/api/profiles/${props.match.params.id}`);
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
    
    const getUserPosts = async () => {
        const response = await axios.get(`/api/posts/${props.match.params.id}`);
        console.log("start");
        setPosts(response.data);
    }
    
    return (
        <div className="profile">
            <Header user_id={props.match.params.id} profile={profile} getProfile={getProfile} getUserPosts={getUserPosts} />
            <div className="profile-main">
            <UserProfile profile={profile} countPost={countPost} countGear={countGear}/>
            <ul className="profile-nav">
                <Link to={`/${props.match.params.id}`}><li>Achivement</li></Link>
                <Link to={`/${props.match.params.id}/gear`}><li>Gear Lists</li></Link>
            </ul>
            <Switch>
                <Route path="/:id" exact render = {() => <UserPosts
                    user_id={props.match.params.id}
                    posts={posts} />
                }/>
                <Route path="/:id/gear" exact component={UserGears} />
                <Route path="/:id/:post_id" exact component={ShowPost} />
                <Route path="/:id/gear/:gear_id" component={ShowGear} />
            </Switch>
            </div>
        </div>
    )
}

export default Profile;