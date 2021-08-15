import React from 'react';

import Header from './Header';

function GearLists(props){
    console.log(props)
    return (
        <div className="gear">
            <Header />
            <div className="gear-main">
                <p>gearlists</p>
            </div>
        </div>
    )
}

export default GearLists;