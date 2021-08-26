import React, { useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import axios from 'axios';

import SideBar from './SideBar';
import Main from './Main';

function App(){
    const [user, setUser] = useState([]);

    useEffect(() => {
        getUsers()
    },[])

    const getUsers = async () => {
        const response = await axios.get('/api/user');
        setUser(response.data);
    }
    return (
        <Router>
            <SideBar user={user} />
            <Main user={user}/>
        </Router>
    )
}



if(document.getElementById('camp-app')){
    ReactDOM.render(<App />, document.getElementById('camp-app'));
}