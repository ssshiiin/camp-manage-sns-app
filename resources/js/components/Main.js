import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Profile from './Profile';
import Home from './Home';
import SubCategory from './SubCategory';


function Main(){
    return (
        <main>
            <div className="main-category">
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/:id" component={Profile} />
            </Switch>
            </div>
            <SubCategory />
        </main>
    )
}

export default Main;