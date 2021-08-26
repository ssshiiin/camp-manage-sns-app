import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect} from 'react-router-dom';
import axios from 'axios';

import Profile from './Profile/Profile';
import Home from './Home/Home';
import SubCategory from './SubCategory';
import BringGear from './BringGear/BringGear';
import GearSaveLists from './SaveGear/SaveGear';
import AddBringGear from './BringGear/AddBringGear';
import LoginRoute from '../routes/LoginRoute';


function Main(props){
    console.log("Main")
    return (
        <main>
            <div className="main-category">
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path={`/${props.user_id}/bring_lists`} exact render={() => <BringGear
                    user_id={props.user_id}/> 
                }/>
                <Route path={`/${props.user_id}/bring_lists/add`} exact render={() => <AddBringGear
                    user_id={props.user_id}/> 
                }/>
                <Route path={`/${props.user_id}/save_lists`} exact render={() => <GearSaveLists
                    user_id={props.user_id}/> 
                }/>
                <Route path="/:id" component={Profile} />
                <Redirect to="/" />
            </Switch>
            </div>
            <SubCategory />
        </main>
    )
}

export default Main;