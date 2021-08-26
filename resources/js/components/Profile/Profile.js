import React, { useState, useEffect } from 'react';
import { Link, Switch, Route, Redirect } from 'react-router-dom';
import axios from 'axios';

import Header from '../Header/Header';
import UserProfile from './UserProfile';
import UserPosts from './UserPosts';
import UserGears from './UserGears';
import ShowPost from './ShowPost';
import ShowGear from './ShowGear';

function Profile(props) {
    const [idList, setIdList] = useState([]);
    const [profile, setProfile] = useState([]);
    const [countPost, setCountPost] = useState(0);
    const [countGear, setCountGear] = useState(0);
    const [posts, setPosts] = useState([]);

    const [categories, setCategories] = useState([]);
    const [activePage, setActivePage] = useState(1);
    const [itemsCountPerPage, setItemsCountPerPage] = useState(0);
    const [totalItemsCount, setTotalItemsCount] = useState(0);


    useEffect(() => {
        getUserId();
        getProfile();
        getUserPosts();
        getCategory();
    }, []);

    const getUserId = async() => {
        const response = await axios.get("/api/users");
        setIdList(response.data);
    }

    const getProfile = async() => {
        const response = await axios.get(`/api/profiles/${props.match.params.id}`);

        setProfile(response.data);
    }

    const getCountPost = async() => {
        const response = await axios.get(`/api/count/post/${props.match.params.id}`);

        setCountPost(response.data);
    }

    const getCountGear = async() => {
        const response = await axios.get(`/api/count/gear/${props.match.params.id}`);

        setCountGear(response.data);
    }

    const getUserPosts = async() => {
        const response = await axios.get(`/api/posts/${props.match.params.id}`);

        setPosts(response.data);
        getCountPost();
        getCountGear();
    }

    const getCategory = async(page) => {
        const response = await axios.get(`/api/gears/category/${props.match.params.id}?page=${page}`);

        setCategories(response.data.data);
        setActivePage(response.data.meta.current_page);
        setItemsCountPerPage(response.data.meta.per_page);
        setTotalItemsCount(response.data.meta.total);
    }

    return (
        <React.Fragment>
        {
            (function(){
            if(!(idList.length===0)){
                if(!(idList.includes(parseInt(props.match.params.id)))){
                    return <Redirect to="/" />
                }
            }})()
        }
        <div className="profile">
            <Header 
                user_id={props.match.params.id} 
                profile={profile} 
                getProfile={getProfile} 
                getUserPosts={getUserPosts}
                getCategory={getCategory}/>
            <div className="profile-main">
            <UserProfile profile={profile} countPost={countPost} countGear={countGear}/>
            <ul className="profile-nav">
                <Link to={`/${props.match.params.id}`}><li>Achivement</li></Link>
                <Link to={`/${props.match.params.id}/gear`}><li>Gear Lists</li></Link>
            </ul>
            <Switch>
                <Route path= "/:id" exact render = {() => <UserPosts
                    user_id={props.match.params.id}
                    posts={posts} />
                }/>
                <Route path="/:id/gear" exact render = {() => <UserGears
                    user_id={props.match.params.id}
                    categories={categories}
                    activePage={activePage}
                    itemsCountPerPage={itemsCountPerPage}
                    totalItemsCount={totalItemsCount}
                    getCategory={getCategory}
                    />
                }/>
                <Route path="/:id/post/:post_id" exact component={ShowPost} />
                <Route path="/:id/gear/:gear_id" exact component={ShowGear} />
                <Redirect to="/" />
            </Switch>
            </div>
        </div>
        </React.Fragment>
    )
}

export default Profile;
