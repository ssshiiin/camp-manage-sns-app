import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import SideBar from './SideBar';
import Main from './Main';

function App(){
    return (
        <Router>
            <SideBar />
            <Main />
        </Router>
    )
}



if(document.getElementById('camp-app')){
    ReactDOM.render(<App />, document.getElementById('camp-app'));
}