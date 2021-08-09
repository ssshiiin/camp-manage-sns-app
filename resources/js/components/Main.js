import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Profile from './Profile';
import Home from './Home';


function Main(){
    return (
        <main>
            <Switch>
                <Route path="/home" exact component={Home} />
                <Route path="/takumi" exact component={Profile} />
            </Switch>
        </main>
    )
}

export default Main;