import React from 'react';
import { Link, Switch, Route } from 'react-router-dom';

import ProfilePost from './ProfilePost';
import ProfileGear from './ProfileGear';
import ProfilePostIndex from './ProfilePostIndex';

function Profile(props){
    return (
        <div className="profile">
            <div className="profile-index">
                <div className="profile-image"></div>
                <div className="profile-content"></div>
            </div>
            <ul className="profile-nav">
                <Link to={`/${props.match.params.id}`}><li>投稿</li></Link>
                <Link to={`/${props.match.params.id}/gear`}><li>ギア</li></Link>
            </ul>
            <Switch>
                <Route path="/:id" exact component={ProfilePost} />
                <Route path="/:id/gear" component={ProfileGear} />
                <Route path="/:id/:post_id" component={ProfilePostIndex} />
            </Switch>
        </div>
    )
}

export default Profile;