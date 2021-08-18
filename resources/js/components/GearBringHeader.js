import React from 'react';
import { Link } from 'react-router-dom';

function GearBringHeader(props){
    console.log(props)
    return (
        <header>
            <div className="title">ふもとっぱらキャンプ場の持ち物リスト</div>
            <Link to={`/${props.user_id}/bring_lists/add`}>
            add
            </Link>
        </header>
    )
}

export default GearBringHeader;