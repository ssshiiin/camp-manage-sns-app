import React from 'react';
import { Link } from 'react-router-dom';

function GearHeader(props){
    return (
        <header>
            <div className="title">ふもとっぱらキャンプ場の持ち物リスト</div>
            <Link to={`/${props.user_id}/bring_lists/add`}>
            add
            </Link>
            <button type="button" onClick={props.postAddBringGear}>追加する</button>
        </header>
    )
}

export default GearHeader;