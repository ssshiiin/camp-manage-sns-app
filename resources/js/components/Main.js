import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Profile from './Profile/Profile';
import Home from './Home/Home';
import SubCategory from './SubCategory';
import BringGear from './BringGear/BringGear';
import GearSaveLists from './SaveGear/SaveGear';
import AddBringGear from './BringGear/AddBringGear';


function Main(){
    return (
        <main>
            <div className="main-category">
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/:id/save_lists" exact component={GearSaveLists} />
                <Route path="/:id/bring_lists" exact component={BringGear} />
                <Route path="/:id/bring_lists/add" exact component={AddBringGear} />
                <Route path="/:id" component={Profile} />
            </Switch>
            </div>
            <SubCategory />
        </main>
    )
}

export default Main;