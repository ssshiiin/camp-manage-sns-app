import React from 'react';
import { Link } from 'react-router-dom';

function GearAddHeader(props){
    return (
        <header>
            <div className="title">Gearリスト
                <Link to={`/${props.user_id}/bring_lists`}>back</Link>
                <button type="button" onClick={props.postAddBringGear}>追加する</button>
            </div>
        </header>
    )
}

export default GearAddHeader;