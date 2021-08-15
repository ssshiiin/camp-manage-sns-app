import React from 'react';
import { Link, Switch, Route } from 'react-router-dom';

import ProfileUser from './ProfileUser';
import ProfilePost from './ProfilePost';
import ProfileGear from './ProfileGear';
import ProfilePostIndex from './ProfilePostIndex';
import ProfileGearIndex from './ProfileGearIndex';

function Profile(props){
    return (
        <div className="profile">
            <ProfileUser />
            <ul className="profile-nav">
                <Link to={`/${props.match.params.id}`}><li>投稿</li></Link>
                <Link to={`/${props.match.params.id}/gear`}><li>ギア</li></Link>
            </ul>
            <Switch>
                <Route path="/:id" exact component={ProfilePost} />
                <Route path="/:id/gear" exact component={ProfileGear} />
                <Route path="/:id/:post_id" exact component={ProfilePostIndex} />
                <Route path="/:id/gear/:gear_id" component={ProfileGearIndex} />
            </Switch>
        </div>
    )
}

export default Profile;