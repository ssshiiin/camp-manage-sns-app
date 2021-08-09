import React from 'react';
import {Link} from 'react-router-dom'

function SideBar(){
    return (
        <nav>
            <ul className="nav">
                <Link to="/home"><img src={'/images/ホームアイコン.jpeg'} width="36px" height="36px" /><li>ホーム</li></Link>
                <Link to="/takumi/schedule"><img src={'/images/schedule.jpeg'} width="36px" height="36px" /><li>スケジュール</li></Link>
                <Link to="/takumi/lists"><img src={'/images/ランタンアイコン1.jpeg'} width="36px" height="36px" /><li>ギア</li></Link>
                <Link to="/takumi/dm"><img src={'/images/メールの無料アイコンその8.jpeg'} width="36px" height="36px" /><li>メッセージ</li></Link>
                <Link to="/takumi"><img src={'/images/履歴書アイコン6.jpeg'} width="36px" height="36px" /><li>プロフィール</li></Link>
            </ul>
        </nav>   
    )
}

export default SideBar;