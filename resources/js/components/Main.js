import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Profile from './Profile';
import Home from './Home';
import SubCategory from './SubCategory';
import GearBringLists from './GearBringLists';
import GearSaveLists from './GearSaveLists';
import GearBringAdd from './GearBringAdd';


function Main(){
    return (
        <main>
            <div className="main-category">
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/:id/save_lists" exact component={GearSaveLists} />
                <Route path="/:id/bring_lists" exact component={GearBringLists} />
                <Route path="/:id/bring_lists/add" exact component={GearBringAdd} />
                <Route path="/:id" component={Profile} />
            </Switch>
            </div>
            <SubCategory />
        </main>
    )
}

export default Main;