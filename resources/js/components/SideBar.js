import React from 'react';
import {Link} from 'react-router-dom'

function SideBar(){
    return (
        <nav>
            <ul className="nav">
                <Link to="/home"><li>ホーム</li></Link>
                <Link to="/takumi/schedule"><li>スケジュール</li></Link>
                <Link to="/takumi/lists"><li>ギア</li></Link>
                <Link to="/takumi/dm"><li>メッセージ</li></Link>
                <Link to="/takumi"><li>プロフィール</li></Link>
            </ul>
        </nav>   
    )
}

export default SideBar;