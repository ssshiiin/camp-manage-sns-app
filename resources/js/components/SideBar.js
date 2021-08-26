import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'
import axios from 'axios';

function SideBar(props){
    return (
        <nav className="side-bar">
            <div className="logo">
                logo
            </div>
            <ul className="side-nav">
                <Link to="/"><img src={'/images/ホームアイコン.jpeg'} width="36px" height="36px" /><li>Home</li></Link>
                <Link to={`/${props.user_id}/schedule`}><img src={'/images/schedule.jpeg'} width="36px" height="36px" /><li>Schedule</li></Link>
                <Link to={`/${props.user_id}/bring_lists`}><img src={'/images/ランタンアイコン1.jpeg'} width="36px" height="36px" /><li>Gear</li></Link>
                <Link to={`/${props.user_id}/dm`}><img src={'/images/メールの無料アイコンその8.jpeg'} width="36px" height="36px" /><li>Messages</li></Link>
                <Link to={`/${props.user_id}`} onClick={props.rerender}><img src={'/images/履歴書アイコン6.jpeg'} width="36px" height="36px" /><li>Profile</li></Link>
            </ul>
        </nav>   
    )
}

export default SideBar;