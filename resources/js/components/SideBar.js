import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'
import axios from 'axios';

function SideBar(){
    
    const [user, setUser] = useState([]);

    useEffect(() => {
        getUsers()
    },[])

    const getUsers = async () => {
        const response = await axios.get('/api/user');
        setUser(response.data);
    }
    
    return (
        <nav>
            <div className="logo">
                logo
            </div>
            <ul className="nav">
                <Link to="/"><img src={'/images/ホームアイコン.jpeg'} width="36px" height="36px" /><li>Home</li></Link>
                <Link to={`/${user.id}/schedule`}><img src={'/images/schedule.jpeg'} width="36px" height="36px" /><li>Schedule</li></Link>
                <Link to={`/${user.id}/lists`}><img src={'/images/ランタンアイコン1.jpeg'} width="36px" height="36px" /><li>Gear</li></Link>
                <Link to={`/${user.id}/dm`}><img src={'/images/メールの無料アイコンその8.jpeg'} width="36px" height="36px" /><li>Messages</li></Link>
                <Link to={`/${user.id}`}><img src={'/images/履歴書アイコン6.jpeg'} width="36px" height="36px" /><li>Profile</li></Link>
            </ul>
        </nav>   
    )
}

export default SideBar;