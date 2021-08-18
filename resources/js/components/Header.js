import React from 'react';
import { Route, Switch } from 'react-router-dom';

import GearAddHeader from './GearAddHeader';
import GearBringHeader from './GearBringHeader';

function Header(props){
    console.log(props)
    return (
        <header>
            <Switch>
                <Route path="/:id/bring_lists" exact 
                render={() => <GearBringHeader
                    user_id={props.user_id} />
                } />  
                <Route path="/:id/bring_lists/add" exact 
                render={() => <GearAddHeader 
                    user_id={props.user_id}
                    postAddBringGear={props.postAddBringGear} />
                } />
            </Switch>
        </header>
    )
}

export default Header;