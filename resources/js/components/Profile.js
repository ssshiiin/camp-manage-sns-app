import React from 'react';
import { Link, Switch, Route } from 'react-router-dom';

import ProfilePost from './ProfilePost';
import ProfileGear from './ProfileGear';

function Profile(){
    return (
        <div>
            <div className="profile-index">
                <div className="profile-image"></div>
                <div className="profile-content"></div>
            </div>
            <ul className="profile-nav">
                <Link to="/takumi"><li>投稿</li></Link>
                <Link to="/takumi/gear"><li>ギア</li></Link>
            </ul>
            <Switch>
                <Route path="/:id" exact component={ProfilePost} />
                <Route path="/:id/gear" component={ProfileGear} />
            </Switch>
        </div>
    )
}

export default Profile;