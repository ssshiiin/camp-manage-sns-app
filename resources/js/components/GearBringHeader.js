import React from 'react';
import { Link } from 'react-router-dom';

function GearBringHeader(props){
    return (
        <header>
            <div className="title">ふもとっぱらキャンプ場の持ち物リスト
                <Link to={`/${props.user_id}/bring_lists/add`}>add</Link>
                <button type="button" onClick={props.createTemplates}>テンプレートを作成する</button>
                <button type="button" onClick={props.useTemplates}>テンプレートを使う</button>
            </div>
        </header>
    )
}

export default GearBringHeader;