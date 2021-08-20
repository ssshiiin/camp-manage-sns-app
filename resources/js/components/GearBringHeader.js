import React from 'react';

import TocIcon from '@material-ui/icons/Toc';

import GearBringNav from './GearBringNav'

function GearBringHeader(props){
    return (
        <React.Fragment>
            <div className="title">
                持ち物リスト
                <GearBringNav 
                    user_id={props.user_id} 
                    templates={props.templates}
                    createTemplates={props.createTemplates}
                    useTemplates={props.useTemplates} 
                    allDeleteBringGear={props.allDeleteBringGear}
                    deleteTemplate={props.deleteTemplate}
                />
            </div>
        </React.Fragment>
    )
}

export default GearBringHeader;