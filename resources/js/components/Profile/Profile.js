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
    
    const [categories, setCategories] = useState([]);
    const [activePage, setActivePage] = useState(1);
    const [itemsCountPerPage, setItemsCountPerPage] = useState(0);
    const [totalItemsCount, setTotalItemsCount] = useState(0);
    
    
    useEffect(() => {
        getProfile();
        getUserPosts();
        getCategory();
    },[]);
    
    const getProfile = async () => {
        const response = await axios.get(`/api/profiles/${props.user_id}`);
        
        setProfile(response.data);
    }
    
    const getCountPost = async () => {
        const response = await axios.get(`/api/count/post/${props.user_id}`);
        
        setCountPost(response.data);
    }
    
    const getCountGear = async () => {
        const response = await axios.get(`/api/count/gear/${props.user_id}`);
        
        setCountGear(response.data);
    }
    
    const getUserPosts = async () => {
        const response = await axios.get(`/api/posts/${props.user_id}`);
        
        setPosts(response.data);
        getCountPost();
        getCountGear();
    }
    
    const getCategory = async (page) => {
        const response = await axios.get(`/api/gears/category/${props.user_id}?page=${page}`);
    
        setCategories(response.data.data);
        setActivePage(response.data.meta.current_page);
        setItemsCountPerPage(response.data.meta.per_page);
        setTotalItemsCount(response.data.meta.total);
    }
    
    return (
        <div className="profile">
            <Header 
                user_id={props.user_id} 
                profile={profile} 
                getProfile={getProfile} 
                getUserPosts={getUserPosts}
                getCategory={getCategory}/>
            <div className="profile-main">
            <UserProfile profile={profile} countPost={countPost} countGear={countGear}/>
            <ul className="profile-nav">
                <Link to={`/${props.user_id}`}><li>Achivement</li></Link>
                <Link to={`/${props.user_id}/gear`}><li>Gear Lists</li></Link>
            </ul>
            <Switch>
                <Route path={`/:id`} exact render = {() => <UserPosts
                    user_id={props.user_id}
                    posts={posts} />
                }/>
                <Route path={`/:id/gear`} exact render = {() => <UserGears
                    user_id={props.user_id}
                    categories={categories}
                    activePage={activePage}
                    itemsCountPerPage={itemsCountPerPage}
                    totalItemsCount={totalItemsCount}
                    getCategory={getCategory}
                    />
                }/>
                <Route path="/:id/post/:post_id" exact component={ShowPost} />
                <Route path="/:id/gear/:gear_id" component={ShowGear} />
            </Switch>
            </div>
        </div>
    )
}

export default Profile;