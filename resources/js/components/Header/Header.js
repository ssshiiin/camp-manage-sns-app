import React from 'react';
import { Route, Switch } from 'react-router-dom';

import GearAddHeader from './GearAddHeader';
import GearBringHeader from './GearBringHeader';
import ProfilePostHeader from './ProfilePostHeader';

function Header(props){
    return (
        <header>
            <Switch>
                <Route path={`/${props.user_id}/bring_lists`} exact 
                render={() => <GearBringHeader
                    user_id={props.user_id} 
                    allDeleteBringGear={props.allDeleteBringGear}
                    createTemplates={props.createTemplates} 
                    useTemplates={props.useTemplates}
                    getTemplates={props.getTemplates}
                    templates={props.templates}
                    deleteTemplate={props.deleteTemplate}
                    />
                } />  
                <Route path={`/${props.user_id}/bring_lists/add`} exact 
                render={() => <GearAddHeader 
                    user_id={props.user_id}
                    postAddBringGear={props.postAddBringGear} />
                } />
                <Route path={`/${props.user_id}`} 
                render={() => <ProfilePostHeader 
                    user_id={props.user_id} 
                    profile={props.profile}
                    getProfile={props.getProfile}
                    getUserPosts={props.getUserPosts} 
                    getCategory={props.getCategory}/>
                } />
            </Switch>
        </header>
    )
}

export default Header;