import React, { useState, useEffect} from 'react';
import { Route, Switch } from 'react-router-dom';
import axios from 'axios';

import GearAddHeader from './GearAddHeader';
import GearBringHeader from './GearBringHeader';
import ProfileHeader from './ProfileHeader';

function Header(props){
    const [user, setUser] = useState([]);

    useEffect(() => {
        getUsers()
    },[])

    const getUsers = async () => {
        const response = await axios.get('/api/user');
        setUser(response.data);
    }
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
                {
                    function(){
                        if (props.user_id == user.id){
                            return (
                            <Route path={`/${props.user_id}`} render={() => <ProfileHeader 
                                user_id={props.user_id} 
                                profile={props.profile}
                                getProfile={props.getProfile}
                                getUserPosts={props.getUserPosts} 
                                getCategory={props.getCategory}/>
                            } />)
                        }
                    }()
                }
            </Switch>
        </header>
    )
}

export default Header;