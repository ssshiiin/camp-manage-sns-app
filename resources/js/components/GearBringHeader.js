import React from 'react';
import { Link } from 'react-router-dom';
import SimpleListMenu from './SimpleListMenu'

function GearBringHeader(props){
    return (
        <header>
            <div className="title">
                ふもとっぱらキャンプ場の持ち物リスト
                <Link to={`/${props.user_id}/bring_lists/add`}>add</Link>
                <button type="button" onClick={props.createTemplates}>テンプレートを作成する</button>
                <SimpleListMenu getTemplates={props.getTemplates} useTemplates={props.useTemplates} templates={props.templates}/>
            </div>
        </header>
    )
}

export default GearBringHeader;