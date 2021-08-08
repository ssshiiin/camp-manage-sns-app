import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Header from './Header';
import SideBar from './SideBar';
import Main from './Main';

function App(){
    return (
        <Router>
            <Header />
            <div className="middle">
                <SideBar />
                <Main />
            </div>
        </Router>
    )
}



if(document.getElementById('app')){
    ReactDOM.render(<App />, document.getElementById('app'));
}